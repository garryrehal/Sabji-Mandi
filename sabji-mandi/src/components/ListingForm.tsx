import React, { useState, useEffect } from "react";
import { VegetableListing, PriceAdvice } from "../types";
import { Language, translations } from "../lib/translations";
import { 
  Camera, Sparkles, AlertCircle, CheckCircle2, RefreshCw, PlusCircle, 
  MapPin, HelpCircle, Phone, Calendar, IndianRupee, Weight, Info, Upload
} from "lucide-react";

const COMMON_CROPS = [
  {
    id: "potato",
    name: { en: "Potato", pa: "ਆਲੂ", hi: "आलू" },
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "tomato",
    name: { en: "Tomato", pa: "ਟਮਾਟਰ", hi: "टमाटर" },
    image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cauliflower",
    name: { en: "Cauliflower", pa: "ਗੋਭੀ", hi: "गोभी" },
    image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ec3?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "onion",
    name: { en: "Onion", pa: "ਪਿਆਜ਼", hi: "प्याज" },
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "carrot",
    name: { en: "Carrot", pa: "ਗਾਜਰ", hi: "गाजर" },
    image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "chili",
    name: { en: "Chili", pa: "ਮਿਰਚ", hi: "मिर्च" },
    image: "https://images.unsplash.com/photo-1588252393731-50e50186714e?w=400&auto=format&fit=crop&q=80"
  }
];

interface ListingFormProps {
  onListingCreated: (newListing: VegetableListing) => void;
  lang: Language;
}

