import React, { useState } from 'react';
import { Mail, User, Building, Phone, MessageSquare, Send, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface CollaborationProps {
  onBack: () => void;
}

interface CollabFormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  collabType: string;
  message: string;
}

export default function Collaboration({ onBack }: CollaborationProps) {
  const [formData, setFormData] = useState<CollabFormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    collabType: 'Academic Research',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call persistence
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Save to localStorage for demo persistence
      const existing = localStorage.getItem('mhsl_collab_requests');
      const list = existing ? JSON.parse(existing) : [];
      list.push({
        ...formData,
        id: 'collab-' + Date.now(),
        date: new Date().toISOString(),
      });
      localStorage.setItem('mhsl_collab_requests', JSON.stringify(list));
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      collabType: 'Academic Research',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="collaboration-page">
      {/* Navigation Header */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-teal hover:text-teal-deep transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <span className="font-mono text-[10px] text-ink-faint font-bold uppercase tracking-wider">
          Partnership Portal
        </span>
      </div>

      {!isSubmitted ? (
        <div className="bg-paper border border-line rounded-3xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Info Side Banner */}
          <div className="md:col-span-4 bg-teal-deep text-white p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="space-y-6 relative z-10">
              <span className="font-mono text-[9px] font-extrabold text-gold-pale uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">
                MHSL Research
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                Partner with Our Lab
              </h2>
              <p className="text-xs text-white/80 leading-relaxed">
                MHSL coordinates regularly with university departments, veterinary wings, and public health practitioners under the <strong>One Health Initiative</strong>.
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                <span className="text-[11px] text-white/90">Institutional Review</span>
              </div>
              <p className="text-[10px] text-white/70 leading-relaxed">
                All submitted collaboration proposals are cataloged and reviewed by our Principal Investigator within 3 business days.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-8 p-8 sm:p-10 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-teal-deep font-serif">Collaboration Request</h3>
              <p className="text-xs text-ink-soft">
                Please provide your contact details and a summary of your proposed research or testing inquiry.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wider block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Rayhan Chowdhury"
                      className="w-full bg-bg border border-line focus:border-teal rounded-xl pl-10 pr-4 py-2.5 text-xs text-ink placeholder:text-ink-faint outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Organization */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wider block">
                    Organization / Affiliation <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. University of Rajshahi"
                      className="w-full bg-bg border border-line focus:border-teal rounded-xl pl-10 pr-4 py-2.5 text-xs text-ink placeholder:text-ink-faint outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wider block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rayhan@ru.ac.bd"
                      className="w-full bg-bg border border-line focus:border-teal rounded-xl pl-10 pr-4 py-2.5 text-xs text-ink placeholder:text-ink-faint outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wider block">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +880 1712-XXXXXX"
                      className="w-full bg-bg border border-line focus:border-teal rounded-xl pl-10 pr-4 py-2.5 text-xs text-ink placeholder:text-ink-faint outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Collaboration Type */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wider block">
                  Project / Collaboration Type
                </label>
                <select
                  value={formData.collabType}
                  onChange={(e) => setFormData({ ...formData, collabType: e.target.value })}
                  className="w-full bg-bg border border-line focus:border-teal rounded-xl px-3 py-2.5 text-xs text-ink outline-none transition-all cursor-pointer"
                >
                  <option value="Academic Research">Academic Research Co-authorship</option>
                  <option value="Clinical Study">Clinical Study &amp; Diagnostic Isolation</option>
                  <option value="One Health Project">One Health Surveillance Initiative</option>
                  <option value="Diagnostic Testing">Diagnostic Lab Services / Bulk Invoicing</option>
                  <option value="Equipment Use">Specialized Equipment &amp; Facility Access</option>
                  <option value="Other">Other Strategic Collaboration</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wider block">
                  Proposed Research / Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-ink-faint" />
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your research project, pathogen targets, or testing inquiry in detail..."
                    className="w-full bg-bg border border-line focus:border-teal rounded-xl pl-10 pr-4 py-3 text-xs text-ink placeholder:text-ink-faint outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 bg-teal text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-teal-deep/10 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-teal-deep'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Sending Request...' : 'Submit Collaboration Request'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-paper border border-line p-8 sm:p-12 rounded-3xl text-center space-y-6 max-w-2xl mx-auto shadow-md"
        >
          <div className="w-16 h-16 bg-teal-pale text-teal rounded-full flex items-center justify-center mx-auto border border-teal/20">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-teal-deep font-serif">Request Submitted Successfully</h3>
            <p className="text-xs text-ink-soft max-w-md mx-auto">
              Thank you, <strong className="text-teal-deep">{formData.fullName}</strong>. Your collaboration proposal has been securely logged with Molecular Health Science Laboratory (MHSL).
            </p>
          </div>

          {/* Submitted Data Summary Panel */}
          <div className="bg-bg border border-line rounded-2xl p-5 text-left space-y-3 font-sans">
            <p className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider pb-2 border-b border-line">
              Official Proposal Receipt Summary
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <span className="text-ink-soft font-medium">Affiliation:</span>
              <span className="col-span-2 text-ink font-semibold">{formData.organization}</span>

              <span className="text-ink-soft font-medium">Email:</span>
              <span className="col-span-2 text-ink font-mono">{formData.email}</span>

              {formData.phone && (
                <>
                  <span className="text-ink-soft font-medium">Phone:</span>
                  <span className="col-span-2 text-ink font-mono">{formData.phone}</span>
                </>
              )}

              <span className="text-ink-soft font-medium">Type:</span>
              <span className="col-span-2 text-ink font-semibold text-teal">{formData.collabType}</span>

              <span className="text-ink-soft font-medium">Details:</span>
              <p className="col-span-2 text-[11px] text-ink-soft bg-paper border border-line/50 p-2.5 rounded-lg leading-relaxed line-clamp-3 italic">
                "{formData.message}"
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 border border-line hover:bg-bg text-ink-soft rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
            >
              Submit Another Request
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 bg-teal text-white hover:bg-teal-deep rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs text-center"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
