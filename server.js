"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vite_1 = require("vite");
const path_1 = __importDefault(require("path"));
const db_1 = require("./src/db");
require("./src/seed");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = Number(process.env.PORT) || 3000;
        app.use(express_1.default.json());
        // API Routes
        app.get('/api/init', (req, res) => {
            res.json({
                users: db_1.dbOps.getAllUsers(),
                books: db_1.dbOps.getAllBooks(),
                chats: db_1.dbOps.getAllChats(),
                messages: db_1.dbOps.getMessages()
            });
        });
        app.get('/api/books', (req, res) => {
            res.json(db_1.dbOps.getAllBooks());
        });
        app.post('/api/books', (req, res) => {
            const newBook = req.body;
            db_1.dbOps.addBook(newBook);
            // Update user listings
            const user = db_1.dbOps.getUser(newBook.sellerId);
            if (user) {
                user.listings.push(newBook.id);
                db_1.dbOps.upsertUser(user);
            }
            res.json(newBook);
        });
        app.post('/api/chats', (req, res) => {
            const { sellerId } = req.body;
            const chats = db_1.dbOps.getAllChats();
            const existingChat = chats.find(c => c.participants.includes(sellerId) && c.participants.includes('me'));
            if (existingChat) {
                res.json(existingChat);
            }
            else {
                const newChat = {
                    id: `c${Date.now()}`,
                    participants: ['me', sellerId],
                    lastMessage: '',
                    lastMessageTime: 'Now',
                    unreadCount: 0
                };
                db_1.dbOps.addChat(newChat);
                res.json(newChat);
            }
        });
        app.post('/api/messages', (req, res) => {
            const { chatId, text, senderId } = req.body;
            const newMessage = {
                id: `m${Date.now()}`,
                chatId,
                senderId,
                text,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            db_1.dbOps.addMessage(newMessage);
            // Update chat last message
            db_1.dbOps.updateChat(chatId, text, 'Now');
            res.json(newMessage);
        });
        app.post('/api/evaluate', (req, res) => {
            const { sellerId, isGood } = req.body;
            const seller = db_1.dbOps.getUser(sellerId);
            if (seller) {
                const newRating = isGood ? seller.rating + 1 : seller.rating - 1;
                const newTrustScore = isGood ? seller.trustScore : Math.max(0, seller.trustScore - 10);
                const updatedSeller = Object.assign(Object.assign({}, seller), { rating: newRating, trustScore: newTrustScore });
                db_1.dbOps.upsertUser(updatedSeller);
                if (newTrustScore <= 60) {
                    db_1.dbOps.deleteBooksBySeller(sellerId);
                    updatedSeller.listings = [];
                    db_1.dbOps.upsertUser(updatedSeller);
                }
                res.json(updatedSeller);
            }
            else {
                res.status(404).json({ error: 'User not found' });
            }
        });
        app.post('/api/wishlist/toggle', (req, res) => {
            const { bookId } = req.body;
            const me = db_1.dbOps.getUser('me');
            if (me.wishlist.includes(bookId)) {
                me.wishlist = me.wishlist.filter(id => id !== bookId);
            }
            else {
                me.wishlist.push(bookId);
            }
            db_1.dbOps.upsertUser(me);
            res.json(me.wishlist);
        });
        // Vite middleware
        if (process.env.NODE_ENV !== 'production') {
            const vite = yield (0, vite_1.createServer)({
                server: { middlewareMode: true },
                appType: 'spa',
            });
            app.use(vite.middlewares);
        }
        else {
            // Production static serving
            app.use(express_1.default.static(path_1.default.resolve(__dirname, 'dist')));
            app.get('*', (req, res) => {
                res.sendFile(path_1.default.resolve(__dirname, 'dist', 'index.html'));
            });
        }
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    });
}
startServer();
