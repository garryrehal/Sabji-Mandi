export type Language = 'en' | 'pa' | 'hi';

export const translations = {
  en: {
    title: "Sabji Mandi",
    subtitle: "Direct Farm-to-Buyer Marketplace",
    farmerMode: "Farmer Terminal",
    buyerMode: "Buyer Terminal",
    bulkSection: "Bulk Buyers Hub",
    language: "Language",
    
    // Farmer Listings
    listCrop: "Upload New Crop",
    vegName: "Vegetable Name",
    quantity: "Quantity Available (kg)",
    price: "Your Price (₹ per kg)",
    harvestDate: "Harvest Date",
    deliveryType: "Preferred Delivery Options",
    pickup: "Self Pickup by Buyer",
    partner: "Village Delivery Partner",
    group: "Group Farm Delivery",
    submitListing: "Create Active Listing Today",
    voicePlaceholder: "Tap 'Record' and speak (e.g. 'I have 100 kg of fresh potatoes harvested today for 15 rupees')",
    recordBtn: "Voice Input",
    recording: "Listening...",
    aiParsing: "AI is parsing your voice...",
    aiParsedSuccess: "AI successfully parsed details!",
    
    // AI Advisor
    advisorTitle: "ROBO-AGRI™ AI Pricing Advisor",
    advisorTrigger: "Get AI Price Suggestion",
    advisorLoading: "Analyzing nearby mandis & retail rates...",
    recommendedPrice: "Recommended Price:",
    mandiPrice: "Mandi Benchmark Range:",
    supplyDemand: "Local Supply & Demand:",
    competitorPrice: "Competitor Market Rates:",
    advisorReasoning: "AI Advice Justification",
    
    // Dashboard
    dashboardTitle: "Farmer Analytics Dashboard",
    totalSales: "Total Sales",
    revenue: "Total Revenue Generated",
    activeListings: "Active Listings Online",
    bestSeller: "Best-Selling Crop",
    repeatBuyers: "Regular Repeat Buyers",
    salesTrend: "Direct Sales Stream",
    buyerTypeRep: "Purchaser Types Breakdown",
    
    // Buyer
    searchPlaceholder: "Search vegetables (e.g. Tomato, Gobhi)...",
    radiusFilter: "Nearest (Radius Limit)",
    allDistances: "All Locations (<25 km)",
    buyNow: "Buy",
    buyModalTitle: "Complete direct direct purchase",
    confirmOrder: "Confirm Order",
    buyerNameLabel: "Your Name / Organization",
    distanceLabel: "Distance",
    bulkInquiries: "Bulk Demand Board (Institutions)",
    postBulkDemand: "Post Bulk Institution Demand",
    requiredQty: "Required Quantity (kg)",
    targetPrice: "Target Price (₹/kg)",
    deliveryBy: "Delivery Target Date",
    contactPhone: "Contact Phone / WhatsApp",
    postDemandBtn: "Post Public Demand Lot",
    noInquiries: "No active bulk requirements posted yet."
  },
  pa: {
    title: "ਸਬਜ਼ੀ ਮੰਡੀ",
    subtitle: "ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧੀ ਖਰੀਦਦਾਰੀ",
    farmerMode: "ਕਿਸਾਨ ਪੈਨਲ",
    buyerMode: "ਗਾਹਕ ਪੈਨਲ",
    bulkSection: "ਥੋਕ ਖਰੀਦਦਾਰ ਕੇਂਦਰ",
    language: "ਭਾਸ਼ਾ",
    
    // Farmer Listings
    listCrop: "ਨਵੀਂ ਫ਼ਸਲ ਅੱਪਲੋਡ ਕਰੋ",
    vegName: "ਸਬਜ਼ੀ ਦਾ ਨਾਮ",
    quantity: "ਉਪਲਬਧ ਮਾਤਰਾ (ਕਿਲੋ)",
    price: "ਤੁਹਾਡੀ ਕੀਮਤ (₹ ਪ੍ਰਤੀ ਕਿਲੋ)",
    harvestDate: "ਵਾਢੀ ਦੀ ਤਾਰੀਖ",
    deliveryType: "ਡਿਲੀਵਰੀ ਦੇ ਵਿਕਲਪ",
    pickup: "ਖਰੀਦਦਾਰ ਖੁਦ ਚੁੱਕੇਗਾ (Self)",
    partner: "ਪਿੰਡ ਦਾ ਡਿਲੀਵਰੀ ਸਾਥੀ",
    group: "ਸਮੂਹ ਫਾਰਮ ਡਿਲੀਵਰੀ",
    submitListing: "ਅੱਜ ਹੀ ਲਿਸਟਿੰਗ ਚਾਲੂ ਕਰੋ",
    voicePlaceholder: "ਮਾਈਕ ਦਬਾਓ ਅਤੇ ਬੋਲੋ (ਜਿਵੇਂ: 'ਮੇਰੇ ਕੋਲ 200 ਕਿਲੋ ਗੋਭੀ ਹੈ, ਕੀਮਤ 25 ਰੁਪਏ')",
    recordBtn: "ਆਵਾਜ਼ ਨਾਲ ਲਿਖੋ",
    recording: "ਸੁਣ ਰਿਹਾ ਹੈ...",
    aiParsing: "AI ਤੁਹਾਡੀ ਆਵਾਜ਼ ਨੂੰ ਸਮਝ ਰਿਹਾ ਹੈ...",
    aiParsedSuccess: "AI ਦੁਆਰਾ ਜਾਣਕਾਰੀ ਸਫਲਤਾਪੂਰਵਕ ਦਰਜ ਕੀਤੀ ਗਈ!",
    
    // AI Advisor
    advisorTitle: "ਰੋਬੋ-ਏਗਰੀ™ AI ਕੀਮਤ ਸਲਾਹਕਾਰ",
    advisorTrigger: "AI ਕੀਮਤ ਸਲਾਹ ਲਵੋ",
    advisorLoading: "ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਅਤੇ ਰੇਟਾਂ ਦੀ ਜਾਂਚ ਚੱਲ ਰਹੀ ਹੈ...",
    recommendedPrice: "ਸੁਝਾਈ ਗਈ ਕੀਮਤ:",
    mandiPrice: "ਮੰਡੀ ਬੈਂਚਮਾਰਕ ਰੇਂਜ:",
    supplyDemand: "ਸਥਾਨਕ ਸਪਲਾਈ ਅਤੇ ਮੰਗ:",
    competitorPrice: "ਮੁਕਾਬਲੇ ਵਾਲੇ ਬਜ਼ਾਰ ਰੇਟ:",
    advisorReasoning: "AI ਸਲਾਹ ਦਾ ਕਾਰਨ",
    
    // Dashboard
    dashboardTitle: "ਕਿਸਾਨ ਵਿਸ਼ਲੇਸ਼ਣ ਡੈਸ਼ਬੋਰਡ",
    totalSales: "ਕੁੱਲ ਵਿਕਰੀ",
    revenue: "ਕੁੱਲ ਕਮਾਈ (ਮੁਨਾਫਾ)",
    activeListings: "ਆਨਲਾਈਨ ਸਰਗਰਮ ਫ਼ਸਲਾਂ",
    bestSeller: "ਵੱਧ ਵਿਕਣ ਵਾਲੀ ਫ਼ਸਲ",
    repeatBuyers: "ਪੱਕੇ ਗਾਹਕ (Repeat Buyers)",
    salesTrend: "ਸਿੱਧੀ ਵਿਕਰੀ ਪ੍ਰਵਾਹ",
    buyerTypeRep: "ਖਰੀਦਦਾਰਾਂ ਦੀ ਕਿਸਮ",
    
    // Buyer
    searchPlaceholder: "ਸਬਜ਼ੀ ਲੱਭੋ (ਜਿਵੇਂ ਕਿ ਟਮਾਟਰ, ਆਲੂ, ਗੋਭੀ)...",
    radiusFilter: "ਦੂਰੀ ਸੀਮਾ (ਘੇਰਾ)",
    allDistances: "ਸਾਰੀਆਂ ਥਾਵਾਂ (<25 ਕਿਲੋਮੀਟਰ)",
    buyNow: "ਖਰੀਦੋ",
    buyModalTitle: "ਸਿੱਧੀ ਖਰੀਦ ਮੁਕੰਮਲ ਕਰੋ",
    confirmOrder: "ਆਰਡਰ ਪੱਕਾ ਕਰੋ",
    buyerNameLabel: "ਤੁਹਾਡਾ ਨਾਮ / ਸੰਸਥਾ",
    distanceLabel: "ਦੂਰੀ",
    bulkInquiries: "ਥੋਕ ਮੰਗ ਬੋਰਡ (ਸੰਸਥਾਵਾਂ ਲਈ)",
    postBulkDemand: "ਥੋਕ ਸੰਸਥਾ ਮੰਗ ਪੋਸਟ ਕਰੋ",
    requiredQty: "ਲੋੜੀਂਦੀ ਮਾਤਰਾ (ਕਿਲੋ)",
    targetPrice: "ਲਕਸ਼ ਕੀਮਤ (₹/ਕਿਲੋ)",
    deliveryBy: "ਡਿਲੀਵਰੀ ਦਾ ਟੀਚਾ",
    contactPhone: "ਸੰਪਰਕ ਫੋਨ / WhatsApp",
    postDemandBtn: "ਪਬਲਿਕ ਮੰਗ ਲਾਟ ਪੋਸਟ ਕਰੋ",
    noInquiries: "ਅਜੇ ਤੱਕ ਕੋਈ ਸਰਗਰਮ ਥੋਕ ਮੰਗ ਨਹੀਂ ਹੈ।"
  },
  hi: {
    title: "सब्जी मंडी",
    subtitle: "सीधा किसान-से-खरीदार बाजार",
    farmerMode: "किसान टर्मिनल",
    buyerMode: "खरीदार टर्मिनल",
    bulkSection: "थोक खरीदार हब",
    language: "भाषा",
    
    // Farmer Listings
    listCrop: "नई फसल अपलोड करें",
    vegName: "सब्जी का नाम",
    quantity: "उपलब्ध मात्रा (किग्रा)",
    price: "आपकी कीमत (₹ प्रति किग्रा)",
    harvestDate: "कटाई की तिथि",
    deliveryType: "पसंदीदा डिलीवरी विकल्प",
    pickup: "खरीदार स्वयं उठाएगा",
    partner: "ग्राम डिलीवरी पार्टनर",
    group: "सामूहिक कृषि डिलीवरी",
    submitListing: "आज ही लिस्टिंग चालू करें",
    voicePlaceholder: "माइक दबाएं और बोलें (जैसे: 'मेरे पास 150 किलो आलू है, कटाई आज की है, ₹12 बेचना है')",
    recordBtn: "आवाज से दर्ज करें",
    recording: "सुन रहा है...",
    aiParsing: "AI आपकी आवाज समझ रहा है...",
    aiParsedSuccess: "AI द्वारा जानकारी सफलतापूर्वक दर्ज की गई!",
    
    // AI Advisor
    advisorTitle: "रोबो-एग्री™ AI मूल्य सलाहकार",
    advisorTrigger: "AI मूल्य सलाह लें",
    advisorLoading: "आस-पास की मंडियों और दरों का विश्लेषण...",
    recommendedPrice: "अनुशंसित मूल्य:",
    mandiPrice: "मंडी बेंचमार्क रेंज:",
    supplyDemand: "स्थानीय आपूर्ति और मांग:",
    competitorPrice: "प्रतिस्पर्धी बाजार की दरें:",
    advisorReasoning: "AI सलाह का कारण",
    
    // Dashboard
    dashboardTitle: "किसान विश्लेषण डैशबोर्ड",
    totalSales: "कुल बिक्री",
    revenue: "कुल कमाई (राजस्व)",
    activeListings: "ऑनलाइन सक्रिय फसलें",
    bestSeller: "सबसे अधिक बिकने वाली फसल",
    repeatBuyers: "नियमित खरीदार (ग्राहक)",
    salesTrend: "सीधा बिक्री प्रवाह",
    buyerTypeRep: "खरीदारों की श्रेणियां",
    
    // Buyer
    searchPlaceholder: "सब्जी खोजें (जैसे टमाटर, आलू, गोभी)...",
    radiusFilter: "दूरी की सीमा (त्रिज्या)",
    allDistances: "सभी स्थान (<25 किमी)",
    buyNow: "खरीदें",
    buyModalTitle: "सीधी खरीदारी पूरी करें",
    confirmOrder: "ऑर्डर पक्का करें",
    buyerNameLabel: "आपका नाम / संस्था",
    distanceLabel: "दूरी",
    bulkInquiries: "थोक मांग बोर्ड (संस्थाएं)",
    postBulkDemand: "थोक मात्रा मांग पोस्ट करें",
    requiredQty: "आवश्यक मात्रा (किलो)",
    targetPrice: "लक्षित मूल्य (₹/किलो)",
    deliveryBy: "डिलिवरी लक्ष्य तिथि",
    contactPhone: "संपर्क नंबर / व्हाट्सएप",
    postDemandBtn: "थोक मांग लॉट पोस्ट करें",
    noInquiries: "अभी तक कोई सक्रिय थोक मांग दर्ज नहीं हुई है।"
  }
} as const;

