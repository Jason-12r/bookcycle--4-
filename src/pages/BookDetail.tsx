import { useState } from 'react';
import { ChevronLeft, Heart, Share, MapPin, Truck, Star, CheckCircle2, X } from 'lucide-react';
import { BookItem, User } from '../data/mockData';

interface BookDetailProps {
  id: string;
  onBack: () => void;
  onChat: (sellerId: string) => void;
  onSellerClick: (sellerId: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onEvaluate: (sellerId: string, isGood: boolean) => void;
  isEvaluated: boolean;
  book: BookItem;
  seller: User;
}

export function BookDetail({ onBack, onChat, onSellerClick, isWishlisted, onToggleWishlist, onEvaluate, isEvaluated, book, seller }: BookDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="pb-20">
      <div className="relative">
        <button onClick={onBack} className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-full p-2 z-10">
          <ChevronLeft size={20} />
        </button>
        <img
          src={book.images[currentImageIndex] || book.cover}
          alt={book.title}
          className="w-full h-80 object-cover"
        />
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            className="bg-black bg-opacity-50 rounded-full p-2"
            onClick={onToggleWishlist}
          >
            <Heart size={20} className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-white'} />
          </button>
          <button className="bg-black bg-opacity-50 rounded-full p-2">
            <Share size={20} className="text-white" />
          </button>
        </div>
        {book.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {book.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h1 className="text-xl font-bold mb-1">{book.title}</h1>
        <p className="text-slate-400 mb-3">{book.author}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold">${book.price}</span>
          <span className="text-sm text-slate-400">{book.condition}</span>
        </div>
        
        <div className="flex items-center mb-4 text-sm text-slate-400">
          <MapPin size={16} className="mr-1" />
          <span>{book.location}</span>
          <span className="mx-2">•</span>
          <Truck size={16} className="mr-1" />
          <span>{book.shippingTime}</span>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-sm text-slate-300">{book.description}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <span key={tag} className="bg-slate-800 px-3 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-6 p-4 bg-slate-900 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <div className="flex items-center">
                  <h3 className="font-semibold" onClick={() => onSellerClick(seller.id)}>
                    {seller.name}
                  </h3>
                  {seller.verified && (
                    <span className="ml-1 text-blue-500 text-xs">✓</span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{seller.rank}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-sm font-medium">{seller.ratingCount}</span>
              </div>
              <p className="text-xs text-slate-400">{seller.trustScore}% Trust</p>
            </div>
          </div>
          <button
            onClick={() => onChat(seller.id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium mt-2"
          >
            Contact Seller
          </button>
        </div>
        
        {!isEvaluated && (
          <div className="mb-6 p-4 bg-slate-900 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Rate this Seller</h3>
            <div className="flex justify-around">
              <button
                onClick={() => onEvaluate(seller.id, true)}
                className="flex flex-col items-center"
              >
                <CheckCircle2 size={32} className="text-green-500 mb-1" />
                <span className="text-sm">Positive</span>
              </button>
              <button
                onClick={() => onEvaluate(seller.id, false)}
                className="flex flex-col items-center"
              >
                <X size={32} className="text-red-500 mb-1" />
                <span className="text-sm">Negative</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
