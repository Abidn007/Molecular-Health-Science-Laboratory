import { useState } from 'react';
import { Search, Calendar, Tag, ArrowRight, BookOpen } from 'lucide-react';
import { NEWS_ITEMS } from '../data';

export default function News() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Research', 'Announcement', 'Event', 'Publication'];

  const filteredNews = NEWS_ITEMS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="news-feed-page">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-teal font-bold font-semibold">Laboratory Announcements</span>
        <h1 className="text-3xl sm:text-5xl font-bold text-teal-deep font-serif">MHSL News Feed</h1>
        <p className="text-sm sm:text-base text-ink-soft max-w-2xl leading-relaxed">
          Stay updated on our latest publications, project student intakes, research progress, and clinical diagnostics surveillance activities.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
        
        {/* Category buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                selectedCategory === cat
                  ? 'bg-teal text-white border-teal shadow-xs'
                  : 'bg-bg text-ink-soft border-line hover:bg-bg-alt hover:text-teal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-line rounded-xl bg-bg text-xs focus:outline-none focus:border-teal"
          />
        </div>

      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredNews.length === 0 ? (
          <p className="text-xs text-ink-faint italic py-8">No laboratory announcements found matching filters.</p>
        ) : (
          filteredNews.map((news) => (
            <article
              key={news.id}
              className="bg-paper border border-line rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between hover:border-teal transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] uppercase font-bold text-teal bg-teal-pale px-2.5 py-1 rounded-full">
                    {news.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-ink-faint font-mono">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    {new Date(news.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-teal-deep font-serif leading-tight">
                  {news.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  {news.content}
                </p>
              </div>

              <div className="pt-4 border-t border-line/40 flex items-center justify-between text-xs font-mono">
                <span className="text-ink-faint flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-gold shrink-0" />
                  MHSL RU GEB
                </span>
                <span className="text-teal font-bold flex items-center gap-0.5">
                  Published Board
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Mini Academic Section */}
      <div className="bg-teal-deep text-white p-8 sm:p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-serif font-bold text-gold-pale flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gold" />
            Sign Up For Weekly Bench Reports
          </h3>
          <p className="text-xs text-white/80 leading-relaxed">
            Stay plugged into our bacterial isolation schedules, antibiogram surveys, and student defense seminars at the Department of Genetic Engineering &amp; Biotechnology.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto self-stretch sm:self-auto">
          <input
            type="email"
            placeholder="yourname@email.com"
            className="p-2.5 rounded-xl text-xs bg-white text-ink border-0 placeholder-ink-faint grow focus:outline-none"
          />
          <button
            onClick={() => alert('Thank you for subscribing to MHSL newsletters.')}
            className="bg-gold hover:bg-amber-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
          >
            Join List
          </button>
        </div>
      </div>

    </div>
  );
}
