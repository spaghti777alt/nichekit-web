/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import { Search, Globe } from 'lucide-react';

// Language definitions and translations
const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'ja', name: '日本語', dir: 'ltr' },
  { code: 'zh', name: '中文', dir: 'ltr' },
  { code: 'ko', name: '한국어', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', dir: 'ltr' },
  { code: 'ur', name: 'اردو', dir: 'rtl' },
];

const t: Record<string, any> = {
  en: { title: "NicheKit", search: "Search AI tools...", free: "Free", paid: "Paid", freemium: "Freemium", beginner: "Beginner", pro: "Pro", all: "All Levels" },
  ar: { title: "نيشك كيت", search: "ابحث عن أدوات الذكاء الاصطناعي...", free: "مجاني", paid: "مدفوع", freemium: "مجاني جزئياً", beginner: "مبتدئ", pro: "محترف", all: "جميع المستويات" },
  // Add other translations as needed...
};

const tools = [
  { id: 1, name: "EditFlow", category: "Video", rating: 4.8, price: "Free", skill: "Beginner", keywords: "video editing, fast", desc: "Fast AI video editor." },
  { id: 2, name: "ClipMagic", category: "Social", rating: 4.5, price: "Freemium", skill: "Pro", keywords: "shorts, tiktok", desc: "Short video automation." },
];

export default function App() {
  const [lang, setLang] = useState(languages[0]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.dir;
  }, [lang]);

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.keywords.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTranslation = (key: string) => t[lang.code]?.[key] || t['en'][key];

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-900">
      <header className="flex items-center justify-between pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold">{getTranslation('title')}</h1>
        <div className="relative">
          <select 
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lang.code}
            onChange={(e) => setLang(languages.find(l => l.code === e.target.value) || languages[0])}
          >
            {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <Globe className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </header>

      <div className="py-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input 
            type="text"
            placeholder={getTranslation('search')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <div key={tool.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-gray-600 mb-4">{tool.desc}</p>
            <div className="flex items-center justify-between mb-4 font-mono">
              <span className="text-yellow-500">★ {tool.rating}/5</span>
              <span className={`px-2 py-1 rounded text-xs ${tool.price === 'Free' ? 'bg-green-100' : tool.price === 'Freemium' ? 'bg-blue-100' : 'bg-red-100'}`}>
                {getTranslation(tool.price.toLowerCase())}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {getTranslation(tool.skill.toLowerCase())}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