export const mockSampleVoices = {
  en: [
    "I have 300 kg of fresh cauliflower harvested today. Expected price is 28 rupees per kg.",
    "Selling 500 kg of cold-storage potatoes for 15 rupees per kg. Delivery is self-pickup.",
    "Fresh green chilies available. Quantity is 80 kg. Recommended price: 40 rupees per kg."
  ],
  pa: [
    "ਮੇਰੇ ਕੋਲ 250 ਕਿਲੋ ਤਾਜ਼ੇ ਟਮਾਟਰ ਹਨ। ਅੱਜ ਸਵੇਰੇ ਤੋੜੇ ਨੇ। ਕੀਮਤ 22 ਰੁਪਏ ਕਿਲੋ ਚਾਹੀਦੀ ਹੈ।",
    "400 ਕਿਲੋ ਆਲੂ ਵੇਚਣੇ ਹਨ ਜੀ। 14 ਰੁਪਏ ਕਿਲੋ ਦੇ ਹਿਸਾਬ ਨਾਲ। ਨਕੋਦਰ ਪਿੰਡ ਤੋਂ ਸੰਪਰਕ ਕਰੋ।",
    "120 ਕਿਲੋ ਪਿਆਜ਼ ਤਿਆਰ ਨੇ। ਢਿੱਲੋਂ ਫਾਰਮ। ਰੇਟ 25 ਰੁਪਏ ਕਿਲੋ ਲਾਵਾਂਗੇ।"
  ],
  hi: [
    "मेरे पास 150 किलो ताजी गोभी उपलब्ध है। दाम 30 रुपये प्रति किलो रहेगा।",
    "आलू की फसल तैयार है, लगभग 1000 किलो। भाव 13 रुपये किलो बेचेंगे। ग्राम सुजानपुर।",
    "ताजा हरी मिर्च है 100 किलो। 45 रुपये किलो का रेट लगाना है आज ही।"
  ]
};
