import { MapPin, ExternalLink, Facebook, Linkedin } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="bg-[#0a142f] text-white/70 py-12 border-t-2 border-teal" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">
          
          {/* Lab Brand and Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 bg-white rounded-lg p-1 flex items-center justify-center shadow-xs">
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoPslN9e0c8siqMB7TJxGAph_EZ8b6QwYx4vEJsaWDfA1Nz_v_ZCNqsjOksHPSRpm-4LXujp2nMBxE6_eAzeVEgzFzAXHJtCF9hmlvy2y4-1_MVePOHezmLH-rDtd3E-lcH6oDP0ppeB8kiJVOmzYqvOg0oRgz1ww4YEO8k7vvA-EdP2ww_zVLYjFCr_I/s320/Lab%20Logo.jpeg"
                  alt="Molecular Health Science Laboratory Logo"
                  className="h-full w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-serif font-bold text-lg text-white">MHSL</span>
            </div>
            <p className="text-xs leading-relaxed text-white/80 max-w-sm">
              The Molecular Health Science Laboratory is a multidisciplinary research lab in the Department of Genetic Engineering and Biotechnology at the University of Rajshahi, Bangladesh. We study pathogens, beneficial microbes, and natural products guided by the One Health framework.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="" 
                className="p-2 bg-white/5 hover:bg-white/15 hover:text-white border border-white/10 rounded-xl transition-all shadow-xs inline-flex items-center justify-center shrink-0 w-9 h-9"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="" 
                className="p-2 bg-white/5 hover:bg-white/15 hover:text-white border border-white/10 rounded-xl transition-all shadow-xs inline-flex items-center justify-center shrink-0 w-9 h-9"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="" 
                className="p-2 bg-white/5 hover:bg-white/15 hover:text-white border border-white/10 rounded-xl transition-all shadow-xs inline-flex items-center justify-center shrink-0 w-9 h-9 text-white/70 hover:text-white"
                title="ResearchGate"
              >
                <span className="font-serif font-extrabold text-sm tracking-tighter leading-none flex items-center gap-0.5 select-none">
                  R<sup className="text-[8px] font-sans font-extrabold tracking-normal">G</sup>
                </span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="font-mono text-[10px] uppercase tracking-wider text-gold-pale font-bold mb-3">Explore</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setActivePage('home')} className="hover:text-white cursor-pointer transition-colors text-left">Home</button>
                </li>
                <li>
                  <button onClick={() => setActivePage('about')} className="hover:text-white cursor-pointer transition-colors text-left">About Lab</button>
                </li>
                <li>
                  <button onClick={() => setActivePage('research')} className="hover:text-white cursor-pointer transition-colors text-left">Research Themes</button>
                </li>
                <li>
                  <button onClick={() => setActivePage('team')} className="hover:text-white cursor-pointer transition-colors text-left">Our Team</button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-mono text-[10px] uppercase tracking-wider text-gold-pale font-bold mb-3">Information</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setActivePage('services')} className="hover:text-white cursor-pointer transition-colors text-left">Services</button>
                </li>
                <li>
                  <button onClick={() => setActivePage('news')} className="hover:text-white cursor-pointer transition-colors text-left">News Feed</button>
                </li>
                <li>
                  <button onClick={() => setActivePage('gallery')} className="hover:text-white cursor-pointer transition-colors text-left">Photo Gallery</button>
                </li>
                <li>
                  <button onClick={() => setActivePage('portal')} className="hover:text-white cursor-pointer transition-colors text-left font-semibold text-teal-pale">Member Portal</button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h5 className="font-mono text-[10px] uppercase tracking-wider text-gold-pale font-bold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal" />
              <span>Location</span>
            </h5>
            <p className="leading-relaxed text-white/80">
              North Block, 2nd Floor,<br />
              Sir Jagadish Chandra Bose Academic Building,<br />
              University of Rajshahi, Rajshahi-6205, Bangladesh.
            </p>
            
            {/* Embedded Live Map Preview */}
            <div className="mt-2.5 relative rounded-xl overflow-hidden border border-white/10 h-24 w-full group">
              <iframe
                title="MHSL Footer Mini Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1817.9255018698188!2d88.6368383!3d24.3712613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc6ebe95015795%3A0xbbfd11821cfd3132!2sSir%20Jagadish%20Chandra%20Bose%20Academic%20Building!5e0!3m2!1sen!2sbd!4v1719999999999!5m2!1sen!2sbd"
                className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-75 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 pointer-events-auto"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.app.goo.gl/krmFieihNnTGDncu8"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-teal-deep/5 hover:bg-transparent transition-all"
              />
            </div>

            <div className="pt-1">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-gold-pale">Inquiries</span>
              <a href="mailto:mhsl@ru.ac.bd" className="text-white underline hover:text-gold-pale">mhsl@ru.ac.bd</a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-[11px] text-white/50 space-y-2 sm:space-y-0 font-mono">
          <span>Molecular Health Science Laboratory, RU</span>
          <span>Copyright &copy; 2026 MHSL | Designed by Md. Abid Hassan</span>
        </div>
      </div>
    </footer>
  );
}
