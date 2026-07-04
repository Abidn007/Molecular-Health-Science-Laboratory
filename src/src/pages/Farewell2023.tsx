import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Eye, X, ChevronLeft, ChevronRight, Download, Sparkles, GraduationCap, Award } from 'lucide-react';

const FAREWELL_IMAGES = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDKHYY96cdMhSQxzDzzCshVofLO7n9xYIpUH7Q6KHBA_hUQ7z7fyHBnH-1O3juy8Uq0cFZ_8Sng4Tmp_OnZJ7DtHJ_2aGsP-eoY3wB1TZQISHd2qkttJ6LubrCUqOHTb2kLhNHjeVBfV3__jlDtJkgbJMaucX8FxkFmorguPSojRv8PA0he02KBiW_o6Q/s320/WhatsApp%20Image%202026-07-03%20at%2011.30.23%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgaIniugwq72NcITlzOekDaqz8FxvA-7fZf4E0Ga8aSX-8-U2aTa21hWQNYi0-8XYIFMCCP38dUWqsAkjLW6__Qm1R2k7V9piWZGcroSUKCi4gIcbm0dR2blG9Y3QnHOCs03AIhVXGW0qQLc4lBmaw2yKe7e5hfOxeeTFDM9q6PnhAxqbKJHkqlPDlBjtk/s320/WhatsApp%20Image%202026-07-03%20at%2011.30.24%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgUpZBDA2n2Vk-F3cdudZkIH9gbq-4YGNwXcWjD9Mii8hRVDYH5Spo5DPwOU4Iwn18-PLZDZd90aYfE-RYojsKA0L6Y-nbn6WPU3vJexbT21peEALNUtakKi3390is3TUYdWiMVvW6PTy4GcpmCKXgL0glx_TfPrStk7UBl-90c7AjwlISg1fpJuxRO8Fw/s320/WhatsApp%20Image%202026-07-03%20at%2011.30.26%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvB8bbaq4g6Zum7fw8xy5Z4Qm8FJYLmXN3ztJjDvzlS_t-scJAytQMwJ2fRKb6Q08jGrbW_FVBc4noy2SOMOeX_uxoH3Oih182tbQKdgT-L8motT0S8I31pl4rO4uB8gVN459Aft_1IheK8isF5Cp7IvqFzpdKzTyMGbW_CvOg69SRniCQEQbcAh-oSCw/s320/WhatsApp%20Image%202026-07-03%20at%2011.31.33%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNuQ1JtoMKUsokwXSLsS1jsupTSxQaU7Oeu2utzun56AN2E3-00dJuccEDDptW1ymhjgtrvX2SaBcm9YuhZySMroTlNILUyWECGDNKyC0SjRz-V6gwGjtV5GObTXfW7HCQrVRPvoo_S-2ySnA6ANUSp8-AadZ0DrMCqh9PKFhj2iyO8C2CKYlgbHRECZY/s320/WhatsApp%20Image%202026-07-03%20at%2011.33.35%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZoShG7Lv9OCRho6Npp_6VHFttY7X-aRS9J22_afzwgpTLTx2yLDgKO7eKkkCUDMOQDa1TKwNqqMA56dVBM-U6PdZ0XjcPvuh0xLDDJguFWzQ5hyphenhyphenpiJQORGFuXjeBZ_EGM0I2XDIiYpFb-gSnxYXg2M4woMYDRUFGPNOIiDEaCASfjvOKb2Fh2k9PBkVE/s320/WhatsApp%20Image%202026-07-03%20at%2011.33.51%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhz0CIE_D-o4cZVu90T9DUDUHWzw-6MqZF4cJITIn_ERWEnhAKpBjUilVi_IrpZ9PHtMx6WPdewXg_cVPYzaBbZbdInA8mPDiV5gsRnNd3pmLEA2gnOpRCuUBhhReg6IW8_phBgOkxmqk9MwaMHBTdStiLslLaNW4I6_hAQjWVpI9JzaX0UxtqISld-t7E/s320/WhatsApp%20Image%202026-07-03%20at%2011.33.52%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2A8laOG4wg9XTlw8a4Q_oilwqLrAdQALOtwZ-gEbaMFylVcuEcE1dde9Dtttb2ckgdqT2TQmddEHPt3oi_5hnxtWxWLZlDPZDQSf3cmFertHVDYl-r9d2JqZt6BzBv1bMg4t7IQgilIBCzMNg-EHlNVpSCZiiPX8M00QAG3Icq83-cX0JOSeGRuILgC8/s320/WhatsApp%20Image%202026-07-03%20at%2011.34.17%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbqcArB3RIY764fkLWHnFfisa7WpAbyk1IFoTvm4Q9_zwplvIzgZ9C7pxKYueUDmQHxUYDy7x4MjcCXDVYo0GqIf2HcImIzw9D75E4oqT5SUvQQlO5WR43BbMB-jJBBeujj5bhgLrzEhd_scP42B6Ha2VOaqNYtWh4HzW4eg_5Ljo1q3OhnTvRGIN24rg/s320/WhatsApp%20Image%202026-07-03%20at%2011.34.19%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkHhfvHSBHMb6Qargac9v_kiP4WrSNJyUWkLTCWwBGo6iS6L_XmbTXp43NYdwRtomyw-BdE6sJE3EooZQ8KUQD4XRvCgltm02MP72kLkvfbu_CPz751ed-z-62-X_CNmNv2GR3ZGKx_fuyVh2UM0uX7eKytSyvBfKErJ8OM7KtdaKpqDXty8ckaHHwmVA/s320/WhatsApp%20Image%202026-07-03%20at%2011.34.21%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-UQ_YJMatirI1uLCyejKa1MraTpgyoqwnUBp0oKSR939t9dWVPzERnoXBHfSBF43G48qfeKKlUtNXd_wBKWMgQ0_X1m0RJPGMzo9CxzYLP3Qp0sp7lqc_KCYgzkIOofEt-0gqqZh9XwKGgHweETQPD4xfFQHbTqM5EuwOW1sOO3j-2J_9J5eyuZ8P7Xc/s320/WhatsApp%20Image%202026-07-03%20at%2011.34.25%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1TG0o-L7DJBATPm3-j1ZnpRyQ-tkzcVWCadq11aBIv9Mvz1yzVyaUCCPwqEj8A_7tJ5tOT7Za_DCMV9b7zH3WzfPT7E4XQjWq3p2B1R43yxomO3DroEpfkKr18j8InK0LWU6_qaZNkYXNbPAujQK4xHzaM_R-6J5bHFy2v-LYDY1rKSDHNS1nUbhAUFU/s320/WhatsApp%20Image%202026-07-03%20at%2011.34.31%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh100Jyuf_lxzRaHTwCYDOmvdZfpdBCFurtMtm322_bdHF9QK2z6dDKjMMtE3GpMO6ttakO2iHlG8y6rXzOo2v_gFLJGOoV9m3iJW37-0g9qTdrTA8vSnUnxH6sEYLmeq3itqg2iY4rLAVxgltbhjz_EinUH7vSbxCUN4Oyi9KNWSYro-HYPnpW0JE8uMM/s320/WhatsApp%20Image%202026-07-03%20at%2011.34.37%20PM.jpeg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUynWd45kAZkfax1nA8cuTop2r9Lg-DU0-h_jpxSHd7zTPF2uCxSZ7HISvVS5MXT9sXvuv9GyuP-viVorio9P1KomS8mKovnOYrVAuqLrmXtXR7VSAZ2oodIYOpQ5F9jPdCcsU611gP2E6AkLmw6lXHMioZKMSWjPiiwM5RLNq-6YNmeS-GFFgoiTFjjA/s320/WhatsApp%20Image%202026-07-03%20at%2011.35.00%20PM.jpeg"
];

