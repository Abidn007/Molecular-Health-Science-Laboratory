import { useState, useEffect } from 'react';
import { ArrowRight, Beaker, ShieldCheck, Microscope, Database, Sparkles, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RESEARCH_THEMES, NEWS_ITEMS } from '../data';

interface HomeProps {
  setActivePage: (page: string) => void;
  setSelectedThemeId: (id: string) => void;
}

interface Colony {
  id: string;
  label: string;
  fullName: string;
  category: string;
  description: string;
  colorClass: string;
  sizeClass: string;
}

const ALL_COLONIES: Colony[] = [
  {
    id: 'colony-1',
    label: 'Kp',
    fullName: 'Klebsiella pneumoniae',
    category: 'Pathogen Isolate',
    description: 'Opportunistic respiratory pathogen studied for multi-drug resistance under Theme #1.',
    colorClass: 'bg-gradient-to-br from-cyan-300 via-teal to-teal-deep border-teal-200/50 text-white shadow-[0_5px_12px_rgba(13,148,136,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-10 h-10 text-[10px]'
  },
  {
    id: 'colony-2',
    label: 'Rh',
    fullName: 'Rhizobium leguminosarum',
    category: 'Plant Symbiont',
    description: 'Nitrogen-fixing symbiotic nodule root bacterium evaluated under Theme #2.',
    colorClass: 'bg-gradient-to-br from-amber-300 via-gold to-orange-700 border-amber-200/50 text-white shadow-[0_5px_12px_rgba(234,88,12,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-9 h-9 text-[10px]'
  },
  {
    id: 'colony-3',
    label: 'Bs',
    fullName: 'Bacillus subtilis',
    category: 'Bioremediator',
    description: 'Spore-forming PGPR strain optimized for heavy metal absorption under Theme #2.',
    colorClass: 'bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-800 border-emerald-200/50 text-white shadow-[0_5px_12px_rgba(16,185,129,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-11 h-11 text-[11px]'
  },
  {
    id: 'colony-4',
    label: 'Pa',
    fullName: 'Pseudomonas aeruginosa',
    category: 'Biofilm Producer',
    description: 'Extracellular matrix & biofilm study isolated from environmental soils (Theme #4).',
    colorClass: 'bg-gradient-to-br from-cyan-400 via-cyan-600 to-sky-800 border-cyan-200/50 text-white shadow-[0_5px_12px_rgba(6,182,212,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-10 h-10 text-[10px]'
  },
  {
    id: 'colony-5',
    label: 'Sa',
    fullName: 'Staphylococcus aureus',
    category: 'MRSA Strain',
    description: 'Methicillin-resistant strain monitored for public health surveillance under Theme #1.',
    colorClass: 'bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-600 border-yellow-100/50 text-teal-deep shadow-[0_5px_12px_rgba(234,179,8,0.35),inset_0_2px_4px_rgba(255,255,255,0.5)]',
    sizeClass: 'w-8 h-8 text-[9px]'
  },
  {
    id: 'colony-6',
    label: 'Ec',
    fullName: 'Escherichia coli (AMR)',
    category: 'Indicator Organism',
    description: 'Multidrug-resistant indicator strain showing 4G/5G beta-lactamase resistance (Theme #3).',
    colorClass: 'bg-gradient-to-br from-red-400 via-red-600 to-rose-900 border-red-300/50 text-white shadow-[0_5px_12px_rgba(220,38,38,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-11 h-11 text-[10px]'
  },
  {
    id: 'colony-7',
    label: 'Nt',
    fullName: 'Nicotiana bioactives',
    category: 'Plant Extract',
    description: 'Phyto-chemical extract screened for therapeutic and biofilm inhibition under Theme #4.',
    colorClass: 'bg-gradient-to-br from-purple-400 via-violet to-violet-deep border-purple-300/50 text-white shadow-[0_5px_12px_rgba(139,92,246,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-9 h-9 text-[10px]'
  },
  {
    id: 'colony-8',
    label: '🧬',
    fullName: 'Plasmid pUC19',
    category: 'Genetic Marker',
    description: 'Standard cloning vector used for sub-cloning and diagnostic profiling under Theme #5.',
    colorClass: 'bg-gradient-to-br from-blue-300 via-blue-600 to-indigo-900 border-blue-200/50 text-white shadow-[0_5px_12px_rgba(37,99,235,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-7 h-7 text-[8px]'
  },
  {
    id: 'colony-9',
    label: 'Se',
    fullName: 'Salmonella enterica',
    category: 'Foodborne Pathogen',
    description: 'Clinical poultry isolate assessed for virulence plasmids & genomic pathogenicity islands.',
    colorClass: 'bg-gradient-to-br from-orange-300 via-orange-500 to-red-700 border-orange-200/50 text-white shadow-[0_5px_12px_rgba(249,115,22,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-9 h-9 text-[10px]'
  },
  {
    id: 'colony-10',
    label: 'Az',
    fullName: 'Azotobacter chroococcum',
    category: 'Biofertilizer',
    description: 'Free-living nitrogen-fixing bacterium analyzed for soil conditioning capacity.',
    colorClass: 'bg-gradient-to-br from-amber-200 via-amber-500 to-amber-800 border-amber-100/50 text-white shadow-[0_5px_12px_rgba(245,158,11,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-10 h-10 text-[10px]'
  },
  {
    id: 'colony-11',
    label: 'Lm',
    fullName: 'Listeria monocytogenes',
    category: 'Foodborne Strain',
    description: 'Bio-safety level 2 sentinel strain utilized for thermal tolerance validation assays.',
    colorClass: 'bg-gradient-to-br from-pink-300 via-pink-500 to-rose-700 border-pink-200/50 text-white shadow-[0_5px_12px_rgba(236,72,153,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-8 h-8 text-[9px]'
  },
  {
    id: 'colony-12',
    label: 'Cc',
    fullName: 'Caulobacter crescentus',
    category: 'Model Organism',
    description: 'Asymmetric cell division and flagellar pole development model host under Theme #5.',
    colorClass: 'bg-gradient-to-br from-sky-300 via-indigo-500 to-indigo-800 border-sky-200/50 text-white shadow-[0_5px_12px_rgba(99,102,241,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-9 h-9 text-[9px]'
  },
  {
    id: 'colony-13',
    label: 'At',
    fullName: 'Agrobacterium tumefaciens',
    category: 'Plant Vector',
    description: 'Natural genetic engineer used to introduce defense plasmids in model crop targets.',
    colorClass: 'bg-gradient-to-br from-lime-300 via-emerald-600 to-emerald-900 border-lime-200/50 text-white shadow-[0_5px_12px_rgba(16,185,129,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-10 h-10 text-[10px]'
  },
  {
    id: 'colony-14',
    label: 'Vc',
    fullName: 'Vibrio cholerae',
    category: 'Aquatic Pathogen',
    description: 'Toxigenic environmental isolate screened via real-time genomic PCR primers.',
    colorClass: 'bg-gradient-to-br from-teal-300 via-cyan-500 to-blue-700 border-teal-200/50 text-white shadow-[0_5px_12px_rgba(6,182,212,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-11 h-11 text-[11px]'
  },
  {
    id: 'colony-15',
    label: 'Mr',
    fullName: 'Micrococcus luteus',
    category: 'Environmental Host',
    description: 'High-GC Gram-positive biosafety benchmark strain used for disinfectant sensitivity charts.',
    colorClass: 'bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 border-yellow-50 text-teal-deep shadow-[0_5px_12px_rgba(234,179,8,0.35),inset_0_2px_4px_rgba(255,255,255,0.5)]',
    sizeClass: 'w-8 h-8 text-[9px]'
  },
  {
    id: 'colony-16',
    label: 'Sm',
    fullName: 'Serratia marcescens',
    category: 'Pigmented Isolate',
    description: 'Prodigiosin red pigment biosynthesis model tested for secondary metabolite yields.',
    colorClass: 'bg-gradient-to-br from-red-500 via-red-700 to-red-950 border-red-400/50 text-white shadow-[0_5px_12px_rgba(185,28,28,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-10 h-10 text-[10px]'
  },
  {
    id: 'colony-17',
    label: 'Hi',
    fullName: 'Haemophilus influenzae',
    category: 'Respiratory Pathogen',
    description: 'Fastidious encapsulated clinical strain monitored for capsular antigen transformation.',
    colorClass: 'bg-gradient-to-br from-fuchsia-400 via-purple-600 to-purple-900 border-fuchsia-300/50 text-white shadow-[0_5px_12px_rgba(147,51,234,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-9 h-9 text-[10px]'
  },
  {
    id: 'colony-18',
    label: 'Ab',
    fullName: 'Acinetobacter baumannii',
    category: 'ESKAPE Pathogen',
    description: 'Extreme drug resistant ventilator-associated strain profiled via genomics.',
    colorClass: 'bg-gradient-to-br from-slate-300 via-slate-500 to-slate-800 border-slate-200/50 text-white shadow-[0_5px_12px_rgba(100,116,139,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-10 h-10 text-[10px]'
  },
  {
    id: 'colony-19',
    label: 'Pf',
    fullName: 'Pseudomonas fluorescens',
    category: 'Biocontrol Agent',
    description: 'Siderophore-producing rhizobacterium suppressing fungal root damping-off diseases.',
    colorClass: 'bg-gradient-to-br from-green-300 via-teal-500 to-teal-800 border-green-200/50 text-white shadow-[0_5px_12px_rgba(20,184,166,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-10 h-10 text-[10px]'
  },
  {
    id: 'colony-20',
    label: 'Ll',
    fullName: 'Lactococcus lactis',
    category: 'Fermentation Host',
    description: 'Safe bacteriocin-producing fermenter tested for antimicrobial peptide secretion.',
    colorClass: 'bg-gradient-to-br from-lime-300 via-lime-500 to-green-700 border-lime-200/50 text-teal-deep shadow-[0_5px_12px_rgba(132,204,22,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-9 h-9 text-[10px]'
  },
  {
    id: 'colony-21',
    label: 'Bt',
    fullName: 'Bacillus thuringiensis',
    category: 'Bioinsecticide',
    description: 'Crystal endotoxin-producing soil isolate evaluated against agronomic pests.',
    colorClass: 'bg-gradient-to-br from-emerald-400 via-green-600 to-green-900 border-emerald-300/50 text-white shadow-[0_5px_12px_rgba(22,163,74,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-10 h-10 text-[10px]'
  },
  {
    id: 'colony-22',
    label: 'K2',
    fullName: 'Klebsiella pneumoniae NDM-1',
    category: 'Superbug Sentinel',
    description: 'New Delhi metallo-beta-lactamase producer studied for therapeutic bacteriophage susceptibility.',
    colorClass: 'bg-gradient-to-br from-pink-400 via-fuchsia-600 to-fuchsia-950 border-pink-300/50 text-white shadow-[0_5px_12px_rgba(217,70,239,0.35),inset_0_2px_4px_rgba(255,255,255,0.4)]',
    sizeClass: 'w-11 h-11 text-[11px]'
  }
];

