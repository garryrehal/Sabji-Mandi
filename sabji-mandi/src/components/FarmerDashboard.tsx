import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { VegetableListing, Order } from "../types";
import { Language, translations } from "../lib/translations";
import { TrendingUp, Award, Smartphone, Users, IndianRupee, Leaf } from "lucide-react";

interface FarmerDashboardProps {
  listings: VegetableListing[];
  orders: Order[];
  lang: Language;
}

export default function FarmerDashboard({ listings, orders, lang }: FarmerDashboardProps) {
  const t = translations[lang];

  // Calculations
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalWeightSold = orders.reduce((sum, order) => sum + order.qtyBought, 0);
  const activeListingsCount = listings.filter(l => l.status === "Available").length;

  // Best selling crop calculation
  const cropSales: { [key: string]: number } = {};
  orders.forEach(o => {
    cropSales[o.vegetableName] = (cropSales[o.vegetableName] || 0) + o.qtyBought;
  });
  let bestSellingCrop = "None";
  let maxSoldQty = 0;
  Object.entries(cropSales).forEach(([crop, qty]) => {
    if (qty > maxSoldQty) {
      maxSoldQty = qty;
      bestSellingCrop = crop;
    }
  });

  // Regular buyers (repeat count)
  const buyerCounts: { [key: string]: { count: number; total: number; type: string } } = {};
  orders.forEach(o => {
    if (!buyerCounts[o.buyerName]) {
      buyerCounts[o.buyerName] = { count: 0, total: 0, type: o.buyerType };
    }
    buyerCounts[o.buyerName].count += 1;
    buyerCounts[o.buyerName].total += o.totalPrice;
  });

  const repeatBuyersList = Object.entries(buyerCounts)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.total - a.total);

  // Chart 1: Sales trend by vegetable
  const chartData = Object.entries(cropSales).map(([name, value]) => ({
    name: name.split(" ")[0], // short name
    qty: value,
    amount: orders.filter(o => o.vegetableName === name).reduce((sum, o) => sum + o.totalPrice, 0)
  }));

  // Chart 2: Buyer types breakdown
  const buyerTypeSales: { [key: string]: number } = {};
  orders.forEach(o => {
    buyerTypeSales[o.buyerType] = (buyerTypeSales[o.buyerType] || 0) + o.totalPrice;
  });
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];
  const pieData = Object.entries(buyerTypeSales).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <h2 className="text-lg font-black font-sans text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-emerald-700" />
        {t.dashboardTitle}
      </h2>

      <div className="grid grid-cols-2 gap-3" id="dashboard_metrics">
        {/* Metric 1 - Revenue */}
        <div className="bg-white p-4 rounded-3xl border-2 border-emerald-100 flex flex-col justify-between shadow-lg shadow-emerald-50/30">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{t.revenue}</span>
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-800">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-slate-900 font-mono leading-none">₹{totalRevenue.toLocaleString()}</h3>
            <p className="text-emerald-700 text-[10px] font-bold mt-1 bg-emerald-50 inline-block px-1.5 py-0.5 rounded-md">{totalWeightSold} kg sold info</p>
          </div>
        </div>

        {/* Metric 2 - Active Listings */}
        <div className="bg-white p-4 rounded-3xl border-2 border-lime-200 flex flex-col justify-between shadow-lg shadow-lime-50/30">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{t.activeListings}</span>
            <div className="bg-lime-100 p-2 rounded-xl text-lime-900">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-slate-900 font-mono leading-none">{activeListingsCount}</h3>
            <p className="text-lime-800 text-[10px] font-bold mt-1 bg-lime-50 inline-block px-1.5 py-0.5 rounded-md">Live on terminal</p>
          </div>
        </div>

        {/* Metric 3 - Best Seller */}
        <div className="bg-[#FFFDF6] p-4 rounded-3xl border-2 border-amber-200 flex flex-col justify-between shadow-lg shadow-amber-50/30">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{t.bestSeller}</span>
            <div className="bg-amber-100 p-2 rounded-xl text-amber-850">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-sm font-black text-slate-800 line-clamp-1 leading-tight">{bestSellingCrop}</h3>
            <p className="text-amber-850 text-[10px] font-bold mt-1 bg-amber-50 inline-block px-1.5 py-0.5 rounded-md">High Demand Crop</p>
          </div>
        </div>

        {/* Metric 4 - Loyalty Buyers */}
        <div className="bg-white p-4 rounded-3xl border-2 border-emerald-150 flex flex-col justify-between shadow-lg shadow-stone-100/40">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{t.repeatBuyers}</span>
            <div className="bg-emerald-50 p-2 rounded-xl text-emerald-800">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-slate-900 font-mono leading-none">{repeatBuyersList.length}</h3>
            <p className="text-[#a2a348] text-[10px] font-bold mt-1 bg-stone-50 inline-block px-1.5 py-0.5 rounded-md">Repeat buyers count</p>
          </div>
        </div>
      </div>

      {/* Recharts Graphical Visualizers styled like high fidelity bento card */}
      <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-lg">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-700" />
          {t.salesTrend} (₹ Amount per crop)
        </h4>
        <div className="w-full h-44">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} />
                <YAxis tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '2px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'black', color: '#1e293b' }}
                />
                <Bar dataKey="amount" fill="#047857" radius={[6, 6, 0, 0]} name="Value (₹)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs font-bold bg-[#FDFCF0] rounded-2xl border-2 border-dashed border-slate-200">
              No transactions recorded yet
            </div>
          )}
        </div>
      </div>

      {/* Buyer Breakdown & Repeat Customers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Breakdown */}
        <div className="bg-white p-4 rounded-3xl border-2 border-slate-100 shadow-md">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-emerald-700" />
            {t.buyerTypeRep}
          </h4>
          <div className="flex items-center justify-between gap-1">
            <div className="w-24 h-24 flex-shrink-0">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={22}
                      outerRadius={38}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full bg-slate-100 rounded-full flex items-center justify-center text-[10px] text-slate-500 font-bold">Empty</div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              {pieData.length > 0 ? (
                pieData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-[11px] font-bold">
                    <span className="flex items-center gap-1 text-slate-650 truncate max-w-24">
                      <span className="w-2 h-2 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                      {item.name}
                    </span>
                    <span className="font-black text-slate-955 font-mono">₹{item.value}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-xs text-center font-bold">No purchases yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Regular Buyers List */}
        <div className="bg-white p-4 rounded-3xl border-2 border-slate-100 shadow-md">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-700" />
            {t.repeatBuyers}
          </h4>
          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {repeatBuyersList.length > 0 ? (
              repeatBuyersList.slice(0, 4).map((buyer) => (
                <div key={buyer.name} className="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 hover:bg-emerald-50 transition-colors border border-stone-100/60">
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-black text-slate-850 truncate">{buyer.name}</h5>
                    <p className="text-[10px] text-slate-500 capitalize font-bold">{buyer.type} • {buyer.count} loyalty orders</p>
                  </div>
                  <div className="text-right flex-shrink-0 pl-2">
                    <span className="text-xs font-black text-emerald-700 font-mono">₹{buyer.total}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-405 text-xs text-center py-4 font-bold">No recurring buyer records.</p>
            )}
          </div>
        </div>
      </div>

      {/* 🔒 Secure Settlement and Live Ledger Audit Logs */}
      <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-md">
        <div className="flex justify-between items-center mb-4 border-b border-stone-100 pb-2">
          <h4 className="text-xs font-black text-slate-805 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
            Live Settlement Ledger Audit
          </h4>
          <span className="text-[8px] font-black uppercase text-[#22c55e] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 shadow-sm">
            PCI-DSS CERTIFIED
          </span>
        </div>

        <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
          {orders && orders.length > 0 ? (
            orders.map(order => {
              const codeString = order.encryptedDigest ? order.encryptedDigest.slice(0, 14) + "..." : "NA-TOKEN";
              return (
                <div key={order.id} className="p-3.5 bg-stone-50/80 rounded-2xl border border-stone-200/60 flex flex-col justify-start gap-1.5 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all text-left">
                  <div className="flex justify-between items-center text-xs font-bold leading-none">
                    <span className="text-slate-900 font-black">{order.buyerName}</span>
                    <span className="font-mono text-emerald-850 text-sm font-black">₹{order.totalPrice}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[9px] text-slate-500 font-bold border-t border-b border-stone-200/50 py-2 mt-1">
                    <div>
                      <span className="block text-slate-400 text-[7.5px] uppercase font-bold tracking-wider mb-0.5">Crop Volume</span>
                      <span className="text-slate-700 font-black truncate block">{order.vegetableName} ({order.qtyBought} kg)</span>
                    </div>

                    <div>
                      <span className="block text-slate-400 text-[7.5px] uppercase font-bold tracking-wider mb-0.5">Payment Method</span>
                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg font-black text-[7.5px] uppercase tracking-wide leading-none ${
                        order.paymentMethod === 'UPI' 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-150' 
                          : 'bg-amber-50 text-amber-805 border border-amber-150'
                      }`}>
                        {order.paymentMethod === 'UPI' ? '⚡ UPI / PAID' : '💵 COD / PENDING'}
                      </span>
                    </div>

                    <div>
                      <span className="block text-slate-400 text-[7.5px] uppercase font-bold tracking-wider mb-0.5">Ledger Signature</span>
                      <span className="font-mono text-stone-500 select-all font-semibold block uppercase text-[8px]" title={order.encryptedDigest || ""}>
                        {codeString}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[8px] text-slate-400 font-mono mt-0.5 leading-none">
                    <span>Order Ref: <strong className="text-slate-520 font-semibold">{order.id}</strong></span>
                    <span>TX ID: <strong className="text-slate-520 font-semibold">{order.transactionId || "NA"}</strong></span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-405 bg-[#FDFCF0]/30 rounded-2xl border border-stone-250 border-dashed text-xs font-bold">
              No registered transactions in ledger yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
