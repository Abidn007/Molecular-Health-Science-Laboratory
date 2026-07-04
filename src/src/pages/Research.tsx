import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, FileText, Link as LinkIcon, BookOpen, Award, FileDown, Eye, EyeOff, FlaskConical, ArrowRight } from 'lucide-react';
import { PUBLICATIONS } from '../data';

// Professional biological/scientific name formatter to automatically italicize species, strains, and selective media
const formatScientificText = (text: string) => {
  const terms = [
    'Zea mays',
    'Staphylococcus epidermidis',
    'Staphylococcus aureus',
    'Pseudomonas aeruginosa',
    'Klebsiella',
    'Salmonella',
    'Shigella',
    'Staphylococcus',
    'Escherichia coli',
    'E. coli',
    'Mannitol Salt Agar',
    'Eosin Methyl Blue Agar'
  ];
  
  const sortedTerms = [...terms].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${sortedTerms.map(t => t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'gi');
  
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        const isTerm = terms.some(term => term.toLowerCase() === part.toLowerCase());
        if (isTerm) {
          const isMedia = part.toLowerCase().includes('agar');
          return (
            <span key={i} className={isMedia ? "font-semibold text-teal-deep" : "italic font-serif font-semibold text-teal-deep"}>
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
};

// Custom interactive highlights for each publication/poster
const getHighlights = (id: string) => {
  switch (id) {
    case 'pub-4':
      return [
        { label: 'Sample Source', value: 'Maize Plants (Zea mays), Bangladesh' },
        { label: 'Isolates Characterized', value: '13 Rhizospheric & Endophytic strains' },
        { label: 'Screening Target', value: 'Nitrogen & Phosphate mobilization, Deficit/ROS scavenging' },
        { label: 'Key Outcome', value: 'Significant rise in germination, vigor index, and root/shoot weight' }
      ];
    case 'pub-3':
      return [
        { label: 'Sample Source', value: 'Rhizosphere of Savar vegetable plants (Tannery irrigated)' },
        { label: 'Isolates Characterized', value: '9 Heavy metal-resistant PGPR strains (Iso-6, Iso-8)' },
        { label: 'Screening Target', value: 'Cd, Mn, Pb removal, Nitrogen-fixation, Siderophores' },
        { label: 'Key Outcome', value: 'Excellent metal removal & increased rice growth under salinity stress' }
      ];
    case 'pub-2':
      return [
        { label: 'Sample Source', value: 'Eyeglasses from daily active wearers' },
        { label: 'Pathogens Isolated', value: 'Staphylococcus aureus, S. epidermidis, Pseudomonas aeruginosa' },
        { label: 'Efficacy Finding', value: 'Alcohol-based wipes show the highest prevention rates' },
        { label: 'Drug Susceptibility', value: 'Susceptible to Vancomycin/Kanamycin; Azithromycin resistant' }
      ];
    case 'pub-1':
      return [
        { label: 'Sample Source', value: 'Raw Poultry Chicken Meat (Broiler, Sonali, Layer)' },
        { label: 'Pathogens Isolated', value: 'Salmonella, E. coli, Klebsiella, Shigella, Staphylococcus' },
        { label: 'Drug Resistance', value: 'High rate of multidrug resistance (MDR) observed' },
        { label: 'Effective Agents', value: 'Imipenem, Ciprofloxacin, and Rifampicin remain effective' }
      ];
    default:
      return [];
  }
};

export default function Research({ setActivePage }: { setActivePage?: (page: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPoster, setExpandedPoster] = useState<string | null>(null);
  const [visiblePdfId, setVisiblePdfId] = useState<string | null>(null);

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
      setVisiblePdfId(null);
    } else {
      setExpandedPoster(id);
      setVisiblePdfId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="research-page">
      {/* Page Header */}
      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-teal font-bold">Laboratory Research Portfolio</span>
        <h1 className="text-3xl sm:text-5xl font-bold text-teal-deep font-serif">Research &amp; Publications</h1>
        <p className="text-sm sm:text-base text-ink-soft max-w-3xl leading-relaxed">
          At MHSL, we combine classical bacteriology techniques with molecular markers. Here is our published articles status and conference publications record.
        </p>
      </div>

      {/* Themes Redirect Callout Banner */}
      {setActivePage && (
        <div className="bg-gradient-to-r from-teal-pale to-paper border border-teal/20 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-teal-deep text-sm sm:text-base flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-teal" />
              Looking for our Core Experimental Pillars?
            </h3>
            <p className="text-xs text-ink-soft leading-relaxed max-w-2xl">
              We have structured the laboratory's active pipelines into 5 main clinical/agricultural themes and 3 newly introduced frontiers. Explore detailed lab tests, protocols, and workflows.
            </p>
          </div>
          <button
            onClick={() => setActivePage('themes')}
            className="shrink-0 bg-teal hover:bg-teal-deep text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md transition-all cursor-pointer flex items-center gap-1.5 hover:-translate-y-0.5"
          >
            Explore Research Themes
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div id="publications-panel" className="space-y-10">
        
        {/* Published Articles Section */}
        <div className="space-y-6" id="published-articles-section">
          <div className="border-b border-line pb-2 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-teal-deep flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal" />
                Published Articles
              </h2>
              <p className="text-xs text-ink-faint mt-1">Peer-reviewed manuscripts and international journal publications</p>
            </div>
            <span className="bg-teal-pale text-teal-deep text-[10px] font-mono font-bold px-2.5 py-1 rounded">
              Status: Forthcoming
            </span>
          </div>

          {/* Forthcoming Note & Status */}
          <div className="bg-bg-alt border border-line p-5 rounded-2xl flex items-start gap-3.5 max-w-4xl">
            <FileText className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm space-y-2">
              <h3 className="font-bold text-teal-deep">Journal Publications Status</h3>
              <p className="text-ink-soft leading-relaxed">
                Full-text journal manuscripts detailing MHSL's findings are currently in various stages of preparation and peer-review. This repository will be instantly updated with DOI and PubMed links upon acceptance.
              </p>
            </div>
          </div>
        </div>

        {/* Conference Posters Section */}
        <div className="space-y-6 pt-4" id="conference-posters-section">
          <div className="border-b border-line pb-2">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-teal-deep flex items-center gap-2">
              <Award className="w-5 h-5 text-teal" />
              Conference Posters
            </h2>
            <p className="text-xs text-ink-faint mt-1">Research poster presentations delivered at international and regional scientific conferences</p>
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
              className="w-full pl-10 pr-4 py-2.5 border border-line rounded-xl bg-bg text-sm focus:outline-none focus:border-teal font-sans"
            />
          </div>

          {/* Posters Accordion list */}
          <div className="space-y-4" id="publications-accordion-list">
            {filteredPubs.length === 0 ? (
              <p className="text-xs text-ink-faint italic py-8">No poster items found matching your filter criteria.</p>
            ) : (
              filteredPubs.map((pub, idx) => {
                const isExpanded = expandedPoster === pub.id;
                const isPdfVisible = visiblePdfId === pub.id;
                
                return (
                  <div
                    key={pub.id}
                    className={`border rounded-2xl overflow-hidden bg-paper transition-all ${
                      isExpanded ? 'border-teal ring-1 ring-teal shadow-xs' : 'border-line hover:border-teal/50'
                    }`}
                  >
                    <button
                      onClick={() => togglePoster(pub.id)}
                      className="w-full text-left p-6 flex justify-between items-start gap-4 hover:bg-bg/40 focus:outline-none cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] text-gold font-bold">Poster #{idx + 1}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-line" />
                          <span className="font-mono text-[10px] text-ink-faint font-semibold">{pub.date}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-teal-deep leading-snug hover:text-teal transition-colors">
                          {formatScientificText(pub.title)}
                        </h3>
                        <p className="text-[11px] font-mono text-ink-faint">{pub.conference}</p>
                      </div>
                      <span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-teal flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-teal flex-shrink-0" />
                        )}
                      </span>
                    </button>

                    {/* Accordion Body */}
                    {isExpanded && (
                      <div className="border-t border-line bg-gradient-to-br from-paper to-bg-alt/40 p-6 space-y-6 text-xs sm:text-sm text-ink-soft leading-relaxed animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          <div className={`${pub.pdfUrl && isPdfVisible ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-6`}>
                            
                            {/* Structured Abstract Block */}
                            <div className="flex flex-col md:flex-row gap-6">
                              <div className="flex-1 space-y-2">
                                <h4 className="font-mono text-[9px] font-bold text-teal uppercase tracking-widest flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                                  Scientific Abstract Details
                                </h4>
                                <div className="bg-gradient-to-br from-white to-teal-pale/15 border-l-4 border-teal p-6 rounded-r-2xl text-xs sm:text-sm text-ink-soft leading-relaxed shadow-sm hover:shadow-md transition-all">
                                  <p className="font-sans leading-relaxed text-ink-soft font-normal tracking-wide">
                                    {formatScientificText(pub.abstract)}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Insights Sidebar (Visible when PDF is NOT inline on desktop) */}
                              {!isPdfVisible && (
                                <div className="w-full md:w-80 shrink-0 bg-gradient-to-br from-white to-teal-pale/20 border border-teal/15 rounded-2xl p-5 space-y-4 shadow-sm animate-fade-in">
                                  <h5 className="font-mono text-[9px] font-extrabold text-teal-deep uppercase tracking-wider flex items-center gap-1.5 border-b border-teal/15 pb-2">
                                    <Award className="w-3.5 h-3.5 text-teal" />
                                    MHSL Study Insights
                                  </h5>
                                  <div className="space-y-3.5">
                                    {getHighlights(pub.id).map((hl, i) => (
                                      <div key={i} className="text-xs space-y-0.5">
                                        <span className="font-mono text-[9px] font-bold text-ink-faint block uppercase tracking-tight">{hl.label}</span>
                                        <span className="text-ink-soft font-sans font-medium leading-tight block">{formatScientificText(hl.value)}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Horizontal Highlights Row (Only when PDF is inline) */}
                            {isPdfVisible && (
                              <div className="bg-gradient-to-r from-white to-teal-pale/25 border border-teal/15 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-sm animate-fade-in">
                                {getHighlights(pub.id).map((hl, i) => (
                                  <div key={i} className="text-[11px] space-y-0.5">
                                    <span className="font-mono text-[9px] font-bold text-ink-faint block uppercase tracking-tight">{hl.label}</span>
                                    <span className="text-ink-soft font-sans font-medium leading-tight block">{formatScientificText(hl.value)}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Details & Metadata */}
                            <div className="space-y-2 pt-4 border-t border-line/50">
                              <h4 className="font-mono text-[9px] font-bold text-ink-faint uppercase tracking-wider">
                                Presentation Details
                              </h4>
                              <p className="text-xs">
                                <strong className="text-teal-deep">Presenter/Authors:</strong> {pub.authors}
                              </p>
                              <p className="text-xs">
                                <strong className="text-teal-deep">Conference:</strong> {pub.conference}
                              </p>
                              <p className="text-xs">
                                <strong className="text-teal-deep">Date:</strong> {pub.date}
                              </p>
                            </div>

                            {/* Actions Group (No GitHub link, direct focus on PDF view & download) */}
                            <div className="flex flex-wrap gap-3 pt-2">
                              {pub.pdfUrl && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setVisiblePdfId(isPdfVisible ? null : pub.id);
                                  }}
                                  className="px-4 py-2.5 border border-teal text-teal hover:bg-teal hover:text-white rounded-xl text-xs font-semibold font-mono flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
                                >
                                  {isPdfVisible ? (
                                    <>
                                      <EyeOff className="w-4 h-4" />
                                      Hide PDF Poster
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="w-4 h-4" />
                                      View PDF Poster Inline
                                    </>
                                  )}
                                </button>
                              )}
                            </div>

                            {pub.doi && (
                              <div className="pt-2 flex items-center gap-2">
                                <LinkIcon className="w-4 h-4 text-teal shrink-0" />
                                <span className="font-mono text-xs text-ink-soft">
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

                          {/* Embedded PDF Column */}
                          {pub.pdfUrl && isPdfVisible && (
                            <div className="lg:col-span-6 space-y-3 animate-fade-in">
                              <div className="bg-bg border border-line rounded-2xl overflow-hidden shadow-sm flex flex-col">
                                <div className="bg-paper px-4 py-3 border-b border-line flex items-center justify-between text-[11px] font-mono">
                                  <span className="font-bold text-teal flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5" />
                                    POSTER_PREVIEW.PDF
                                  </span>
                                  <a
                                    href={pub.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal hover:underline flex items-center gap-1"
                                  >
                                    <FileDown className="w-3.5 h-3.5" />
                                    Download PDF
                                  </a>
                                </div>
                                <div className="relative w-full h-[500px] sm:h-[600px] bg-bg-alt">
                                  <iframe
                                    src={`https://docs.google.com/gview?url=${encodeURIComponent(pub.pdfUrl)}&embedded=true`}
                                    className="absolute inset-0 w-full h-full border-0"
                                    title={`Embedded PDF Poster: ${pub.title}`}
                                  />
                                </div>
                              </div>
                              <div className="text-[10px] font-mono text-ink-faint text-center">
                                Can't load the preview? Click{' '}
                                <a
                                  href={pub.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-teal hover:underline font-bold"
                                >
                                  Download PDF
                                </a>{' '}
                                to view the full poster offline.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
