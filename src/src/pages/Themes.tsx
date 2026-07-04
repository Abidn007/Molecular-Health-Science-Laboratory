import { 
  Activity, Leaf, ShieldAlert, Sparkles, Dna, 
  Globe, FlaskConical, Zap, ArrowLeft, ArrowRight,
  ShieldCheck, HelpCircle, Layers
} from 'lucide-react';

export interface LabTest {
  name: string;
  targetSamples: string;
  materialsNeeded: string[];
  methodology: string;
  significance: string;
}

export interface ResearchThemeDetail {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: any;
  iconBg: string;
  textColor: string;
  status: 'Ongoing' | 'Active' | 'Newly Introduced' | 'Future Frontier';
  test: LabTest;
}

export const THEMES_DETAIL_DATA: ResearchThemeDetail[] = [
  {
    id: 'theme-1',
    number: 'Theme #1',
    title: 'Clinical & Infectious Disease Microbiology',
    shortDesc: 'Clinical microbiology, host–pathogen interaction, and disease mechanism–based research.',
    longDesc: 'Focusing on human infectious diseases, this theme includes the investigation of pathogenic microbes, diagnostic approaches, and a molecular understanding of infection pathways for improved clinical outcomes and therapeutic strategies.',
    icon: Activity,
    iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
    textColor: 'text-rose-600',
    status: 'Ongoing',
    test: {
      name: 'Culture-Based Phenotypic Profiling & Biochemical Fingerprinting',
      targetSamples: 'Surgical wound swabs, blood cultures, clinical urine samples, and respiratory sputum.',
      materialsNeeded: [
        'Nutrient Agar & Nutrient Broth bases',
        'Selective media (MacConkey Agar for Enterobacteriaceae, Blood Agar for hemolytic streptococci, Mannitol Salt Agar for staphylococci)',
        'Gram Staining reagent kit (Crystal Violet, Iodine, Decolorizer, Safranin)',
        'Biochemical identification tube assays (Triple Sugar Iron [TSI] Agar, Simmon\'s Citrate Agar, Urea Broth, MR-VP medium, Catalase and Oxidase tests)'
      ],
      methodology: 'Samples are aseptically inoculated using quadrant streaking to obtain pure isolated colonies. Gram status is validated via brightfield oil-immersion microscopy. Isolate physiology is confirmed by inoculating a battery of biochemical differential tubes and reading metabolic end-products after 24-hour incubation.',
      significance: 'Critical for establishing the accurate identity of hospital-acquired infection (HAI) etiology prior to therapeutic intervention.'
    }
  },
  {
    id: 'theme-2',
    number: 'Theme #2',
    title: 'Agricultural & Plant Health Microbiology',
    shortDesc: 'Plant–microbe interactions, soil microbiology, and agricultural pathogen research.',
    longDesc: 'Aimed at improving crop health and productivity. This area focuses on beneficial microbes, plant disease control, and sustainable agricultural biotechnology solutions for ecological balance.',
    icon: Leaf,
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    textColor: 'text-emerald-600',
    status: 'Ongoing',
    test: {
      name: 'In Vitro Screening of Plant Growth-Promoting Rhizobacteria (PGPR)',
      targetSamples: 'Rhizospheric soil from crop root zones (e.g., Maize [Zea mays], sonali rice rhizosphere).',
      materialsNeeded: [
        'Pikovskaya’s Agar (for inorganic phosphate solubilization)',
        'NBRIP (National Botanical Research Institute\'s Phosphate) growth medium',
        'Chrome Azurol S (CAS) Agar plates (for iron-binding Siderophore detection)',
        'Salkowski Reagent & L-Tryptophan broth (for Indole-3-Acetic Acid [IAA] production)',
        'Ashby\'s Nitrogen-Free medium (for free-living nitrogen fixation)'
      ],
      methodology: 'Rhizospheric isolates are spot-inoculated onto Pikovskaya and CAS agar plates and incubated for 5-7 days to monitor clear halo zones. IAA biosynthesis is screened by cultivating strains in nutrient broth supplemented with L-tryptophan, reacting the culture supernatant with Salkowski reagent, and quantifying pink-chromophore absorbance at 530nm.',
      significance: 'Identifies robust bio-inoculants that can act as eco-friendly alternatives to chemical N-P-K fertilizers.'
    }
  },
  {
    id: 'theme-3',
    number: 'Theme #3',
    title: 'Antimicrobial Resistance & One Health',
    shortDesc: 'Investigation of antimicrobial resistance (AMR) in clinical, environmental, and agricultural settings.',
    longDesc: 'Conducted under the integrated One Health framework. This includes resistance gene profiling, active surveillance of resistant pathogens, and integrated strategies linking human, animal, and environmental health.',
    icon: ShieldAlert,
    iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
    textColor: 'text-amber-600',
    status: 'Ongoing',
    test: {
      name: 'Kirby-Bauer Disk Diffusion & Minimum Inhibitory Concentration (MIC) Profiling',
      targetSamples: 'Raw poultry chicken meat swabs (broiler, layer), local aquatic drains, and tannery effluents.',
      materialsNeeded: [
        'Mueller-Hinton Agar (MHA) plates and Mueller-Hinton Broth (MHB)',
        'Standard antibiotic paper discs (Imipenem, Colistin, Ciprofloxacin, Azithromycin, Kanamycin, Vancomycin)',
        '0.5 McFarland turbidity standard solution',
        'Sterile physiological saline and disposable inoculating loops',
        'Vernier calipers for high-precision inhibition zone measurement'
      ],
      methodology: 'Bacterial colonies are suspended in sterile saline to match 0.5 McFarland turbidity. This suspension is uniformly spread onto MHA plates. Antibiotic discs are placed using sterile forceps. After 18-24 hours incubation at 37°C, the diameters of inhibition zones are measured and classified as Resistant, Intermediate, or Susceptible based on clinical standards.',
      significance: 'Maps multidrug resistance transmission routes between animal farming environments, aquatic channels, and human clinical communities.'
    }
  },
  {
    id: 'theme-4',
    number: 'Theme #4',
    title: 'Natural Therapeutics & Antimicrobial Discovery',
    shortDesc: 'Discovery and characterization of bioactive compounds from natural sources.',
    longDesc: 'Sourcing compounds from plants, microbes, and biological systems. Research includes antimicrobial, anticancer, and pharmacological screening along with molecular mechanism studies for sustainable drug development.',
    icon: Sparkles,
    iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
    textColor: 'text-purple-600',
    status: 'Active',
    test: {
      name: 'Bio-Guided Solvent Extraction & Microtiter Biofilm Inhibition Assay',
      targetSamples: 'Indigenous medicinal plants (e.g., Nicotiana bioactives, Neem, Turmeric) and soil-isolated actinomycete broths.',
      materialsNeeded: [
        'Organic extraction solvents (Methanol, Ethanol, Ethyl Acetate)',
        'Rotary evaporator and syringe filters (0.22µm)',
        'Sterile flat-bottom 96-well microtiter plates',
        '0.1% Crystal Violet aqueous dye solution',
        '95% Ethanol or 30% Acetic Acid for biofilm solubilization',
        'Microplate ELISA reader (absorbance scanned at 595nm)'
      ],
      methodology: 'Phytoconstituents are extracted, filtered, and serially diluted inside 96-well plates containing biofilm-producing pathogens (e.g., Pseudomonas aeruginosa). Post-incubation, planktonic cells are washed away. Adherent biofilms are fixed, stained with crystal violet, solubilized, and scanned to evaluate biofilm inhibition rates compared to untreated controls.',
      significance: 'Identifies novel therapeutic compounds that selectively disrupt bacterial quorum-sensing or biofilm structures without exerting pressure for resistance.'
    }
  },
  {
    id: 'theme-5',
    number: 'Theme #5',
    title: 'Applied Molecular Microbiology',
    shortDesc: 'Application of molecular biology tools in microbiology for identification and functional analysis.',
    longDesc: 'Using advanced techniques for the characterization and functional analysis of microorganisms. This includes genomics, gene expression studies, enzyme production, and molecular diagnostics for applied and translational research.',
    icon: Dna,
    iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
    textColor: 'text-blue-600',
    status: 'Active',
    test: {
      name: 'PCR Genomic Amplification of Critical Resistance Genes & Plasmid Profiling',
      targetSamples: 'Purified genomic DNA and plasmid extracts from extreme-drug-resistant (XDR) bacterial hosts.',
      materialsNeeded: [
        'Commercial Bacterial Genomic DNA & Plasmid Mini-Extraction kits',
        'Specific PCR primers (targeting resistance genes like blaNDM-1, mcr-1, or blaCTX-M)',
        'Taq DNA Polymerase Master Mix (Buffer, dNTPs, Polymerase)',
        'Thermal Cycler instrument with high-precision heating blocks',
        'Agarose powder, TAE Buffer, GelRed dye, and a 100bp Molecular DNA Ladder',
        'Horizontal gel electrophoresis rig and UV Transilluminator gel-doc system'
      ],
      methodology: 'Purified DNA is combined with reaction master mix and primers inside micro-vials. PCR is executed (initial denaturation at 95°C, 30 cycles of denaturation, primer annealing at optimized temperatures, and extension at 72°C). Amplicons are analyzed via 1.5% agarose gel electrophoresis at 100V, stained, and bands visualized under UV light.',
      significance: 'Provides definitive genomic confirmation of superbug resistance mechanisms, bypassing standard slow culture confirmation.'
    }
  },
  {
    id: 'theme-6',
    number: 'Theme #6',
    title: 'Environmental Metagenomics & Heavy Metal Bioremediation',
    shortDesc: 'Bioprospecting metal-tolerant PGPRs to remediate toxic industrial zone agricultural soils.',
    longDesc: 'Designed to target severe soil contamination in industrial zones (e.g., Savar, Dhaka, and Rajshahi). Strains are optimized under high salinity and heavy-metal stress to actively absorb, chelate, or precipitate toxic cations, protecting crops.',
    icon: Globe,
    iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    textColor: 'text-cyan-600',
    status: 'Newly Introduced',
    test: {
      name: 'Atomic Absorption Spectroscopy (AAS) Validation of Bacterial Heavy Metal Sorption',
      targetSamples: 'Industrial tannery wastewater effluents and contaminated agricultural rhizosphere samples.',
      materialsNeeded: [
        'Heavy metal stock salts (Cadmium Chloride [CdCl2], Lead Nitrate [Pb(NO3)2], Manganese Sulfate [MnSO4])',
        'Luria-Bertani (LB) nutrient broth adjusted to varying salinity (0.5% to 5% NaCl)',
        'High-speed refrigerated centrifuge',
        'Concentrated Nitric Acid (HNO3) for cell digestion',
        'Flame Atomic Absorption Spectrophotometer (AAS)'
      ],
      methodology: 'Metal-tolerant bacterial isolates (e.g., Iso-6, Iso-8) are cultivated in broth spiked with heavy metals. Post-incubation, cultures are centrifuged to separate cell pellets from supernatant. Cells are washed, digested with hot nitric acid, and analyzed via AAS to calculate exact bio-sorption efficiency and intracellular metal accumulation.',
      significance: 'Enables safe, low-cost bio-remediation of crop fields irrigated with toxic industrial tannery wastewater.'
    }
  },
  {
    id: 'theme-7',
    number: 'Theme #7',
    title: 'Bacterial Biocontrol & Probiotic Biotechnology',
    shortDesc: 'Isolation, characterization, and application of beneficial bacteria for biocontrol and probiotics.',
    longDesc: 'This theme focuses on exploring beneficial, non-pathogenic bacteria (such as Lactic Acid Bacteria, Lactobacillus, and Bacillus subtilis) from fermented foods and organic sources to act as biocontrol agents against pathogens, enhance gut health, and produce therapeutic bacteriocins, completely avoiding viral agents.',
    icon: FlaskConical,
    iconBg: 'bg-violet-50 text-violet-600 border-violet-200',
    textColor: 'text-violet-600',
    status: 'Newly Introduced',
    test: {
      name: 'In Vitro Probiotic Characterization and Antibacterial Bacteriocin Assay of Lactic Acid Bacteria (LAB)',
      targetSamples: 'Fermented traditional yogurt, organic milk kefir, and plant rhizosphere samples.',
      materialsNeeded: [
        'MRS (de Man, Rogosa and Sharpe) selective growth agar and broth',
        'Simulated Gastric Fluid (SGF, pH 2.0 and 3.0) and Bile Salts (Ox-gall powder)',
        'Target indicator pathogens (Listeria monocytogenes, Salmonella enterica, Escherichia coli)',
        'High-speed refrigerated centrifuge and sterile 0.22µm nylon membrane filters',
        'Sterile cork borers and nutrient agar plates for agar well diffusion assay'
      ],
      methodology: 'Isolates are screen-tested for gastric transit survival by incubating in SGF (pH 2.0) and MRS broth with 0.3% bile salts for 3 hours, measuring colony viability. Antagonistic bacteriocin action is verified by centrifuging LAB cultures, filtering cell-free supernatant (neutralized to pH 6.5 with NaOH), pouring it into wells of pathogen-seeded agar plates, and measuring the resulting inhibition zones.',
      significance: 'Establishes robust, indigenous food-grade bacterial probiotic strains capable of inhibiting gastrointestinal pathogens and serving as natural food bio-preservatives.'
    }
  },
  {
    id: 'theme-8',
    number: 'Theme #8',
    title: 'Nanotechnology & Green Synthesized Antimicrobials',
    shortDesc: 'Phyto-mediated synthesis of metal nanoparticles and evaluation of antibiotic synergistic action.',
    longDesc: 'Combines botany with particle physics. Active organic molecules in medicinal plant leaves act as natural reducing agents, turning metal salts into sub-100nm silver or zinc nanoparticles that carry exceptional physical cell-disrupting forces.',
    icon: Zap,
    iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
    textColor: 'text-amber-600',
    status: 'Future Frontier',
    test: {
      name: 'Phyto-Mediated Synthesis & Spectrophotometric Characterization of Silver Nanoparticles (AgNPs)',
      targetSamples: 'Medicinal plant leaf extract supernatants combined with silver nitrate solutions.',
      materialsNeeded: [
        'Aqueous Silver Nitrate (AgNO3) solution (1mM - 5mM)',
        'Medicinal plant leaf extract (boiled in double-distilled water and filtered)',
        'UV-Visible Double-Beam Spectrophotometer (scanning 300nm - 800nm)',
        'Dynamic Light Scattering (DLS) analyzer for particle sizing',
        'Centrifugation tubes and high-speed cell pelleting machinery'
      ],
      methodology: 'Plant extract is introduced dropwise into aqueous AgNO3 solution under continuous stirring at 60°C. Nanoparticle synthesis is indicated visually by a rapid color shift from pale yellow to dark brown. Aliquots are scanned colorimetrically; a peak at 420-450nm confirms Localized Surface Plasmon Resonance (LSPR) characteristic of AgNPs.',
      significance: 'Creates biocompatible, non-toxic nanomaterials capable of breaking bacterial membrane integrity to restore the potency of obsolete antibiotics.'
    }
  }
];

