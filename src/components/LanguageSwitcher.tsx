'use client';

import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Check if a language translation cookie already exists
    const match = document.cookie.match(new RegExp('(^| )googtrans=([^;]+)'));
    if (match) {
      const lang = match[2].split('/').pop();
      setCurrentLang(lang || 'en');
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    // Google translate cookie format: /auto/langCode
    document.cookie = `googtrans=/auto/${langCode}; path=/;`;
    setCurrentLang(langCode);
    // Reloading forces Google Translate to parse the page immediately
    window.location.reload();
  };

  return (
    <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-inner border border-slate-200 dark:border-slate-700">
      <button 
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${currentLang === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
      >
        English
      </button>
      <button 
        onClick={() => changeLanguage('hi')}
        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${currentLang === 'hi' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
      >
        हिन्दी
      </button>
      <button 
        onClick={() => changeLanguage('ur')}
        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${currentLang === 'ur' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
      >
        اردو
      </button>
    </div>
  );
}