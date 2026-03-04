"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = require("react");
const BottomNav_1 = require("./components/BottomNav");
const Home_1 = require("./pages/Home");
const Market_1 = require("./pages/Market");
const Post_1 = require("./pages/Post");
const Messages_1 = require("./pages/Messages");
const UserProfile_1 = require("./pages/UserProfile");
const BookDetail_1 = require("./pages/BookDetail");
const ChatDetail_1 = require("./pages/ChatDetail");
const UsageInstructionsModal_1 = require("./components/UsageInstructionsModal");
const react_2 = require("motion/react");
function App() {
    const [activeTab, setActiveTab] = (0, react_1.useState)('home');
    const [selectedBookId, setSelectedBookId] = (0, react_1.useState)(null);
    const [selectedChatId, setSelectedChatId] = (0, react_1.useState)(null);
    const [viewingUserId, setViewingUserId] = (0, react_1.useState)(null);
    // Initialize with empty/loading state
    const [wishlist, setWishlist] = (0, react_1.useState)([]);
    const [chats, setChats] = (0, react_1.useState)([]);
    const [messages, setMessages] = (0, react_1.useState)({});
    const [users, setUsers] = (0, react_1.useState)({});
    const [books, setBooks] = (0, react_1.useState)([]);
    const [evaluatedBookIds, setEvaluatedBookIds] = (0, react_1.useState)([]);
    const [showInstructions, setShowInstructions] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        // Show instructions on first load
        setShowInstructions(true);
        // Fetch initial data
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // For demo purposes, using mock data directly
                // In a real app, this would call api.init()
                const { users: mockUsers, books: mockBooks, chats: mockChats, messages: mockMessages } = yield Promise.resolve().then(() => __importStar(require('./data/mockData')));
                setUsers(mockUsers);
                setBooks(mockBooks);
                setChats(mockChats);
                setMessages(mockMessages);
                if (mockUsers['me']) {
                    setWishlist(mockUsers['me'].wishlist);
                }
            }
            catch (error) {
                console.error("Failed to fetch initial data:", error);
            }
            finally {
                setLoading(false);
            }
        });
        fetchData();
    }, []);
    const handleBookClick = (id) => {
        setSelectedBookId(id);
    };
    const handleChatClick = (id) => {
        setSelectedChatId(id);
    };
    const handleSellerClick = (sellerId) => {
        setViewingUserId(sellerId);
    };
    const handleToggleWishlist = (bookId) => __awaiter(this, void 0, void 0, function* () {
        // Optimistic update
        setWishlist(prev => {
            if (prev.includes(bookId)) {
                return prev.filter(id => id !== bookId);
            }
            else {
                return [...prev, bookId];
            }
        });
        try {
            // In a real app, this would call api.toggleWishlist(bookId);
            console.log('Toggling wishlist for book:', bookId);
        }
        catch (error) {
            console.error("Failed to toggle wishlist:", error);
            // Revert if needed (omitted for brevity)
        }
    });
    const handleStartChat = (sellerId) => __awaiter(this, void 0, void 0, function* () {
        if (sellerId === 'me')
            return;
        try {
            // In a real app, this would call api.startChat(sellerId);
            const existingChat = chats.find(c => c.participants.includes(sellerId) && c.participants.includes('me'));
            if (existingChat) {
                setSelectedChatId(existingChat.id);
            }
            else {
                const newChat = {
                    id: `c${Date.now()}`,
                    participants: ['me', sellerId],
                    lastMessage: '',
                    lastMessageTime: 'Now',
                    unreadCount: 0
                };
                setChats(prev => [...prev, newChat]);
                setMessages(prev => (Object.assign(Object.assign({}, prev), { [newChat.id]: [] })));
                setSelectedChatId(newChat.id);
            }
            setSelectedBookId(null);
            setViewingUserId(null);
            setActiveTab('messages');
        }
        catch (error) {
            console.error("Failed to start chat:", error);
        }
    });
    const handleSendMessage = (chatId, text) => __awaiter(this, void 0, void 0, function* () {
        // Optimistic update
        const tempId = `temp-${Date.now()}`;
        const newMessage = {
            id: tempId,
            senderId: 'me',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => (Object.assign(Object.assign({}, prev), { [chatId]: [...(prev[chatId] || []), newMessage] })));
        setChats(prev => prev.map(chat => chat.id === chatId
            ? Object.assign(Object.assign({}, chat), { lastMessage: text, lastMessageTime: 'Now' }) : chat));
        try {
            // In a real app, this would call api.sendMessage(chatId, text, 'me');
            console.log('Sending message:', text, 'to chat:', chatId);
        }
        catch (error) {
            console.error("Failed to send message:", error);
        }
    });
    const handleEvaluate = (sellerId, bookId, isGood) => __awaiter(this, void 0, void 0, function* () {
        setEvaluatedBookIds(prev => [...prev, bookId]);
        try {
            // In a real app, this would call api.evaluateUser(sellerId, isGood);
            const updatedSeller = Object.assign(Object.assign({}, users[sellerId]), { rating: isGood ? users[sellerId].rating + 1 : users[sellerId].rating - 1, trustScore: isGood ? users[sellerId].trustScore : Math.max(0, users[sellerId].trustScore - 10) });
            setUsers(prevUsers => (Object.assign(Object.assign({}, prevUsers), { [sellerId]: updatedSeller })));
            // If trust score dropped, update books locally
            if (updatedSeller.trustScore <= 60) {
                setBooks(prevBooks => prevBooks.filter(book => book.sellerId !== sellerId));
            }
        }
        catch (error) {
            console.error("Failed to evaluate user:", error);
        }
    });
    const handleBack = () => {
        if (selectedChatId) {
            setSelectedChatId(null);
            return;
        }
        if (viewingUserId) {
            setViewingUserId(null);
            return;
        }
        if (selectedBookId) {
            setSelectedBookId(null);
            return;
        }
    };
    const handleStartChatFromProfile = () => {
        if (viewingUserId) {
            handleStartChat(viewingUserId);
        }
    };
    const handlePostBook = (book) => __awaiter(this, void 0, void 0, function* () {
        try {
            // In a real app, this would call api.postBook(book);
            setBooks(prev => [book, ...prev]);
            setUsers(prev => (Object.assign(Object.assign({}, prev), { [book.sellerId]: Object.assign(Object.assign({}, prev[book.sellerId]), { listings: [...prev[book.sellerId].listings, book.id] }) })));
            setActiveTab('home');
        }
        catch (error) {
            console.error("Failed to post book:", error);
        }
    });
    if (loading) {
        return (<div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        Loading...
      </div>);
    }
    const renderContent = () => {
        if (selectedChatId) {
            const chat = chats.find(c => c.id === selectedChatId);
            if (!chat)
                return null;
            return (<ChatDetail_1.ChatDetail id={selectedChatId} onBack={handleBack} messages={messages[selectedChatId] || []} onSendMessage={(text) => handleSendMessage(selectedChatId, text)} chat={chat} onSellerClick={(sellerId) => {
                    setViewingUserId(sellerId);
                    setSelectedChatId(null);
                }} books={books} users={users}/>);
        }
        if (viewingUserId) {
            return (<UserProfile_1.UserProfile userId={viewingUserId} onBack={handleBack} onChat={handleStartChatFromProfile} onBookClick={handleBookClick} wishlist={viewingUserId === 'me' ? wishlist : undefined} onToggleWishlist={viewingUserId === 'me' ? handleToggleWishlist : undefined} user={users[viewingUserId]} books={books}/>);
        }
        if (selectedBookId) {
            const book = books.find(b => b.id === selectedBookId);
            if (!book)
                return null;
            const seller = users[book.sellerId];
            if (!seller)
                return null;
            return (<BookDetail_1.BookDetail id={selectedBookId} onBack={handleBack} onChat={(sellerId) => handleStartChat(sellerId)} onSellerClick={handleSellerClick} isWishlisted={wishlist.includes(selectedBookId)} onToggleWishlist={() => handleToggleWishlist(selectedBookId)} onEvaluate={(sellerId, isGood) => handleEvaluate(sellerId, selectedBookId, isGood)} isEvaluated={evaluatedBookIds.includes(selectedBookId)} book={book} seller={seller}/>);
        }
        switch (activeTab) {
            case 'home':
                return (<Home_1.Home onBookClick={handleBookClick} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} books={books} onShowInstructions={() => setShowInstructions(true)}/>);
            case 'market':
                return (<Market_1.Market onBookClick={handleBookClick} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} books={books}/>);
            case 'post':
                return <Post_1.Post onBack={() => setActiveTab('home')} user={users['me']} onPostBook={handlePostBook}/>;
            case 'messages':
                return (<Messages_1.Messages onChatClick={handleChatClick} chats={chats} users={users} onShowInstructions={() => setShowInstructions(true)} onUserClick={handleSellerClick}/>);
            case 'profile':
                return (<UserProfile_1.UserProfile userId="me" onBookClick={handleBookClick} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} user={users['me']} books={books}/>);
            default:
                return <Home_1.Home onBookClick={handleBookClick} books={books} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onShowInstructions={() => setShowInstructions(true)}/>;
        }
    };
    return (<div className="bg-slate-950 min-h-screen text-slate-100 font-sans pb-20 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <UsageInstructionsModal_1.UsageInstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)}/>
      
      <react_2.AnimatePresence mode="wait">
        <react_2.motion.div key={selectedBookId ? 'book' : selectedChatId ? 'chat' : viewingUserId ? 'user' : activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="h-full">
          {renderContent()}
        </react_2.motion.div>
      </react_2.AnimatePresence>

      {!selectedBookId && !selectedChatId && !viewingUserId && (<BottomNav_1.BottomNav activeTab={activeTab} onTabChange={setActiveTab}/>)}
    </div>);
}
