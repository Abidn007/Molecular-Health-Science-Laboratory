import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Eye, X, ChevronLeft, ChevronRight, Download, Sparkles, GraduationCap, Award } from 'lucide-react';

// @ts-ignore
import mimImage from '../assets/images/mim_islam_avatar_1783099994959.jpg';

const FAREWELL_IMAGES = [
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcBb8-mhRrikMniOpX_EAKBakx-Et_vhon3ANP454si1jZKZAyhUsrlJ-YNuzCvE-vM3XTgSCY4p_O5xV-CvdsOQ07UVLVxELFm3iHpXZ1kMiRLJs_5nJo-NG9TA5Q2QNqa2OkpaMpDsG0ViMIJhLyanpzCRUvQhR8John7J4SyFqMZeAwa0uXpmTEfeg/s320/WhatsApp%20Image%202026-07-03%20at%203.28.19%20PM.jpeg",
    caption: "Group Photo: Masters Batch 2022 students celebrating their graduation milestone with peers and faculty.",
    aspect: "landscape"
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEil4pQX6N6WCjZ0w_7sZHvBdoTBprRdyOeXyTtINxU_BheuFi0ZHwQliCWiwZvvFvrFzYu_h-2V8Pq2lyu9KhFjbgkCUr5T8cQ6ko68y-npdNgBMrjF6BI5kdo19GAMr8fPdu9PKUeYCkSfwBLzpS9anJcpdyhGoDmh_hzYXjyeO2fbzvRl4ji7lztCx4M/s320/WhatsApp%20Image%202026-07-03%20at%203.28.19%20PM%20(2).jpeg",
    caption: "Honoring our mentors: Students presenting tokens of appreciation and sharing memorable lab experiences.",
    aspect: "landscape"
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUoTl75LJpIA4x0HBLkkOQOGQuz2GYawIgjUSPfEeVpYPuOdQKMzOuPY6LgG2rAUOgt9ipiZwKpyCwC5DkS2-tNkXcOBtJlAweV-IrWtAEfTld6x3yGK0CbYru0XO0jzmTfr0TXr99GQzpE1n0VxGtCJlFTcXomlhVW4SI2KXY_BWoTYoHYH5iVLghUM4/s320/WhatsApp%20Image%202026-07-03%20at%203.28.19%20PM%20(1).jpeg",
    caption: "Smiles and souvenirs: Batchmates gathering to commemorate their journey from laboratory benches to final defenses.",
    aspect: "landscape"
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDIj0JoDtMcXxNFyL-_G5BmCX4tXc6H_Hiq6tqSKOS04UIYjDZ7m8V6TGJJ5zzMVYdWH1aBIXBJIDqElJQxPl43c_tuUf_WmsaOB5sJVCOdT_PA7xKSqY_SIIrlAIN1YNuHseZMe4xDwHqSmY4QkMmRSfCrqcPkHbYN6Jq8S7eLVgr1Z78DIDUt503_tk/s320/WhatsApp%20Image%202026-07-03%20at%203.28.18%20PM.jpeg",
    caption: "Laughter in the lab: Faculty sharing wisdom, inspiring the next generation of scientific researchers.",
    aspect: "landscape"
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEga2ULz1d1pSWz6Hw1O6wZcuyBZ3-KXPAYv0jJfI2tgCSLMRVTAUBbMRyl3M7rIzypCsZRSRC0d6-T3yc3usATbx1_nU4YDJFcqILcYcc8P6mzCvqsf7LkCGeHFP5EMcu_bX2hpiXPOSXvqsKlQ-43r3NHFGqA787XaLtZIOgP3Utym2IiVxrgHHkl9jmI/s320/WhatsApp%20Image%202026-07-03%20at%203.28.18%20PM%20(1).jpeg",
    caption: "Farewell cake cutting: A sweet celebration for the sweet success of our hard working researchers.",
    aspect: "landscape"
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjx6U5lH-KL9xK0Qd39K8uOI07DxFZ4iVQOBotKK0_calz0ypfFpoa5ZCnM4YHUbDhVqduXQvGHLsBBUYjqb3sAFg6MsRwXavlhnaZ7o21BxLJU8qqotXGnxaK8XpUWHP39jwp07NseEvIJIqA9adlzKVM8Xb-s5bsZGkHqJI-vYTR-XdHAp2l-rtILFPc/s320/WhatsApp%20Image%202026-07-03%20at%203.28.17%20PM.jpeg",
    caption: "Candid snapshot: The lively and energetic spirit of the Molecular Health Science Laboratory crew.",
    aspect: "landscape"
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiD_7KjcdupYDUngLMKlpxT_XCDcAMYCAsh1p5LZhFdnTxQNLNNOE1n-LyDuuf9Hprb8TZgad8xhDuDiNvVI_oHpn5LeD1Z00BCCrpFcKIFoykhUyvAcliyGOEC2NIZ8Rv9zxpV4cSG0dSgF4ObqySYXFhr3EcnlQNobYuN4AHTWFI-O0PW942bEy1kdQk/s320/WhatsApp%20Image%202026-07-03%20at%203.28.16%20PM.jpeg",
    caption: "Joyous moments: Appreciating the academic rigor and the beautiful friendships formed in the MHSL family.",
    aspect: "landscape"
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTk3iRr0ptEXV4yMZ4tSs7gn1Nfo70wUNW6MQQUgtYem9uNj_dkUBf-Zrv5zo5pw0dQbYL8Six58Wq6bkKzPu1BQiYN5-RYoZC4e4Wgn3x07ScmILv7T2erKmZcAkdZtF8powLhnZI_naBrPUdJ7VDYxRrKJXwAC34j-rt8MWwnLlpAVxANmOoW-pxeiY/s320/WhatsApp%20Image%202026-07-03%20at%203.28.14%20PM.jpeg",
    caption: "Memorable group portrait: Faculty, graduates, and junior researchers posing together in a warm, unified embrace.",
    aspect: "landscape"
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhxp7TeuvdlYlLeM8ExA0quQKEQ2oZPwboJotZb1C1IaJsJva8wrZP-KPlJ775sifvXNOOY00locjRkFk185R0i1r-MdLMUyXdFLmX3FBVgf1q8nugqirSYJR7TIfpHwF8PD6JZ3MmXRsdRQaKW4sUiuF0C3t4XH61C-EMzgFU8ZRXv85-7NcehaanYxsY/s320/WhatsApp%20Image%202026-07-03%20at%203.28.13%20PM.jpeg",
    caption: "Moments of gratitude: Students sharing their learning paths, acknowledging the support from the lab.",
    aspect: "landscape"
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJuVTvY_toMWLGoH9C6oqFGDLSxB1XWS-8Sb4Pew6M1zvbaT_IJRNZebvAbRimkHePUAfnI85RIr9wWb7FhcuWyl4FFUH1egDFrWgDu15hofDeaWcg7-IBLoNtzX-ouFGGs1bkNDpFqlD7o8VBE-dbK7RPIvjiDgn736e7YNtVCvILxLlOGUiVRnbFj4E/s320/WhatsApp%20Image%202026-07-03%20at%203.28.13%20PM%20(1).jpeg",
    caption: "A bright future ahead: Toasting to new beginnings, publications, and upcoming PhD placements abroad.",
    aspect: "landscape"
  },
  {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgvgez9d6fNqAM6pnbBDbUfce6cWcMrfXHGVY9-V7Uz0ia_Ovll57c22vx2Og4bqyuUKgS2lSMU8CoX9YJytqJKMUUp6h0UFkg5ptAXx8DftRjtZ0CRh0VrO80Kt-dRJtucSxXlEn7xE93Lv-e3tiT6qYiCcTrvWDznhd0cY95YwMZuE12fl0jTR5oOB0c/s320/WhatsApp%20Image%202026-07-03%20at%203.28.12%20PM%20(1).jpeg",
    caption: "The complete gathering: Commemorative farewell photo session captured in the university department.",
    aspect: "landscape"
  }
];

