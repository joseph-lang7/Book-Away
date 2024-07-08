import { useForm, FormProvider } from "react-hook-form";
import DetailsSection from "./components/details-section";
import TypeSection from "./components/type-section";
import AmenitiesSection from "./components/amenites-section";
import GuestsSection from "./components/guests-section";
import ImagesSection from "./components/images-section";
export type ListingFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: string;
  starRating: string;
  amenities: string[];
  imageFiles: FileList;
  adultCount: number;
  childrenCount: number;
};

const ManageListingForm = () => {
  const formMethods = useForm<ListingFormData>();
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetailsSection />
        <TypeSection />
        <AmenitiesSection />
        <GuestsSection />
        <ImagesSection />
        <div className="flex flex-1/2 justify-end">
          <button className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
            <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-blue-800 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-blue-800 rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span className="relative text-blue-800 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
              Create Listing
            </span>
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageListingForm;
