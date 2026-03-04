import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { BookItem, User } from '../data/mockData';

interface PostProps {
  onBack: () => void;
  user: User;
  onPostBook: (book: BookItem) => void;
}

export function Post({ onBack, user, onPostBook }: PostProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    cover: 'https://via.placeholder.com/400x600',
    price: 0,
    condition: 'Like New',
    description: '',
    category: 'Literature',
    tags: '',
    location: user.location || '',
    shippingTime: 'Ships within 24h',
    images: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: BookItem = {
      id: `b${Date.now()}`,
      ...formData,
      sellerId: user.id,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };
    onPostBook(newBook);
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Post a Book</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Book title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-slate-800 rounded-lg py-2 px-4 text-white"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full bg-slate-800 rounded-lg py-2 px-4 text-white"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="w-full bg-slate-800 rounded-lg py-2 px-4 text-white"
            required
          />
        </div>
        
        <div className="relative">
          <select
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            className="w-full bg-slate-800 rounded-lg py-2 px-4 text-white"
            required
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="95% New">95% New</option>
            <option value="90% New">90% New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        
        <div className="relative">
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-800 rounded-lg py-2 px-4 text-white"
            required
          >
            <option value="Literature">Literature</option>
            <option value="Design">Design</option>
            <option value="History">History</option>
            <option value="Tech">Tech</option>
            <option value="Science">Science</option>
            <option value="Art">Art</option>
          </select>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full bg-slate-800 rounded-lg py-2 px-4 text-white"
          />
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full bg-slate-800 rounded-lg py-2 px-4 text-white"
            required
          />
        </div>
        
        <div className="relative">
          <select
            value={formData.shippingTime}
            onChange={(e) => setFormData({ ...formData, shippingTime: e.target.value })}
            className="w-full bg-slate-800 rounded-lg py-2 px-4 text-white"
            required
          >
            <option value="Ships within 24h">Ships within 24h</option>
            <option value="Ships within 48h">Ships within 48h</option>
            <option value="Ships within 3 days">Ships within 3 days</option>
          </select>
        </div>
        
        <div className="relative">
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-800 rounded-lg py-2 px-4 text-white h-32"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
        >
          Post Book
        </button>
      </form>
    </div>
  );
}
