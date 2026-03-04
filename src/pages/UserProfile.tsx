import { ChevronLeft, ShieldCheck, MapPin } from 'lucide-react';
import { BookCard } from '../components/BookCard';
import { User as UserType, BookItem } from '../data/mockData';

interface UserProfileProps {
  userId: string;
  onBack?: () => void;
  onChat?: () => void;
  onBookClick: (id: string) => void;
  wishlist?: string[];
  onToggleWishlist?: (bookId: string) => void;
  user: UserType;
  books: BookItem[];
}

export function UserProfile({ userId, onBack, onChat, onBookClick, wishlist, onToggleWishlist, user, books }: UserProfileProps) {
  const userBooks = books.filter(book => book.sellerId === userId);

  return (
    <div className="p-4 pb-20">
      {onBack && (
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
      )}
      
      <div className="text-center mb-8">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
        />
        <div className="flex items-center justify-center mb-2">
          <h2 className="text-xl font-bold">{user.name}</h2>
          {user.verified && (
            <span className="ml-2 text-blue-500">
              <ShieldCheck size={20} />
            </span>
          )}
        </div>
        <p className="text-sm text-slate-400 mb-4">{user.rank}</p>
        
        <div className="flex justify-center space-x-6 mb-4">
          <div>
            <p className="text-lg font-bold">{user.sales}</p>
            <p className="text-xs text-slate-400">Sales</p>
          </div>
          <div>
            <p className="text-lg font-bold">{user.ratingCount}</p>
            <p className="text-xs text-slate-400">Reviews</p>
          </div>
          <div>
            <p className="text-lg font-bold">{user.trustScore}%</p>
            <p className="text-xs text-slate-400">Trust</p>
          </div>
        </div>
        
        {userId !== 'me' && onChat && (
          <button
            onClick={onChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium mb-4"
          >
            Start Chat
          </button>
        )}
        
        {user.bio && (
          <p className="text-sm text-left mb-4">{user.bio}</p>
        )}
        
        <div className="flex items-center text-sm text-slate-400 mb-2">
          <MapPin size={16} className="mr-1" />
          <span>{user.location}</span>
        </div>
        <div className="text-sm text-slate-400">
          Member since {user.joinDate}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Listings</h3>
        {userBooks.length === 0 ? (
          <p className="text-slate-400 text-center py-4">No listings yet</p>
        ) : (
          <div className="space-y-4">
            {userBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => onBookClick(book.id)}
                isWishlisted={wishlist?.includes(book.id) || false}
                onToggleWishlist={() => onToggleWishlist?.(book.id)}
              />
            ))}
          </div>
        )}
      </div>
      
      {userId === 'me' && wishlist && wishlist.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Wishlist</h3>
          <div className="space-y-4">
            {books
              .filter(book => wishlist.includes(book.id))
              .map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => onBookClick(book.id)}
                  isWishlisted={true}
                  onToggleWishlist={() => onToggleWishlist?.(book.id)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
