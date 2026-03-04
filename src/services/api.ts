import { User, BookItem, ChatSession, ChatMessage } from '../data/mockData';

// API base URL - can be configured via environment variables
const API_BASE_URL = 'http://localhost:3001';

// Generic fetch function with error handling
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export const api = {
  // Initialize data
  init: async () => {
    return fetchApi<{
      users: Record<string, User>;
      books: BookItem[];
      chats: ChatSession[];
      messages: Record<string, ChatMessage[]>;
    }>('/api/init');
  },

  // Books API
  getBooks: async () => {
    return fetchApi<BookItem[]>('/api/books');
  },

  postBook: async (book: Omit<BookItem, 'id'>) => {
    return fetchApi<BookItem>('/api/books', {
      method: 'POST',
      body: JSON.stringify(book),
    });
  },

  getBookById: async (id: string) => {
    return fetchApi<BookItem>(`/api/books/${id}`);
  },

  // Users API
  getUserById: async (id: string) => {
    return fetchApi<User>(`/api/users/${id}`);
  },

  updateUser: async (id: string, userData: Partial<User>) => {
    return fetchApi<User>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Wishlist API
  toggleWishlist: async (bookId: string) => {
    return fetchApi<string[]>('/api/wishlist/toggle', {
      method: 'POST',
      body: JSON.stringify({ bookId }),
    });
  },

  // Chats API
  getChats: async () => {
    return fetchApi<ChatSession[]>('/api/chats');
  },

  startChat: async (sellerId: string) => {
    return fetchApi<ChatSession>('/api/chats', {
      method: 'POST',
      body: JSON.stringify({ sellerId }),
    });
  },

  getChatById: async (id: string) => {
    return fetchApi<ChatSession>(`/api/chats/${id}`);
  },

  // Messages API
  getMessages: async (chatId: string) => {
    return fetchApi<ChatMessage[]>(`/api/messages/${chatId}`);
  },

  sendMessage: async (chatId: string, text: string, senderId: string) => {
    return fetchApi<ChatMessage>('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ chatId, text, senderId }),
    });
  },

  // Evaluation API
  evaluateUser: async (sellerId: string, isGood: boolean) => {
    return fetchApi<User>('/api/evaluate', {
      method: 'POST',
      body: JSON.stringify({ sellerId, isGood }),
    });
  },
};
