import { useState, useEffect } from 'react';
import { 
  Activity, Leaf, ShieldAlert, Sparkles, Dna, 
  Globe, FlaskConical, Zap, ArrowLeft, ArrowRight,
  BookOpen, Layers, CheckCircle2, ClipboardList, Eye, 
  FileSpreadsheet, Wrench
} from 'lucide-react';
import { THEMES_DETAIL_DATA, ResearchThemeDetail } from './Themes';

interface ThemeDetailProps {
  setActivePage: (page: string) => void;
  selectedThemeId: string;
  setSelectedThemeId: (id: string) => void;
}

export default function ThemeDetail({ setActivePage, selectedThemeId, setSelectedThemeId }: ThemeDetailProps) {
  const [viewingProtocol, setViewingProtocol] = useState<boolean>(true);

  // Simulation States for interactive Virtual Lab Assay Simulator
  const [simStep, setSimStep] = useState<number>(1);
  const [simStatus, setSimStatus] = useState<string>('idle');
  const [simData, setSimData] = useState<any>({});

  // Find current theme details
  const activeThemeIndex = THEMES_DETAIL_DATA.findIndex(t => t.id === selectedThemeId);
  const activeTheme = THEMES_DETAIL_DATA[activeThemeIndex] || THEMES_DETAIL_DATA[0];

  // Reset simulator when theme changes
  useEffect(() => {
    setSimStep(1);
    setSimStatus('idle');
    setSimData({});
  }, [selectedThemeId]);

  const handleNextTheme = () => {
    const nextIndex = (activeThemeIndex + 1) % THEMES_DETAIL_DATA.length;
    setSelectedThemeId(THEMES_DETAIL_DATA[nextIndex].id);
    localStorage.setItem('selectedThemeId', THEMES_DETAIL_DATA[nextIndex].id);
  };

  const handlePrevTheme = () => {
    const prevIndex = (activeThemeIndex - 1 + THEMES_DETAIL_DATA.length) % THEMES_DETAIL_DATA.length;
    setSelectedThemeId(THEMES_DETAIL_DATA[prevIndex].id);
    localStorage.setItem('selectedThemeId', THEMES_DETAIL_DATA[prevIndex].id);
  };

  const handleSimulatorAction = () => {
    if (simStep === 3 && simStatus === 'completed') {
      setSimStep(1);
      setSimStatus('idle');
      setSimData({});
      return;
    }

    setSimStatus('running');
    setTimeout(() => {
      setSimStatus('completed');
      if (simStep < 3) {
        setSimStep(prev => prev + 1);
        setSimStatus('idle');
      }
    }, 1100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="theme-detail-single-page">
      
      {/* Dynamic Subpage Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-line pb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <button
            onClick={() => setActivePage('themes')}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal hover:text-teal-deep transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            RESEARCH THEMES
          </button>
          <span className="text-line hidden sm:inline">|</span>
          <button
            onClick={() => setActivePage('home')}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-ink-soft hover:text-teal transition-colors cursor-pointer"
          >
            HOME
          </button>
        </div>

        {/* Dynamic Next/Prev theme sliders */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button 
            onClick={handlePrevTheme}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-bg border border-line rounded-lg text-xs font-mono font-bold text-ink-soft hover:bg-bg-alt hover:text-teal transition-all cursor-pointer"
          >
            &larr; PREV
          </button>
          <span className="text-xs font-mono font-bold text-gold px-2">
            {activeTheme.number} of {THEMES_DETAIL_DATA.length}
          </span>
          <button 
            onClick={handleNextTheme}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-bg border border-line rounded-lg text-xs font-mono font-bold text-ink-soft hover:bg-bg-alt hover:text-teal transition-all cursor-pointer"
          >
            NEXT &rarr;
          </button>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="space-y-6">
        
        {/* Banner Section */}
        <div className="bg-teal-deep text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
          {/* Absolutes decorative shapes */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gold/10 pointer-events-none" />
          
          <div className="space-y-3 relative z-10 max-w-2xl">
            <span className="font-mono text-[10px] font-extrabold text-gold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-md">
              {activeTheme.number} &middot; {activeTheme.status}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gold-pale leading-tight">
              {activeTheme.title}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans font-normal">
              {activeTheme.longDesc}
            </p>
          </div>
        </div>

        {/* Workspace Dual-tab Interface selector */}
        <div className="flex border-b border-line bg-paper/40 rounded-t-2xl p-1.5 gap-2 max-w-md">
          <button
            onClick={() => setViewingProtocol(true)}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              viewingProtocol 
                ? 'bg-teal text-white shadow-sm' 
                : 'text-ink-soft hover:bg-bg-alt hover:text-teal'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            EXPERIMENTAL PROTOCOL
          </button>
          <button
            onClick={() => setViewingProtocol(false)}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              !viewingProtocol 
                ? 'bg-teal text-white shadow-sm' 
                : 'text-ink-soft hover:bg-bg-alt hover:text-teal'
            }`}
          >
            <Wrench className="w-4 h-4" />
            ASSAY SIMULATOR
          </button>
        </div>

        {/* Selected Workspace Component Card */}
        <div className="bg-paper border border-line rounded-2xl overflow-hidden shadow-xs">
          {viewingProtocol ? (
            <div className="p-6 sm:p-8 space-y-6 animate-fade-in" id="theme-detail-protocol">
              
              <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-2">
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-teal font-extrabold">Lab Manual Standard Protocol</span>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-teal-deep">
                    {activeTheme.test.name}
                  </h4>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-ink-faint font-bold bg-bg-alt px-2.5 py-1 rounded-md border border-line">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  BSL-2 SAFE
                </div>
              </div>

              {/* Target Samples */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-line/50 pb-4">
                <div className="md:col-span-3 font-mono text-[10px] uppercase font-bold text-ink-faint">
                  Target Bio-Samples:
                </div>
                <div className="md:col-span-9 text-xs sm:text-sm font-medium text-ink leading-relaxed">
                  {activeTheme.test.targetSamples}
                </div>
              </div>

              {/* Materials List */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-line/50 pb-4">
                <div className="md:col-span-3 font-mono text-[10px] uppercase font-bold text-ink-faint">
                  Necessary Things:
                </div>
                <div className="md:col-span-9">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeTheme.test.materialsNeeded.map((mat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                        <span className="text-ink-soft leading-tight">{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Methodology */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-line/50 pb-4">
                <div className="md:col-span-3 font-mono text-[10px] uppercase font-bold text-ink-faint">
                  Methodology:
                </div>
                <div className="md:col-span-9 leading-relaxed font-sans text-ink-soft text-xs sm:text-sm">
                  {activeTheme.test.methodology}
                </div>
              </div>

              {/* Significance */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-1">
                <div className="md:col-span-3 font-mono text-[10px] uppercase font-bold text-ink-faint">
                  Academic Impact:
                </div>
                <div className="md:col-span-9 bg-teal-pale/35 border-l-4 border-teal p-4 rounded-r-xl text-teal-deep font-sans italic text-xs leading-relaxed">
                  {activeTheme.test.significance}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-ink-soft bg-paper animate-fade-in" id="theme-detail-simulator">
              
              {/* Step Indicator */}
              <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-2">
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-teal font-extrabold">Assay Simulation Chamber</span>
                  <h4 className="text-base font-bold font-serif text-teal-deep">
                    {selectedThemeId === 'theme-1' && 'Clinical Identification & Biochemical Profiling'}
                    {selectedThemeId === 'theme-2' && 'Rhizospheric PGPR Soil Utility Screening'}
                    {selectedThemeId === 'theme-3' && 'One Health Kirby-Bauer Caliper Antibiogram'}
                    {selectedThemeId === 'theme-4' && '96-Well Microplate Biofilm Inhibition Assay'}
                    {selectedThemeId === 'theme-5' && 'PCR Amplification & Agarose Gel Electrophoresis'}
                    {selectedThemeId === 'theme-6' && 'Flame Atomic Absorption Spectroscopy (AAS) Bioremediation'}
                    {selectedThemeId === 'theme-7' && 'LAB Probiotic Acid Transit & Biocontrol Assay'}
                    {selectedThemeId === 'theme-8' && 'Phyto-Mediated Silver Nanoparticle (AgNP) Synthesis'}
                  </h4>
                </div>
                <div className="bg-teal-pale text-teal-deep text-[11px] font-mono px-3 py-1 rounded-md font-bold shrink-0">
                  STEP {simStep} OF 3
                </div>
              </div>

              {/* Main Interactive Stage */}
              <div className="bg-bg-alt border border-line rounded-xl p-6 min-h-[280px] flex flex-col justify-between relative overflow-hidden shadow-inner">
                
                {/* Visual representations */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-4">
                  
                  {/* Theme 1: Clinical */}
                  {selectedThemeId === 'theme-1' && (
                    <div className="w-full max-w-md flex flex-col items-center space-y-4 text-center">
                      {simStep === 1 && (
                        <div className="space-y-3">
                          <svg width="180" height="70" className="mx-auto">
                            <rect x="10" y="25" width="160" height="20" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
                            <circle cx="90" cy="35" r="8" fill="#F43F5E" fillOpacity="0.4" className="animate-pulse" />
                            <path d="M 90 5 L 90 20" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="90" cy="5" r="2" fill="#F43F5E" />
                          </svg>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Crystal Violet &amp; Iodine fixed on glass slide</span>
                        </div>
                      )}
                      {simStep === 2 && (
                        <div className="flex items-center gap-6 flex-wrap justify-center">
                          <div className="p-3 bg-white border border-line rounded-xl flex flex-col items-center space-y-1 shadow-xs">
                            <span className="font-mono text-[9px] font-bold text-rose-500 uppercase">Gram-Positive</span>
                            <div className="w-14 h-14 rounded-full border-2 border-dashed border-rose-200 bg-rose-50 flex flex-wrap items-center justify-center p-1 overflow-hidden">
                              <span className="text-[14px] text-indigo-700 font-bold leading-none select-none">●●●<br />●●●</span>
                            </div>
                            <span className="text-[10px] font-semibold text-ink-soft">S. aureus (Purple cocci)</span>
                          </div>
                          <div className="p-3 bg-white border border-line rounded-xl flex flex-col items-center space-y-1 shadow-xs">
                            <span className="font-mono text-[9px] font-bold text-rose-500 uppercase">Gram-Negative</span>
                            <div className="w-14 h-14 rounded-full border-2 border-dashed border-rose-200 bg-rose-50 flex flex-wrap items-center justify-center p-1 overflow-hidden">
                              <span className="text-[14px] text-pink-500 font-bold tracking-widest select-none font-mono">▬ ▬<br /> ▬ ▬</span>
                            </div>
                            <span className="text-[10px] font-semibold text-ink-soft">K. pneumoniae (Pink rods)</span>
                          </div>
                        </div>
                      )}
                      {simStep === 3 && (
                        <div className="space-y-4 w-full">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-2 bg-white border border-line rounded-lg flex flex-col items-center">
                              <span className="font-mono text-[9px] text-ink-faint font-bold">TSI AGAR</span>
                              <div className="w-4 h-14 rounded-b-md bg-gradient-to-b from-yellow-300 to-yellow-500 border border-yellow-600 mt-2 flex items-center justify-center">
                                <span className="text-[8px] font-bold text-yellow-800">GAS</span>
                              </div>
                              <span className="text-[9px] font-bold text-yellow-600 mt-1">Acid/Acid (A/A)</span>
                            </div>
                            <div className="p-2 bg-white border border-line rounded-lg flex flex-col items-center">
                              <span className="font-mono text-[9px] text-ink-faint font-bold">CITRATE</span>
                              <div className="w-4 h-14 rounded-b-md bg-emerald-600 border border-emerald-800 mt-2" />
                              <span className="text-[9px] font-bold text-emerald-600 mt-1">Negative</span>
                            </div>
                            <div className="p-2 bg-white border border-line rounded-lg flex flex-col items-center">
                              <span className="font-mono text-[9px] text-ink-faint font-bold">UREASE</span>
                              <div className="w-4 h-14 rounded-b-md bg-pink-500 border border-pink-700 mt-2 animate-pulse" />
                              <span className="text-[9px] font-bold text-pink-600 mt-1">Positive (Pink)</span>
                            </div>
                          </div>
                          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 font-mono text-[11px] font-bold">
                            🎯 ASSAY OUTCOME: Klebsiella pneumoniae (Clinical Strain Identified)
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Theme 2: PGPR */}
                  {selectedThemeId === 'theme-2' && (
                    <div className="w-full max-w-md flex flex-col items-center space-y-4 text-center">
                      {simStep === 1 && (
                        <div className="space-y-3">
                          <div className="w-20 h-20 rounded-full border-4 border-slate-300 bg-white shadow flex items-center justify-center relative">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 absolute top-6 left-6" />
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 absolute bottom-6 right-6" />
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 absolute top-10 right-8" />
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Spot-inoculating pure isolates on Pikovskaya agar</span>
                        </div>
                      )}
                      {simStep === 2 && (
                        <div className="flex gap-6 justify-center flex-wrap">
                          <div className="p-3 bg-white border border-line rounded-xl flex flex-col items-center space-y-1">
                            <span className="font-mono text-[9px] font-bold text-emerald-600 uppercase">Phosphate Solubilization</span>
                            <div className="w-16 h-16 rounded-full border-2 border-slate-300 bg-slate-200 flex items-center justify-center relative overflow-hidden shadow-xs">
                              <div className="w-10 h-10 rounded-full border border-white bg-white/60 absolute top-3 left-3 flex items-center justify-center">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-700">Clear Halo (14mm)</span>
                          </div>
                          <div className="p-3 bg-white border border-line rounded-xl flex flex-col items-center space-y-1">
                            <span className="font-mono text-[9px] font-bold text-amber-600 uppercase">Siderophore CAS Assay</span>
                            <div className="w-16 h-16 rounded-full border-2 border-teal-800 bg-teal-600 flex items-center justify-center relative overflow-hidden shadow-xs">
                              <div className="w-9 h-9 rounded-full border border-orange-200 bg-orange-400/60 absolute top-4 left-4 flex items-center justify-center">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-amber-700">Orange Halo (11mm)</span>
                          </div>
                        </div>
                      )}
                      {simStep === 3 && (
                        <div className="space-y-3 w-full">
                          <div className="flex items-center gap-3 justify-center">
                            <div className="w-4 h-16 rounded-b-md bg-gradient-to-b from-rose-400 to-rose-600 border border-rose-700 flex items-center justify-center shadow-xs">
                              <span className="text-[8px] font-bold text-white uppercase rotate-90 shrink-0">IAA+</span>
                            </div>
                            <div className="text-left space-y-0.5">
                              <p className="text-xs font-bold text-teal-deep">Salkowski Assay Result</p>
                              <p className="text-[11px] text-ink-soft">Absorbance at 530nm: <strong className="text-rose-600">0.84</strong></p>
                              <p className="text-[11px] text-ink-soft">IAA Concentration: <strong className="text-teal font-serif font-bold">42.2 µg/mL</strong></p>
                            </div>
                          </div>
                          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-mono text-[11px] font-bold">
                            🚀 Bio-Inoculation Trial: Root mass of Treated Maize seeds grew by +142%!
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Theme 3: AMR Kirby Bauer */}
                  {selectedThemeId === 'theme-3' && (
                    <div className="w-full max-w-md flex flex-col items-center space-y-4 text-center">
                      {simStep === 1 && (
                        <div className="space-y-3">
                          <div className="w-20 h-20 rounded-full border-4 border-amber-200 bg-white shadow flex items-center justify-center relative">
                            <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 text-[8px] font-extrabold absolute top-4 left-4">IMP</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 text-[8px] font-extrabold absolute bottom-4 right-4">COL</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 text-[8px] font-extrabold absolute top-8 right-3">CIP</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 text-[8px] font-extrabold absolute bottom-5 left-5">AZM</span>
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Antibiotic discs applied on MHA plate lawn</span>
                        </div>
                      )}
                      {simStep === 2 && (
                        <div className="space-y-3">
                          <div className="w-24 h-24 rounded-full border-4 border-amber-300 bg-yellow-50 shadow-md flex items-center justify-center relative overflow-hidden">
                            {/* IMP Zone */}
                            <div className="w-14 h-14 rounded-full bg-white/80 absolute top-1 left-1 border border-dashed border-slate-400" />
                            <span className="px-1 py-0.5 bg-white border border-slate-400 text-[7px] font-extrabold absolute top-5 left-5 z-10">IMP</span>

                            {/* COL Zone (No Zone) */}
                            <span className="px-1 py-0.5 bg-white border border-slate-400 text-[7px] font-extrabold absolute bottom-5 right-5 z-10">COL</span>

                            {/* CIP Zone (Small Zone) */}
                            <div className="w-4 h-4 rounded-full bg-white/70 absolute top-8 right-6 border border-dashed border-slate-400" />
                            <span className="px-1 py-0.5 bg-white border border-slate-400 text-[7px] font-extrabold absolute top-8 right-6 z-10">CIP</span>

                            {/* AZM Zone (Small Zone) */}
                            <div className="w-4 h-4 rounded-full bg-white/70 absolute bottom-7 left-7 border border-dashed border-slate-400" />
                            <span className="px-1 py-0.5 bg-white border border-slate-400 text-[7px] font-extrabold absolute bottom-7 left-7 z-10">AZM</span>
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Clearance zones grown around active antibiotic discs</span>
                        </div>
                      )}
                      {simStep === 3 && (
                        <div className="space-y-3 w-full">
                          <div className="bg-white border border-line rounded-lg overflow-hidden text-[11px]">
                            <table className="w-full text-left font-mono">
                              <thead className="bg-slate-100 text-ink-faint">
                                <tr>
                                  <th className="p-1.5 font-bold">DRUG</th>
                                  <th className="p-1.5 font-bold">ZONE</th>
                                  <th className="p-1.5 font-bold">PROFILE</th>
                                </tr>
                              </thead>
                              <tbody className="text-xs">
                                <tr className="border-t border-line">
                                  <td className="p-1.5 font-bold">IMP (Imipenem)</td>
                                  <td className="p-1.5 text-emerald-600 font-bold">24.5 mm</td>
                                  <td className="p-1.5"><span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-extrabold">SUSCEPTIBLE (S)</span></td>
                                </tr>
                                <tr className="border-t border-line">
                                  <td className="p-1.5 font-bold">COL (Colistin)</td>
                                  <td className="p-1.5 text-rose-600 font-bold">6.0 mm</td>
                                  <td className="p-1.5"><span className="bg-rose-100 text-rose-800 text-[9px] px-1.5 py-0.5 rounded font-extrabold">RESISTANT (R)</span></td>
                                </tr>
                                <tr className="border-t border-line">
                                  <td className="p-1.5 font-bold">CIP (Ciprofloxacin)</td>
                                  <td className="p-1.5 text-rose-600 font-bold">11.2 mm</td>
                                  <td className="p-1.5"><span className="bg-rose-100 text-rose-800 text-[9px] px-1.5 py-0.5 rounded font-extrabold">RESISTANT (R)</span></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 font-mono text-[11px] font-bold">
                            ⚠️ One Health Notice: Resistant isolates pose human-animal transfer hazards.
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Theme 4: Biofilm Microtiter */}
                  {selectedThemeId === 'theme-4' && (
                    <div className="w-full max-w-md flex flex-col items-center space-y-4 text-center">
                      {simStep === 1 && (
                        <div className="space-y-3 w-full">
                          <div className="grid grid-cols-4 gap-1 max-w-[200px] mx-auto bg-slate-50 p-2 rounded-lg border">
                            <div className="w-5 h-5 rounded-full bg-purple-900" />
                            <div className="w-5 h-5 rounded-full bg-purple-700" />
                            <div className="w-5 h-5 rounded-full bg-purple-500" />
                            <div className="w-5 h-5 rounded-full bg-purple-200" />
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">2-Fold Serial Phytoextract dilutions added to pathogen wells</span>
                        </div>
                      )}
                      {simStep === 2 && (
                        <div className="space-y-3 w-full">
                          <div className="grid grid-cols-4 gap-1 max-w-[200px] mx-auto bg-white p-2 rounded-lg border shadow-xs animate-pulse">
                            <div className="w-5 h-5 rounded-full bg-violet-100 border border-violet-200" />
                            <div className="w-5 h-5 rounded-full bg-violet-300" />
                            <div className="w-5 h-5 rounded-full bg-violet-600" />
                            <div className="w-5 h-5 rounded-full bg-violet-950" />
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Crystal Violet stained remaining Biofilms post wash</span>
                        </div>
                      )}
                      {simStep === 3 && (
                        <div className="space-y-3 w-full">
                          <div className="p-2 bg-white border border-line rounded-lg">
                            <p className="text-[10px] font-mono font-bold text-ink-faint pb-1 border-b">ELISA OD595 BIOFILM INHIBITION ANALYSIS</p>
                            <div className="flex items-end justify-center gap-3 pt-3 h-16">
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-4 bg-teal rounded-t" style={{ height: '54px' }} />
                                <span className="text-[8px] font-mono">1:10 (91%)</span>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-4 bg-teal rounded-t" style={{ height: '42px' }} />
                                <span className="text-[8px] font-mono">1:20 (84%)</span>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-4 bg-teal rounded-t" style={{ height: '26px' }} />
                                <span className="text-[8px] font-mono">1:40 (52%)</span>
                              </div>
                              <div className="flex flex-col items-center space-y-1">
                                <div className="w-4 bg-teal rounded-t" style={{ height: '6px' }} />
                                <span className="text-[8px] font-mono">1:80 (12%)</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 font-mono text-[11px] font-bold">
                            🌿 Drug Discovery: Nicotiana extract shows exceptional anti-biofilm potential!
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Theme 5: PCR Molecular */}
                  {selectedThemeId === 'theme-5' && (
                    <div className="w-full max-w-md flex flex-col items-center space-y-4 text-center">
                      {simStep === 1 && (
                        <div className="space-y-3">
                          <svg width="100" height="80" className="mx-auto">
                            <path d="M 30 20 L 70 20 L 65 75 L 35 75 Z" fill="#F8FAFC" stroke="#475569" strokeWidth="2" />
                            <rect x="25" y="10" width="50" height="10" rx="2" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
                            <rect x="40" y="55" width="20" height="15" rx="1" fill="#3B82F6" fillOpacity="0.4" />
                            <text x="50" y="66" textAnchor="middle" fill="#1E3A8A" fontSize="8" fontWeight="bold">Taq</text>
                          </svg>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Genomic DNA extract combined with Taq PCR mix</span>
                        </div>
                      )}
                      {simStep === 2 && (
                        <div className="space-y-3 w-full">
                          <div className="bg-white border border-line p-2.5 rounded-lg text-left max-w-xs mx-auto">
                            <p className="text-[10px] font-mono font-bold text-blue-600 animate-pulse">CYCLING IN THERMOCYCLER...</p>
                            <div className="text-[11px] font-mono space-y-1 mt-1.5">
                              <p>Denaturation: <span className="text-rose-600 font-bold">95°C</span></p>
                              <p>Primer Annealing: <span className="text-blue-600 font-bold">55°C</span></p>
                              <p>Elongation: <span className="text-emerald-600 font-bold">72°C</span></p>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">30 PCR cycles completed successfully</span>
                        </div>
                      )}
                      {simStep === 3 && (
                        <div className="space-y-3 w-full">
                          <div className="p-2.5 bg-slate-950 text-white rounded-lg border-2 border-slate-700 max-w-xs mx-auto shadow">
                            <p className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider pb-1 border-b border-cyan-800 flex justify-between">
                              <span>UV GEL TRANSILLUMINATOR SCAN</span>
                              <span className="text-amber-500 font-extrabold animate-pulse">UV ON</span>
                            </p>
                            <div className="flex items-center gap-6 justify-center py-2">
                              <div className="font-mono text-[10px] space-y-1.5 text-slate-400 text-right">
                                <p>1000bp -</p>
                                <p>750bp -</p>
                                <p className="text-amber-400 font-bold">620bp -</p>
                                <p>500bp -</p>
                              </div>
                              <div className="w-16 h-20 bg-slate-900 border border-slate-800 flex relative overflow-hidden">
                                <div className="absolute left-2 w-4 h-1 bg-cyan-400 opacity-60 top-2" />
                                <div className="absolute left-2 w-4 h-1 bg-cyan-400 opacity-60 top-4" />
                                <div className="absolute left-2 w-4 h-1 bg-cyan-400 opacity-60 top-6" />
                                <div className="absolute left-2 w-4 h-1 bg-cyan-400 opacity-60 top-8" />
                                <div className="absolute left-2 w-4 h-1 bg-cyan-400 opacity-60 top-11" />

                                {/* blaNDM-1 band */}
                                <div className="absolute right-2 w-6 h-1.5 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] top-8 animate-pulse" />
                              </div>
                              <div className="font-mono text-[9px] space-y-1 text-left text-slate-400">
                                <p className="text-[10px] font-bold text-white">L1: Ladder</p>
                                <p className="text-[10px] font-bold text-amber-400">L2: blaNDM-1+</p>
                                <p className="text-[8px] text-slate-500">620 bp PCR band</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-mono text-[11px] font-bold">
                            🧬 Genomic confirmation of New Delhi Metallo-Beta-Lactamase (blaNDM-1).
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Theme 6: AAS Bioremediation */}
                  {selectedThemeId === 'theme-6' && (
                    <div className="w-full max-w-md flex flex-col items-center space-y-4 text-center">
                      {simStep === 1 && (
                        <div className="space-y-3">
                          <div className="w-8 h-20 bg-slate-50 border-2 border-slate-300 rounded-b-lg relative mx-auto flex items-end p-0.5">
                            <div className="w-full bg-cyan-100/50 h-16 rounded-b animate-pulse" />
                            <span className="text-[8px] font-bold font-mono text-cyan-800 absolute top-4 left-0 right-0">100 ppm Pb</span>
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Isolate Iso-8 inoculated in heavy metal-spiked medium</span>
                        </div>
                      )}
                      {simStep === 2 && (
                        <div className="space-y-3">
                          <div className="flex gap-4 items-center justify-center">
                            <div className="w-12 h-12 rounded-full border-4 border-dashed border-slate-400 flex items-center justify-center animate-spin" />
                            <svg width="40" height="50" className="opacity-80">
                              <path d="M 10 10 L 30 10 L 25 45 L 15 45 Z" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.5" />
                              <path d="M 15 40 Q 20 42 25 40" stroke="#EF4444" strokeWidth="1.5" className="animate-bounce" />
                            </svg>
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Cells pelleted and digested with concentrated HNO3 acid</span>
                        </div>
                      )}
                      {simStep === 3 && (
                        <div className="space-y-3 w-full">
                          <div className="bg-white border border-line p-2.5 rounded-lg max-w-xs mx-auto text-left font-mono text-xs">
                            <p className="text-[10px] font-bold text-cyan-700 uppercase border-b pb-1">FLAME AAS SPECTROMETER REPORT</p>
                            <div className="space-y-1 mt-2">
                              <p>Metal Element analyzed: <span className="font-bold">Lead (Pb)</span></p>
                              <p>Initial Concentration: <span className="font-bold text-rose-600">100.0 ppm</span></p>
                              <p>Supernatant remaining: <span className="font-bold text-emerald-600">8.6 ppm</span></p>
                              <p className="pt-1 text-[11px] font-extrabold text-teal-deep">Intracellular Biosorption: 91.4%</p>
                            </div>
                          </div>
                          <div className="p-2.5 bg-cyan-50 border border-cyan-200 rounded-lg text-cyan-800 font-mono text-[11px] font-bold">
                            ☘️ Bioremediation Success: Strains effectively clean toxic tannery run-offs!
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Theme 7: Probiotics */}
                  {selectedThemeId === 'theme-7' && (
                    <div className="w-full max-w-md flex flex-col items-center space-y-4 text-center">
                      {simStep === 1 && (
                        <div className="space-y-3 w-full">
                          <div className="bg-white border border-line p-3 rounded-xl max-w-xs mx-auto text-left">
                            <p className="text-[10px] font-mono font-bold text-violet-600">SGF TRANSIT CELL VIABILITY (pH 2.0)</p>
                            <div className="font-mono text-[11px] space-y-1 mt-2">
                              <p>Initial Count (T0): <strong className="text-teal">8.2 Log CFU/mL</strong></p>
                              <p>Stomach Acid (T3h): <strong className="text-teal-deep">7.5 Log CFU/mL</strong></p>
                              <p className="text-[10px] text-emerald-600 font-bold">✓ Survival rate: 91.4% (Highly Resistant)</p>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Yogurt-isolated LAB proves exceptional stomach acid survival</span>
                        </div>
                      )}
                      {simStep === 2 && (
                        <div className="space-y-3">
                          <div className="w-20 h-20 rounded-full border-4 border-violet-300 bg-red-100 flex items-center justify-center relative shadow">
                            {/* Cork borer well */}
                            <div className="w-8 h-8 rounded-full border-2 border-slate-400 bg-white absolute top-6 left-6" />
                            <div className="w-4 h-4 rounded-full bg-violet-300 absolute top-8 left-8 animate-ping" />
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Cork-borer wells filled with cell-free probiotic supernatant</span>
                        </div>
                      )}
                      {simStep === 3 && (
                        <div className="space-y-3">
                          <div className="w-24 h-24 rounded-full border-4 border-violet-400 bg-red-200 flex items-center justify-center relative shadow-md">
                            {/* Massive Clearance Zone */}
                            <div className="w-18 h-18 rounded-full bg-white/75 absolute top-2.5 left-2.5 border-2 border-dashed border-violet-500 flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full bg-slate-300 border border-slate-400" />
                            </div>
                          </div>
                          <div className="p-2.5 bg-violet-50 border border-violet-200 rounded-lg text-violet-800 font-mono text-[11px] font-bold">
                            🔬 Probiotic Biocontrol: Broad 21mm zone of lysis against Listeria food pathogens!
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Theme 8: Nanotechnology */}
                  {selectedThemeId === 'theme-8' && (
                    <div className="w-full max-w-md flex flex-col items-center space-y-4 text-center">
                      {simStep === 1 && (
                        <div className="space-y-3">
                          <svg width="80" height="70" className="mx-auto">
                            <path d="M 15 15 L 65 15 L 55 60 Q 40 65 25 60 Z" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
                            <path d="M 22 55 Q 40 60 58 55" stroke="#047857" strokeWidth="2" className="animate-bounce" />
                          </svg>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Medicinal Neem leaf extract boiled at 100°C</span>
                        </div>
                      )}
                      {simStep === 2 && (
                        <div className="space-y-3">
                          <div className="flex gap-4 items-center justify-center">
                            <svg width="60" height="60" className="mx-auto">
                              <path d="M 10 10 L 50 10 L 42 50 Q 30 55 18 50 Z" fill="#78350F" stroke="#B45309" strokeWidth="2" />
                            </svg>
                            <div className="text-left">
                              <p className="text-[10px] font-mono text-amber-600 font-bold uppercase animate-pulse">Ag+ REDUCTION IN PROGRESS</p>
                              <p className="text-[11px] text-ink-soft">Color: <span className="text-amber-800 font-bold">Colloidal Dark Brown</span></p>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-teal font-extrabold uppercase bg-teal-pale px-2.5 py-1 rounded">Phytochemical reduction to sub-50nm Silver Nanoparticles</span>
                        </div>
                      )}
                      {simStep === 3 && (
                        <div className="space-y-3 w-full">
                          <div className="p-2.5 bg-white border border-line rounded-lg max-w-xs mx-auto">
                            <p className="text-[9px] font-mono font-bold text-ink-faint pb-1 border-b">UV-VIS SPECTROPHOTOMETER CHARACTERIZATION</p>
                            <svg width="220" height="70" className="mx-auto pt-2">
                              <path d="M 10 65 L 50 62 L 90 20 L 110 15 L 130 35 L 170 60 L 210 65" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                              <line x1="110" y1="15" x2="110" y2="65" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                              <text x="110" y="60" textAnchor="middle" fill="#78350F" fontSize="8" fontFamily="monospace">425 nm Peak (LSPR)</text>
                            </svg>
                          </div>
                          <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 font-mono text-[11px] font-bold">
                            ✨ Green Synthesis Verified: Characteristic silver plasmon peak confirms AgNPs.
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Loading/Incubation overlay */}
                {simStatus === 'running' && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center space-y-3 z-30">
                    <span className="w-8 h-8 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                    <p className="text-xs font-mono text-teal font-semibold animate-pulse">INCUBATING ASSAY / PERFORMING PROTOCOL ACTIONS...</p>
                  </div>
                )}
              </div>

              {/* Step Action controls */}
              <div className="bg-bg-alt border border-line p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1 max-w-md">
                  <span className="font-mono text-[10px] text-ink-faint uppercase font-extrabold">CURRENT PROTOCOL ACTION:</span>
                  <p className="text-xs text-ink-soft font-medium leading-relaxed">
                    {selectedThemeId === 'theme-1' && (
                      <>
                        {simStep === 1 && "Spread pure clinical samples aseptically onto glass slide and heat-fix smear to anchor cellular walls."}
                        {simStep === 2 && "Apply critical Decolorizer wash and Safranin red dye to differentiate Gram-positive from negative cells."}
                        {simStep === 3 && "Incubate inoculated TSI slants, Simmons Citrate, and Urea broth tubes for biochemical metabolic signature identification."}
                      </>
                    )}
                    {selectedThemeId === 'theme-2' && (
                      <>
                        {simStep === 1 && "Perform aseptic spot-inoculation of root rhizospheric bacterial pure isolates onto Pikovskaya growth medium."}
                        {simStep === 2 && "Incubate inoculated plates at 30°C for 5 days to observe surrounding solubilized nutrient clear halos."}
                        {simStep === 3 && "Mix isolate cell supernatant with Salkowski chemical reagent to trigger colorimetric Indole-3-Acetic Acid (auxin) quantification."}
                      </>
                    )}
                    {selectedThemeId === 'theme-3' && (
                      <>
                        {simStep === 1 && "Standardize bacterial AMR broth culture turbidity to 0.5 McFarland, plate a uniform lawn on MHA, and dispense discs."}
                        {simStep === 2 && "Incubate plates for 18-24 hours at 37°C to allow antibiotic drug molecules to diffuse and inhibit bacterial growth."}
                        {simStep === 3 && "Use digital calipers to measure clearance diameters and compare to CLSI clinical standards to map susceptibility."}
                      </>
                    )}
                    {selectedThemeId === 'theme-4' && (
                      <>
                        {simStep === 1 && "Dispense 2-fold serial dilutions of medicinal plant extracts into 96-well microtiter wells containing active pathogens."}
                        {simStep === 2 && "Rinse non-adherent planktonic cells, apply Crystal Violet dye, and fix remaining robust biofilms in wells."}
                        {simStep === 3 && "Elute locked-in CV dye with ethanol and scan well plates colorimetrically on microplate reader at 595nm."}
                      </>
                    )}
                    {selectedThemeId === 'theme-5' && (
                      <>
                        {simStep === 1 && "Combine high-purity template DNA, blaNDM-1 forward/reverse primers, Taq DNA Polymerase, and PCR mastermix buffer."}
                        {simStep === 2 && "Configure and run high-efficiency 30-cycle genomic denaturation, annealing, and amplification loops on thermal cycler."}
                        {simStep === 3 && "Load PCR amplicons on horizontal 1.5% agarose gel, run at 100V, and visualize glowing orange gene bands under UV lamp."}
                      </>
                    )}
                    {selectedThemeId === 'theme-6' && (
                      <>
                        {simStep === 1 && "Prepare sterile nutrient broth spiked with 100 ppm Lead (Pb) and inoculate heavy metal-resistant rhizosphere isolate Iso-8."}
                        {simStep === 2 && "Harvest cells via high-speed centrifuging and digest the cell wall matrix with boiling hot concentrated nitric acid (HNO3)."}
                        {simStep === 3 && "Inject digested sample into Atomic Absorption Spectrophotometer (AAS) flame to measure intracellular metal absorption efficiency."}
                      </>
                    )}
                    {selectedThemeId === 'theme-7' && (
                      <>
                        {simStep === 1 && "Expose yogurt Lactic Acid Bacteria isolates to Simulated Gastric Fluid (SGF, pH 2.0) for 3 hours to test stomach survival."}
                        {simStep === 2 && "Bore wells in agar seeded with target foodborne Listeria monocytogenes and inoculate with cell-free probiotic supernatant."}
                        {simStep === 3 && "Incubate plates at 37°C and measure resulting circular zones of clearance to evaluate biological control bacteriocin efficacy."}
                      </>
                    )}
                    {selectedThemeId === 'theme-8' && (
                      <>
                        {simStep === 1 && "Boil fresh medicinal plant leaves (Neem/Tulsi) in double-distilled water and filter to extract bioactive reducing phytoconstituents."}
                        {simStep === 2 && "Introduce silver nitrate (AgNO3) solution dropwise into boiled extract under continuous stirring at 60°C to reduce silver cations."}
                        {simStep === 3 && "Inject colloidal brown fluid into UV-Visible Spectrophotometer to scan characteristic Localized Surface Plasmon Resonance (LSPR)."}
                      </>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  {simStep > 1 && simStatus !== 'running' && (
                    <button
                      onClick={() => { setSimStep(prev => prev - 1); setSimStatus('idle'); }}
                      className="px-3.5 py-1.5 border border-line text-xs font-semibold rounded-lg hover:bg-bg-alt cursor-pointer"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleSimulatorAction}
                    disabled={simStatus === 'running'}
                    className="px-4 py-2 bg-teal hover:bg-teal-deep text-white text-xs font-bold rounded-lg cursor-pointer hover:-translate-y-0.5 transition-all shadow-xs disabled:opacity-50"
                  >
                    {simStep === 3 && simStatus === 'completed' ? 'Reset Assay' : 'Execute Step'}
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Dynamic SVG Workflows / Flowcharts */}
        <div className="space-y-4 pt-2">
          <h4 className="font-mono text-[10px] font-bold text-teal uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Assay Technical Workflow Diagram
          </h4>
          
          <div className="bg-bg-alt border border-line rounded-xl p-4 sm:p-6 flex items-center justify-center overflow-x-auto shadow-inner">
            {selectedThemeId === 'theme-1' && (
              <svg width="600" height="120" viewBox="0 0 600 120" className="w-full max-w-2xl shrink-0">
                <rect x="10" y="25" width="100" height="70" rx="8" fill="#F43F5E" fillOpacity="0.1" stroke="#F43F5E" strokeWidth="2" />
                <text x="60" y="58" textAnchor="middle" fill="#881337" fontSize="10" fontWeight="bold">Clinical Swap</text>
                <text x="60" y="74" textAnchor="middle" fill="#881337" fontSize="8" fontFamily="monospace">SAMPLE INPUT</text>

                <line x1="110" y1="60" x2="160" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="160,60 152,56 152,64" fill="#64748B" />

                <rect x="160" y="25" width="110" height="70" rx="8" fill="#F43F5E" fillOpacity="0.15" stroke="#F43F5E" strokeWidth="2" />
                <text x="215" y="54" textAnchor="middle" fill="#881337" fontSize="10" fontWeight="bold">Selective Agar</text>
                <text x="215" y="68" textAnchor="middle" fill="#881337" fontSize="8">Streak isolation</text>
                <text x="215" y="80" textAnchor="middle" fill="#881337" fontSize="8" fontFamily="monospace">MacConkey/Blood</text>

                <line x1="270" y1="60" x2="320" y2="60" stroke="#CBD5E1" strokeWidth="2" />
                <polygon points="320,60 312,56 312,64" fill="#64748B" />

                <rect x="320" y="25" width="110" height="70" rx="8" fill="#F43F5E" fillOpacity="0.2" stroke="#F43F5E" strokeWidth="2" />
                <text x="375" y="54" textAnchor="middle" fill="#881337" fontSize="10" fontWeight="bold">Differential Tubes</text>
                <text x="375" y="68" textAnchor="middle" fill="#881337" fontSize="8">TSI, Citrate, Urea</text>
                <text x="375" y="80" textAnchor="middle" fill="#881337" fontSize="8" fontFamily="monospace">BIOCHEMICALS</text>

                <line x1="430" y1="60" x2="480" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="480,60 472,56 472,64" fill="#64748B" />

                <rect x="480" y="25" width="110" height="70" rx="8" fill="#0D9488" fillOpacity="0.15" stroke="#0D9488" strokeWidth="2" />
                <text x="535" y="54" textAnchor="middle" fill="#115E59" fontSize="10" fontWeight="bold">Diagnostic Profile</text>
                <text x="535" y="68" textAnchor="middle" fill="#115E59" fontSize="8">Pathogen Identified</text>
                <text x="535" y="80" textAnchor="middle" fill="#115E59" fontSize="8" fontFamily="monospace" fontWeight="bold">RESULTS OUT</text>
              </svg>
            )}

            {selectedThemeId === 'theme-2' && (
              <svg width="600" height="120" viewBox="0 0 600 120" className="w-full max-w-2xl shrink-0">
                <rect x="10" y="25" width="100" height="70" rx="8" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2" />
                <text x="60" y="58" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="bold">Rhizo Soil</text>
                <text x="60" y="74" textAnchor="middle" fill="#065F46" fontSize="8" fontFamily="monospace">ROOT MICROBES</text>

                <line x1="110" y1="60" x2="160" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="160,60 152,56 152,64" fill="#64748B" />

                <rect x="160" y="25" width="110" height="70" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2" />
                <text x="215" y="54" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="bold">Pikovskaya Agar</text>
                <text x="215" y="68" textAnchor="middle" fill="#065F46" fontSize="8">Phosphate dissolution</text>
                <text x="215" y="80" textAnchor="middle" fill="#065F46" fontSize="8" fontFamily="monospace">SOLUBILIZATION</text>

                <line x1="270" y1="60" x2="320" y2="60" stroke="#CBD5E1" strokeWidth="2" />
                <polygon points="320,60 312,56 312,64" fill="#64748B" />

                <rect x="320" y="25" width="110" height="70" rx="8" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                <text x="375" y="54" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="bold">Salkowski Assay</text>
                <text x="375" y="68" textAnchor="middle" fill="#065F46" fontSize="8">IAA hormone pink</text>
                <text x="375" y="80" textAnchor="middle" fill="#065F46" fontSize="8" fontFamily="monospace">IAA QUANTIFY</text>

                <line x1="430" y1="60" x2="480" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="480,60 472,56 472,64" fill="#64748B" />

                <rect x="480" y="25" width="110" height="70" rx="8" fill="#0D9488" fillOpacity="0.15" stroke="#0D9488" strokeWidth="2" />
                <text x="535" y="54" textAnchor="middle" fill="#115E59" fontSize="10" fontWeight="bold">Eco Inoculant</text>
                <text x="535" y="68" textAnchor="middle" fill="#115E59" fontSize="8">Maize Growth Bio-kit</text>
                <text x="535" y="80" textAnchor="middle" fill="#115E59" fontSize="8" fontFamily="monospace" fontWeight="bold">SEED COATING</text>
              </svg>
            )}

            {selectedThemeId === 'theme-3' && (
              <svg width="600" height="120" viewBox="0 0 600 120" className="w-full max-w-2xl shrink-0">
                <rect x="10" y="25" width="100" height="70" rx="8" fill="#D97706" fillOpacity="0.1" stroke="#D97706" strokeWidth="2" />
                <text x="60" y="58" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">Meat Swab</text>
                <text x="60" y="74" textAnchor="middle" fill="#78350F" fontSize="8" fontFamily="monospace">AMR SOURCE</text>

                <line x1="110" y1="60" x2="160" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="160,60 152,56 152,64" fill="#64748B" />

                <rect x="160" y="25" width="110" height="70" rx="8" fill="#D97706" fillOpacity="0.15" stroke="#D97706" strokeWidth="2" />
                <text x="215" y="54" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">0.5 McFarland</text>
                <text x="215" y="68" textAnchor="middle" fill="#78350F" fontSize="8">Turbidity adjustment</text>
                <text x="215" y="80" textAnchor="middle" fill="#78350F" fontSize="8" fontFamily="monospace">Lawn Culture</text>

                <line x1="270" y1="60" x2="320" y2="60" stroke="#CBD5E1" strokeWidth="2" />
                <polygon points="320,60 312,56 312,64" fill="#64748B" />

                <rect x="320" y="25" width="110" height="70" rx="8" fill="#D97706" fillOpacity="0.2" stroke="#D97706" strokeWidth="2" />
                <text x="375" y="54" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">Antibiotic Discs</text>
                <text x="375" y="68" textAnchor="middle" fill="#78350F" fontSize="8">Zone clearance read</text>
                <text x="375" y="80" textAnchor="middle" fill="#78350F" fontSize="8" fontFamily="monospace">KIRBY-BAUER AST</text>

                <line x1="430" y1="60" x2="480" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="480,60 472,56 472,64" fill="#64748B" />

                <rect x="480" y="25" width="110" height="70" rx="8" fill="#0D9488" fillOpacity="0.15" stroke="#0D9488" strokeWidth="2" />
                <text x="535" y="54" textAnchor="middle" fill="#115E59" fontSize="10" fontWeight="bold">AMR Profile</text>
                <text x="535" y="68" textAnchor="middle" fill="#115E59" fontSize="8">One Health Database</text>
                <text x="535" y="80" textAnchor="middle" fill="#115E59" fontSize="8" fontFamily="monospace" fontWeight="bold">SURVEILLANCE</text>
              </svg>
            )}

            {selectedThemeId === 'theme-4' && (
              <svg width="600" height="120" viewBox="0 0 600 120" className="w-full max-w-2xl shrink-0">
                <rect x="10" y="25" width="100" height="70" rx="8" fill="#9333EA" fillOpacity="0.1" stroke="#9333EA" strokeWidth="2" />
                <text x="60" y="58" textAnchor="middle" fill="#581C87" fontSize="10" fontWeight="bold">Solvent Extract</text>
                <text x="60" y="74" textAnchor="middle" fill="#581C87" fontSize="8" fontFamily="monospace">PHYTOEXTRACT</text>

                <line x1="110" y1="60" x2="160" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="160,60 152,56 152,64" fill="#64748B" />

                <rect x="160" y="25" width="110" height="70" rx="8" fill="#9333EA" fillOpacity="0.15" stroke="#9333EA" strokeWidth="2" />
                <text x="215" y="54" textAnchor="middle" fill="#581C87" fontSize="10" fontWeight="bold">Microtiter Plate</text>
                <text x="215" y="68" textAnchor="middle" fill="#581C87" fontSize="8">2-Fold Serial Dilutions</text>
                <text x="215" y="80" textAnchor="middle" fill="#581C87" fontSize="8" fontFamily="monospace">MBIC ASSAY</text>

                <line x1="270" y1="60" x2="320" y2="60" stroke="#CBD5E1" strokeWidth="2" />
                <polygon points="320,60 312,56 312,64" fill="#64748B" />

                <rect x="320" y="25" width="110" height="70" rx="8" fill="#9333EA" fillOpacity="0.2" stroke="#9333EA" strokeWidth="2" />
                <text x="375" y="54" textAnchor="middle" fill="#581C87" fontSize="10" fontWeight="bold">Crystal Violet</text>
                <text x="375" y="68" textAnchor="middle" fill="#581C87" fontSize="8">Biofilm matrix staining</text>
                <text x="375" y="80" textAnchor="middle" fill="#581C87" fontSize="8" fontFamily="monospace">BIOFILM ELUTION</text>

                <line x1="430" y1="60" x2="480" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="480,60 472,56 472,64" fill="#64748B" />

                <rect x="480" y="25" width="110" height="70" rx="8" fill="#0D9488" fillOpacity="0.15" stroke="#0D9488" strokeWidth="2" />
                <text x="535" y="54" textAnchor="middle" fill="#115E59" fontSize="10" fontWeight="bold">OD 595 Scan</text>
                <text x="535" y="68" textAnchor="middle" fill="#115E59" fontSize="8">Inhibition percentage</text>
                <text x="535" y="80" textAnchor="middle" fill="#115E59" fontSize="8" fontFamily="monospace" fontWeight="bold">THERAPEUTIC ID</text>
              </svg>
            )}

            {selectedThemeId === 'theme-5' && (
              <svg width="600" height="120" viewBox="0 0 600 120" className="w-full max-w-2xl shrink-0">
                <rect x="10" y="25" width="100" height="70" rx="8" fill="#2563EB" fillOpacity="0.1" stroke="#2563EB" strokeWidth="2" />
                <text x="60" y="58" textAnchor="middle" fill="#1E3A8A" fontSize="10" fontWeight="bold">Isolate DNA</text>
                <text x="60" y="74" textAnchor="middle" fill="#1E3A8A" fontSize="8" fontFamily="monospace">MINI-PREP KIT</text>

                <line x1="110" y1="60" x2="160" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="160,60 152,56 152,64" fill="#64748B" />

                <rect x="160" y="25" width="110" height="70" rx="8" fill="#2563EB" fillOpacity="0.15" stroke="#2563EB" strokeWidth="2" />
                <text x="215" y="54" textAnchor="middle" fill="#1E3A8A" fontSize="10" fontWeight="bold">Taq Reaction Mix</text>
                <text x="215" y="68" textAnchor="middle" fill="#1E3A8A" fontSize="8">Target resistance primers</text>
                <text x="215" y="80" textAnchor="middle" fill="#1E3A8A" fontSize="8" fontFamily="monospace">PCR CYCLING</text>

                <line x1="270" y1="60" x2="320" y2="60" stroke="#CBD5E1" strokeWidth="2" />
                <polygon points="320,60 312,56 312,64" fill="#64748B" />

                <rect x="320" y="25" width="110" height="70" rx="8" fill="#2563EB" fillOpacity="0.2" stroke="#2563EB" strokeWidth="2" />
                <text x="375" y="54" textAnchor="middle" fill="#1E3A8A" fontSize="10" fontWeight="bold">Agarose Gel Rig</text>
                <text x="375" y="68" textAnchor="middle" fill="#1E3A8A" fontSize="8">1.5% Gel, 100V run</text>
                <text x="375" y="80" textAnchor="middle" fill="#1E3A8A" fontSize="8" fontFamily="monospace">ELECTROPHORESIS</text>

                <line x1="430" y1="60" x2="480" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="480,60 472,56 472,64" fill="#64748B" />

                <rect x="480" y="25" width="110" height="70" rx="8" fill="#0D9488" fillOpacity="0.15" stroke="#0D9488" strokeWidth="2" />
                <text x="535" y="54" textAnchor="middle" fill="#115E59" fontSize="10" fontWeight="bold">UV Gel-Doc scan</text>
                <text x="535" y="68" textAnchor="middle" fill="#115E59" fontSize="8">Bands matching marker</text>
                <text x="535" y="80" textAnchor="middle" fill="#115E59" fontSize="8" fontFamily="monospace" fontWeight="bold">GENOMICS DATA</text>
              </svg>
            )}

            {selectedThemeId === 'theme-6' && (
              <svg width="600" height="120" viewBox="0 0 600 120" className="w-full max-w-2xl shrink-0">
                <rect x="10" y="25" width="100" height="70" rx="8" fill="#0891B2" fillOpacity="0.1" stroke="#0891B2" strokeWidth="2" />
                <text x="60" y="58" textAnchor="middle" fill="#164E63" fontSize="10" fontWeight="bold">Savar Soil/Water</text>
                <text x="60" y="74" textAnchor="middle" fill="#164E63" fontSize="8" fontFamily="monospace">METAL CONC.</text>

                <line x1="110" y1="60" x2="160" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="160,60 152,56 152,64" fill="#64748B" />

                <rect x="160" y="25" width="110" height="70" rx="8" fill="#0891B2" fillOpacity="0.15" stroke="#0891B2" strokeWidth="2" />
                <text x="215" y="54" textAnchor="middle" fill="#164E63" fontSize="10" fontWeight="bold">Biosorption</text>
                <text x="215" y="68" textAnchor="middle" fill="#164E63" fontSize="8">Lead/Cadmium spike</text>
                <text x="215" y="80" textAnchor="middle" fill="#164E63" fontSize="8" fontFamily="monospace">METAL TOLERANT</text>

                <line x1="270" y1="60" x2="320" y2="60" stroke="#CBD5E1" strokeWidth="2" />
                <polygon points="320,60 312,56 312,64" fill="#64748B" />

                <rect x="320" y="25" width="110" height="70" rx="8" fill="#0891B2" fillOpacity="0.2" stroke="#0891B2" strokeWidth="2" />
                <text x="375" y="54" textAnchor="middle" fill="#164E63" fontSize="10" fontWeight="bold">Acid Digestion</text>
                <text x="375" y="68" textAnchor="middle" fill="#164E63" fontSize="8">Hot HNO3 lysis pellet</text>
                <text x="375" y="80" textAnchor="middle" fill="#164E63" fontSize="8" fontFamily="monospace">MINERALIZATION</text>

                <line x1="430" y1="60" x2="480" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="480,60 472,56 472,64" fill="#64748B" />

                <rect x="480" y="25" width="110" height="70" rx="8" fill="#0D9488" fillOpacity="0.15" stroke="#0D9488" strokeWidth="2" />
                <text x="535" y="54" textAnchor="middle" fill="#115E59" fontSize="10" fontWeight="bold">AAS Spectroscopy</text>
                <text x="535" y="68" textAnchor="middle" fill="#115E59" fontSize="8">Calculate sorption %</text>
                <text x="535" y="80" textAnchor="middle" fill="#115E59" fontSize="8" fontFamily="monospace" fontWeight="bold">REMEDIATION RATE</text>
              </svg>
            )}

            {selectedThemeId === 'theme-7' && (
              <svg width="600" height="120" viewBox="0 0 600 120" className="w-full max-w-2xl shrink-0">
                <rect x="10" y="25" width="100" height="70" rx="8" fill="#7C3AED" fillOpacity="0.1" stroke="#7C3AED" strokeWidth="2" />
                <text x="60" y="58" textAnchor="middle" fill="#4C1D95" fontSize="10" fontWeight="bold">Sewage/Fermented</text>
                <text x="60" y="74" textAnchor="middle" fill="#4C1D95" fontSize="8" fontFamily="monospace">PROBIOTIC SOURCE</text>

                <line x1="110" y1="60" x2="160" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="160,60 152,56 152,64" fill="#64748B" />

                <rect x="160" y="25" width="110" height="70" rx="8" fill="#7C3AED" fillOpacity="0.15" stroke="#7C3AED" strokeWidth="2" />
                <text x="215" y="54" textAnchor="middle" fill="#4C1D95" fontSize="10" fontWeight="bold">SGF Survival</text>
                <text x="215" y="68" textAnchor="middle" fill="#4C1D95" fontSize="8">Transit in pH 2.0 SGF</text>
                <text x="215" y="80" textAnchor="middle" fill="#4C1D95" fontSize="8" fontFamily="monospace">ACID TOLERANT</text>

                <line x1="270" y1="60" x2="320" y2="60" stroke="#CBD5E1" strokeWidth="2" />
                <polygon points="320,60 312,56 312,64" fill="#64748B" />

                <rect x="320" y="25" width="110" height="70" rx="8" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="2" />
                <text x="375" y="54" textAnchor="middle" fill="#4C1D95" fontSize="10" fontWeight="bold">Agar Well Assay</text>
                <text x="375" y="68" textAnchor="middle" fill="#4C1D95" fontSize="8">Seed plate with Listeria</text>
                <text x="375" y="80" textAnchor="middle" fill="#4C1D95" fontSize="8" fontFamily="monospace">ANTAGONISM ASSAY</text>

                <line x1="430" y1="60" x2="480" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="480,60 472,56 472,64" fill="#64748B" />

                <rect x="480" y="25" width="110" height="70" rx="8" fill="#0D9488" fillOpacity="0.15" stroke="#0D9488" strokeWidth="2" />
                <text x="535" y="54" textAnchor="middle" fill="#115E59" fontSize="10" fontWeight="bold">Lytic Zone</text>
                <text x="535" y="68" textAnchor="middle" fill="#115E59" fontSize="8">Bacteriocins count</text>
                <text x="535" y="80" textAnchor="middle" fill="#115E59" fontSize="8" fontFamily="monospace" fontWeight="bold">BIOPRESERVATIVE</text>
              </svg>
            )}

            {selectedThemeId === 'theme-8' && (
              <svg width="600" height="120" viewBox="0 0 600 120" className="w-full max-w-2xl shrink-0">
                <rect x="10" y="25" width="100" height="70" rx="8" fill="#D97706" fillOpacity="0.1" stroke="#D97706" strokeWidth="2" />
                <text x="60" y="58" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">Plant Extract</text>
                <text x="60" y="74" textAnchor="middle" fill="#78350F" fontSize="8" fontFamily="monospace">REDUCING AGENT</text>

                <line x1="110" y1="60" x2="160" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="160,60 152,56 152,64" fill="#64748B" />

                <rect x="160" y="25" width="110" height="70" rx="8" fill="#D97706" fillOpacity="0.15" stroke="#D97706" strokeWidth="2" />
                <text x="215" y="54" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">1mM AgNO3 Mix</text>
                <text x="215" y="68" textAnchor="middle" fill="#78350F" fontSize="8">Stirring at 60°C</text>
                <text x="215" y="80" textAnchor="middle" fill="#78350F" fontSize="8" fontFamily="monospace">GREEN SYNTHESIS</text>

                <line x1="270" y1="60" x2="320" y2="60" stroke="#CBD5E1" strokeWidth="2" />
                <polygon points="320,60 312,56 312,64" fill="#64748B" />

                <rect x="320" y="25" width="110" height="70" rx="8" fill="#D97706" fillOpacity="0.2" stroke="#D97706" strokeWidth="2" />
                <text x="375" y="54" textAnchor="middle" fill="#78350F" fontSize="10" fontWeight="bold">Spectrometer</text>
                <text x="375" y="68" textAnchor="middle" fill="#78350F" fontSize="8">LSPR Plasmon peak 430nm</text>
                <text x="375" y="80" textAnchor="middle" fill="#78350F" fontSize="8" fontFamily="monospace">CHARACTERIZATION</text>

                <line x1="430" y1="60" x2="480" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 2" />
                <polygon points="480,60 472,56 472,64" fill="#64748B" />

                <rect x="480" y="25" width="110" height="70" rx="8" fill="#0D9488" fillOpacity="0.15" stroke="#0D9488" strokeWidth="2" />
                <text x="535" y="54" textAnchor="middle" fill="#115E59" fontSize="10" fontWeight="bold">Synergy Testing</text>
                <text x="535" y="68" textAnchor="middle" fill="#115E59" fontSize="8">AgNP membrane breach</text>
                <text x="535" y="80" textAnchor="middle" fill="#115E59" fontSize="8" fontFamily="monospace" fontWeight="bold">ANTIMICROBIAL</text>
              </svg>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
