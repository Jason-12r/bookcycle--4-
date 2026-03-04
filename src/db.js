"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbOps = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default('database.sqlite');
// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    avatar TEXT,
    verified INTEGER,
    rating REAL,
    ratingCount INTEGER,
    sales INTEGER,
    trustScore INTEGER,
    joinDate TEXT,
    rank TEXT,
    bio TEXT,
    location TEXT,
    wishlist TEXT, -- JSON array
    listings TEXT -- JSON array
  );

  CREATE TABLE IF NOT EXISTS books (
    id TEXT PRIMARY KEY,
    title TEXT,
    author TEXT,
    cover TEXT,
    price REAL,
    condition TEXT,
    sellerId TEXT,
    description TEXT,
    category TEXT,
    tags TEXT, -- JSON array
    location TEXT,
    shippingTime TEXT,
    images TEXT, -- JSON array
    isbn TEXT
  );

  CREATE TABLE IF NOT EXISTS chats (
    id TEXT PRIMARY KEY,
    participants TEXT, -- JSON array
    lastMessage TEXT,
    lastMessageTime TEXT,
    unreadCount INTEGER,
    bookId TEXT
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    chatId TEXT,
    senderId TEXT,
    text TEXT,
    timestamp TEXT,
    FOREIGN KEY(chatId) REFERENCES chats(id)
  );
`);
// Helper to parse/stringify JSON
const json = {
    get: (val) => JSON.parse(val),
    set: (val) => JSON.stringify(val)
};
exports.dbOps = {
    // User Operations
    getUser: (id) => {
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
        if (user) {
            user.wishlist = json.get(user.wishlist);
            user.listings = json.get(user.listings);
            user.verified = Boolean(user.verified);
        }
        return user;
    },
    getAllUsers: () => {
        const users = db.prepare('SELECT * FROM users').all();
        return users.reduce((acc, user) => {
            user.wishlist = json.get(user.wishlist);
            user.listings = json.get(user.listings);
            user.verified = Boolean(user.verified);
            acc[user.id] = user;
            return acc;
        }, {});
    },
    upsertUser: (user) => {
        const stmt = db.prepare(`
      INSERT OR REPLACE INTO users (id, name, avatar, verified, rating, ratingCount, sales, trustScore, joinDate, rank, bio, location, wishlist, listings)
      VALUES (@id, @name, @avatar, @verified, @rating, @ratingCount, @sales, @trustScore, @joinDate, @rank, @bio, @location, @wishlist, @listings)
    `);
        stmt.run(Object.assign(Object.assign({}, user), { verified: user.verified ? 1 : 0, wishlist: json.set(user.wishlist), listings: json.set(user.listings) }));
    },
    // Book Operations
    getAllBooks: () => {
        const books = db.prepare('SELECT * FROM books').all();
        return books.map(book => (Object.assign(Object.assign({}, book), { tags: json.get(book.tags), images: json.get(book.images) })));
    },
    addBook: (book) => {
        const stmt = db.prepare(`
      INSERT INTO books (id, title, author, cover, price, condition, sellerId, description, category, tags, location, shippingTime, images, isbn)
      VALUES (@id, @title, @author, @cover, @price, @condition, @sellerId, @description, @category, @tags, @location, @shippingTime, @images, @isbn)
    `);
        stmt.run(Object.assign(Object.assign({}, book), { tags: json.set(book.tags), images: json.set(book.images) }));
    },
    deleteBooksBySeller: (sellerId) => {
        db.prepare('DELETE FROM books WHERE sellerId = ?').run(sellerId);
    },
    // Chat Operations
    getAllChats: () => {
        const chats = db.prepare('SELECT * FROM chats').all();
        return chats.map(chat => (Object.assign(Object.assign({}, chat), { participants: json.get(chat.participants) })));
    },
    addChat: (chat) => {
        const stmt = db.prepare(`
      INSERT INTO chats (id, participants, lastMessage, lastMessageTime, unreadCount, bookId)
      VALUES (@id, @participants, @lastMessage, @lastMessageTime, @unreadCount, @bookId)
    `);
        stmt.run(Object.assign(Object.assign({}, chat), { participants: json.set(chat.participants) }));
    },
    updateChat: (id, lastMessage, lastMessageTime) => {
        db.prepare('UPDATE chats SET lastMessage = ?, lastMessageTime = ? WHERE id = ?')
            .run(lastMessage, lastMessageTime, id);
    },
    // Message Operations
    getMessages: () => {
        const msgs = db.prepare('SELECT * FROM messages').all();
        return msgs.reduce((acc, msg) => {
            if (!acc[msg.chatId])
                acc[msg.chatId] = [];
            acc[msg.chatId].push({
                id: msg.id,
                senderId: msg.senderId,
                text: msg.text,
                timestamp: msg.timestamp
            });
            return acc;
        }, {});
    },
    addMessage: (msg) => {
        const stmt = db.prepare(`
      INSERT INTO messages (id, chatId, senderId, text, timestamp)
      VALUES (@id, @chatId, @senderId, @text, @timestamp)
    `);
        stmt.run(msg);
    }
};
