import { BookCard } from '../components/BookCard';
import { BookItem } from '../data/mockData';

interface HomeProps {
  onBookClick: (id: string) => void;
  wishlist: string[];
  onToggleWishlist: (bookId: string) => void;
  books: BookItem[];
  onShowInstructions: () => void;
}

export function Home({ onBookClick, wishlist, onToggleWishlist, books, onShowInstructions }: HomeProps) {
  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">BookCycle</h1>
        <button onClick={onShowInstructions} className="text-sm text-blue-500">
          How to use
        </button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Featured Books</h2>
        <div className="space-y-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => onBookClick(book.id)}
              isWishlisted={wishlist.includes(book.id)}
              onToggleWishlist={() => onToggleWishlist(book.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