export default function ListingForm({ onListingCreated, lang }: ListingFormProps) {
  const t = translations[lang];

  // Selected crop ID (defaults to potato)
  const [selectedCropId, setSelectedCropId] = useState<string>("potato");

  // Form states
  const [vegName, setVegName] = useState("Potato");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split("T")[0]);
  const [farmerName, setFarmerName] = useState("Gurshan Singh");
  const [farmerPhone, setFarmerPhone] = useState("+91 99123-45678");
  const [locationName, setLocationName] = useState("Sikhwala Village, Kapurthala");
  const [deliveryOptions, setDeliveryOptions] = useState<string[]>(["Self Pickup"]);
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=80");

  // Pricing Advisor States
  const [isAdvisorLoading, setIsAdvisorLoading] = useState(false);
  const [advice, setAdvice] = useState<PriceAdvice | null>(null);
  const [advisorError, setAdvisorError] = useState("");

  // AI Automatic Vegetable Identification States
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [identificationError, setIdentificationError] = useState("");

  // Other visual states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);

  // Trigger Automatic Image Analysis with Gemini / Offline Fallback
  const triggerAutoIdentification = async (base64Img: string) => {
    setIsIdentifying(true);
    setIdentificationError("");
    try {
      const response = await fetch("/api/ai/identify-vegetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Img })
      });
      const data = await response.json();
      if (response.ok && data.vegetableName) {
        setVegName(data.vegetableName);
      } else {
        setIdentificationError(data.error || "Failed to identify vegetable automatically");
      }
    } catch (e) {
      setIdentificationError("Could not connect to AI identification server");
    } finally {
      setIsIdentifying(false);
    }
  };

  // Synchronize vegetable names and standard images on crop selection or language changes
  useEffect(() => {
    if (selectedCropId && selectedCropId !== "others") {
      const crop = COMMON_CROPS.find(c => c.id === selectedCropId);
      if (crop) {
        setVegName(crop.name[lang]);
        setImageUrl(crop.image);
      }
    }
  }, [selectedCropId, lang]);

  // Prepopulate or select random image based on name (only for others if they type common names, otherwise keep custom upload intact!)
  useEffect(() => {
    if (selectedCropId === "others") return;
    const term = vegName.toLowerCase();
    if (term.includes("potato") || term.includes("aloo") || term.includes("ਆਲੂ") || term.includes("आलू")) {
      setImageUrl("https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=60");
    } else if (term.includes("tomato") || term.includes("tamatar") || term.includes("ਟਮਾਟਰ") || term.includes("टमाटर")) {
      setImageUrl("https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=60");
    } else if (term.includes("cauliflower") || term.includes("gobhi") || term.includes("ਗੋਭੀ") || term.includes("गोभी")) {
      setImageUrl("https://images.unsplash.com/photo-1568584711075-3d021a7c3ec3?w=400&auto=format&fit=crop&q=60");
    } else if (term.includes("chili") || term.includes("mirch") || term.includes("ਮਿਰਚ") || term.includes("मिर्च")) {
      setImageUrl("https://images.unsplash.com/photo-1588252393731-50e50186714e?w=400&auto=format&fit=crop&q=60");
    } else if (term.includes("onion") || term.includes("pyaz") || term.includes("ਪਿਆਜ਼") || term.includes("प्याज")) {
      setImageUrl("https://images.unsplash.com/photo-1508747703725-719777637510?w=400&auto=format&fit=crop&q=60");
    } else if (term.includes("carrot") || term.includes("gajar") || term.includes("ਗਾਜਰ") || term.includes("गाजर")) {
      setImageUrl("https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&auto=format&fit=crop&q=60");
    } else {
      setImageUrl("https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=400&auto=format&fit=crop&q=60");
    }
  }, [vegName, selectedCropId]);

  // File reader for farmer custom vegetable photo upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const base64Data = reader.result;
          setImageUrl(base64Data);
          if (selectedCropId === "others") {
            triggerAutoIdentification(base64Data);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Get AI Advisor Advice
  const fetchAdvisorPricing = async () => {
    if (!vegName) {
      setAdvisorError("Please enter a crop/vegetable name first to get price advisory.");
      return;
    }
    setIsAdvisorLoading(true);
    setAdvisorError("");
    try {
      const response = await fetch("/api/ai/price-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vegetableName: vegName })
      });
      const data = await response.json();
      if (response.ok) {
        setAdvice(data);
      } else {
        setAdvisorError(data.error || "Advisor service temporarily busy");
      }
    } catch (e) {
      setAdvisorError("Could not connect to AI advisor server");
    } finally {
      setIsAdvisorLoading(false);
    }
  };

  const toggleDeliveryOption = (option: string) => {
    if (deliveryOptions.includes(option)) {
      if (deliveryOptions.length > 1) {
        setDeliveryOptions(deliveryOptions.filter(o => o !== option));
      }
    } else {
      setDeliveryOptions([...deliveryOptions, option]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let currentVegName = vegName.trim();
    
    if (!currentVegName) {
      if (selectedCropId === "others" && imageUrl && imageUrl.startsWith("data:")) {
        setIsSubmitting(true);
        setIsIdentifying(true);
        try {
          const response = await fetch("/api/ai/identify-vegetable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imageUrl })
          });
          const data = await response.json();
          if (response.ok && data.vegetableName) {
            currentVegName = data.vegetableName;
            setVegName(data.vegetableName);
          } else {
            currentVegName = "Assorted Veggies";
            setVegName("Assorted Veggies");
          }
        } catch (err) {
          console.error("Auto-identify on submit failed:", err);
          currentVegName = "Assorted Veggies";
          setVegName("Assorted Veggies");
        } finally {
          setIsIdentifying(false);
        }
      } else {
        return;
      }
    }

    if (!currentVegName || !quantity || !price) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    try {
      const newListingData = {
        farmerName,
        farmerPhone,
        name: currentVegName,
        quantity: Number(quantity),
        price: Number(price),
        harvestDate,
        image: imageUrl,
        locationName,
        deliveryOptions
      };

      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newListingData)
      });
      const data = await response.json();
      if (response.ok) {
        onListingCreated(data);
        setCreationSuccess(true);
        // Clear inputs
        setVegName("");
        setQuantity("");
        setPrice("");
        setAdvice(null);
        setTimeout(() => setCreationSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Listing creation failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5">
            <span className="text-lg">🌾</span>
            {t.listCrop}
          </h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
            {lang === 'en' ? "Select vegetable picture to list" : lang === 'pa' ? "ਲਿਸਟ ਕਰਨ ਲਈ ਸਬਜ਼ੀ ਦੀ ਤਸਵੀਰ ਚੁਣੋ" : "लिस्ट करने के लिए सब्जी की तस्वीर चुनें"}
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{lang === 'en' ? "Direct Touch Selection" : lang === 'pa' ? "ਸਿੱਧੀ ਟੱਚ ਚੋਣ" : "सीधा टच चयन"}</span>
        </div>
      </div>

      {creationSuccess && (
        <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl border-2 border-emerald-200 flex items-center gap-2 text-xs font-black animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {lang === 'en' 
            ? "Fresh crop listing created successfully and synchronized!" 
            : lang === 'pa' 
              ? "ਲਿਸਟਿੰਗ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਈ ਗਈ ਹੈ!" 
              : "फसल की सूची सफलतापूर्वक बनाई गई!"}
        </div>
      )}

      {/* Main listing creation form */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Farmer Profile context (collapsible/subtle) */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60 grid grid-cols-2 gap-2 text-[10px] text-stone-600">
          <div className="flex items-center gap-1">
            <span className="font-bold text-stone-700">Farmer:</span>
            <input 
              type="text" 
              value={farmerName} 
              onChange={e => setFarmerName(e.target.value)} 
              className="bg-transparent font-semibold text-stone-800 border-none p-0 focus:ring-0 w-24" 
            />
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-stone-400" />
            <input 
              type="text" 
              value={farmerPhone} 
              onChange={e => setFarmerPhone(e.target.value)} 
              className="bg-transparent font-mono text-stone-800 border-none p-0 focus:ring-0 w-24" 
            />
          </div>
          <div className="col-span-2 flex items-center gap-1 border-t border-stone-200/50 pt-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <input 
              type="text" 
              value={locationName} 
              onChange={e => setLocationName(e.target.value)} 
              className="bg-transparent text-stone-800 border-none p-0 focus:ring-0 w-full font-semibold" 
            />
          </div>
        </div>

        {/* Simplistic Pictures Selector Grid for Common Vegetables */}
        <div className="p-4 bg-white rounded-3xl border border-stone-250 space-y-3 shadow-sm">
          <label className="block text-stone-700 font-black text-xs uppercase tracking-wider">
            {lang === 'en' ? "Select Your Vegetable" : lang === 'pa' ? "ਆਪਣੀ ਸਬਜ਼ੀ ਚੁਣੋ" : "अपनी सब्जी चुनें"}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {COMMON_CROPS.map((crop) => {
              const isSelected = selectedCropId === crop.id;
              return (
                <button
                  type="button"
                  key={crop.id}
                  onClick={() => {
                    setSelectedCropId(crop.id);
                  }}
                  className={`relative flex flex-col items-center p-2.5 rounded-2xl border-2 transition-all text-center cursor-pointer active:scale-95 ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-100"
                      : "border-stone-150 bg-white hover:border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  {/* Simplistic round picture of vegetable */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mb-1.5 border border-stone-100 flex items-center justify-center bg-stone-50">
                    <img
                      src={crop.image}
                      alt={crop.name[lang]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-black text-stone-800 leading-tight">
                    {crop.name[lang]}
                  </span>
                  
                  {isSelected && (
                    <span className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white fill-emerald-600" />
                    </span>
                  )}
                </button>
              );
            })}

            {/* Others Option */}
            <button
              type="button"
              onClick={() => {
                setSelectedCropId("others");
                setVegName("");
                setImageUrl("");
              }}
              className={`relative flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all text-center cursor-pointer active:scale-95 ${
                selectedCropId === "others"
                  ? "border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-100"
                  : "border-stone-150 bg-white hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden mb-1.5 border-2 border-dashed border-stone-300 flex items-center justify-center bg-stone-50 text-stone-500">
                <PlusCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-[11px] font-black text-emerald-800 leading-tight">
                {lang === 'en' ? "Others" : lang === 'pa' ? "ਹੋਰ ਸਬਜ਼ੀ" : "अन्य सब्जी"}
              </span>

              {selectedCropId === "others" && (
                <span className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white fill-emerald-600" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* If Others option selected, display Name input and File Upload */}
        {selectedCropId === "others" && (
          <div className="p-4 bg-emerald-50/20 rounded-3xl border-2 border-dashed border-emerald-200 space-y-4 shadow-inner animate-fade-in">
            <div>
              <label className="block text-stone-700 font-bold text-xs mb-1.5 flex justify-between items-center">
                <span>{lang === 'en' ? "Enter Vegetable Name" : lang === 'pa' ? "ਸਬਜ਼ੀ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ" : "सब्जी का नाम दर्ज करें"}</span>
                <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 animate-pulse">
                  {lang === 'en' ? "Or Upload Photo to Auto-Identify!" : lang === 'pa' ? "ਜਾਂ ਆਟੋ-ਪਛਾਣ ਲਈ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ!" : "या ऑटो-पहचान के लिए फोटो अपलोड करें!"}
                </span>
              </label>
              <input
                type="text"
                value={vegName}
                onChange={e => setVegName(e.target.value)}
                placeholder={lang === 'en' ? "e.g. Lady Finger, Broccoli, Spinach" : lang === 'pa' ? "ਜਿਵੇਂ ਕਿ ਭਿੰਡੀ, ਬ੍ਰੋਕਲੀ, ਪਾਲਕ" : "जैसे भिंडी, ब्रोकली, पालक"}
                className="w-full text-stone-850 bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none font-bold"
              />
            </div>

            {/* Custom Image Upload Option */}
            <div className="space-y-1.5">
              <label className="block text-stone-700 font-bold text-xs">
                {lang === 'en' ? "Upload Picture of Your Unique Veggie" : lang === 'pa' ? "ਆਪਣੀ ਵਿਲੱਖਣ ਸਬਜ਼ੀ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ" : "अपनी अनूठी सब्जी की तस्वीर अपलोड करें"}
              </label>
              
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-2xl p-4 bg-white text-center hover:border-emerald-500 transition-all cursor-pointer relative overflow-hidden group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {isIdentifying ? (
                  <div className="space-y-2 flex flex-col items-center py-4">
                    <div className="w-10 h-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                    <p className="text-[11px] text-emerald-800 font-black animate-pulse uppercase tracking-wide">
                      {lang === 'en' ? "AI is identifying your vegetable..." : lang === 'pa' ? "AI ਤੁਹਾਡੀ ਸਬਜ਼ੀ ਦੀ ਪਛਾਣ ਕਰ ਰਿਹਾ ਹੈ..." : "एआई आपकी सब्जी की पहचान कर रहा है..."}
                    </p>
                    <p className="text-[9px] text-stone-400">Please wait a moment</p>
                  </div>
                ) : imageUrl && !imageUrl.includes("unsplash.com") ? (
                  <div className="space-y-2 flex flex-col items-center">
                    <img 
                      src={imageUrl} 
                      alt="Custom Veggie" 
                      className="w-24 h-24 object-cover rounded-xl border border-stone-200 shadow"
                    />
                    {identificationError ? (
                      <p className="text-[10px] text-red-600 font-bold flex items-center gap-1">
                        <span>✕</span>
                        {identificationError}
                      </p>
                    ) : (
                      <p className="text-[10px] text-emerald-700 font-black flex items-center gap-1.5 bg-emerald-50/50 px-2.5 py-1 rounded-full border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {lang === 'en' ? "AI Identified: " + vegName : lang === 'pa' ? "AI ਦੁਆਰਾ ਪਛਾਣ: " + vegName : "एआई द्वारा पहचान: " + vegName}
                        </span>
                      </p>
                    )}
                    <p className="text-[9px] text-stone-400 font-medium">Click or Drag to replace image</p>
                  </div>
                ) : (
                  <div className="space-y-1.5 flex flex-col items-center text-stone-500">
                    <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                      <Camera className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] font-bold text-stone-700">
                      {lang === 'en' ? "Tap to Upload Photo" : lang === 'pa' ? "ਫੋਟੋ ਅਪਲੋਡ ਕਰਨ ਲਈ ਟੈਪ ਕਰੋ" : "फोटो अपलोड करने के लिए टैप करें"}
                    </p>
                    <p className="text-[9px] text-stone-400 font-semibold text-emerald-600">
                      {lang === 'en' ? "AI Auto-Fills Vegetable Name" : lang === 'pa' ? "AI ਸਬਜ਼ੀ ਦਾ ਨਾਮ ਆਪਣੇ ਆਪ ਭਰ ਦੇਵੇਗਾ" : "एआई सब्जी का नाम अपने आप भर देगा"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Veg name (readonly display) & Quantity */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-stone-600 font-bold text-xs mb-1.5">{t.vegName}</label>
            <div className="relative">
              <input
                type="text"
                readOnly={selectedCropId !== "others"}
                value={vegName}
                onChange={e => {
                  if (selectedCropId === "others") {
                    setVegName(e.target.value);
                  }
                }}
                className={`w-full text-stone-850 bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none font-bold ${
                  selectedCropId !== "others" ? "bg-stone-50 cursor-not-allowed select-none text-stone-500" : ""
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-600 font-bold text-xs mb-1.5">{t.quantity}</label>
            <div className="relative">
              <Weight className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value) || "")}
                placeholder="0"
                className="w-full text-stone-850 bg-white border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>

        {/* Pricing Advisor and Input Section */}
        <div className="p-4 bg-amber-50/70 rounded-3xl border-2 border-amber-200/95 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="text-sm">🪙</span>
              {t.price} ({lang === 'en' ? "per kg" : "/ ਕਿਲੋਗ੍ਰਾਮ"})
            </span>
            {/* Price Advice trigger button */}
            <button
              type="button"
              onClick={fetchAdvisorPricing}
              disabled={!vegName || isAdvisorLoading}
              className={`text-[11px] font-black py-1.5 px-3 rounded-xl flex items-center gap-1.5 transition-all active:scale-95 shadow-sm border ${
                !vegName 
                ? "bg-amber-100/40 border-amber-150 text-amber-400 cursor-not-allowed" 
                : "bg-white hover:bg-amber-50 text-amber-900 border-amber-300 hover:shadow"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              {isAdvisorLoading ? t.advisorLoading : t.advisorTrigger}
            </button>
          </div>

          <div className="flex gap-2.5">
            <input
              type="number"
              min="1"
              required
              value={price}
              onChange={e => setPrice(Number(e.target.value) || "")}
              placeholder="Enter rate per kg"
              className="flex-1 text-sm font-black text-slate-800 bg-white border-2 border-amber-200/70 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none"
            />
            <span className="flex items-center text-xs text-amber-950 font-black bg-amber-200/40 border border-amber-200 px-3.5 rounded-xl">₹ / kg</span>
          </div>

          {/* AI Advice Output Display */}
          {advisorError && (
            <div className="text-[10px] text-red-650 font-bold bg-white/70 p-2.5 rounded-xl border border-red-200 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {advisorError}
            </div>
          )}

          {advice && (
            <div className="bg-white border-2 border-amber-250 p-4 rounded-2xl space-y-3.5 shadow-md animate-fade-in">
              <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="text-[11px] font-black text-amber-900 uppercase tracking-widest flex items-center gap-1">
                  🤖 {t.advisorTitle}
                </span>
                <button
                  type="button"
                  onClick={() => setPrice(advice.recommendedPrice)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-black text-[11px] px-3 py-1.5 rounded-xl shadow-md active:scale-95 transition-all"
                >
                  Apply: ₹{advice.recommendedPrice}/kg
                </button>
              </div>

              <div className="grid grid-cols-1 gap-1.5 text-[11px] text-slate-700">
                <p className="flex justify-between border-b border-amber-50/50 pb-1"><strong>{t.mandiPrice}</strong> <span className="font-bold text-slate-900 bg-amber-100/50 px-1.5 rounded">{advice.mandiPriceRange}</span></p>
                <p className="flex justify-between border-b border-amber-50/50 pb-1"><strong>{t.supplyDemand}</strong> <span className="text-emerald-800 font-bold">{advice.supplyDemandStatus}</span></p>
                <p className="flex justify-between border-b border-[#FDFCF0] pb-1"><strong>{t.competitorPrice}</strong> <span className="text-purple-800 font-semibold">{advice.competitorPrices}</span></p>
                <div className="text-[11px] font-medium text-slate-600 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/60 leading-normal">
                  <strong className="text-amber-900">{lang === 'en' ? "Strategy Advice:" : "ਸਲਾਹ:"}</strong> {advice.reasoning}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Harvest Date */}
        <div>
          <label className="block text-stone-600 font-bold text-xs mb-1.5">{t.harvestDate}</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="date"
              required
              value={harvestDate}
              onChange={e => setHarvestDate(e.target.value)}
              className="w-full text-stone-850 bg-white border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Delivery Options */}
        <div>
          <label className="block text-stone-600 font-bold text-xs mb-2">{t.deliveryType}</label>
          <div className="space-y-1.5">
            {[
              { id: "Self Pickup", label: t.pickup },
              { id: "Village Delivery Partner", label: t.partner },
              { id: "Group Delivery", label: t.group }
            ].map(opt => (
              <button
                type="button"
                key={opt.id}
                onClick={() => toggleDeliveryOption(opt.id)}
                className={`w-full flex items-center justify-between text-left p-2 rounded-xl text-xs border transition-all ${
                  deliveryOptions.includes(opt.id)
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold shadow-sm"
                    : "border-stone-200 bg-white hover:bg-stone-50 text-stone-600"
                }`}
              >
                <span>{opt.label}</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  deliveryOptions.includes(opt.id) 
                    ? "border-emerald-600 bg-emerald-600 text-white" 
                    : "border-stone-300 bg-stone-100"
                }`}>
                  {deliveryOptions.includes(opt.id) && <span className="block w-1.5 h-1.5 rounded-full bg-white"></span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !vegName || !quantity || !price}
          className={`w-full font-bold text-xs py-3 rounded-xl shadow text-white flex items-center justify-center gap-1.5 transition-all ${
            isSubmitting || !vegName || !quantity || !price
              ? "bg-stone-300 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
          }`}
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Listing...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              {t.submitListing}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
