import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function LoginView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL para redirecionar após login (ou / se não houver)
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação básica
    if (!email.trim()) {
      setError('Digite seu email');
      return;
    }

    if (!password) {
      setError('Digite sua senha');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">UltraThink</h1>
          <p className="text-gray-400">Plataforma de Treinamento Corporativo</p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Acesse sua conta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Link de Recuperação (placeholder) */}
          <div className="mt-6 text-center">
            <span className="text-gray-500 text-sm">
              Esqueceu a senha?{' '}
              <span className="text-gray-400 cursor-not-allowed">
                Entre em contato com o administrador
              </span>
            </span>
          </div>
        </div>

        {/* Credenciais de Demo */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-xs text-center mb-3">
            Credenciais de demonstração (senha: Demo@2026)
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => { setEmail('ceo@acmetech.com'); setPassword('Demo@2026'); }}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
            >
              C-Level
            </button>
            <button
              type="button"
              onClick={() => { setEmail('admin@acmetech.com'); setPassword('Demo@2026'); }}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => { setEmail('prof@acmetech.com'); setPassword('Demo@2026'); }}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
            >
              Instrutor
            </button>
            <button
              type="button"
              onClick={() => { setEmail('maria@acmetech.com'); setPassword('Demo@2026'); }}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
            >
              Aluno
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-600 text-xs">
          UltraThink © 2026 - Treinamento Corporativo
        </p>
      </div>
    </div>
  );
}

export default LoginView;
