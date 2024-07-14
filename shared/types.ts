export type ListingType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  amenities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

export type ListingSearchResponse = {
  data: ListingType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
