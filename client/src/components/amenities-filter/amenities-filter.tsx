import { listingAmenities } from "../../config/listing-options-config";

type Props = {
  selectedAmenities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AmenitiesFilter = ({ selectedAmenities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Amenities</h4>
      {listingAmenities.map((amenity) => (
        <label key={amenity} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={amenity}
            checked={selectedAmenities.includes(amenity)}
            onChange={onChange}
          />
          <span>{amenity}</span>
        </label>
      ))}
    </div>
  );
};

export default AmenitiesFilter;
