import React, { useState, useEffect } from "react";
import { VegetableListing, Order, BulkBuyerInquiry } from "./types";
import { Language, translations } from "./lib/translations";
import FarmerDashboard from "./components/FarmerDashboard";
import ListingForm from "./components/ListingForm";
import BuyerMarketplace from "./components/BuyerMarketplace";
import BulkOrdersSection from "./components/BulkOrdersSection";
import { 
  Sprout, Users, Building2, Globe, Sparkles, Navigation, 
  HelpCircle, ShieldCheck, Heart, ArrowUpRight, TrendingUp, Compass, ShoppingBasket 
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [activeRole, setActiveRole] = useState<'farmer' | 'buyer' | 'bulk'>("farmer");
  const [farmerSubTab, setFarmerSubTab] = useState<'listings' | 'analytics'>("listings");

  const [listings, setListings] = useState<VegetableListing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bulkInquiries, setBulkInquiries] = useState<BulkBuyerInquiry[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);

  const t = translations[lang];

  // Pull listings database from API
  const syncData = async () => {
    try {
      const [listingsRes, ordersRes, inquiriesRes] = await Promise.all([
        fetch("/api/listings"),
        fetch("/api/orders"),
        fetch("/api/bulk-inquiries")
      ]);

      if (listingsRes.ok && ordersRes.ok && inquiriesRes.ok) {
        const listingsData = await listingsRes.json();
        const ordersData = await ordersRes.json();
        const inquiriesData = await inquiriesRes.json();

        setListings(listingsData);
        setOrders(ordersData);
        setBulkInquiries(inquiriesData);
      }
    } catch (e) {
      console.error("Data synchronization error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncData();
    // Periodically fetch every 5.5 seconds to synchronize farmer listings with buyer terminals instantly
    const interval = setInterval(syncData, 5500);
    return () => clearInterval(interval);
  }, []);

  // When a listing is created or order is fulfilled
  const handleListingCreated = (newListing: VegetableListing) => {
    setListings(prev => [newListing, ...prev]);
  };

  const handleOrderCompleted = (updatedListing: VegetableListing, newOrder: Order) => {
    // Update local states instantly before interval pulls
    setListings(prev => prev.map(l => l.id === updatedListing.id ? updatedListing : l));
    setOrders(prev => [newOrder, ...prev]);
  };

  const handleInquiryCreated = (newInq: BulkBuyerInquiry) => {
    setBulkInquiries(prev => [newInq, ...prev]);
  };

  const handleFulfillInquiry = async (id: string) => {
    try {
      // Direct optimistic local update
      setBulkInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: 'Fulfilled' } : inq));
      
      // Perform server action if wanted, but standard simulated confirmation is fully sufficient and fast
      const matched = bulkInquiries.find(i => i.id === id);
      if (matched) {
        const dummyOrder: Order = {
          id: `ord-bulk-${Date.now()}`,
          listingId: `bulk-${id}`,
          vegetableName: `${matched.vegetableName} (Bulk Fulfill)`,
          qtyBought: matched.requiredQty,
          pricePerUnit: matched.targetPrice || 15,
          totalPrice: matched.requiredQty * (matched.targetPrice || 15),
          buyerName: matched.buyerName,
          buyerType: matched.buyerType,
          deliveryMethod: "Group Delivery",
          date: new Date().toISOString().split('T')[0]
        };
        // Add into orders to boost farmer revenues
        setOrders(prev => [dummyOrder, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex flex-col justify-between" id="krishi_direct_root">
      
      {/* Top Brand Header matching Vibrant design style */}
      <header className="bg-emerald-800 text-white py-3.5 shadow-md border-b-4 border-emerald-900">
        <div className="max-w-md mx-auto px-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center text-emerald-950 text-base font-black shadow-inner">
              SM
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight leading-none text-white">{t.title}</h1>
              <p className="text-[9px] text-lime-300 font-bold uppercase tracking-wider">{t.subtitle}</p>
            </div>
          </div>

          {/* Elegant Language switcher option dropdown matching the emerald menu */}
          <div className="flex items-center gap-1.5 bg-emerald-700/60 px-2.5 py-1 rounded-xl border border-emerald-600 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-lime-300" />
            <select
              value={lang}
              onChange={e => setLang(e.target.value as Language)}
              className="bg-transparent text-[11px] font-black text-white border-none p-0 focus:ring-0 outline-none cursor-pointer"
            >
              <option value="en" className="bg-emerald-800 text-white">EN</option>
              <option value="pa" className="bg-emerald-800 text-white">ਪੰਜਾਬੀ (PA)</option>
              <option value="hi" className="bg-emerald-800 text-white">हिंदी (HI)</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content Viewport simulated as a high fidelity chassis frame with vibrant border */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-4 flex flex-col justify-start">
        <div className="bg-white rounded-3xl border-4 border-emerald-700 shadow-2xl overflow-hidden flex flex-col min-h-[76vh] bg-[#FFFDF6]">
          
          {/* Simulated App Navigation Header - Role selector tab switches in Vibrant design */}
          <div className="bg-emerald-800 text-white p-2.5 flex justify-around border-b-2 border-emerald-950 text-center" id="role_selectors">
            {/* Farmer terminal */}
            <button
              onClick={() => setActiveRole("farmer")}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1.5 ${
                activeRole === "farmer" 
                  ? "bg-lime-400 text-emerald-950 shadow-lg scale-105 border-b border-emerald-900" 
                  : "text-emerald-100 hover:text-white hover:bg-emerald-700/50"
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>{t.farmerMode}</span>
            </button>

            {/* Buyer terminal */}
            <button
              onClick={() => setActiveRole("buyer")}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1.5 ${
                activeRole === "buyer" 
                  ? "bg-lime-400 text-emerald-950 shadow-lg scale-105 border-b border-emerald-900" 
                  : "text-emerald-100 hover:text-white hover:bg-emerald-700/50"
              }`}
            >
              <ShoppingBasket className="w-4 h-4" />
              <span>{t.buyerMode}</span>
            </button>

            {/* Bulk Hub */}
            <button
              onClick={() => setActiveRole("bulk")}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1.5 ${
                activeRole === "bulk" 
                  ? "bg-lime-400 text-emerald-950 shadow-lg scale-105 border-b border-emerald-900" 
                  : "text-emerald-100 hover:text-white hover:bg-emerald-700/50"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{t.bulkSection}</span>
            </button>
          </div>

          {/* Sub-tab segment ONLY for Farmer mode with lime styling */}
          {activeRole === "farmer" && (
            <div className="bg-emerald-50/40 p-1.5 border-b border-stone-200/60 flex gap-1.5 justify-center bg-stone-50">
              <button
                onClick={() => setFarmerSubTab("listings")}
                className={`flex-1 text-[11px] font-black py-2 px-3 rounded-xl text-center transition-all ${
                  farmerSubTab === "listings"
                    ? "bg-emerald-800 text-white shadow-md border-b-2 border-lime-400"
                    : "text-emerald-900 hover:bg-emerald-900/5"
                }`}
              >
                🌾 {t.listCrop}
              </button>
              <button
                onClick={() => setFarmerSubTab("analytics")}
                className={`flex-1 text-[11px] font-black py-2 px-3 rounded-xl text-center transition-all ${
                  farmerSubTab === "analytics"
                    ? "bg-emerald-800 text-white shadow-md border-b-2 border-lime-400"
                    : "text-emerald-900 hover:bg-emerald-900/5"
                }`}
              >
                📈 {t.dashboardTitle}
              </button>
            </div>
          )}

          {/* Dynamic Content Display body */}
          <div className="flex-1 p-4 overflow-y-auto max-h-[64vh]">
            {isLoading ? (
              <div className="h-48 flex flex-col items-center justify-center text-center space-y-2 animate-pulse">
                <Sprout className="w-10 h-10 text-emerald-600 animate-spin" />
                <p className="text-xs text-stone-500 font-semibold">Synchronizing with live mandi rates...</p>
              </div>
            ) : (
              <>
                {/* Farmer Mode Selection */}
                {activeRole === "farmer" && (
                  farmerSubTab === "listings" ? (
                    <ListingForm onListingCreated={handleListingCreated} lang={lang} />
                  ) : (
                    <FarmerDashboard listings={listings} orders={orders} lang={lang} />
                  )
                )}

                {/* Buyer Mode Selection */}
                {activeRole === "buyer" && (
                  <BuyerMarketplace 
                    listings={listings} 
                    onOrderCompleted={handleOrderCompleted} 
                    lang={lang} 
                  />
                )}

                {/* Bulk hub */}
                {activeRole === "bulk" && (
                  <BulkOrdersSection 
                    inquiries={bulkInquiries} 
                    onInquiryCreated={handleInquiryCreated} 
                    onFulfillInquiry={handleFulfillInquiry} 
                    lang={lang} 
                  />
                )}
              </>
            )}
          </div>

          {/* Phone simulated notch bar & speaker elements */}
          <div className="bg-emerald-800 py-1.5 text-center flex justify-center items-center">
            <div className="w-16 h-1 rounded-full bg-emerald-950"></div>
          </div>

        </div>
      </main>

      {/* Trust and safety Footer */}
      <footer className="bg-emerald-950 text-emerald-200 text-[10px] text-center py-2.5 mt-4 border-t-2 border-emerald-900">
        <div className="max-w-md mx-auto px-4 flex items-center justify-between">
          <p className="flex items-center gap-1 text-emerald-300 font-bold"><ShieldCheck className="w-3.5 h-3.5 text-lime-400" /> Direct-Buy Guard Active</p>
          <p className="flex items-center gap-1 font-bold text-white uppercase tracking-wider text-[9px]">Created with <Heart className="w-3 text-red-500 fill-red-500" /> for farmers of Punjab</p>
        </div>
      </footer>

    </div>
  );
}
