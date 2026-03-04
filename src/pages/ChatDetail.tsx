import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, User } from 'lucide-react';
import { ChatSession, ChatMessage, BookItem, User as UserType } from '../data/mockData';

interface ChatDetailProps {
  id: string;
  onBack: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  chat: ChatSession;
  onSellerClick: (sellerId: string) => void;
  books: BookItem[];
  users: Record<string, UserType>;
}

export function ChatDetail({ onBack, messages, onSendMessage, chat, onSellerClick, books, users }: ChatDetailProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherUserId = chat.participants.find(id => id !== 'me') || '';
  const otherUser = users[otherUserId];
  const book = chat.bookId ? books.find(b => b.id === chat.bookId) : undefined;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  if (!otherUser) return null;

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center">
        <button onClick={onBack} className="mr-4">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center flex-1">
          <img
            src={otherUser.avatar}
            alt={otherUser.name}
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <div>
            <h3 className="font-semibold">{otherUser.name}</h3>
            {book && (
              <p className="text-xs text-slate-400 truncate">
                {book.title}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => onSellerClick(otherUserId)}
          className="p-2"
        >
          <User size={20} />
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => {
          const isMe = message.senderId === 'me';
          return (
            <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${isMe ? 'bg-blue-600' : 'bg-slate-800'}`}>
                <p>{message.text}</p>
                <div className={`text-xs mt-1 ${isMe ? 'text-right text-blue-200' : 'text-left text-slate-400'}`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-800 rounded-full py-2 px-4 text-white mr-2"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 rounded-full p-2"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
