import React, { useState } from 'react';
import { LABORATORY_SERVICES } from '../data';
import { LaboratoryService } from '../types';
import { 
  CreditCard, ShoppingCart, Check, Info, ShieldCheck, DollarSign, 
  Trash2, ShoppingBag, ArrowRight, ArrowLeft, Plus, Sparkles, Filter 
} from 'lucide-react';
import ReceiptInvoice from '../components/ReceiptInvoice';

// Custom-generated AI figures and descriptions mapped to each service ID
const SERVICE_METADATA: Record<string, { desc: string; img: string }> = {
  'srv-1': {
    desc: 'Separation and purification of target pathogens from complex clinical or environmental samples.',
    img: 'https://raw.githubusercontent.com/Abidn007/Molecular-Health-Science-Laboratory/main/src/assets/images/bacterial_isolation.jpg'
  },
  'srv-2': {
    desc: 'Enzymatic, sugar fermentation, and metabolic substrate profiling for biochemical tax identification.',
    img: 'https://raw.githubusercontent.com/Abidn007/Molecular-Health-Science-Laboratory/main/src/assets/images/biochemical_test.jpg'
  },
  'srv-3': {
    desc: 'Antibiotic disc-diffusion assays mapped to standard international clinical breakpoint tables.',
    img: 'https://raw.githubusercontent.com/Abidn007/Molecular-Health-Science-Laboratory/main/src/assets/images/antibiotic_sensitivity.jpg'
  },
  'srv-4': {
    desc: 'High-speed centrifugation to separate microbial pellets from active bio-supernatants.',
    img: 'https://raw.githubusercontent.com/Abidn007/Molecular-Health-Science-Laboratory/main/src/assets/images/Centrifugation_Service.jpg'
  },
  'srv-5': {
    desc: 'Microscopic crystal-violet dye analysis scanning for microbial cell-wall taxonomy differences.',
    img: '/src/assets/images/gram_staining_1783176557927.jpg'
  },
  'srv-6': {
    desc: 'Quantitative microbial count (CFU/mL) of water, food, or agricultural research materials.',
    img: 'https://raw.githubusercontent.com/Abidn007/Molecular-Health-Science-Laboratory/main/src/assets/images/CFU_Count.jpg'
  },
  'srv-7': {
    desc: 'Cell lysis and binding-matrix purification of premium PCR-ready microbial genomic DNA/RNA material.',
    img: '/src/assets/images/theme_resistance_1783104703215.jpg'
  },
  'srv-8': {
    desc: 'Subculturing under ultra-sterile flow chambers to isolate healthy, single purified microbial lineages.',
    img: '/src/assets/images/theme_therapeutics_1783104721709.jpg'
  }
};

