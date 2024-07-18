import { RegisterFormData } from "./pages/register";
import { SignInFormData } from "./pages/sign-in";
import {
  ListingSearchResponse,
  ListingType,
  PaymentIntentResponse,
  UserType,
} from "./shared/types";
import { BookingFormData } from "./components/booking-form/booking-form";
const API_URL = import.meta.env.VITE_API_URL;

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const addMyListing = async (listingFormData: FormData) => {
  const response = await fetch(`${API_URL}/api/my-listings`, {
    method: "POST",
    credentials: "include",
    body: listingFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add listing");
  }
  return response.json();
};

export const fetchMyListings = async (): Promise<ListingType[]> => {
  const response = await fetch(`${API_URL}/api/my-listings`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching listings");
  }

  return response.json();
};

export const fetchMyListingById = async (
  listingId: string
): Promise<ListingType> => {
  const response = await fetch(`${API_URL}/api/my-listings/${listingId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching listings");
  }
  return response.json();
};

export const updateMyListingById = async (listingFormData: FormData) => {
  const response = await fetch(
    `${API_URL}/api/my-listings/${listingFormData.get("listingId")}`,
    {
      method: "PUT",
      body: listingFormData,
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update listing");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  amenities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchListings = async (
  searchParams: SearchParams
): Promise<ListingSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));
  searchParams.amenities?.forEach((amenity) =>
    queryParams.append("amenities", amenity)
  );
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  const response = await fetch(`${API_URL}/api/listings/search?${queryParams}`);

  if (!response.ok) {
    throw new Error("Error fetching listings");
  }

  return response.json();
};

export const fetchListingById = async (
  listingId: string
): Promise<ListingType> => {
  const response = await fetch(`${API_URL}/api/listings/${listingId}`);

  if (!response.ok) {
    throw new Error("Error fetching listing");
  }

  return response.json();
};

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const createPaymentIntent = async (
  listingId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_URL}/api/listings/${listingId}/bookings/payment-intent`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const createBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_URL}/api/listings/${formData.listingId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking listing");
  }
};

export const deleteListing = async (listingId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/listings/${listingId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error deleting listing");
  }
};