const DISH_POSITIONS = [
  { top: '22%', left: '30%' },
  { top: '25%', left: '55%' },
  { top: '22%', left: '74%' },
  { top: '38%', left: '22%' },
  { top: '35%', left: '46%' },
  { top: '38%', left: '76%' },
  { top: '54%', left: '26%' },
  { top: '52%', left: '56%' },
  { top: '56%', left: '78%' },
  { top: '70%', left: '32%' },
  { top: '72%', left: '58%' },
  { top: '46%', left: '34%' }
];

interface ActiveColonyInstance {
  colony: Colony;
  posIndex: number;
}

function getRandomUniqueIndices(max: number, count: number): number[] {
  const indices: number[] = [];
  while (indices.length < count) {
    const idx = Math.floor(Math.random() * max);
    if (!indices.includes(idx)) {
      indices.push(idx);
    }
  }
  return indices;
}

export default function Home({ setActivePage, setSelectedThemeId }: HomeProps) {
  const [activeInstances, setActiveInstances] = useState<ActiveColonyInstance[]>(() => {
    const colonyIndices = getRandomUniqueIndices(ALL_COLONIES.length, 5);
    const posIndices = getRandomUniqueIndices(DISH_POSITIONS.length, 5);
    return colonyIndices.map((cIdx, i) => ({
      colony: ALL_COLONIES[cIdx],
      posIndex: posIndices[i]
    }));
  });

  const [selectedColony, setSelectedColony] = useState<Colony | null>(null);

  // Set the first colony as selected initially
  useEffect(() => {
    if (activeInstances.length > 0 && !selectedColony) {
      setSelectedColony(activeInstances[0].colony);
    }
  }, [activeInstances, selectedColony]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInstances((prev) => {
        if (prev.length === 0) return [];
        
        // Pick a random slot to replace (0 to 4)
        const replaceIdx = Math.floor(Math.random() * 5);
        
        // Find colonies that are NOT currently displayed
        const displayedColonyIds = prev.map((item) => item.colony.id);
        const remainingColonies = ALL_COLONIES.filter((c) => !displayedColonyIds.includes(c.id));
        
        // Find positions that are NOT currently occupied by other active instances
        const activePosIndices = prev.filter((_, idx) => idx !== replaceIdx).map((item) => item.posIndex);
        const remainingPosIndices = DISH_POSITIONS.map((_, idx) => idx).filter((idx) => !activePosIndices.includes(idx));
        
        if (remainingColonies.length === 0 || remainingPosIndices.length === 0) return prev;
        
        // Pick a random colony and position from the pools
        const nextColony = remainingColonies[Math.floor(Math.random() * remainingColonies.length)];
        const nextPosIndex = remainingPosIndices[Math.floor(Math.random() * remainingPosIndices.length)];
        
        const next = [...prev];
        next[replaceIdx] = {
          colony: nextColony,
          posIndex: nextPosIndex
        };
        return next;
      });
    }, 4000); // Shuffles one colony every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Maintain valid selection if the current selected colony gets shuffled out
  useEffect(() => {
    if (selectedColony && !activeInstances.some((item) => item.colony.id === selectedColony.id)) {
      if (activeInstances.length > 0) {
        setSelectedColony(activeInstances[0].colony);
      }
    }
  }, [activeInstances, selectedColony]);

  const stats = [
    { value: '5', label: 'Active Themes', sub: 'Clinical to Agro-microbiology' },
    { value: '13+', label: 'Researchers Trained', sub: 'PhDs to Undergraduates' },
    { value: '100%', label: 'One Health Focus', sub: 'Integrated eco-health logic' },
    { value: '84%', label: 'Metal Clearance', sub: 'PGPR bio-remediation efficiency' },
  ];

  return (
    <div className="space-y-20 pb-16" id="home-page-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-2 md:pt-4 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="hero-segment">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="space-y-6 lg:col-span-7">
            {/* High-impact branded laboratory banner inspired by MBPSL design */}
            <div className="py-4 space-y-4" id="mhsl-hero-banner">
              <div className="space-y-3">
                {/* Full name above the acronym */}
                <h3 className="text-xs sm:text-sm font-extrabold text-teal tracking-wider uppercase font-sans">
                  Molecular Health Science Laboratory
                </h3>

                {/* Big Short Name */}
                <h2 className="text-5xl sm:text-7xl font-black text-teal-deep tracking-widest font-sans uppercase leading-none">
                  MHSL
                </h2>

                {/* Matching solid color divider line */}
                <div className="w-20 h-1 bg-teal rounded-full" />

                {/* Greeting below */}
                <p className="text-xs sm:text-sm text-ink-soft font-medium leading-relaxed max-w-xl">
                  Welcome to the official website of Molecular Health Science Laboratory, University of Rajshahi.
                </p>
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-teal-deep leading-tight">
              Reading the microbial story behind <em className="text-gold font-normal italic">human, animal & plant health.</em>
            </h1>
            
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-2xl">
              At the Molecular Health Science Laboratory, we combine classical bench microbiology with modern genomic diagnostics to solve disease transmission, boost agricultural yields, and discover next-generation bio-therapeutics.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  localStorage.setItem('selectedThemeId', 'theme-1');
                  setActivePage('themes');
                }}
                className="inline-flex items-center gap-2 bg-teal hover:bg-teal-deep text-white font-semibold py-3 px-6 rounded-full text-sm shadow-md transition-all cursor-pointer hover:-translate-y-0.5"
              >
                Explore Research Themes
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePage('services')}
                className="inline-flex items-center gap-2 bg-paper hover:bg-bg-alt text-ink-soft font-semibold py-3 px-6 rounded-full text-sm border border-line transition-all cursor-pointer hover:-translate-y-0.5"
              >
                Services &amp; Quote Request
              </button>
            </div>
          </div>

          {/* Interactive Petri Dish Colony Graphic */}
          <div className="flex flex-col justify-center items-center lg:col-span-5 relative" id="petri-dish-section">
            {/* Pick your colonies instructional badge */}
            <div className="mb-4 bg-teal-pale border border-teal/25 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[0_2px_10px_rgba(13,148,136,0.1)] z-40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
              </span>
              <span className="text-[11px] font-extrabold tracking-wider font-mono text-teal-deep uppercase">
                🧫 Pick your colonies
              </span>
            </div>

            <div className="w-72 h-72 sm:w-96 sm:h-96 relative rounded-full flex items-center justify-center p-4 shadow-[0_25px_60px_rgba(30,58,138,0.15)] bg-white/5" id="petri-dish-container">
              
              {/* Outer Spinning Metrics Ring - purely decorative and diagnostic */}
              <div className="absolute -inset-3 border-2 border-dashed border-teal/15 rounded-full spin-slow pointer-events-none" style={{ animationDuration: '45s' }} />
              
              {/* Thick 3D Plastic Petri Dish Lid Outer Rim Overlay - Crystal Clear with No Blur to keep colonies readable */}
              <div className="absolute inset-0 rounded-full border-[6px] border-slate-300/30 bg-gradient-to-tr from-white/10 via-transparent to-white/20 shadow-[inset_0_4px_12px_rgba(255,255,255,0.6),inset_0_-4px_12px_rgba(30,58,138,0.03),0_15px_30px_rgba(15,23,42,0.08)] pointer-events-none z-30" />

              {/* Petri Dish Inner Base & Agar Gel layer (realistic amber-teal nutrient agar translucency) */}
              <div className="absolute inset-[8px] rounded-full bg-gradient-to-br from-teal-pale/50 via-teal-pale/35 to-amber-100/30 overflow-hidden shadow-[inset_0_5px_15px_rgba(30,58,138,0.08)] flex items-center justify-center z-0" id="agar-layer">
                
                {/* Slow spinning organic nutrient streak markings / glares */}
                <div className="absolute inset-0 opacity-20 border border-dashed border-teal/20 rounded-full spin-slow pointer-events-none" style={{ animationDuration: '90s' }} />
                
                {/* Microscopic grid inside agar */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#1D4ED8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                
                {/* Rotating Glass Reflection Glare Layer #1 (slow clockwise) */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-60 spin-slow pointer-events-none mix-blend-screen" style={{ animationDuration: '30s' }} />
                
                {/* Rotating Glass Reflection Glare Layer #2 (slow counter-clockwise) */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/15 via-transparent to-transparent opacity-40 spin-slow pointer-events-none mix-blend-screen" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />
                
                {/* Inner glass wall depth */}
                <div className="absolute inset-1 rounded-full border border-teal/10 pointer-events-none" />
                <div className="absolute inset-8 border border-dashed border-teal/5 rounded-full pointer-events-none" />
                <div className="absolute inset-16 border border-teal/10 rounded-full pointer-events-none" />
              </div>

              {/* Clickable bacterial colonies with dynamic position and entrance animations (sharp and high contrast) */}
              <AnimatePresence>
                {activeInstances.map((instance) => {
                  const { colony, posIndex } = instance;
                  const pos = DISH_POSITIONS[posIndex];
                  if (!colony || !pos) return null;
                  return (
                    <motion.div
                      key={colony.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                      style={{ top: pos.top, left: pos.left }}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    >
                      <button
                        onClick={() => setSelectedColony(colony)}
                        className={`colony rounded-full border flex items-center justify-center font-bold shadow-md cursor-pointer transition-transform hover:scale-125 ${colony.sizeClass} ${colony.colorClass} ${
                          selectedColony?.id === colony.id ? 'ring-4 ring-amber-400 scale-110 z-25' : ''
                        }`}
                        title={`${colony.fullName} (${colony.category})`}
                      >
                        {colony.label}
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Instructions / interactive display popup */}
              <div className="absolute -bottom-6 left-0 right-0 bg-white/95 backdrop-blur-md border border-line p-3 rounded-xl shadow-lg text-center min-h-[50px] flex items-center justify-center z-40">
                {selectedColony ? (
                  <p className="text-[11px] font-semibold text-teal-deep">
                    🔬 <strong className="text-gold">{selectedColony.fullName}</strong>: {selectedColony.description}
                  </p>
                ) : (
                  <p className="text-[10px] text-ink-faint font-mono">
                    💡 CLICK THE PETRI DISH COLONIES TO SCAN TARGETS
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Board */}
      <section className="bg-bg-alt border-y border-line py-12 px-4 sm:px-6 lg:px-8" id="stats-board">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <p className="text-4xl sm:text-5xl font-bold font-serif text-teal-deep">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold font-mono">{stat.label}</p>
                <p className="text-[11px] text-ink-soft">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Showcase of Themes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="themes-showcase">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-teal font-bold">Research Snapshot</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-deep">Five Pillars of MHSL Laboratory</h2>
          <p className="text-sm text-ink-soft max-w-2xl mx-auto">
            Our projects cover diagnostic microbiology, pathogen profiling, antimicrobials from indigenous resources, and sustainable plant growth promoters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESEARCH_THEMES.map((theme) => (
            <div key={theme.id} className="bg-paper border border-line rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden hover:-translate-y-1">
              {theme.imageUrl && (
                <div className="h-44 w-full relative overflow-hidden bg-bg-alt border-b border-line">
                  <img 
                    src={theme.imageUrl} 
                    alt={theme.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-teal-deep/95 text-white font-mono text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-sm tracking-wider">
                    {theme.number}
                  </div>
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {!theme.imageUrl && (
                    <span className="font-mono text-xs font-bold text-gold uppercase">{theme.number}</span>
                  )}
                  <h3 className="text-base font-bold text-teal-deep leading-snug font-serif">{theme.title}</h3>
                  <p className="text-xs text-ink-soft leading-relaxed line-clamp-3">{theme.shortDesc}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedThemeId(theme.id);
                    localStorage.setItem('selectedThemeId', theme.id);
                    setActivePage('theme-detail');
                  }}
                  className="text-xs text-teal font-semibold flex items-center gap-1 hover:underline text-left cursor-pointer pt-2"
                >
                  Read Full Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Laboratory News & Announcements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" id="news-showcase">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-4 border-b border-line">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-teal font-bold">News &amp; Events</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-deep">Recent Laboratory Activity</h2>
          </div>
          <button
            onClick={() => setActivePage('news')}
            className="text-xs font-bold text-teal hover:underline flex items-center gap-1 cursor-pointer"
          >
            See Full News Feed
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {NEWS_ITEMS.slice(0, 2).map((news) => (
            <div key={news.id} className="bg-paper border border-line p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase font-bold text-teal bg-teal-pale px-2 py-0.5 rounded-full">
                    {news.category}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">
                    {new Date(news.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-base font-bold text-teal-deep font-serif leading-snug">{news.title}</h3>
                <p className="text-xs text-ink-soft leading-relaxed">{news.summary}</p>
              </div>
              <button
                onClick={() => setActivePage('news')}
                className="text-xs text-teal font-semibold hover:underline text-left cursor-pointer"
              >
                Read Announcement
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* University & Academic Trust Stamp */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="academic-trust-stamp">
        <div className="bg-gradient-to-r from-teal-deep via-teal to-teal-deep text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-teal-pale/20">
          {/* Decorative subtle background grid glow */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          {/* Left side: Symbol, logo, and institutional details */}
          <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <GraduationCap className="w-6 h-6 text-gold" />
            </div>
            <div className="space-y-1 text-left">
              <span className="font-mono text-[9px] font-extrabold text-gold uppercase tracking-widest block">
                Institutional Affiliation
              </span>
              <h4 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                GEB Department, University of Rajshahi
              </h4>
              <p className="text-xs text-white/80 leading-normal font-sans font-medium">
                Molecular Health Science Laboratory &bull; One Health Initiative Partner
              </p>
            </div>
          </div>

          {/* Right side: Sleek collaboration button */}
          <div className="shrink-0 w-full md:w-auto flex justify-end relative z-10">
            <button
              onClick={() => setActivePage('collaboration')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-pale text-teal-deep font-extrabold py-3 px-6 rounded-xl text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
            >
              Submit Collaboration Request
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
