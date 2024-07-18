import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHome, BiMoney, BiStar } from "react-icons/bi";
import { BsTrash3Fill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { useAppContext } from "../contexts/app-context";
import { useState, useEffect } from "react";
const MyListings = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listingIdToDelete, setListingIdToDelete] = useState<string | null>(
    null
  );
  const { showToast } = useAppContext();
  useEffect(() => {
    if (showDeleteModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showDeleteModal]);

  const { data: listingData, refetch } = useQuery(
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

  const handleDelete = async (listingId: string) => {
    setListingIdToDelete(listingId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (listingIdToDelete) {
      try {
        await apiClient.deleteListing(listingIdToDelete);
        showToast({
          type: "SUCCESS",
          message: "Listing Deleted Successfully",
        });
        setShowDeleteModal(false);
        setListingIdToDelete(null);
        refetch();
      } catch (error) {
        console.error(error);
        showToast({
          type: "ERROR",
          message: "An error occurred deleting listing",
        });
      }
    }
  };

  return (
    <>
      {showDeleteModal && (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="w-[500px] h-[400px] bg-slate-300 relative">
            <div className="flex flex-col items-center justify-center h-full gap-5">
              <div className="text-center">
                <h2 className="text-2xl">Are you sure?</h2>
                <p className="text-red-500 text-sm">
                  This action cannot be undone
                </p>
              </div>
              <button
                id="deleteListing"
                onClick={confirmDelete}
                className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group disabled:bg-gray-500"
              >
                <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-red-500 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-red-500 rounded-md opacity-0 group-hover:opacity-100"></span>
                <span className="relative text-red-500 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
                  Confirm Deletion
                </span>
              </button>
            </div>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute right-5 top-5"
            >
              <CgClose size={30} />
            </button>
          </div>
        </div>
      )}
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
          {listingData?.map((listing) => (
            <div
              key={listing._id}
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            >
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
              <div className="flex gap-3 justify-end">
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
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="bg-red-500 px-5 py-3 text-white rounded-md hover:bg-black transition-colors duration-300"
                >
                  <BsTrash3Fill />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyListings;
