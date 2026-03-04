import { X } from 'lucide-react';

interface UsageInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UsageInstructionsModal({ isOpen, onClose }: UsageInstructionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-slate-900 rounded-lg p-6 max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Welcome to BookCycle</h2>
          <button onClick={onClose} className="p-2">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4 text-left">
          <p>BookCycle is a platform for buying and selling used books. Here's how to get started:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Browse books on the Home and Market pages</li>
            <li>Tap on a book to view details</li>
            <li>Add books to your wishlist</li>
            <li>Chat with sellers to negotiate</li>
            <li>Post your own books for sale</li>
            <li>Evaluate sellers after transactions</li>
          </ul>
          <p className="text-slate-400 text-sm">Swipe left/right to navigate between tabs.</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