export default function Services() {
  const [selectedServices, setSelectedServices] = useState<LaboratoryService[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Client Info States
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientInstitution, setClientInstitution] = useState('');
  const [clientDepartment, setClientDepartment] = useState('Genetic Engineering & Biotech');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Navigation / Payment Steps
  // 'shop' | 'cart' | 'gateway' | 'invoice'
  const [paymentStep, setPaymentStep] = useState<'shop' | 'cart' | 'gateway' | 'invoice'>('shop');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [isPaying, setIsPaying] = useState(false);
  const [txnId, setTxnId] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  
  // Mobile Wallet Input States
  const [walletNumber, setWalletNumber] = useState('');
  const [walletOtp, setWalletOtp] = useState('');
  const [walletPin, setWalletPin] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Toggle Item in Cart
  const toggleService = (service: LaboratoryService) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const clearCart = () => {
    setSelectedServices([]);
  };

  const selectAll = () => {
    setSelectedServices([...LABORATORY_SERVICES]);
  };

  // Pricing calculations
  const subtotal = selectedServices.reduce((sum, s) => sum + s.priceBDT, 0);
  const tax = Math.round(subtotal * 0.05); // 5% VAT
  const grandTotal = subtotal + tax;

  // Filter categories
  const categories = ['All', 'Microbiology', 'Microscopy', 'Equipment Use', 'Prep Work'];
  const filteredServices = activeCategory === 'All' 
    ? LABORATORY_SERVICES 
    : LABORATORY_SERVICES.filter(s => s.category === activeCategory);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      alert('Your cart is empty. Please add at least one diagnostic test to continue.');
      return;
    }
    setPaymentStep('gateway');
  };

  const simulatePayment = () => {
    if (!walletNumber || walletNumber.length < 11) {
      alert('Please enter a valid 11-digit mobile wallet number.');
      return;
    }
    if (otpSent && !walletOtp) {
      alert('Please enter the 6-digit OTP verification code.');
      return;
    }
    if (otpSent && !walletPin) {
      alert('Please enter your secure wallet PIN.');
      return;
    }

    if (!otpSent) {
      setIsPaying(true);
      setTimeout(() => {
        setOtpSent(true);
        setIsPaying(false);
      }, 1000);
      return;
    }

    setIsPaying(true);
    setTimeout(() => {
      const generatedTxn = `MHSL-TXN-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
      setTxnId(generatedTxn);
      setPaymentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }));
      setIsPaying(false);
      setPaymentStep('invoice');
    }, 2000);
  };

  const resetAll = () => {
    setSelectedServices([]);
    setClientName('');
    setClientEmail('');
    setClientInstitution('');
    setClientDepartment('Genetic Engineering & Biotech');
    setClientPhone('');
    setNotes('');
    setWalletNumber('');
    setWalletOtp('');
    setWalletPin('');
    setOtpSent(false);
    setPaymentStep('shop');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="services-page">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-deep to-teal p-8 sm:p-12 rounded-3xl text-white shadow-lg space-y-4 relative overflow-hidden print:hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl -ml-40 -mb-40"></div>
        
        <div className="relative z-10 space-y-3 max-w-3xl">
          <span className="bg-gold/20 text-gold-pale px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase">
            MHSL Diagnostic E-Shop
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight">
            Analytical Laboratory Services
          </h1>
          <p className="text-xs sm:text-sm text-teal-pale leading-relaxed">
            Order standard genetic engineering assays, clinical microbe profiles, and microscopic tests with instant digital work order generations. Choose academic test packages below to instantly obtain customized official cost estimates.
          </p>
        </div>
      </div>

      {/* Cart Navigation Indicator */}
      <div className="flex justify-between items-center bg-paper p-4 rounded-2xl border border-line shadow-xs print:hidden">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-teal" />
          <span className="text-xs sm:text-sm font-bold text-teal-deep">
            {paymentStep === 'shop' && 'Step 1: Browse Analytical Tests'}
            {paymentStep === 'cart' && 'Step 2: Shopping Cart & Quote'}
            {paymentStep === 'gateway' && 'Step 3: Secure Mobile Payment Gateway'}
            {paymentStep === 'invoice' && 'Step 4: Official Invoice Work Order'}
          </span>
        </div>
        
        {paymentStep === 'shop' && (
          <button 
            onClick={() => setPaymentStep('cart')}
            className="px-4 py-2 bg-teal hover:bg-teal-deep text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart ({selectedServices.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
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
        /* ================= 3. MOBILE PAYMENT GATEWAY REDESIGN ================= */
        <div className="max-w-xl mx-auto bg-white border border-line rounded-3xl overflow-hidden shadow-2xl animate-fade-in" id="payment-gateway">
          {/* Header */}
          <div className="bg-teal-deep p-6 sm:p-8 text-white text-center space-y-3 relative">
            <div className="absolute top-3 left-3 bg-white/10 px-2 py-0.5 rounded text-[9px] font-mono uppercase text-teal-pale">
              SSL SECURED
            </div>
            <h3 className="font-serif font-extrabold text-xl text-gold-pale">MHSL Payment Gateway</h3>
            <p className="text-xs text-teal-pale">Digital Transaction Protocol &middot; University of Rajshahi</p>
            <div className="inline-block bg-teal/50 px-4 py-1.5 rounded-full font-mono text-sm font-bold text-gold">
              Amount Due: ৳{grandTotal.toLocaleString()} BDT
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-faint text-center">
                Select Your Mobile Banking Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {/* bKash */}
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('bKash'); setOtpSent(false); }}
                  className={`border p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'bKash' ? 'border-pink-500 bg-pink-50/40 ring-2 ring-pink-500/20 shadow-md' : 'border-line hover:border-pink-300 bg-paper hover:bg-bg/10'
                  }`}
                >
                  <img 
                    src="https://play-lh.googleusercontent.com/ncgi2sk_NS5u8TfsEVmdaqQhRlv6D0c9JIQ-GmHvazUbp9GDU8gxNZxaq98ysy34juOmSA15KlPLjoAgquZ0nQ"
                    alt="bKash Logo"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-contain rounded-xl shadow-xs"
                  />
                  <span className="text-[11px] font-extrabold text-pink-700">bKash</span>
                </button>

                {/* Nagad */}
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('Nagad' as any); setOtpSent(false); }}
                  className={`border p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'Nagad' ? 'border-orange-500 bg-orange-50/40 ring-2 ring-orange-500/20 shadow-md' : 'border-line hover:border-orange-300 bg-paper hover:bg-bg/10'
                  }`}
                >
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZuLEGVUNnc9qKlwwe9RXepIOvFIdcPLhEzi8y3VluQkpS6FV1RenX03nJ&s=10"
                    alt="Nagad Logo"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-contain rounded-xl shadow-xs"
                  />
                  <span className="text-[11px] font-extrabold text-orange-700">Nagad</span>
                </button>

                {/* Rocket */}
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('Rocket'); setOtpSent(false); }}
                  className={`border p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'Rocket' ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-600/20 shadow-md' : 'border-line hover:border-purple-300 bg-paper hover:bg-bg/10'
                  }`}
                >
                  <img 
                    src="https://play-lh.googleusercontent.com/hcRpk0BWUTNPwr1bRWzNVKGZd2lbtdtNS9d__2w6glKwAUE_xvTh8FjkipEnzrlbEVCGsQ-75UwA5HRAYzHEdw"
                    alt="Rocket Logo"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-contain rounded-xl shadow-xs"
                  />
                  <span className="text-[11px] font-extrabold text-purple-700">Rocket</span>
                </button>
              </div>
            </div>

            {/* Simulated Wallet Payment Forms */}
            <div className="bg-bg/40 p-5 rounded-2xl border border-line space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-2 border-b border-line pb-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                <p className="text-xs text-ink-soft">
                  Paying via secure mobile billing for <strong className="capitalize text-teal-deep">{paymentMethod} Account</strong>.
                </p>
              </div>

              {!otpSent ? (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider">
                      Your 11-Digit {paymentMethod} Mobile Account Number
                    </label>
                    <input
                      type="tel"
                      value={walletNumber}
                      onChange={(e) => setWalletNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 01712345678"
                      className="w-full p-3 border border-line rounded-xl bg-white font-mono text-base focus:outline-none focus:border-teal transition-all text-teal-deep font-bold"
                      maxLength={11}
                      required
                    />
                    <p className="text-[10px] text-ink-faint leading-relaxed">
                      Enter the personal or agent wallet number. A 6-digit verification code will be sent instantly.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs animate-fade-in">
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3 rounded-xl flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full shrink-0"></span>
                    <span>An OTP verification code has been dispatched to <strong>{walletNumber}</strong></span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-ink-soft uppercase">
                        6-Digit OTP Code
                      </label>
                      <input
                        type="text"
                        value={walletOtp}
                        onChange={(e) => setWalletOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="######"
                        className="w-full p-3 border border-line rounded-xl bg-white font-mono text-center text-sm tracking-widest focus:outline-none focus:border-teal"
                        maxLength={6}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-ink-soft uppercase">
                        Secure Account PIN
                      </label>
                      <input
                        type="password"
                        value={walletPin}
                        onChange={(e) => setWalletPin(e.target.value.replace(/\D/g, ''))}
                        placeholder="••••"
                        className="w-full p-3 border border-line rounded-xl bg-white font-mono text-center text-sm tracking-widest focus:outline-none focus:border-teal"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Secure banking badge */}
            <div className="flex items-start gap-3 text-[11px] text-teal-deep bg-teal-pale/20 border border-teal/10 p-3.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-teal shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>University Billing Security Policy:</strong> All mobile money transactions are heavily encrypted. No PIN values are cached. Verified via the SSL-Commerz Bangladesh gateway API.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-line/60">
              <button
                type="button"
                onClick={() => setPaymentStep('cart')}
                className="px-4 py-2.5 border border-line text-xs font-bold hover:bg-bg rounded-xl transition-colors cursor-pointer"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={simulatePayment}
                disabled={isPaying}
                className={`flex items-center gap-1.5 font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-md text-white transition-all ${
                  paymentMethod === 'bKash' ? 'bg-pink-600 hover:bg-pink-700' :
                  paymentMethod === 'Nagad' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isPaying ? 'Authenticating payment session...' : 
                 !otpSent ? 'Send OTP Verification Code' : `Confirm Payment of ৳${grandTotal.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      ) : paymentStep === 'cart' ? (
        /* ================= 2. PRO-GRADE CART & ORDER MANAGEMENT ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start animate-fade-in" id="cart-checkout-screen">
          
          {/* Cart Table (Column 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-line">
              <div className="space-y-1">
                <h3 className="font-serif font-extrabold text-xl text-teal-deep">Diagnostic Shopping Cart</h3>
                <p className="text-[11px] text-ink-faint">Review and customize selected analytical assays</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  disabled={selectedServices.length === 0}
                  className="text-xs px-2.5 py-1 text-ink-soft bg-bg border border-line hover:text-red-600 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
                >
                  Clear Cart
                </button>
                <button
                  onClick={selectAll}
                  className="text-xs px-2.5 py-1 text-teal bg-teal-pale hover:bg-teal hover:text-white rounded-lg cursor-pointer transition-all"
                >
                  Add All Tests
                </button>
              </div>
            </div>

            {selectedServices.length === 0 ? (
              <div className="py-16 text-center space-y-4 bg-paper border border-dashed border-line rounded-3xl p-6 shadow-xs">
                <div className="w-16 h-16 bg-bg-alt text-ink-faint rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-teal-deep">Your Diagnostic Cart is Empty</p>
                  <p className="text-xs text-ink-faint max-w-sm mx-auto">
                    Please go back to the catalog shop and select the bacterial, biological or microbiological assays you require.
                  </p>
                </div>
                <button
                  onClick={() => setPaymentStep('shop')}
                  className="px-5 py-2.5 bg-teal text-white hover:bg-teal-deep rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  Return to Test Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border border-line rounded-2xl overflow-hidden divide-y divide-line bg-paper shadow-xs">
                  {selectedServices.map((service) => (
                    <div key={service.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={SERVICE_METADATA[service.id]?.img || '/src/assets/images/theme_molecular_1783104738281.jpg'}
                          alt={service.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 object-cover rounded-xl border border-line/60"
                        />
                        <div className="space-y-1">
                          <p className="text-xs sm:text-sm font-bold text-teal-deep">{service.name}</p>
                          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-ink-faint">
                            <span className="bg-bg px-2 py-0.5 rounded border border-line">{service.category}</span>
                            <span>&middot;</span>
                            <span className="text-teal font-semibold">Est. {service.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-extrabold text-teal-deep">
                          ৳{service.priceBDT.toLocaleString()}
                        </span>
                        <button
                          onClick={() => toggleService(service)}
                          className="p-2 text-ink-faint hover:text-red-500 bg-bg hover:bg-red-50 rounded-xl border border-line hover:border-red-100 transition-all cursor-pointer"
                          title="Remove from Cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setPaymentStep('shop')}
                  className="text-xs font-bold text-teal hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Continue adding analytical tests
                </button>
              </div>
            )}

            {/* University Instructions Info box */}
            <div className="bg-bg/50 border border-line p-5 rounded-2xl flex items-start gap-3.5 text-xs leading-relaxed text-ink-soft">
              <Info className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-teal-deep">Academic &amp; Student Research Grants:</p>
                <p className="text-ink-faint">
                  MHSL offers specialized, subsidized clearance vouchers for B.Sc. and MS thesis candidates of the Genetic Engineering Department. Bulk project allocations are available upon consultation with the Principal Investigator.
                </p>
              </div>
            </div>
          </div>

          {/* Form & Quote Calculator (Column 5) */}
          <form onSubmit={handleCheckoutSubmit} className="lg:col-span-5 bg-paper border border-line p-6 sm:p-8 rounded-3xl space-y-6 shadow-lg">
            <div className="border-b border-line pb-4">
              <h3 className="font-serif font-extrabold text-lg text-teal-deep flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-teal" />
                Quote Calculator
              </h3>
              <p className="text-[11px] text-ink-faint mt-1">Real-time official price estimation based on RU Syndicates</p>
            </div>

            {/* Summary List */}
            {selectedServices.length === 0 ? (
              <div className="py-6 text-center space-y-1 bg-bg/50 border border-dashed border-line rounded-xl">
                <p className="text-xs font-semibold text-ink-faint">No tests selected yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[160px] overflow-y-auto divide-y divide-line/40 border-b border-line pb-3 pr-1">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex justify-between text-xs py-1.5 text-ink-soft">
                    <span className="truncate max-w-[200px] font-medium">{service.name}</span>
                    <span className="font-mono text-teal-deep">৳{service.priceBDT.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs border-b border-line pb-4 font-mono bg-bg-alt/50 p-3.5 rounded-xl">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal:</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>VAT (5%):</span>
                <span>৳{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-sans text-sm font-bold text-teal-deep pt-2 border-t border-line border-dashed">
                <span>Grand Total BDT:</span>
                <span className="font-mono text-teal font-extrabold">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Client Metadata Fields */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-faint">
                Required Researcher Metadata
              </h4>
              
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-ink-soft uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Fatematuz Johra"
                  className="w-full p-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-teal transition-all font-medium text-teal-deep"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold text-ink-soft uppercase">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. 017xxxxxxxx"
                    className="w-full p-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-teal transition-all font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold text-ink-soft uppercase">Email *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="name@ru.ac.bd"
                    className="w-full p-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-teal transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-ink-soft uppercase">University / Institution *</label>
                <input
                  type="text"
                  required
                  value={clientInstitution}
                  onChange={(e) => setClientInstitution(e.target.value)}
                  placeholder="e.g. University of Rajshahi"
                  className="w-full p-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-teal transition-all font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-ink-soft uppercase">Department</label>
                <input
                  type="text"
                  value={clientDepartment}
                  onChange={(e) => setClientDepartment(e.target.value)}
                  placeholder="Genetic Engineering & Biotech"
                  className="w-full p-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-teal transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-ink-soft uppercase">Special Sample Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Pathogenic isolates, keep at -20 degrees, bulk batch testing details..."
                  className="w-full p-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-teal transition-all min-h-[60px]"
                />
              </div>
            </div>

            {/* Checkout buttons */}
            <button
              type="submit"
              disabled={selectedServices.length === 0}
              className="w-full py-3.5 bg-teal hover:bg-teal-deep text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 text-center uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" />
              Proceed to Secure BDT Payment
            </button>
          </form>
        </div>
      ) : (
        /* ================= 1. REDESIGNED E-COMMERCE PRODUCTS SHOP ================= */
        <div className="space-y-8 animate-fade-in" id="services-shop">
          
          {/* Filters & Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-xs text-ink-soft flex items-center gap-1 mr-2 font-bold font-mono">
                <Filter className="w-3.5 h-3.5" />
                Category:
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat 
                      ? 'bg-teal text-white shadow-sm' 
                      : 'bg-paper text-ink-soft border border-line hover:bg-bg/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-ink-faint font-mono">
              Showing {filteredServices.length} high-standard lab tests
            </div>
          </div>

          {/* E-Commerce Analytical Test Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="tests-grid">
            {filteredServices.map((service) => {
              const isAdded = selectedServices.some((s) => s.id === service.id);
              const meta = SERVICE_METADATA[service.id] || {
                desc: 'Premium analytical laboratory test conducted under strict sterile flow hoods.',
                img: '/src/assets/images/theme_molecular_1783104738281.jpg'
              };

              return (
                <div 
                  key={service.id}
                  className={`bg-paper border rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-teal/30 transition-all flex flex-col justify-between group h-[380px] ${
                    isAdded ? 'ring-2 ring-teal/40 border-teal' : 'border-line'
                  }`}
                >
                  {/* Card Thumbnail */}
                  <div className="relative h-44 overflow-hidden bg-bg-alt">
                    <img 
                      src={meta.img}
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Overlay */}
                    <span className="absolute top-3 left-3 bg-teal-deep/90 text-white backdrop-blur-xs text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {service.category}
                    </span>
                    {/* Est Duration Overlay */}
                    <span className="absolute bottom-3 right-3 bg-gold text-teal-deep text-[9px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                      {service.duration}
                    </span>
                  </div>

                  {/* Body Details */}
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h3 className="font-sans font-bold text-teal-deep text-sm tracking-tight leading-tight group-hover:text-teal transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-[11px] text-ink-faint leading-normal line-clamp-3">
                        {meta.desc}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between border-t border-line/40 pt-3 mt-1">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono font-bold text-ink-faint uppercase">Official Fee</span>
                        <span className="font-mono text-sm font-extrabold text-teal">
                          ৳{service.priceBDT.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleService(service)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isAdded 
                            ? 'bg-emerald-500 text-white shadow-sm' 
                            : 'bg-teal-pale text-teal hover:bg-teal hover:text-white border border-teal/10'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Cart Sticky Bottom Bar */}
          {selectedServices.length > 0 && (
            <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 bg-teal-deep text-white p-4 rounded-2xl shadow-xl border border-teal/40 flex items-center gap-4 z-40 max-w-md animate-fade-in">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <ShoppingCart className="w-5 h-5 text-gold" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-bold text-teal-pale uppercase tracking-wider">Your Lab Cart</p>
                <p className="text-sm font-extrabold truncate text-white">
                  {selectedServices.length} test{selectedServices.length > 1 ? 's' : ''} &middot; ৳{grandTotal.toLocaleString()} BDT
                </p>
              </div>
              <button
                onClick={() => setPaymentStep('cart')}
                className="px-4 py-2 bg-gold hover:bg-gold/90 text-teal-deep text-xs font-bold rounded-xl shadow-xs shrink-0 transition-all cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
