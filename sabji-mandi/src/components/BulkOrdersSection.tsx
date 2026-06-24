import React, { useState } from "react";
import { BulkBuyerInquiry } from "../types";
import { Language, translations } from "../lib/translations";
import { 
  Building2, PlusCircle, CheckCircle2, Phone, Calendar, Info, 
  IndianRupee, Crop, Leaf, ArrowRight, Sparkles, RefreshCw
} from "lucide-react";

interface BulkOrdersSectionProps {
  inquiries: BulkBuyerInquiry[];
  onInquiryCreated: (newInq: BulkBuyerInquiry) => void;
  onFulfillInquiry: (id: string) => void;
  lang: Language;
}

export default function BulkOrdersSection({ inquiries, onInquiryCreated, onFulfillInquiry, lang }: BulkOrdersSectionProps) {
  const t = translations[lang];

  // Tab switch state for separate Buyer and Seller/Farmer sections
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');

  // Post form states
  const [buyerName, setBuyerName] = useState("");
  const [buyerType, setBuyerType] = useState<'Hotel' | 'Restaurant' | 'Grocery Shop' | 'Hostel' | 'Caterer'>("Hotel");
  const [vegetableName, setVegetableName] = useState("");
  const [requiredQty, setRequiredQty] = useState<number | "">("");
  const [targetPrice, setTargetPrice] = useState<number | "">("");
  const [deliveryBy, setDeliveryBy] = useState(new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0]);
  const [contactNumber, setContactNumber] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // Handle Inquiry post
  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !vegetableName || !requiredQty || !contactNumber) return;

    setIsPosting(true);
    try {
      const payload = {
        buyerName,
        buyerType,
        vegetableName,
        requiredQty: Number(requiredQty),
        targetPrice: targetPrice ? Number(targetPrice) : undefined,
        deliveryBy,
        contactNumber
      };

      const response = await fetch("/api/bulk-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (response.ok) {
        onInquiryCreated(data);
        setPostSuccess(true);
        // Clear inputs
        setVegetableName("");
        setRequiredQty("");
        setTargetPrice("");
        setContactNumber("");
        setTimeout(() => setPostSuccess(false), 2500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Description Header */}
      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 shadow-sm space-y-2">
        <h3 className="text-sm font-bold text-stone-850 flex items-center gap-1.5">
          <Building2 className="w-4.5 h-4.5 text-emerald-600" />
          {t.bulkSection}
        </h3>
        <p className="text-[11px] text-stone-500 leading-relaxed">
          Schools, universities, hostellers, large caterers, restaurants, and hotels can post their public seasonal volume requests directly. Registered farmers can browse, click to fulfill, or secure bulk wholesale agreements.
        </p>
      </div>

      {/* 🔮 Interactive Buyer vs. Seller access terminals switcher */}
      <div className="grid grid-cols-2 gap-3.5 p-1.5 bg-[#f5f5f4] rounded-2xl border-2 border-stone-200/40">
        <button
          type="button"
          onClick={() => setActiveTab('buyer')}
          className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'buyer'
              ? 'bg-white text-emerald-800 shadow-md border-b-[3px] border-emerald-600 font-extrabold'
              : 'text-stone-500 hover:text-stone-750 hover:bg-white/40'
          }`}
        >
          <Building2 className="w-4.5 h-4.5 text-current" />
          <span>🏢 Buyer Access</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seller')}
          className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'seller'
              ? 'bg-white text-emerald-803 shadow-md border-b-[3px] border-emerald-600 font-extrabold'
              : 'text-stone-500 hover:text-stone-750 hover:bg-white/40'
          }`}
        >
          <Leaf className="w-4.5 h-4.5 text-current" />
          <span>👨‍🌾 Seller Access</span>
        </button>
      </div>

      {/* Access terminals switch layout render */}
      <div className="transition-all duration-300">
        {activeTab === 'buyer' ? (
          <div className="space-y-4">
            {/* Post public demand form */}
            <div className="bg-white rounded-3xl border-2 border-stone-200/60 p-5 shadow-sm space-y-4 max-w-xl mx-auto">
              <div className="flex justify-between items-center border-b border-stone-100 pb-2.5">
                <h4 className="text-xs font-black text-slate-805 uppercase tracking-widest flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-emerald-700" />
                  {t.postBulkDemand}
                </h4>
                <span className="text-[8.5px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-150">
                  INSTITUTION PORTAL
                </span>
              </div>

              {postSuccess && (
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 text-[10px] font-bold border border-emerald-150 flex items-center gap-2.5 animate-fade-in shadow-inner">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>Success! Your institutional lot demand has been posted to our live public ledger. Farmers can view and secure fulfillment immediately.</span>
                </div>
              )}

              <form onSubmit={handleSubmitInquiry} className="space-y-3.5 text-left">
                <div>
                  <label className="block text-slate-655 font-extrabold text-[10px] uppercase tracking-wider mb-1">{t.buyerNameLabel}</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={e => setBuyerName(e.target.value)}
                    placeholder="e.g. Lovely University Mess Central"
                    className="w-full text-slate-800 border bg-white border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-1 focus:ring-emerald-550 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-extrabold text-[10px] uppercase tracking-wider mb-1">Institution Type</label>
                    <select
                      value={buyerType}
                      onChange={e => setBuyerType(e.target.value as any)}
                      className="w-full text-slate-800 border bg-white border-stone-300 rounded-xl px-2.5 py-2 text-xs font-semibold focus:ring-1 focus:ring-emerald-550 focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Hotel">Hotel</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Grocery Shop">Grocery Shop</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Caterer">Caterer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-extrabold text-[10px] uppercase tracking-wider mb-1">{t.vegName}</label>
                    <input
                      type="text"
                      required
                      value={vegetableName}
                      onChange={e => setVegetableName(e.target.value)}
                      placeholder="e.g. Potato, Cauliflower"
                      className="w-full text-slate-800 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-1 focus:ring-emerald-550 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-extrabold text-[10px] uppercase tracking-wider mb-1">{t.requiredQty}</label>
                    <input
                      type="number"
                      required
                      min="20"
                      value={requiredQty}
                      onChange={e => setRequiredQty(Number(e.target.value) || "")}
                      placeholder="Min 50 kg"
                      className="w-full text-slate-850 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:ring-1 focus:ring-emerald-555 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-extrabold text-[10px] uppercase tracking-wider mb-1">{t.targetPrice} (Optional)</label>
                    <input
                      type="number"
                      min="1"
                      value={targetPrice}
                      onChange={e => setTargetPrice(Number(e.target.value) || "")}
                      placeholder="e.g. 15"
                      className="w-full text-slate-850 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:ring-1 focus:ring-emerald-555 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-605 font-extrabold text-[10px] uppercase tracking-wider mb-1">{t.deliveryBy}</label>
                    <input
                      type="date"
                      required
                      value={deliveryBy}
                      onChange={e => setDeliveryBy(e.target.value)}
                      className="w-full text-slate-800 border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-1 focus:ring-emerald-555 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-605 font-extrabold text-[10px] uppercase tracking-wider mb-1">{t.contactPhone}</label>
                    <input
                      type="text"
                      required
                      value={contactNumber}
                      onChange={e => setContactNumber(e.target.value)}
                      placeholder="+91 99999-55555"
                      className="w-full text-slate-800 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:ring-1 focus:ring-emerald-555 focus:outline-none bg-white font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPosting || !buyerName || !vegetableName || !requiredQty}
                  className="w-full bg-slate-900 active:scale-95 text-white font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all mt-4 hover:bg-slate-800 disabled:bg-stone-350 shadow-md uppercase tracking-wider cursor-pointer font-black"
                >
                  {isPosting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Posting New Demand Lot...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t.postDemandBtn}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Smart info tip card */}
            <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200/60 max-w-xl mx-auto flex gap-3 text-left">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-[10px] text-stone-600 leading-relaxed font-semibold">
                <span className="font-extrabold text-amber-900 uppercase tracking-wider block mb-0.5">💡 Buyer Tip for Faster Fulfillments:</span>
                Specifying real target-prices and clear delivery dates lets farm collectives calculate vehicle margins on the spot, boosting your response times by 40%.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Public Inquiries Bulletin */}
            <div className="space-y-3.5 max-w-2xl mx-auto text-left">
              <div className="flex justify-between items-center border-b border-stone-200/60 pb-2">
                <h4 className="text-xs font-black text-slate-805 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Bulk Requisitions ({inquiries.length})
                </h4>
                <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">
                  Live cooperative bids
                </p>
              </div>

              <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                {inquiries.length > 0 ? (
                  inquiries.map(inq => (
                    <div 
                      key={inq.id} 
                      className={`border-2 rounded-3xl p-4.5 shadow-sm space-y-3.5 transition-all relative overflow-hidden ${
                        inq.status === "Fulfilled" 
                          ? "border-emerald-200 bg-emerald-50/40 opacity-80" 
                          : "border-stone-200 bg-stone-50 hover:border-emerald-500/40 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-stone-200 text-stone-755 text-[8.5px] font-black rounded-lg uppercase tracking-wide mb-1.5">
                            🏢 {inq.buyerType}
                          </span>
                          <h5 className="text-xs font-black text-slate-900 leading-snug">{inq.buyerName}</h5>
                        </div>
                        {/* Status badge */}
                        <span className={`text-[9.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          inq.status === "Fulfilled" 
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold" 
                            : "bg-amber-100 text-amber-808 border border-amber-200 animate-pulse font-extrabold"
                        }`}>
                          {inq.status === 'Fulfilled' ? "Fulfilled" : "Open Demand"}
                        </span>
                      </div>

                      {/* Lot Specs */}
                      <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-2xl border border-stone-200/50 text-[11px] text-stone-700">
                        <p className="flex items-center gap-1">
                          <span className="text-slate-400 font-semibold uppercase text-[8.5px] block w-14">Crop:</span>
                          <span className="font-extrabold text-slate-905">{inq.vegetableName}</span>
                        </p>
                        <p className="flex items-center gap-1">
                          <span className="text-slate-400 font-semibold uppercase text-[8.5px] block w-14">Target Qty:</span>
                          <span className="font-black text-emerald-800 font-mono">{inq.requiredQty} kg</span>
                        </p>
                        <p className="flex items-center gap-1">
                          <span className="text-slate-400 font-semibold uppercase text-[8.5px] block w-14">Target ₹/kg:</span>
                          <span className="font-extrabold text-slate-905">
                            {inq.targetPrice ? `₹${inq.targetPrice}/kg` : "Open Negotiation"}
                          </span>
                        </p>
                        <p className="flex items-center gap-1 text-[10.5px]">
                          <span className="text-slate-400 font-semibold uppercase text-[8.5px] w-14 block">Deliver By:</span>
                          <span className="font-bold text-slate-805">{inq.deliveryBy}</span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[10.5px] text-stone-605 border-t border-stone-200/40 pt-3">
                        <p className="flex items-center gap-1 font-mono font-bold text-slate-805">
                          <Phone className="w-3.5 h-3.5 text-stone-405" />
                          {inq.contactNumber}
                        </p>
                        {inq.status === "Open" ? (
                          <button
                            onClick={() => onFulfillInquiry(inq.id)}
                            className="bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl transition-all flex items-center gap-1 shadow-md cursor-pointer"
                          >
                            Fulfill Lot
                          </button>
                        ) : (
                          <div className="flex items-center gap-1 text-emerald-800 font-black uppercase text-[10px] tracking-wider">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Lot Secured
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-250">
                    <Info className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-stone-400 text-xs font-semibold">{t.noInquiries}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Smart info tip card */}
            <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-250/40 max-w-2xl mx-auto flex gap-3 text-left">
              <Info className="w-4 h-4 text-emerald-750 shrink-0 mt-0.5" />
              <div className="text-[10px] text-stone-600 leading-relaxed font-semibold">
                <span className="font-extrabold text-emerald-850 uppercase tracking-wider block mb-0.5">💡 Farmer Fulfiller Tip:</span>
                Securing a bulk agreement creates a direct digital reservation. Call or WhatsApp the institution coordinator immediately using the private contact phone above to organize shipment routes.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
