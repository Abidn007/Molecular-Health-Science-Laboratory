import { LaboratoryService } from '../types';
import { Download, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

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
    window.print();
  };

  return (
    <div className="bg-white text-brand-ink max-w-2xl mx-auto border border-line rounded-2xl shadow-lg overflow-hidden my-4" id="receipt-invoice-view">
      {/* Top Banner Success */}
      <div className="bg-teal text-white p-4 text-center flex items-center justify-center gap-2 print:hidden">
        <CheckCircle className="w-5 h-5 text-gold-pale" />
        <span className="font-semibold text-sm">Payment Successful! Your official receipt &amp; work order is generated.</span>
      </div>

      <div className="p-8 space-y-6 print:p-0" id="print-area">
        {/* Invoice Header */}
        <div className="flex justify-between items-start border-b border-line pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-teal" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="var(--color-teal-pale)" stroke="var(--color-teal)" strokeWidth="1.5" />
                <circle cx="14" cy="16" r="2.6" fill="var(--color-teal)" />
                <circle cx="24" cy="13" r="1.8" fill="var(--color-gold)" />
                <circle cx="26" cy="23" r="2.3" fill="var(--color-teal)" />
                <circle cx="16" cy="26" r="1.6" fill="var(--color-gold)" />
              </svg>
              <h1 className="text-xl font-bold font-serif text-teal-deep">MHSL</h1>
            </div>
            <p className="text-xs font-semibold text-teal-deep font-sans">Molecular Health Science Laboratory</p>
            <p className="text-[10px] text-ink-faint">Dept. of Genetic Engineering &amp; Biotechnology, RU</p>
            <p className="text-[10px] text-ink-faint">University of Rajshahi, Rajshahi-6205, Bangladesh</p>
          </div>
          <div className="text-right">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-gold">Official Work Order Receipt</h2>
            <div className="mt-2 text-xs font-mono space-y-1 text-ink-soft">
              <p><span className="font-semibold text-ink">Invoice #:</span> {transactionId}</p>
              <p><span className="font-semibold text-ink">Date:</span> {paymentDate}</p>
              <p><span className="font-semibold text-ink">Status:</span> <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold text-[9px] border border-emerald-100 uppercase">Paid</span></p>
            </div>
          </div>
        </div>

        {/* Client & Payment Info */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <h3 className="font-mono text-[9px] font-bold text-ink-faint uppercase tracking-wider border-b border-line pb-1 mb-2">Billed To (Client Details)</h3>
            <div className="space-y-1 text-ink-soft">
              <p className="font-bold text-teal-deep">{clientDetails.name}</p>
              <p>{clientDetails.department}</p>
              <p className="font-medium text-ink">{clientDetails.institution}</p>
              <p>{clientDetails.phone}</p>
              <p className="italic text-[10px]">{clientDetails.email}</p>
            </div>
          </div>
          <div>
            <h3 className="font-mono text-[9px] font-bold text-ink-faint uppercase tracking-wider border-b border-line pb-1 mb-2">Payment Details</h3>
            <div className="space-y-1 text-ink-soft">
              <p><span className="font-mono text-[10px]">Method:</span> <strong className="text-ink">{paymentMethod}</strong></p>
              <p><span className="font-mono text-[10px]">Reference:</span> {transactionId}</p>
              <p><span className="font-mono text-[10px]">Security:</span> Secure SSL Encrypted</p>
              <p><span className="font-mono text-[10px]">Currency:</span> BDT (৳) - Bangladeshi Taka</p>
            </div>
          </div>
        </div>

        {/* Table of Items */}
        <div>
          <h3 className="font-mono text-[9px] font-bold text-ink-faint uppercase tracking-wider border-b border-line pb-1 mb-3">Service Details &amp; Testing Specifications</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-bg-alt text-ink font-mono text-[9px] uppercase tracking-wider">
                <th className="py-2 px-3 text-left">Test / Service Name</th>
                <th className="py-2 px-3 text-left">Category</th>
                <th className="py-2 px-3 text-right">Estimated Duration</th>
                <th className="py-2 px-3 text-right">Price (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {selectedServices.map((service) => (
                <tr key={service.id} className="text-ink-soft">
                  <td className="py-2 px-3 font-semibold text-teal-deep">{service.name}</td>
                  <td className="py-2 px-3 font-mono text-[10px]">{service.category}</td>
                  <td className="py-2 px-3 text-right text-[10px]">{service.duration}</td>
                  <td className="py-2 px-3 text-right font-mono font-medium">৳{service.priceBDT.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="border-t border-line pt-4 flex justify-end">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal:</span>
              <span className="font-mono">৳{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>VAT / Government Tax (5%):</span>
              <span className="font-mono">৳{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-sm font-bold text-teal-deep">
              <span>Grand Total Paid:</span>
              <span className="font-mono">৳{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Bottom Verification stamp, signature, and QR code */}
        <div className="border-t border-line pt-6 flex justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-bold">MHSL VERIFIED TRANSACTION</span>
            </div>
            <p className="text-[10px] text-ink-faint max-w-xs">
              This is a computer-generated, digitally verified receipt for analytical and testing laboratory services provided by the Molecular Health Science Laboratory. No physical signature is required.
            </p>
          </div>
          
          {/* Mock QR Code in SVG */}
          <div className="flex flex-col items-center gap-1 text-center">
            <svg className="w-16 h-16 border border-line p-1 rounded-lg" viewBox="0 0 100 100">
              <rect x="10" y="10" width="20" height="20" fill="currentColor" />
              <rect x="15" y="15" width="10" height="10" fill="white" />
              <rect x="70" y="10" width="20" height="20" fill="currentColor" />
              <rect x="75" y="15" width="10" height="10" fill="white" />
              <rect x="10" y="70" width="20" height="20" fill="currentColor" />
              <rect x="15" y="75" width="10" height="10" fill="white" />
              {/* Random QR squares */}
              <rect x="40" y="10" width="10" height="10" fill="currentColor" />
              <rect x="50" y="30" width="15" height="10" fill="currentColor" />
              <rect x="45" y="45" width="10" height="20" fill="currentColor" />
              <rect x="70" y="45" width="20" height="10" fill="currentColor" />
              <rect x="35" y="75" width="15" height="15" fill="currentColor" />
              <rect x="75" y="75" width="15" height="15" fill="currentColor" />
            </svg>
            <span className="text-[8px] font-mono text-ink-faint">SCAN TO VERIFY</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-6 bg-bg-alt flex flex-col sm:flex-row gap-3 justify-end border-t border-line print:hidden">
        <button
          onClick={onReset}
          className="px-4 py-2 text-xs font-semibold text-ink-soft border border-line hover:bg-bg rounded-lg cursor-pointer transition-colors text-center"
        >
          Generate Another Quotation
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-1 px-5 py-2.5 bg-teal text-white font-bold text-xs hover:bg-teal-deep rounded-lg cursor-pointer shadow-sm transition-all text-center"
        >
          <Printer className="w-3.5 h-3.5" />
          Print / Download PDF Receipt
        </button>
      </div>
    </div>
  );
}
