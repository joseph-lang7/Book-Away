import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/search-context";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/search-results-card/search-results-card";
import Pagination from "../components/pagination/pagination";
import StarRatingFilter from "../components/star-rating-filter/star-rating-filter";
import ListingTypesFilter from "../components/listing-types-filter/listing-types-filter";
import AmenitiesFilter from "../components/amenities-filter/amenities-filter";
import PriceFilter from "../components/price-filter/price-filter";
const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedListingTypes, setSelectedListingTypes] = useState<string[]>(
    []
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };
  const handleListingTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const listingType = event.target.value;
    setSelectedListingTypes((prevTypes) =>
      event.target.checked
        ? [...prevTypes, listingType]
        : prevTypes.filter((type) => type !== listingType)
    );
  };
  const handleAmenityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amenity = event.target.value;
    setSelectedAmenities((prevAmenities) =>
      event.target.checked
        ? [...prevAmenities, amenity]
        : prevAmenities.filter((prevAmenity) => prevAmenity !== amenity)
    );
  };

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedListingTypes,
    amenities: selectedAmenities,
    maxPrice: selectedPrice?.toString(),
  };
  const { data: listingData } = useQuery(["searchListings", searchParams], () =>
    apiClient.searchListings(searchParams)
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <ListingTypesFilter
            selectedListingTypes={selectedListingTypes}
            onChange={handleListingTypeChange}
          />
          <AmenitiesFilter
            selectedAmenities={selectedAmenities}
            onChange={handleAmenityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {listingData?.pagination.total} Listings found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
        </div>
        {listingData?.data.map((listing) => (
          <SearchResultsCard key={listing._id} listing={listing} />
        ))}
        <div>
          <Pagination
            page={listingData?.pagination.page || 1}
            pages={listingData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
