import { useFormContext } from "react-hook-form";
import { listingTypes } from "../../../config/listing-options-config";
import { ListingFormData } from "../manage-listing-form";
const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ListingFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
        {listingTypes.map((type) => (
          <label
            key={type}
            className={`${
              typeWatch === type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }`}
          >
            <input
              type="radio"
              className="hidden"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
