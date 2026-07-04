import React, { useState } from 'react';
import { Mail, MapPin, Building, Calendar, CheckCircle, ExternalLink, Send } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Laboratory Research Collaboration');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct mailto link
    const bodyText = `Name: ${name}\nEmail: ${email}\nAffiliation: ${affiliation}\nCountry: ${country}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const mailto = `mailto:mhsl@ru.ac.bd?subject=${encodeURIComponent(
      subject || 'MHSL Web Query'
    )}&body=${encodeURIComponent(bodyText)}`;
    
    setStatus('Opening your local email application configured with these pre-filled details...');
    
    setTimeout(() => {
      window.location.href = mailto;
      setStatus(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12" id="contact-page">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-teal font-bold font-semibold">Inquiries &amp; Collaborations</span>
        <h1 className="text-3xl sm:text-5xl font-bold text-teal-deep font-serif">Connect With Us</h1>
        <p className="text-sm sm:text-base text-ink-soft max-w-2xl leading-relaxed">
          From undergraduate project aspirations to academic PhD research joint-ventures, we are always seeking talented and passionate researchers to join our bench. Reach out using the form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Coordinates Column */}
        <div className="lg:col-span-5 bg-teal-deep text-white p-8 sm:p-10 rounded-3xl space-y-8 border border-teal shadow-md">
          <h3 className="font-serif font-bold text-xl text-gold-pale">MHSL Coordinates</h3>

          <div className="space-y-6 text-xs sm:text-sm">
            
            {/* Address */}
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
              <div className="space-y-1">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-gold-pale font-bold">PHYSICAL LOCATION</span>
                <p className="text-white/90 leading-relaxed font-sans">
                  North Block, 2nd Floor,<br />
                  Sir Jagadish Chandra Bose Academic Building (3rd Science Building),<br />
                  University of Rajshahi, Rajshahi-6205, Bangladesh
                </p>
                <a
                  href="https://maps.app.goo.gl/krmFieihNnTGDncu8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-semibold text-gold-pale hover:text-white hover:underline transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Real-Time Google Map Location
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-gold-pale font-bold">EMAIL INQUIRIES</span>
                <p className="font-bold text-white"><a href="mailto:mhsl@ru.ac.bd" className="underline hover:text-gold">mhsl@ru.ac.bd</a></p>
              </div>
            </div>

            {/* Department */}
            <div className="flex gap-4">
              <Building className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-gold-pale font-bold">PARENT DEPARTMENT</span>
                <p className="text-white/90">Department of Genetic Engineering &amp; Biotechnology, RU</p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex gap-4">
              <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-gold-pale font-bold">BENCH HOURS</span>
                <p className="text-white/90">Sunday - Thursday: 09:00 AM - 05:00 PM (GMT +6)</p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-paper border border-line p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-ink-faint font-bold">Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. / Mr. / Ms. Name"
                className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-ink-faint font-bold">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="address@domain.com"
                className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-ink-faint font-bold">Affiliation / University</label>
              <input
                type="text"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                placeholder="Institution Name"
                className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-ink-faint font-bold">Country *</label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-ink-faint font-bold">Phone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+8801..."
                className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase text-ink-faint font-bold">Inquiry Subject *</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
              >
                <option value="Laboratory Research Collaboration">Research Collaboration</option>
                <option value="Testing / Analytical Services Inquiry">Analytical Services (Quote)</option>
                <option value="Student Project / Thesis Bench Applications">Project / Thesis Applications</option>
                <option value="General Queries">General Queries</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase text-ink-faint font-bold">Message or Queries *</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Detail your request, project specifics, or testing targets..."
              className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg h-32 focus:outline-none focus:border-teal resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-teal hover:bg-teal-deep text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-sm transition-all"
          >
            <Send className="w-4 h-4" />
            Send pre-filled message
          </button>

          {status && (
            <div className="bg-teal-pale text-teal-deep border border-teal/10 p-3.5 rounded-lg flex items-center gap-2 text-xs">
              <CheckCircle className="w-4 h-4 text-teal animate-bounce" />
              <span>{status}</span>
            </div>
          )}
        </form>
      </div>

      {/* Real-time Google Map Location Section */}
      <div className="space-y-4 pt-6 border-t border-line/75" id="realtime-map-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-teal-deep">Real-Time Interactive Map</h3>
            <p className="text-xs text-ink-soft">Find us on campus or start direct turn-by-turn navigation to Sir Jagadish Chandra Bose Academic Building</p>
          </div>
          <a
            href="https://maps.app.goo.gl/krmFieihNnTGDncu8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal hover:bg-teal-deep text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-sm shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
            Launch Live Google Maps
          </a>
        </div>

        <div className="relative group cursor-pointer overflow-hidden rounded-3xl border border-line shadow-md bg-bg-alt h-[380px]">
          {/* Real Interactive Google Map Embed */}
          <iframe 
            title="MHSL Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1817.9255018698188!2d88.6368383!3d24.3712613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc6ebe95015795%3A0xbbfd11821cfd3132!2sSir%20Jagadish%20Chandra%20Bose%20Academic%20Building!5e0!3m2!1sen!2sbd!4v1719999999999!5m2!1sen!2sbd"
            className="absolute inset-0 w-full h-full border-0 grayscale-[15%] contrast-[110%] pointer-events-auto opacity-90 group-hover:opacity-100 transition-all duration-300"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Interactive Map Overlay overlaying click cues */}
          <div className="absolute inset-0 bg-teal-deep/5 pointer-events-none group-hover:bg-transparent transition-all duration-300" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 bg-white/95 backdrop-blur-md border border-line p-5 rounded-2xl shadow-xl max-w-sm flex items-start gap-4 pointer-events-auto z-10 transition-all group-hover:scale-[1.02]">
            <div className="bg-teal-pale p-2.5 rounded-xl text-teal shrink-0">
              <MapPin className="w-5 h-5 animate-pulse text-teal-deep" />
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-teal font-extrabold">Active Coordinates</span>
              <h4 className="text-xs font-bold text-teal-deep leading-tight">Molecular Health Science Laboratory</h4>
              <p className="text-[10px] text-ink-soft leading-relaxed">
                2nd Floor (North Block), Sir Jagadish Chandra Bose Academic Building, University of Rajshahi, Bangladesh
              </p>
              <a
                href="https://maps.app.goo.gl/krmFieihNnTGDncu8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-extrabold text-teal hover:text-teal-deep hover:underline transition-colors"
              >
                Start Live Navigation
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
