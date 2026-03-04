import { Heart } from 'lucide-react';
import { BookItem } from '../data/mockData';

interface BookCardProps {
  book: BookItem;
  onClick: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export function BookCard({ book, onClick, isWishlisted, onToggleWishlist }: BookCardProps) {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden shadow-lg mb-4" onClick={onClick}>
      <div className="relative">
        <img src={book.cover} alt={book.title} className="w-full h-64 object-cover" />
        <button
          className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
        >
          <Heart size={20} className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-white'} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-slate-400 text-sm mb-2">{book.author}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">${book.price}</span>
          <span className="text-sm text-slate-400">{book.condition}</span>
        </div>
        <div className="mt-2 flex justify-between items-center text-xs text-slate-400">
          <span>{book.location}</span>
          <span>{book.shippingTime}</span>
        </div>
      </div>
    </div>
  );
}
