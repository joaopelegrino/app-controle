import React from 'react';
import { X } from 'lucide-react';

export const FlashcardModal = ({ 
  flashcardModalOpen, 
  setFlashcardModalOpen, 
  currentCards, 
  currentCardIndex, 
  setCurrentCardIndex, 
  isFlipped, 
  setIsFlipped 
}) => {
  if (!flashcardModalOpen || currentCards.length === 0) return null;
  
  const card = currentCards[currentCardIndex];
  
  const flipCard = () => setIsFlipped(!isFlipped);
  const nextCard = () => {
    setCurrentCardIndex((currentCardIndex + 1) % currentCards.length);
    setIsFlipped(false);
  };
  const previousCard = () => {
    setCurrentCardIndex((currentCardIndex - 1 + currentCards.length) % currentCards.length);
    setIsFlipped(false);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setFlashcardModalOpen(false)}
            className="text-white hover:text-red-400 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        
        <div 
          className="relative h-96 cursor-pointer preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
          onClick={flipCard}
        >
          <div className={`absolute inset-0 transition-transform duration-700 ${
            isFlipped ? 'rotate-y-180' : ''
          }`} style={{ transformStyle: 'preserve-3d' }}>
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-2xl flex items-center justify-center p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                {card.question}
              </h2>
            </div>
            
            {/* Back */}
            <div className="absolute inset-0 rotate-y-180 backface-hidden bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-2xl p-8 overflow-auto"
                 style={{ transform: 'rotateY(180deg)' }}>
              <h3 className="text-xl font-bold text-orange-400 mb-4">{card.answer}</h3>
              
              {card.code && (
                <pre className="bg-black bg-opacity-50 p-4 rounded-lg mb-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">{card.code}</code>
                </pre>
              )}
              
              {card.details && (
                <div className="bg-orange-900 bg-opacity-30 border-l-4 border-orange-500 p-4 rounded">
                  <p className="text-orange-100 whitespace-pre-line">{card.details}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={previousCard}
            className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all"
          >
            ← Anterior
          </button>
          <button
            onClick={flipCard}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all"
          >
            🔄 Virar
          </button>
          <button
            onClick={nextCard}
            className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all"
          >
            Próximo →
          </button>
        </div>
        
        <div className="text-center mt-4 text-white">
          Cartão {currentCardIndex + 1} de {currentCards.length}
        </div>
      </div>
    </div>
  );
};