interface ThemesProps {
  setActivePage: (page: string) => void;
  setSelectedThemeId: (id: string) => void;
}

export default function Themes({ setActivePage, setSelectedThemeId }: ThemesProps) {

  const handleSelectTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
    localStorage.setItem('selectedThemeId', themeId);
    setActivePage('theme-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="themes-detail-page">
      
      {/* Back to Home CTA */}
      <div className="flex justify-between items-center border-b border-line pb-4">
        <button
          onClick={() => setActivePage('home')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal hover:text-teal-deep transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO HOMEPAGE
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
          <span className="text-[10px] font-mono text-ink-faint uppercase font-bold tracking-wider">MHSL LAB MANUAL CONNECTED</span>
        </div>
      </div>

      {/* Header and Hero Segment */}
      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-teal font-bold bg-teal-pale px-3 py-1 rounded-full">
          Scientific Pillars &amp; Frontiers
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-teal-deep font-serif leading-none" id="themes-heading-main">
          Research Themes
        </h1>
        <p className="text-sm sm:text-base text-ink-soft max-w-4xl leading-relaxed font-sans">
          The Molecular Health Science Laboratory carries out its multidisciplinary missions under structured scientific themes. Below is our comprehensive directory of our five main core pillars and three newly introduced research frontiers. Click any card below to explore standard experimental protocols, essential laboratory checklists, and run interactive virtual assays.
        </p>
      </div>

      {/* Grid of Theme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="themes-grid-container">
        {THEMES_DETAIL_DATA.map((theme) => {
          const ThemeIcon = theme.icon;
          
          let statusBadgeBg = '';
          if (theme.status === 'Ongoing') statusBadgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-100';
          else if (theme.status === 'Active') statusBadgeBg = 'bg-blue-50 text-blue-700 border-blue-100';
          else if (theme.status === 'Newly Introduced') statusBadgeBg = 'bg-cyan-50 text-cyan-700 border-cyan-100';
          else statusBadgeBg = 'bg-purple-50 text-purple-700 border-purple-100';

          return (
            <button
              key={theme.id}
              onClick={() => handleSelectTheme(theme.id)}
              className="w-full text-left bg-paper border border-line rounded-2xl p-5 hover:border-teal hover:shadow-md transition-all flex flex-col justify-between focus:outline-none cursor-pointer group"
            >
              <div className="space-y-4 w-full">
                {/* Header line */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gold uppercase tracking-wider">{theme.number}</span>
                  <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${statusBadgeBg}`}>
                    {theme.status}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-3.5">
                  <div className={`p-3 rounded-xl border shrink-0 transition-transform group-hover:scale-105 ${theme.iconBg}`}>
                    <ThemeIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-teal-deep leading-tight group-hover:text-teal transition-colors">
                    {theme.title}
                  </h3>
                </div>

                {/* Short desc */}
                <p className="text-xs text-ink-soft leading-relaxed line-clamp-3">
                  {theme.longDesc}
                </p>
              </div>

              {/* Footer CTA */}
              <div className="pt-5 mt-5 border-t border-line/45 flex items-center justify-between w-full text-xs font-mono font-bold text-teal group-hover:text-teal-deep">
                <span>EXPLORE PROTOCOL &amp; SIMULATOR</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Safety Compliance Warning card */}
      <div className="bg-bg-alt border border-line p-6 rounded-2xl flex flex-col sm:flex-row gap-4 items-start">
        <div className="p-3 bg-teal-pale border border-teal/20 rounded-xl shrink-0 text-teal-deep">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-serif font-bold text-sm sm:text-base text-teal-deep">
            BSL-2 Biosafety &amp; Standard Laboratory Compliance
          </h4>
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed max-w-4xl">
            All listed research protocols and virtual assays are executed inside the Molecular Health Science Laboratory under strict Biosafety Level 2 (BSL-2) mandates. Solid/liquid bio-waste autoclaving, disinfectant treatment, laminar hood execution, and mandatory personal protective equipment are required for all student thesis projects.
          </p>
        </div>
      </div>

    </div>
  );
}