interface Farewell2023Props {
  onBack: () => void;
}

export default function Farewell2023({ onBack }: Farewell2023Props) {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="farewell-2023-page">
      {/* Navigation & Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal-deep transition-all cursor-pointer group"
          id="btn-back-to-gallery-2023"
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
              December 2025
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              M.Sc. Thesis Graduates
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight">
            Masters Batch 2023 Farewell
          </h1>
          <p className="text-sm sm:text-base text-teal-pale leading-relaxed">
            Honoring the dedication, relentless benchwork, and incredible research breakthroughs of our 2023 Masters of Science (M.Sc.) thesis candidates. Guided under the supervision of <strong>Prof. Khondokar Nasirujjaman</strong>, these talented students successfully completed their advanced molecular defenses.
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
            The Molecular Health Science Laboratory (MHSL) organized a memorable farewell ceremony celebrating the academic journey and research defenses of our Masters Batch 2023. These students pushed the frontiers of molecular bioscience through rigorous research projects and thesis examinations in the Department of Genetic Engineering and Biotechnology at Rajshahi University.
          </p>
          <p>
            Professor Khondokar Nasirujjaman highly praised the graduating researchers for their active scientific contributions, critical thinking, and laboratory dedication. As they graduate into various roles of science, biotechnology sectors, and prospective doctoral fellowships abroad, the entire laboratory team wishes them outstanding success in all future endeavours.
          </p>
        </div>
      </div>

      {/* Honored Graduate */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-line pb-3">
          <GraduationCap className="w-5 h-5 text-teal animate-bounce" />
          <h3 className="font-serif font-bold text-xl text-teal-deep">Honored Farewell Graduate</h3>
        </div>
        <div className="max-w-xl mx-auto">
          {/* Graduate: Mrittika Rani Mondol */}
          <div className="bg-paper border border-line rounded-3xl p-8 flex flex-col sm:flex-row gap-6 items-center hover:border-teal hover:shadow-md transition-all">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-teal-pale shrink-0 border-2 border-teal/20 flex items-center justify-center shadow-md">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTmWkb2IMQTAuocEx61S_B0KAchqcxlmOJ7URBM031dDeoOWIaupG0hlOkJfx0lLCHP9l7_3KIEW09KefcKFA9We6eS_bICPkS6_J_pzEUzYZmhjsZbpxMc3fwJHPDwP0LqU6FMuqfx_6fwCdouKEBjpt4VlBbSx9Z_YWNGmaLgkOBWayyBfVPykdLz-U/s320/Mrittika%20Rani%20Mondol.jpeg"
                alt="Mrittika Rani Mondol"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left flex-1">
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-teal font-bold bg-teal-pale px-2.5 py-0.5 rounded-full">
                <Award className="w-3 h-3 animate-pulse" />
                M.Sc. Thesis Graduate
              </span>
              <h4 className="font-serif font-bold text-teal-deep text-2xl">Mrittika Rani Mondol</h4>
              <p className="text-xs sm:text-sm text-ink-soft font-medium">Masters of Science (M.Sc.) in GEB</p>
              <p className="text-[11px] sm:text-xs text-ink-faint font-mono">Session: 2022-23 · GEB, Rajshahi University</p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="farewell-photo-grid-2023">
          {FAREWELL_IMAGES.map((url, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="group bg-paper border border-line rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-teal transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Photo Canvas */}
              <div className="aspect-[4/3] bg-bg-alt relative overflow-hidden">
                <img
                  src={url}
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

              {/* Minimal aesthetic footer metadata (no caption text) */}
              <div className="p-4 bg-paper">
                <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-wider text-ink-faint uppercase">
                  <span>MHSL Batch 2023</span>
                  <span className="text-teal">Memory #{idx + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Slider Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4" id="lightbox-modal-2023">
          {/* Top Panel */}
          <div className="flex items-center justify-between text-white p-2">
            <span className="text-xs sm:text-sm font-mono text-slate-400">
              Masters Batch 2023 Farewell • {lightboxIndex + 1} of {FAREWELL_IMAGES.length}
            </span>
            <div className="flex items-center gap-3">
              <a
                href={FAREWELL_IMAGES[lightboxIndex]}
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
                id="btn-close-lightbox-2023"
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
                src={FAREWELL_IMAGES[lightboxIndex]}
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

          {/* Bottom Panel (No caption text) */}
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
