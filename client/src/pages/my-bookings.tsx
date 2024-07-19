import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/app-context";
import { ListingType } from "../shared/types";
import MyBookingCard from "../components/my-booking-card/my-booking-card";
const MyBookings = () => {
  const { showToast } = useAppContext();

  const {
    data: currentUser,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

  const {
    data: bookingData,
    isLoading: isBookingsLoading,
    isError: isBookingsError,
  } = useQuery(
    ["fetchMyBookings", currentUser?._id],
    () => apiClient.fetchMyBookings(currentUser?._id || ""),
    {
      enabled: !!currentUser?._id,
      onError: () => {
        showToast({
          message: "An error occurred fetching bookings",
          type: "ERROR",
        });
      },
    }
  );

  if (isUserLoading || isBookingsLoading) {
    return <div>Loading...</div>;
  }

  if (isUserError) {
    return <div>Error fetching user data.</div>;
  }

  if (isBookingsError) {
    return <div>Error fetching bookings.</div>;
  }

  return (
    <div>
      {bookingData && bookingData.length > 0 ? (
        bookingData.map((booking: ListingType) => (
          <div key={booking._id}>
            <MyBookingCard booking={booking} />
          </div>
        ))
      ) : (
        <div>No bookings found.</div>
      )}
    </div>
  );
};

export default MyBookings;