interface Farewell2022Props {
  onBack: () => void;
}

export default function Farewell2022({ onBack }: Farewell2022Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % FAREWELL_IMAGES.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + FAREWELL_IMAGES.length) % FAREWELL_IMAGES.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + FAREWELL_IMAGES.length) % FAREWELL_IMAGES.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % FAREWELL_IMAGES.length);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="farewell-2022-page">
      {/* Navigation & Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal-deep transition-all cursor-pointer group"
          id="btn-back-to-gallery"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Lab Gallery
        </button>
        <span className="text-[10px] sm:text-xs font-mono bg-teal-pale text-teal-deep font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-teal animate-pulse" />
          Special Event Album
        </span>
      </div>

      {/* Hero Header Card */}
      <div className="relative bg-teal-deep text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-md flex flex-col md:flex-row md:items-center justify-between gap-8">
        {/* Background visual accents */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-white rounded-full filter blur-3xl opacity-5 pointer-events-none"></div>

        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="flex flex-wrap gap-2 items-center text-xs text-teal-pale/90 font-mono font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              July 2024
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              M.Sc. Thesis Graduates
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight">
            Masters Batch 2022 Farewell
          </h1>
          <p className="text-sm sm:text-base text-teal-pale leading-relaxed">
            Honoring the dedication, relentless benchwork, and incredible research breakthroughs of our 2022 Masters of Science (M.Sc.) thesis candidates. Guided under the supervision of <strong>Prof. Khondokar Nasirujjaman</strong>, these talented students successfully completed their advanced molecular defenses.
          </p>
        </div>

        {/* Dynamic stat box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shrink-0 text-center space-y-1 relative z-10 min-w-[160px]">
          <span className="block font-mono text-xs uppercase tracking-widest text-teal-pale font-bold">Total Assets</span>
          <span className="block text-4xl sm:text-5xl font-extrabold tracking-tight">{FAREWELL_IMAGES.length}</span>
          <span className="block text-[11px] text-teal-pale font-mono">High-Res Photos</span>
        </div>
      </div>

      {/* Introduction Narrative Text */}
      <div className="bg-paper border border-line rounded-3xl p-6 sm:p-8 space-y-4 shadow-3xs">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-teal-deep">Academic Milestone & Laboratory Celebration</h2>
        <div className="text-xs sm:text-sm text-ink-soft leading-relaxed space-y-3">
          <p>
            The Molecular Health Science Laboratory (MHSL) recently organized a joyous farewell gathering for our esteemed Masters Batch 2022. This celebration marked the culmination of years of rigorous microbiological investigation, molecular diagnostics, and genomic analyses performed in our facilities at Rajshahi University.
          </p>
          <p>
            Professor Khondokar Nasirujjaman congratulated each graduate on their persistent commitment to scientific excellence, highlighting their achievements in isolation campaigns, antibiotic susceptibility profiles, and biological data processing. As they transition from student roles to alumni positions, researchers, and doctoral students worldwide, the MHSL family stands proud of their accomplishments and looks forward to their future scientific endeavors.
          </p>
        </div>
      </div>

      {/* Honored Graduates / Farewell Students of the Year */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-line pb-3">
          <GraduationCap className="w-5 h-5 text-teal animate-bounce" />
          <h3 className="font-serif font-bold text-xl text-teal-deep">Honored Farewell Graduates</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Graduate 1: Md. Robiul Hasan */}
          <div className="bg-paper border border-line rounded-3xl p-8 flex flex-col sm:flex-row gap-6 items-center hover:border-teal hover:shadow-md transition-all">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-teal-pale shrink-0 border-2 border-teal/20 flex items-center justify-center shadow-md">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6hDtFt3uDfwmCWpyR7Cv4NGwtDNsqLuafZR7NLpnLI8f7TlUeb8nyRJNdxWEKCkK3mswMk6r1gJ4gmCd06u5siuaFDSIA5-53R3H84ZYsGb_YI_KQqNz9C7-TBWDnQjtKW9NHv0lYmTv7grNCY0HA0N6wXPtQGRsB1V7tXE8Xli79NgKlIzkOG-YqH2k/s320/Md%20Robiul%20Hasan.jpg"
                alt="Md Robiul Hasan"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-teal font-bold bg-teal-pale px-2.5 py-0.5 rounded-full">
                <Award className="w-3 h-3 animate-pulse" />
                M.Sc. Thesis Graduate
              </span>
              <h4 className="font-serif font-bold text-teal-deep text-2xl">Md. Robiul Hasan</h4>
              <p className="text-xs sm:text-sm text-ink-soft font-medium">Masters of Science (M.Sc.) in GEB</p>
              <p className="text-[11px] sm:text-xs text-ink-faint font-mono">Session: 2021-22 · GEB, Rajshahi University</p>
            </div>
          </div>

          {/* Graduate 2: Mim Islam */}
          <div className="bg-paper border border-line rounded-3xl p-8 flex flex-col sm:flex-row gap-6 items-center hover:border-teal hover:shadow-md transition-all">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-teal-pale shrink-0 border-2 border-teal/20 flex items-center justify-center shadow-md">
              <img
                src={mimImage}
                alt="Mim Islam"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-teal font-bold bg-teal-pale px-2.5 py-0.5 rounded-full">
                <Award className="w-3 h-3 animate-pulse" />
                M.Sc. Thesis Graduate
              </span>
              <h4 className="font-serif font-bold text-teal-deep text-2xl">Mim Islam</h4>
              <p className="text-xs sm:text-sm text-ink-soft font-medium">Masters of Science (M.Sc.) in GEB</p>
              <p className="text-[11px] sm:text-xs text-ink-faint font-mono">Session: 2021-22 · GEB, Rajshahi University</p>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful Photo Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-line pb-3">
          <h3 className="font-serif font-bold text-lg text-teal-deep flex items-center gap-2">
            <span className="w-2 h-5 bg-teal rounded-full"></span>
            Commemorative Photo Gallery
          </h3>
          <span className="text-[11px] font-mono text-ink-faint">Click any image to view details and slide</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="farewell-photo-grid">
          {FAREWELL_IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="group bg-paper border border-line rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-teal transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Photo Canvas */}
              <div className="aspect-[4/3] bg-bg-alt relative overflow-hidden">
                <img
                  src={img.url}
                  alt={`Farewell Memory ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/85 via-teal-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white text-xs font-mono flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>View Full Size ({idx + 1}/{FAREWELL_IMAGES.length})</span>
                  </div>
                </div>
              </div>

              {/* Caption (Removed text, keeping minimal aesthetic footer metadata) */}
              <div className="p-4 bg-paper">
                <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider text-ink-faint uppercase">
                  <span>MHSL Batch 2022</span>
                  <span className="text-teal">Memory #{idx + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Slider Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4" id="lightbox-modal">
          {/* Top Panel */}
          <div className="flex items-center justify-between text-white p-2">
            <span className="text-xs sm:text-sm font-mono text-slate-400">
              Masters Batch 2022 Farewell • {lightboxIndex + 1} of {FAREWELL_IMAGES.length}
            </span>
            <div className="flex items-center gap-3">
              <a
                href={FAREWELL_IMAGES[lightboxIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Open in new tab"
              >
                <Download className="w-5 h-5" />
              </a>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Close Lightbox"
                id="btn-close-lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Central Image and Arrows */}
          <div className="flex-1 flex items-center justify-between max-w-6xl mx-auto w-full gap-4 relative">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer backdrop-blur-xs hover:scale-105 active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Photo */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 select-none max-h-[70vh]">
              <img
                src={FAREWELL_IMAGES[lightboxIndex].url}
                alt={`Full Size Farewell Memory ${lightboxIndex + 1}`}
                className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl border border-white/5"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer backdrop-blur-xs hover:scale-105 active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Panel Caption (Removed caption text) */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl max-w-3xl mx-auto w-full p-4 text-center space-y-1 mb-4">
            <div className="text-[10px] sm:text-xs font-mono text-slate-400">
              Use your keyboard <kbd className="bg-slate-800 text-white px-1.5 py-0.5 rounded text-[9px]">←</kbd> and <kbd className="bg-slate-800 text-white px-1.5 py-0.5 rounded text-[9px]">→</kbd> keys or the buttons above to navigate
            </div>
          </div>
        </div>
      )}

      {/* Footer Branded Backlink */}
      <div className="pt-6 text-center">
        <button
          onClick={onBack}
          className="bg-bg border border-line hover:border-teal text-teal-deep px-5 py-2.5 rounded-full text-xs font-semibold hover:shadow-xs transition-all cursor-pointer"
        >
          Return to All Laboratory Galleries
        </button>
      </div>
    </div>
  );
}
