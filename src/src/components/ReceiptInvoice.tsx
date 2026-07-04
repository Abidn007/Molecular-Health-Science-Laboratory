import { LaboratoryService } from '../types';
import { Download, Printer, CheckCircle, ShieldCheck, FileText, Calendar, Building, Landmark, QrCode } from 'lucide-react';

interface ReceiptInvoiceProps {
  clientDetails: {
    name: string;
    email: string;
    institution: string;
    department: string;
    phone: string;
    notes?: string;
  };
  selectedServices: LaboratoryService[];
  transactionId: string;
  paymentMethod: string;
  paidAmount: number;
  paymentDate: string;
  onReset: () => void;
}

export default function ReceiptInvoice({
  clientDetails,
  selectedServices,
  transactionId,
  paymentMethod,
  paidAmount,
  paymentDate,
  onReset,
}: ReceiptInvoiceProps) {
  const subtotal = selectedServices.reduce((sum, service) => sum + service.priceBDT, 0);
  const tax = Math.round(subtotal * 0.05); // 5% VAT
  const grandTotal = subtotal + tax;

  const handlePrint = () => {
    window.focus();
    window.print();
  };

  return (
    <div className="bg-white text-ink max-w-3xl mx-auto border border-line rounded-3xl shadow-xl overflow-hidden my-4" id="receipt-invoice-view">
      {/* Dynamic inline styles for Times New Roman font-family and print mode visibility overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          /* Hide everything else */
          body * {
            visibility: hidden !important;
          }
          /* Show only the print-area element */
          #print-area, #print-area * {
            visibility: visible !important;
            font-family: 'Times New Roman', Times, serif !important;
          }
          #print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          /* Ensure tailwind print:hidden works beautifully */
          .print\\:hidden {
            display: none !important;
          }
        }
        /* Always render invoice text in Times New Roman */
        #print-area, #print-area * {
          font-family: 'Times New Roman', Times, serif !important;
        }
      `}} />

      {/* Top Banner Success */}
      <div className="bg-teal text-white px-6 py-4 flex items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2.5">
          <CheckCircle className="w-5 h-5 text-gold animate-pulse shrink-0" />
          <div className="text-left">
            <p className="font-bold text-xs sm:text-sm">Payment Confirmed Successfully</p>
            <p className="text-[10px] text-white/80">Your digital work order and official receipt are active.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[11px] font-bold transition-all cursor-pointer"
          >
            Back to Lab Shop
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-teal-deep text-white rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer border border-teal-pale/25"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Receipt
          </button>
        </div>
      </div>

      <div className="p-8 sm:p-10 space-y-8 bg-white" id="print-area">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 border-b border-line pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoPslN9e0c8siqMB7TJxGAph_EZ8b6QwYx4vEJsaWDfA1Nz_v_ZCNqsjOksHPSRpm-4LXujp2nMBxE6_eAzeVEgzFzAXHJtCF9hmlvy2y4-1_MVePOHezmLH-rDtd3E-lcH6oDP0ppeB8kiJVOmzYqvOg0oRgz1ww4YEO8k7vvA-EdP2ww_zVLYjFCr_I/s320/Lab%20Logo.jpeg"
                alt="Molecular Health Science Laboratory Logo"
                className="h-14 w-auto object-contain shrink-0 rounded-lg border border-line"
                referrerPolicy="no-referrer"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-teal-deep tracking-tight">MHSL</h1>
                <p className="text-[10px] font-mono text-gold font-bold uppercase tracking-widest">Molecular Health Science Lab</p>
              </div>
            </div>
            <div className="text-xs text-ink-soft space-y-0.5">
              <p className="font-semibold text-teal-deep">Department of Genetic Engineering &amp; Biotechnology</p>
              <p>University of Rajshahi, Rajshahi-6205, Bangladesh</p>
              <p className="text-[10px] text-ink-faint">Email: mhsl@ru.ac.bd &middot; Web: geb.ru.ac.bd/mhsl</p>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-2">
            <div className="inline-block bg-teal-deep text-white px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
              Official Work Order Receipt
            </div>
            <div className="text-xs space-y-1 font-mono text-ink-soft">
              <p><span className="text-ink-faint">RECEIPT NO:</span> <strong className="text-teal-deep">{transactionId}</strong></p>
              <p><span className="text-ink-faint">DATE ISSUED:</span> {paymentDate}</p>
              <p><span className="text-ink-faint">PAYMENT STATUS:</span> <span className="text-emerald-600 font-bold">PAID &amp; COMPLETED</span></p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-bg/50 p-6 rounded-2xl border border-line/60">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-1.5 border-b border-line pb-1.5 mb-2">
              <Building className="w-4 h-4 text-teal shrink-0" />
              <h3 className="font-mono text-[10px] font-bold text-ink-soft uppercase tracking-wider">Client &amp; Scholar Information</h3>
            </div>
            <div className="space-y-1.5 text-ink-soft">
              <p className="font-bold text-teal-deep text-sm">{clientDetails.name}</p>
              <p className="font-medium text-ink">{clientDetails.institution}</p>
              <p className="text-[11px]">{clientDetails.department}</p>
              <div className="pt-1.5 space-y-0.5 text-[11px] font-mono text-ink-faint">
                <p>Phone: {clientDetails.phone}</p>
                <p>Email: {clientDetails.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-1.5 border-b border-line pb-1.5 mb-2">
              <Landmark className="w-4 h-4 text-teal shrink-0" />
              <h3 className="font-mono text-[10px] font-bold text-ink-soft uppercase tracking-wider">Billing &amp; Transaction Details</h3>
            </div>
            <div className="space-y-1.5 text-ink-soft">
              <p><span className="text-ink-faint font-mono text-[10px]">PAYMENT METHOD:</span> <strong className="text-ink font-semibold capitalize">{paymentMethod}</strong></p>
              <p><span className="text-ink-faint font-mono text-[10px]">TRANSACTION ID:</span> <span className="font-mono font-medium text-teal-deep bg-teal-pale/40 px-1.5 py-0.5 rounded text-[10px]">{transactionId}</span></p>
              <p><span className="text-ink-faint font-mono text-[10px]">ESTIMATED START:</span> Within 24-48 Hours</p>
              <p><span className="text-ink-faint font-mono text-[10px]">ACCOUNT TYPE:</span> University Research Clearance</p>
            </div>
          </div>
        </div>

        {/* Table of Items */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 border-b border-line pb-2">
            <FileText className="w-4 h-4 text-teal shrink-0" />
            <h3 className="font-mono text-[10px] font-bold text-ink-soft uppercase tracking-wider">Authorized Testing Services</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-teal-deep text-white font-mono text-[9px] uppercase tracking-wider rounded-lg overflow-hidden">
                  <th className="py-2.5 px-4 text-left rounded-l-xl">Test / Service Description</th>
                  <th className="py-2.5 px-4 text-left">Category</th>
                  <th className="py-2.5 px-4 text-right">Est. Duration</th>
                  <th className="py-2.5 px-4 text-right rounded-r-xl">Price (BDT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {selectedServices.map((service, index) => (
                  <tr key={service.id} className="text-ink-soft hover:bg-bg/10 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-teal-deep">{service.name}</div>
                      <div className="text-[10px] text-ink-faint">Code: MHSL-{service.id.toUpperCase()}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[10px]">{service.category}</td>
                    <td className="py-3 px-4 text-right text-[10px] font-medium text-teal">{service.duration}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-teal-deep">৳{service.priceBDT.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-line">
          {/* Notes column */}
          <div className="md:col-span-7 bg-bg/30 p-4 rounded-xl border border-line/40 text-[11px] text-ink-soft space-y-1.5">
            <p className="font-mono font-bold uppercase text-[9px] tracking-wider text-ink-faint">Standard Terms &amp; Instructions</p>
            <ul className="list-disc list-inside space-y-1 text-ink-faint leading-relaxed">
              <li>Samples should be delivered in sealed vials with sterile labels.</li>
              <li>Please mention the Work Order No. on each sample submission form.</li>
              <li>Official lab reports will be delivered both digitally and physically.</li>
              <li>Refund requests must be processed before reagent preparation (24 hours).</li>
            </ul>
            {clientDetails.notes && (
              <div className="pt-2 border-t border-line/60">
                <p className="font-semibold text-teal-deep">Researcher Instruction Notes:</p>
                <p className="italic text-ink-faint font-sans font-normal mt-0.5">&ldquo;{clientDetails.notes}&rdquo;</p>
              </div>
            )}
          </div>

          {/* Calculations column */}
          <div className="md:col-span-5 space-y-2 text-xs self-start">
            <div className="flex justify-between text-ink-soft">
              <span className="font-mono text-ink-faint">SUBTOTAL:</span>
              <span className="font-mono font-semibold">৳{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span className="font-mono text-ink-faint">VAT / GOVT TAX (5%):</span>
              <span className="font-mono font-semibold">৳{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-2.5 text-sm font-bold text-teal-deep">
              <span>GRAND TOTAL:</span>
              <span className="font-mono text-teal">৳{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Digital Verification Security Shield */}
        <div className="border-t border-line pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span className="font-bold font-mono tracking-wide text-[10px]">DIGITALLY VERIFIED WORK ORDER</span>
            </div>
            <p className="text-[10px] text-ink-faint max-w-sm leading-relaxed mx-auto sm:mx-0">
              This official document has been authenticated under security protocols for academic clearance at RU. Report matching keys: <code className="font-mono bg-bg px-1 py-0.5 rounded text-[9px]">{transactionId.slice(0, 12)}...</code>
            </p>
          </div>
          
          {/* QR Code and Barcode design */}
          <div className="flex items-center gap-4">
            {/* Barcode-like visual element */}
            <div className="hidden sm:flex flex-col items-center gap-1 text-center">
              <div className="h-10 flex gap-0.5 items-end px-1.5 py-1 bg-bg border border-line rounded">
                <div className="w-0.5 h-8 bg-ink"></div>
                <div className="w-1 h-8 bg-ink"></div>
                <div className="w-0.5 h-8 bg-ink"></div>
                <div className="w-1.5 h-8 bg-ink"></div>
                <div className="w-0.5 h-8 bg-ink"></div>
                <div className="w-0.5 h-8 bg-ink"></div>
                <div className="w-1 h-8 bg-ink"></div>
                <div className="w-0.5 h-8 bg-ink"></div>
                <div className="w-1.5 h-8 bg-ink"></div>
                <div className="w-1 h-8 bg-ink"></div>
                <div className="w-0.5 h-8 bg-ink"></div>
              </div>
              <span className="text-[7px] font-mono text-ink-faint tracking-widest">{transactionId.slice(-10)}</span>
            </div>

            <div className="flex flex-col items-center gap-1 text-center bg-bg p-1.5 border border-line rounded-xl">
              <QrCode className="w-11 h-11 text-teal-deep" />
              <span className="text-[7px] font-mono font-bold text-ink-faint">SCAN TO CHECK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


