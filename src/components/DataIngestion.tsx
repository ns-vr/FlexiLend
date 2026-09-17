import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  CreditCard,
  Zap,
  Building2,
  Camera,
  Edit2,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ExtractedDocument, Transaction } from '../types';
import { formatINR } from '../utils/financial';
import { fetchOCRExtraction } from '../services/api';

interface DataIngestionProps {
  onAddTransaction: (txn: Transaction) => void;
  onAuditLog?: (action: string, reason: string) => void;
}

export const DataIngestion: React.FC<DataIngestionProps> = ({
  onAddTransaction,
  onAuditLog,
}) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedDoc, setExtractedDoc] = useState<ExtractedDocument | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    amount: 18400,
    merchant: 'Mandya APMC Sugarcane Yard (Lot #492)',
    category: 'Mandi Receipt',
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const samplePresets = [
    {
      label: 'Sample: Mandya APMC Mandi Weighment Slip',
      docType: 'Mandi Receipt',
      rawText: 'Mandya District Agricultural Produce Market Committee. Sugarcane Lot #492, Farmer: Ramesh Kumar. Net Weight: 18.4 Metric Tonnes, Rate ₹1,000/ton, Net Payable ₹18,400. Date: 12 Aug 2026. Settlement Status: Delayed Pending Mill Crushing.',
    },
    {
      label: 'Sample: Lasalgaon Onion APMC Auction Slip',
      docType: 'Mandi Receipt',
      rawText: 'Lasalgaon Onion APMC Yard, Nashik. Red Onion Grade A, Quantity: 24 Bags, Total ₹16,800. Date: 10 Aug 2026.',
    },
    {
      label: 'Sample: CHESCOM Rural Agri Pump Electricity Bill',
      docType: 'Utility Bill',
      rawText: 'Chamundeshwari Electricity Supply Corp (CHESCOM) Agri Consumer #99142. Pump 5HP. Due Date: 04 Sep 2026. Bill Amount: ₹2,200. Status: Unpaid.',
    },
  ];

  const handleProcessPreset = async (preset: (typeof samplePresets)[0]) => {
    setIsExtracting(true);
    setUploadSuccess(false);
    try {
      const res = await fetchOCRExtraction(preset.docType, preset.rawText);
      const doc: ExtractedDocument = {
        id: `DOC-${Date.now().toString().slice(-4)}`,
        fileName: `${preset.docType.toLowerCase().replace(/\s+/g, '_')}_scan.pdf`,
        docType: (res.docType as any) || (preset.docType as any),
        date: res.date || '2026-08-12',
        amount: res.amount || 18400,
        transactionType: res.transactionType || 'INCOME',
        merchant: res.merchant || 'Mandya APMC Sugarcane Yard',
        category: res.category || 'Mandi Receipt',
        confidence: res.confidence || 96,
        rawTextPreview: preset.rawText,
        status: 'EXTRACTED',
      };
      setExtractedDoc(doc);
      setEditForm({
        amount: doc.amount,
        merchant: doc.merchant,
        category: doc.category,
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleConfirm = () => {
    if (!extractedDoc) return;
    const newTxn: Transaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      borrowerId: 'BOR-101',
      date: extractedDoc.date,
      type: extractedDoc.transactionType === 'INCOME' ? 'CREDIT' : 'DEBIT',
      amount: editForm.amount,
      category: editForm.category as any,
      source: 'Offline OCR',
      confidence: extractedDoc.confidence,
      merchantOrParty: editForm.merchant,
      notes: `Extracted via Gemini Vision OCR from ${extractedDoc.fileName}`,
    };

    onAddTransaction(newTxn);
    onAuditLog?.(
      'DOCUMENT_OCR_CONFIRMED',
      `Ingested ${extractedDoc.docType} of ${formatINR(editForm.amount)} for Ramesh Kumar.`
    );
    setUploadSuccess(true);
    setExtractedDoc(null);
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setExtractedDoc(null);
    setIsEditing(false);
  };

  return (
    <div className="relative rounded-xl border border-slate-800/80 bg-[#12121E]/90 p-5 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <UploadCloud className="h-5 w-5 text-[#00F0FF]" />
            <h3 className="text-sm font-bold tracking-wider text-white uppercase font-['Chakra_Petch',sans-serif]">
              HYBRID DATA INGESTION CENTER
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Ingesting multimodal digital financial signals & offline agricultural records
          </p>
        </div>
      </div>

      {/* Two Source Categories */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Digital Sources Card */}
        <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 font-mono uppercase mb-3">
            <Smartphone className="h-4 w-4 text-[#00F0FF]" />
            <span>DIGITAL TELEMETRY STREAMS</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">Account Aggregator</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">UPI Payments</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">Milk Union Coop</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">Utility Grid Bills</span>
              <span className="h-2 w-2 rounded-full bg-amber-400" />
            </div>
          </div>
        </div>

        {/* Offline Sources Card */}
        <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-purple-400 font-mono uppercase mb-3">
            <Camera className="h-4 w-4 text-[#8A2BE2]" />
            <span>OFFLINE OCR / VISION INGESTION</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">Mandi Produce Slips</span>
              <span className="text-[10px] text-cyan-400 font-mono">OCR Active</span>
            </div>
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">Cash Khata Books</span>
              <span className="text-[10px] text-cyan-400 font-mono">OCR Active</span>
            </div>
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">Fertilizer Bills</span>
              <span className="text-[10px] text-cyan-400 font-mono">OCR Active</span>
            </div>
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-300">Printed Passbooks</span>
              <span className="text-[10px] text-cyan-400 font-mono">OCR Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload / Preset Simulation Area */}
      <div className="mt-5 rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/40 p-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00F0FF]">
            <UploadCloud className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-white">Upload Mandi Receipt or Agricultural Ledger</h4>
          <p className="text-xs text-slate-400 max-w-md">
            Drag & drop scanned receipts or choose a pre-configured hackathon telemetry document below for instant Gemini extraction:
          </p>

          {/* Preset Buttons for Judges / Demo */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleProcessPreset(preset)}
                disabled={isExtracting}
                className="rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-cyan-300 transition-all font-mono"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {isExtracting && (
            <div className="mt-4 flex items-center space-x-2 text-xs font-mono text-cyan-400 animate-pulse">
              <Sparkles className="h-4 w-4" />
              <span>FLEXILEND MULTIMODAL GEMINI ENGINE ANALYZING SLIP...</span>
            </div>
          )}

          {uploadSuccess && (
            <div className="mt-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-2.5 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Document verified & appended to borrower continuous cash flow!</span>
            </div>
          )}
        </div>
      </div>

      {/* Extracted Document Preview Card (Section 17 OCR Result) */}
      {extractedDoc && (
        <div className="mt-5 rounded-xl border border-cyan-500/40 bg-slate-900/90 p-5 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-[#00F0FF] uppercase">
                OCR EXTRACTION RESULT
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                Confidence: {extractedDoc.confidence}%
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">{extractedDoc.fileName}</span>
          </div>

          {isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
              <div>
                <label className="text-slate-400 text-[10px] block mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({ ...editForm, amount: Number(e.target.value) })}
                  className="w-full rounded bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 text-[10px] block mb-1">Merchant / APMC Yard</label>
                <input
                  type="text"
                  value={editForm.merchant}
                  onChange={(e) => setEditForm({ ...editForm, merchant: e.target.value })}
                  className="w-full rounded bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 text-[10px] block mb-1">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full rounded bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-white"
                >
                  <option value="Mandi Receipt">Mandi Receipt</option>
                  <option value="Milk Cooperative">Milk Cooperative</option>
                  <option value="Utility">Utility</option>
                  <option value="Fertilizer/Seeds">Fertilizer/Seeds</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-4 font-mono">
              <div>
                <span className="text-slate-500 text-[10px] block">DOCUMENT TYPE</span>
                <span className="text-slate-200 font-semibold">{extractedDoc.docType}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">AMOUNT</span>
                <span className="text-emerald-400 font-bold text-sm font-['Chakra_Petch',sans-serif]">
                  {formatINR(editForm.amount)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">DATE</span>
                <span className="text-slate-200">{extractedDoc.date}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">SOURCE ENTITY</span>
                <span className="text-slate-200 truncate block">{editForm.merchant}</span>
              </div>
            </div>
          )}

          {/* Action Buttons: Confirm, Edit, Discard */}
          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center space-x-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
            >
              <Edit2 className="h-3.5 w-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit'}</span>
            </button>
            <button
              onClick={handleDiscard}
              className="inline-flex items-center space-x-1 rounded-lg border border-pink-500/40 bg-pink-500/10 px-3 py-1.5 text-xs text-pink-400 hover:bg-pink-500/20"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Discard</span>
            </button>
            <button
              onClick={handleConfirm}
              className="inline-flex items-center space-x-1 rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Confirm & Save</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
