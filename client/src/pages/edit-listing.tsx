import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageListingForm from "../forms/manage-listing-form/manage-listing-form";
import { useAppContext } from "../contexts/app-context";
const EditListing = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { listingId } = useParams();
  const { data: listing } = useQuery(
    "fetchMyListingById",
    () => apiClient.fetchMyListingById(listingId || ""),
    {
      enabled: !!listingId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyListingById, {
    onSuccess: () => {
      showToast({ message: "Listing Saved", type: "SUCCESS" });
      navigate("/my-listings");
    },
    onError: () =>
      showToast({ message: "Something went wrong", type: "ERROR" }),
  });

  const handleSave = (listingFormData: FormData) => {
    mutate(listingFormData);
  };
  return (
    <ManageListingForm
      listing={listing}
      onSave={handleSave}
      isLoading={isLoading}
    />
  );
};

export default EditListing;
