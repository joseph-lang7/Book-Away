import { useMutation } from "react-query";
import ManageListingForm from "../forms/manage-listing-form/manage-listing-form";
import { useAppContext } from "../contexts/app-context";
import * as apiClient from "../api-client";
const AddListing = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyListing, {
    onSuccess: () => {
      showToast({ message: "Listing Saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "An Error Occurred", type: "ERROR" });
    },
  });

  const handleSave = (listingFormData: FormData) => {
    mutate(listingFormData);
  };

  return <ManageListingForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddListing;
