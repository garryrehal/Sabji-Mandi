export interface VegetableListing {
  id: string;
  farmerName: string;
  farmerPhone?: string;
  name: string;
  quantity: number; // in kg
  price: number; // per kg
  harvestDate: string;
  image: string;
  locationName: string;
  distance: number; // simulated from current user's perspective
  deliveryOptions: string[]; // ['Self Pickup', 'Village Delivery Partner', 'Group Delivery']
  status: 'Available' | 'Sold' | 'Pending';
  alertsSentCount?: number;
}

export interface Buyer {
  id: string;
  name: string;
  type: 'Household' | 'Grocery Store' | 'Restaurant' | 'Wholesaler' | 'Mandi';
  distance: number; // distance in km
  locationName: string;
  preferredCrops: string[];
}

export interface Order {
  id: string;
  listingId: string;
  vegetableName: string;
  qtyBought: number;
  pricePerUnit: number;
  totalPrice: number;
  buyerName: string;
  buyerType: string;
  deliveryMethod: string;
  date: string;
  paymentMethod?: 'Cash' | 'UPI';
  paymentStatus?: 'Pending' | 'Completed';
  transactionId?: string;
  encryptedDigest?: string;
}

export interface PriceAdvice {
  vegetableName: string;
  mandiPriceRange: string;
  supplyDemandStatus: string;
  competitorPrices: string;
  recommendedPrice: number;
  reasoning: string;
}

export interface BulkBuyerInquiry {
  id: string;
  buyerName: string;
  buyerType: 'Hotel' | 'Restaurant' | 'Grocery Shop' | 'Hostel' | 'Caterer';
  vegetableName: string;
  requiredQty: number; // in kg
  targetPrice?: number; // target price in Rs
  deliveryBy: string;
  contactNumber: string;
  status: 'Open' | 'Fulfilled';
  date: string;
}
