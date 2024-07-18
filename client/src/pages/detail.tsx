import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/guest-info-form/guest-info-form";
const Detail = () => {
  const { listingId } = useParams();

  const { data: listing } = useQuery(
    "fetchListingById",
    () => apiClient.fetchListingById(listingId || ""),
    {
      enabled: !!listingId,
    }
  );

  if (!listing) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex ">
          {Array.from({ length: listing.starRating }).map(() => (
            <AiFillStar className="text-yellow-500" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{listing.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {listing.imageUrls.map((image) => (
          <div key={image} className="h-[300px]">
            <img
              src={image}
              alt={listing.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {listing.amenities.map((amenity) => (
          <div className="p-3 border border-slate-300 rounded-sm" key={amenity}>
            {amenity}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
        <div className="whitespace-pre-line">{listing.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={listing.pricePerNight}
            listingId={listing._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
