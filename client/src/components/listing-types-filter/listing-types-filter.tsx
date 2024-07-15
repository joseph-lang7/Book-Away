import { listingTypes } from "../../config/listing-options-config";

type Props = {
  selectedListingTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const ListingTypesFilter = ({ selectedListingTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Listing Type</h4>
      {listingTypes.map((type) => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedListingTypes.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default ListingTypesFilter;
