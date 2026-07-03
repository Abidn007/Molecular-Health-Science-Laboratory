import { Microscope, Award, Globe, Heart } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Heart className="w-5 h-5 text-teal" />,
      title: 'One Health Strategy',
      desc: 'Integrating human diagnostics, animal husbandry surveillance, and soil/crop metagenomics to map resistance patterns across environments.',
    },
    {
      icon: <Globe className="w-5 h-5 text-teal" />,
      title: 'Ecological Awareness',
      desc: 'Developing biological, non-chemical alternatives such as PGPR biofertilizers to mitigate heavy metal stress in industrial farming zones.',
    },
    {
      icon: <Microscope className="w-5 h-5 text-teal" />,
      title: 'Translational Science',
      desc: 'Bridging fundamental bacterial physiology with actual clinical, clinical-diagnostic, and biotherapeutic utility.',
    },
    {
      icon: <Award className="w-5 h-5 text-teal" />,
      title: 'Student Training',
      desc: 'Cultivating laboratory standards, biosafety awareness, and antibiotic sensitivity assay validation among Genetic Engineering graduates.',
    },
  ];

  const equipment = [
    { name: 'Thermal Cycler (PCR)', use: 'Target genomic DNA amplification and resistance gene surveillance.' },
    { name: 'Biosafety Cabinet Class II', use: 'Aseptic inoculation, culture purification, and clinical pathogen isolation.' },
    { name: 'High-Speed Refrigerated Centrifuge', use: 'Sample sedimentation, cell harvesting, and biochemical purification.' },
    { name: 'Semiautomatic Autoclave', use: 'Sterilization of microbiological media and biological waste decontamination.' },
    { name: 'Incubator Shaker', use: 'Bacterial cultivation, growth kinetics assays, and enzyme production.' },
    { name: 'UV Transilluminator & Gel Rig', use: 'Visualization of PCR products, molecular markers, and gel electrophoresis.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16" id="about-page">
      
      {/* Intro Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-teal font-bold font-semibold">Institutional Foundation</span>
          <h1 className="text-3xl sm:text-5xl font-bold text-teal-deep font-serif leading-tight">
            Molecular Health Science Laboratory
          </h1>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            The <strong>Molecular Health Science Laboratory (MHSL)</strong> is a multidisciplinary research laboratory focused on microbiology, molecular biology, biotechnology, and health sciences. Our work explores microorganisms and their roles in human, animal, plant, and environmental health, with research spanning clinical microbiology, agricultural and plant health microbiology, environmental microbiology, food safety, antimicrobial resistance, and natural product-based antimicrobial discovery.
          </p>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            MHSL is committed to addressing emerging health challenges through innovative and translational research. We combine classical and molecular approaches to study pathogens, beneficial microbes, and bioactive natural products, while also fostering student training, research collaboration, and scientific innovation. Guided by the <strong>One Health</strong> concept, we aim to develop evidence-based solutions that support public health, sustainable development, and global scientific advancement.
          </p>
        </div>

        {/* Visual Venn Diagram */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-sm aspect-square bg-teal-pale/25 border border-line p-8 rounded-full flex items-center justify-center">
            
            {/* Human Circle */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-teal/20 border border-teal/40 flex flex-col items-center justify-center text-center p-2">
              <span className="font-mono text-[9px] font-bold text-teal-deep">HUMAN</span>
              <span className="text-[10px] text-ink-soft mt-0.5">Clinical Diagnostics</span>
            </div>

            {/* Animal Circle */}
            <div className="absolute bottom-16 left-12 w-32 h-32 rounded-full bg-gold/20 border border-gold/40 flex flex-col items-center justify-center text-center p-2">
              <span className="font-mono text-[9px] font-bold text-amber-800">ANIMAL</span>
              <span className="text-[10px] text-ink-soft mt-0.5">AMR Surveillance</span>
            </div>

            {/* Environment Circle */}
            <div className="absolute bottom-16 right-12 w-32 h-32 rounded-full bg-violet/20 border border-violet/40 flex flex-col items-center justify-center text-center p-2">
              <span className="font-mono text-[9px] font-bold text-purple-900">ENVIRONMENT</span>
              <span className="text-[10px] text-ink-soft mt-0.5">Rhizospheric PGPR</span>
            </div>

            {/* Middle overlap label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 px-2.5 py-1.5 rounded-lg border border-line text-center shadow-md">
              <span className="font-serif font-bold text-xs text-teal">One Health</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Values Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-serif font-bold text-teal-deep border-b border-line pb-2 text-center lg:text-left">
          Core Focus Objectives
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, i) => (
            <div key={i} className="bg-paper border border-line p-6 rounded-2xl space-y-3">
              <div className="p-2.5 bg-teal-pale/40 rounded-xl inline-block">
                {val.icon}
              </div>
              <h4 className="font-serif font-bold text-teal-deep text-base">{val.title}</h4>
              <p className="text-xs text-ink-soft leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scientific Equipment Section */}
      <div className="space-y-6">
        <div className="text-center lg:text-left space-y-2">
          <h3 className="text-2xl font-serif font-bold text-teal-deep">Laboratory Infrastructure</h3>
          <p className="text-xs text-ink-soft">Our physical testing lab features typical diagnostic and analysis instrumentation to support student project benches.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((eq, i) => (
            <div key={i} className="bg-paper border border-line p-5 rounded-2xl space-y-1.5">
              <h4 className="font-mono text-xs font-bold text-gold uppercase">{eq.name}</h4>
              <p className="text-xs text-ink-soft leading-relaxed">{eq.use}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
