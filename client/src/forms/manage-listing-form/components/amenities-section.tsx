import { useFormContext } from "react-hook-form";
import { listingAmenities } from "../../../config/listing-options-config";
import { ListingFormData } from "../manage-listing-form";

const AmenitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ListingFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {listingAmenities.map((amenity) => (
          <label className="text-sm flex gap-1 text-gray-700" key={amenity}>
            <input
              {...register("amenities", {
                validate: (amenities) => {
                  if (amenities && amenities.length > 0) {
                    return true;
                  } else {
                    return "At least one amenity is required";
                  }
                },
              })}
              type="checkbox"
              value={amenity}
            />
            {amenity}
          </label>
        ))}
      </div>
      {errors.amenities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.amenities.message}
        </span>
      )}
    </div>
  );
};

export default AmenitiesSection;
