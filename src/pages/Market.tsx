import { useState } from 'react';
import { Search } from 'lucide-react';
import { BookCard } from '../components/BookCard';
import { BookItem } from '../data/mockData';

interface MarketProps {
  onBookClick: (id: string) => void;
  wishlist: string[];
  onToggleWishlist: (bookId: string) => void;
  books: BookItem[];
}

export function Market({ onBookClick, wishlist, onToggleWishlist, books }: MarketProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = !filter || book.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Market</h1>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 rounded-lg py-2 px-10 text-white"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
        </div>
      </div>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-1 rounded-full text-sm ${!filter ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Literature')}
          className={`px-4 py-1 rounded-full text-sm ${filter === 'Literature' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          Literature
        </button>
        <button
          onClick={() => setFilter('Design')}
          className={`px-4 py-1 rounded-full text-sm ${filter === 'Design' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          Design
        </button>
        <button
          onClick={() => setFilter('History')}
          className={`px-4 py-1 rounded-full text-sm ${filter === 'History' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          History
        </button>
        <button
          onClick={() => setFilter('Tech')}
          className={`px-4 py-1 rounded-full text-sm ${filter === 'Tech' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          Tech
        </button>
      </div>
      
      <div className="space-y-4">
        {filteredBooks.map((book) => (
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
  );
}
