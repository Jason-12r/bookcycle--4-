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
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
// API base URL - can be configured via environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
// Generic fetch function with error handling
function fetchApi(endpoint_1) {
    return __awaiter(this, arguments, void 0, function* (endpoint, options = {}) {
        try {
            const response = yield fetch(`${API_BASE_URL}${endpoint}`, Object.assign(Object.assign({}, options), { headers: Object.assign({ 'Content-Type': 'application/json' }, options.headers) }));
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    });
}
exports.api = {
    // Initialize data
    init: () => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi('/api/init');
    }),
    // Books API
    getBooks: () => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi('/api/books');
    }),
    postBook: (book) => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi('/api/books', {
            method: 'POST',
            body: JSON.stringify(book),
        });
    }),
    getBookById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi(`/api/books/${id}`);
    }),
    // Users API
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi(`/api/users/${id}`);
    }),
    updateUser: (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }),
    // Wishlist API
    toggleWishlist: (bookId) => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi('/api/wishlist/toggle', {
            method: 'POST',
            body: JSON.stringify({ bookId }),
        });
    }),
    // Chats API
    getChats: () => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi('/api/chats');
    }),
    startChat: (sellerId) => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi('/api/chats', {
            method: 'POST',
            body: JSON.stringify({ sellerId }),
        });
    }),
    getChatById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi(`/api/chats/${id}`);
    }),
    // Messages API
    getMessages: (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi(`/api/messages/${chatId}`);
    }),
    sendMessage: (chatId, text, senderId) => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi('/api/messages', {
            method: 'POST',
            body: JSON.stringify({ chatId, text, senderId }),
        });
    }),
    // Evaluation API
    evaluateUser: (sellerId, isGood) => __awaiter(void 0, void 0, void 0, function* () {
        return fetchApi('/api/evaluate', {
            method: 'POST',
            body: JSON.stringify({ sellerId, isGood }),
        });
    }),
};
