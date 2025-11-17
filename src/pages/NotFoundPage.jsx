import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 p-6 rounded-full">
            <AlertTriangle className="w-16 h-16 text-amber-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Página Não Encontrada
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-lg">
          Desculpe, a página que você está procurando não existe ou foi movida.
          <br />
          Verifique o URL ou retorne ao Hub de Aprendizado.
        </p>

        {/* Action Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium text-lg"
        >
          <Home className="w-5 h-5" />
          Voltar ao Hub
        </button>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Se você acredita que isso é um erro, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
