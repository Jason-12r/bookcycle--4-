import { ChatSession, User } from '../data/mockData';

interface MessagesProps {
  onChatClick: (id: string) => void;
  chats: ChatSession[];
  users: Record<string, User>;
  onShowInstructions: () => void;
  onUserClick: (userId: string) => void;
}

export function Messages({ onChatClick, chats, users, onShowInstructions }: MessagesProps) {
  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <button onClick={onShowInstructions} className="text-sm text-blue-500">
          How to use
        </button>
      </div>
      
      <div className="space-y-4">
        {chats.map((chat) => {
          const otherUserId = chat.participants.find(id => id !== 'me') || '';
          const otherUser = users[otherUserId];
          
          if (!otherUser) return null;
          
          return (
            <div
              key={chat.id}
              className="flex items-center p-3 bg-slate-900 rounded-lg cursor-pointer"
              onClick={() => onChatClick(chat.id)}
            >
              <img
                src={otherUser.avatar}
                alt={otherUser.name}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <h3 className="font-semibold">{otherUser.name}</h3>
                    {otherUser.verified && (
                      <span className="ml-1 text-blue-500 text-xs">✓</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{chat.lastMessageTime}</span>
                </div>
                <p className="text-sm text-slate-400 truncate">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <span className="absolute right-6 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
