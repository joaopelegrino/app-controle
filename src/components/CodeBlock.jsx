import React from 'react';
import { EyeOff, Eye, Copy, CheckCircle } from 'lucide-react';

export const CodeBlock = ({ code, language = 'c', id, title, showCode, toggleCodeVisibility, copyToClipboard, copiedCode }) => (
  <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
    <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
      <span className="text-gray-300 text-sm font-medium">{title}</span>
      <div className="flex gap-2">
        <button
          onClick={() => toggleCodeVisibility(id)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {showCode[id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {copiedCode === id ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
    {(showCode[id] !== false) && (
      <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    )}
  </div>
);