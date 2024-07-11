import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHome, BiMoney, BiStar } from "react-icons/bi";
import { useAppContext } from "../contexts/app-context";
const MyListings = () => {
  const { showToast } = useAppContext();
  const { data: listingData } = useQuery(
    "fetchMyListings",
    apiClient.fetchMyListings,
    {
      onError: () => {
        showToast({
          message: "An error occurred fetching listings",
          type: "ERROR",
        });
      },
    }
  );

  if (!listingData) {
    return <span>No Listings found</span>;
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Link
          className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group disabled:bg-gray-500"
          to="/add-listing"
        >
          <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-blue-800 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-blue-800 rounded-md opacity-0 group-hover:opacity-100 "></span>
          <span className="relative text-blue-800 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
            Add Listing
          </span>
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {listingData.map((listing) => (
          <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
            <h2 className="text-2xl font-bold">{listing.name}</h2>
            <div className="whitespace-pre-line">{listing.description}</div>
            <div className="grid grid-cols-1 2xl:grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {listing.city}, {listing.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {listing.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />${listing.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHome className="mr-1" />
                {listing.adultCount} adults, {listing.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {listing.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group disabled:bg-gray-500"
                to={`/edit-listing/${listing._id}`}
              >
                <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-blue-800 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-blue-800 rounded-md opacity-0 group-hover:opacity-100"></span>
                <span className="relative text-blue-800 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
                  View Details
                </span>
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
