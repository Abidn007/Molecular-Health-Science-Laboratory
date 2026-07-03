import React, { useState } from 'react';
import { LABORATORY_SERVICES } from '../data';
import { LaboratoryService } from '../types';
import { CreditCard, ShoppingCart, Check, Info, ShieldCheck, DollarSign } from 'lucide-react';
import ReceiptInvoice from '../components/ReceiptInvoice';

export default function Services() {
  const [selectedServices, setSelectedServices] = useState<LaboratoryService[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientInstitution, setClientInstitution] = useState('');
  const [clientDepartment, setClientDepartment] = useState('Genetic Engineering & Biotech');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Payment state
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'quote' | 'gateway' | 'invoice'>('quote');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Card'>('bKash');
  const [txnId, setTxnId] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  const toggleService = (service: LaboratoryService) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSelectAll = () => {
    if (selectedServices.length === LABORATORY_SERVICES.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices([...LABORATORY_SERVICES]);
    }
  };

  const subtotal = selectedServices.reduce((sum, s) => sum + s.priceBDT, 0);
  const tax = Math.round(subtotal * 0.05); // 5% VAT
  const grandTotal = subtotal + tax;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      alert('Please select at least one laboratory service to generate a quote.');
      return;
    }
    setPaymentStep('gateway');
  };

  const simulatePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      const generatedTxn = `MHSL-TXN-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
      setTxnId(generatedTxn);
      setPaymentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }));
      setIsPaying(false);
      setPaymentStep('invoice');
    }, 1800);
  };

  const resetAll = () => {
    setSelectedServices([]);
    setClientName('');
    setClientEmail('');
    setClientInstitution('');
    setClientDepartment('Genetic Engineering & Biotech');
    setClientPhone('');
    setNotes('');
    setPaymentStep('quote');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="services-page">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-teal font-bold font-semibold">Diagnostic &amp; Research Solutions</span>
        <h1 className="text-3xl sm:text-5xl font-bold text-teal-deep font-serif">Laboratory Services</h1>
        <p className="text-sm sm:text-base text-ink-soft max-w-3xl leading-relaxed">
          MHSL provides high-standard testing facilities for partner researchers, students, agricultural bodies, and local clinics. Select tests to calculate a formal quote and process payments instantly.
        </p>
      </div>

      {paymentStep === 'invoice' ? (
        <div className="animate-fade-in">
          <ReceiptInvoice
            clientDetails={{
              name: clientName,
              email: clientEmail,
              institution: clientInstitution,
              department: clientDepartment,
              phone: clientPhone,
              notes: notes,
            }}
            selectedServices={selectedServices}
            transactionId={txnId}
            paymentMethod={paymentMethod}
            paidAmount={grandTotal}
            paymentDate={paymentDate}
            onReset={resetAll}
          />
        </div>
      ) : paymentStep === 'gateway' ? (
        /* Dynamic BDT Payment Gateway */
        <div className="max-w-lg mx-auto bg-white border border-line rounded-3xl overflow-hidden shadow-xl animate-fade-in" id="payment-gateway">
          {/* Header Banner */}
          <div className="bg-teal p-6 text-white text-center space-y-2">
            <h3 className="font-serif font-bold text-lg text-gold-pale">MHSL Payment Gateway</h3>
            <p className="text-xs text-white/80">Secured via SSL Encrypted University Protocol</p>
            <div className="inline-block bg-teal-deep/50 px-3 py-1 rounded font-mono text-xs font-bold text-gold">
              Grand Total: ৳{grandTotal.toLocaleString()} BDT
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase text-ink-faint">Select BDT Payment Gateway</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bKash')}
                  className={`border p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'bKash' ? 'border-pink-500 bg-pink-50/50' : 'border-line hover:border-pink-300'
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-[10px] select-none">bK</span>
                  <span className="text-[10px] font-bold text-pink-700">bKash</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Nagad')}
                  className={`border p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'Nagad' ? 'border-orange-500 bg-orange-50/50' : 'border-line hover:border-orange-300'
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-[10px] select-none font-sans">N</span>
                  <span className="text-[10px] font-bold text-orange-700">Nagad</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`border p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'Card' ? 'border-teal bg-teal-pale/30' : 'border-line hover:border-teal/30'
                  }`}
                >
                  <CreditCard className="w-8 h-8 text-teal-deep shrink-0" />
                  <span className="text-[10px] font-bold text-teal-deep">Card</span>
                </button>
              </div>
            </div>

            {/* Gateway form */}
            <div className="space-y-4 border-t border-line/50 pt-4 text-xs">
              {paymentMethod === 'Card' ? (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-ink-soft">CARDHOLDER NAME</label>
                    <input type="text" defaultValue={clientName} className="w-full p-2.5 border border-line rounded-lg bg-bg focus:border-teal" required />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-ink-soft">CARD NUMBER</label>
                    <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full p-2.5 border border-line rounded-lg bg-bg font-mono" required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-ink-soft">EXPIRY DATE</label>
                      <input type="text" placeholder="MM/YY" className="w-full p-2.5 border border-line rounded-lg bg-bg font-mono" required />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-ink-soft">CVV / CVC</label>
                      <input type="password" placeholder="***" className="w-full p-2.5 border border-line rounded-lg bg-bg font-mono" maxLength={3} required />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-bg/50 p-4 rounded-xl border border-line/60">
                  <p className="text-xs text-ink-soft leading-relaxed">
                    You are paying using <strong className="capitalize">{paymentMethod}</strong> mobile wallet. Enter your 11-digit wallet number to receive OTP.
                  </p>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold text-ink-faint">MOBILE WALLET NUMBER</label>
                    <input
                      type="tel"
                      placeholder="017xxxxxxxx"
                      className="w-full p-2.5 border border-line rounded-lg bg-white font-mono text-sm"
                      maxLength={11}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Simulated verification shield */}
            <div className="flex items-center gap-2 text-[11px] text-teal-deep bg-teal-pale/30 border border-teal/10 p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
              <span>Secure gateway compliant with standard banking encryption layers.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-line/50">
              <button
                type="button"
                onClick={() => setPaymentStep('quote')}
                className="px-4 py-2.5 border border-line text-xs font-semibold hover:bg-bg rounded-lg cursor-pointer"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={simulatePayment}
                disabled={isPaying}
                className="flex items-center gap-1 bg-teal hover:bg-teal-deep text-white font-bold px-5 py-2.5 rounded-lg text-xs cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isPaying ? 'Confirming secure payment...' : `Pay BDT ৳${grandTotal.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Quotation list and details */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Services List Table (Grid Column 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-line">
              <h3 className="font-serif font-bold text-lg text-teal-deep">Analytical Testing Fees</h3>
              <button
                onClick={handleSelectAll}
                className="text-xs text-teal font-semibold hover:underline cursor-pointer"
              >
                {selectedServices.length === LABORATORY_SERVICES.length ? 'Clear Selection' : 'Select All Services'}
              </button>
            </div>

            <div className="border border-line rounded-2xl overflow-hidden divide-y divide-line bg-paper">
              {LABORATORY_SERVICES.map((service) => {
                const isChecked = selectedServices.some((s) => s.id === service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service)}
                    className={`p-4 flex items-center justify-between cursor-pointer transition-all ${
                      isChecked ? 'bg-teal-pale/15' : 'hover:bg-bg/25'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                          isChecked ? 'bg-teal border-teal text-white' : 'border-line bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </button>
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-semibold text-teal-deep">{service.name}</p>
                        <div className="flex gap-2 text-[10px] font-mono text-ink-faint">
                          <span>{service.category}</span>
                          <span>·</span>
                          <span>Est. {service.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-teal">৳{service.priceBDT.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-bg-alt border border-line p-4 rounded-xl flex items-start gap-2.5 text-[11px] leading-relaxed text-ink-soft">
              <Info className="w-4 h-4 text-teal shrink-0 mt-0.5" />
              <p>
                <strong>Note on customized research:</strong> These rates are set by the University of Rajshahi syndicates. For bulk academic batch clearance, specialized genomic target assays, or industrial consultancy, contact Dr. Khondokar Nasirujjaman.
              </p>
            </div>
          </div>

          {/* Quotation Calculator / Form Column (Grid Column 5) */}
          <form onSubmit={handleCheckoutSubmit} className="lg:col-span-5 bg-paper border border-line p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-teal-deep flex items-center gap-2 border-b border-line pb-3">
              <ShoppingCart className="w-5 h-5 text-teal" />
              Quote Calculator
            </h3>

            {/* Selected items receipt-preview list */}
            {selectedServices.length === 0 ? (
              <div className="py-6 text-center space-y-1 bg-bg/50 border border-dashed border-line rounded-xl">
                <p className="text-xs font-semibold text-ink-faint">No tests selected yet</p>
                <p className="text-[10px] text-ink-faint max-w-[200px] mx-auto">Select services on the left to estimate official laboratory costs.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[160px] overflow-y-auto divide-y divide-line/40 border-b border-line pb-3">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex justify-between text-xs py-1.5 text-ink-soft">
                    <span className="truncate max-w-[200px]">{service.name}</span>
                    <span className="font-mono">৳{service.priceBDT.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs border-b border-line pb-3 font-mono">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal:</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>VAT (5%):</span>
                <span>৳{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-sans text-sm font-bold text-teal-deep pt-1.5">
                <span>Total Quote BDT:</span>
                <span className="font-mono text-teal">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Client Info form */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-ink-faint font-bold">Client Metadata</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-ink-soft">CLIENT NAME *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-ink-soft">PHONE NUMBER *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-ink-soft">EMAIL *</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-ink-soft">INSTITUTION *</label>
                <input
                  type="text"
                  required
                  value={clientInstitution}
                  onChange={(e) => setClientInstitution(e.target.value)}
                  placeholder="University / Organization"
                  className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none"
                />
              </div>
            </div>

            {/* Submit checkout buttons */}
            <button
              type="submit"
              disabled={selectedServices.length === 0}
              className="w-full py-3 bg-teal hover:bg-teal-deep text-white font-bold text-xs rounded-lg shadow-md transition-all cursor-pointer disabled:opacity-50 text-center uppercase tracking-wider"
            >
              Generate Quotation &amp; Proceed to Payment
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
