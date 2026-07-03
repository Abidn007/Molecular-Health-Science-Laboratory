import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, AlertCircle, FileText, Link as LinkIcon, BookOpen, Clock } from 'lucide-react';
import { RESEARCH_THEMES, PUBLICATIONS } from '../data';

export default function Research() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'publications'>('ongoing');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPoster, setExpandedPoster] = useState<string | null>(null);

  // Filter publications based on search
  const filteredPubs = PUBLICATIONS.filter(
    (pub) =>
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.conference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePoster = (id: string) => {
    if (expandedPoster === id) {
      setExpandedPoster(null);
    } else {
      setExpandedPoster(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="research-page">
      {/* Page Header */}
      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-teal font-bold">Laboratory Research Portfolio</span>
        <h1 className="text-3xl sm:text-5xl font-bold text-teal-deep font-serif">Research &amp; Publications</h1>
        <p className="text-sm sm:text-base text-ink-soft max-w-3xl leading-relaxed">
          At MHSL, we work across multiple themes under a unified One Health research framework, combining classical bacteriology techniques with molecular markers. Here is our ongoing focus and conference publications record.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-line" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'ongoing'}
          aria-controls="ongoing-panel"
          id="tab-ongoing"
          onClick={() => setActiveTab('ongoing')}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'ongoing'
              ? 'border-teal text-teal-deep'
              : 'border-transparent text-ink-faint hover:text-ink-soft'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Ongoing Themes
          </div>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'publications'}
          aria-controls="publications-panel"
          id="tab-publications"
          onClick={() => setActiveTab('publications')}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'publications'
              ? 'border-teal text-teal-deep'
              : 'border-transparent text-ink-faint hover:text-ink-soft'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Conference Publications &amp; Posters ({PUBLICATIONS.length})
          </div>
        </button>
      </div>

      {/* Ongoing Panel */}
      {activeTab === 'ongoing' && (
        <div id="ongoing-panel" role="tabpanel" aria-labelledby="tab-ongoing" className="space-y-8 animate-fade-in">
          <div className="bg-teal-pale/50 text-teal-deep border border-teal/15 p-4 rounded-xl flex items-start gap-3 text-xs leading-relaxed max-w-3xl">
            <AlertCircle className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
            <p>
              Our research team drives scientific innovation across <strong>five fundamental pillars of microbiology</strong>. We integrate clinical diagnostics, agricultural symbiosis, antimicrobial resistance surveillance, natural drug discovery, and applied molecular diagnostics under a unified <strong>One Health</strong> framework.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {RESEARCH_THEMES.map((theme) => (
              <div
                key={theme.id}
                className="bg-paper border border-line rounded-2xl overflow-hidden hover:border-teal transition-all shadow-xs flex flex-col"
              >
                {theme.imageUrl && (
                  <div className="h-56 w-full relative overflow-hidden bg-bg-alt border-b border-line">
                    <img
                      src={theme.imageUrl}
                      alt={theme.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-teal-deep/95 text-white font-mono text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-sm tracking-wider">
                      {theme.number}
                    </div>
                    <div className="absolute top-4 right-4 text-[10px] uppercase font-bold text-teal bg-teal-pale/90 border border-teal/25 px-2.5 py-1 rounded font-mono shadow-sm">
                      {theme.status}
                    </div>
                  </div>
                )}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {!theme.imageUrl && (
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-gold bg-gold-pale/35 px-2.5 py-1 rounded-full uppercase">
                          {theme.number}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-teal bg-teal-pale px-2 py-0.5 rounded font-mono">
                          {theme.status}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-teal-deep font-serif leading-snug">{theme.title}</h3>
                    <p className="text-xs text-ink-soft font-semibold leading-relaxed">{theme.shortDesc}</p>
                    <p className="text-xs text-ink-faint leading-relaxed pt-2 border-t border-line/50">{theme.longDesc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publications Panel */}
      {activeTab === 'publications' && (
        <div id="publications-panel" role="tabpanel" aria-labelledby="tab-publications" className="space-y-6 animate-fade-in">
          {/* Forthcoming Note */}
          <div className="bg-bg-alt border border-line p-5 rounded-xl flex items-start gap-3.5 max-w-3xl">
            <FileText className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h4 className="font-bold text-teal-deep">Journal Publications Status</h4>
              <p className="text-ink-soft leading-relaxed">
                Full-text journal manuscripts detailing MHSL's findings are currently in various stages of preparation and peer-review. This repository will be instantly updated with DOI and PubMed links upon acceptance.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-lg">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search posters by title, abstract keywords, or conference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-line rounded-xl bg-bg text-sm focus:outline-none focus:border-teal"
            />
          </div>

          {/* Posters Accordion list */}
          <div className="space-y-4" id="publications-accordion-list">
            {filteredPubs.length === 0 ? (
              <p className="text-xs text-ink-faint italic py-8">No publication items found matching your filter criteria.</p>
            ) : (
              filteredPubs.map((pub, idx) => (
                <div
                  key={pub.id}
                  className={`border rounded-2xl overflow-hidden bg-paper transition-all ${
                    expandedPoster === pub.id ? 'border-teal ring-1 ring-teal' : 'border-line hover:border-teal/50'
                  }`}
                >
                  <button
                    onClick={() => togglePoster(pub.id)}
                    className="w-full text-left p-6 flex justify-between items-start gap-4 hover:bg-bg/40 focus:outline-none cursor-pointer"
                    aria-expanded={expandedPoster === pub.id}
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] text-gold font-bold">Poster #{idx + 1}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-line" />
                        <span className="font-mono text-[10px] text-ink-faint font-semibold">{pub.date}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-teal-deep leading-snug">
                        {pub.title}
                      </h3>
                      <p className="text-[11px] font-mono text-ink-faint">{pub.conference}</p>
                    </div>
                    <span>
                      {expandedPoster === pub.id ? (
                        <ChevronUp className="w-5 h-5 text-teal flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-teal flex-shrink-0" />
                      )}
                    </span>
                  </button>

                  {/* Accordion Body */}
                  {expandedPoster === pub.id && (
                    <div className="border-t border-line/60 bg-bg/25 p-6 space-y-4 text-xs sm:text-sm text-ink-soft leading-relaxed animate-fade-in">
                      <div>
                        <h4 className="font-mono text-[9px] font-bold text-ink-faint uppercase tracking-wider mb-1">
                          Research Abstract
                        </h4>
                        <p>{pub.abstract}</p>
                      </div>

                      {pub.doi && (
                        <div className="pt-3 border-t border-line/50 flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-teal" />
                          <span className="font-mono text-xs">
                            DOI:{' '}
                            <a
                              href={`https://doi.org/${pub.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal underline font-bold hover:text-teal-deep"
                            >
                              {pub.doi}
                            </a>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
