import { AiFillStar } from "react-icons/ai";
import { ListingType } from "../../../../shared/types";
import { Link } from "react-router-dom";

type Props = {
  listing: ListingType;
};

const SearchResultsCard = ({ listing }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={listing.imageUrls[0]}
          className="w-full h-full oject-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_3fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: listing.starRating }).map(() => (
                <AiFillStar className="text-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{listing.type}</span>
          </div>
          <Link
            to={`/detail/${listing._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {listing.name}
          </Link>
        </div>
        <div>
          <div className="line-clamp-4">{listing.description}</div>
        </div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {listing.amenities.slice(0, 3).map((amenity) => (
              <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                {amenity}
              </span>
            ))}
            <span className="text-sm">
              {listing.amenities.length > 3 &&
                `+${listing.amenities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">
              ${listing.pricePerNight} per night
            </span>
            <Link
              to={`/detail/${listing._id}`}
              className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group disabled:bg-gray-500"
            >
              <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-blue-800 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-blue-800 rounded-md opacity-0 group-hover:opacity-100"></span>
              <span className="relative text-blue-800 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
                View Details
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
