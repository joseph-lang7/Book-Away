import * as apiClient from "../api-client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import BookingForm from "../components/booking-form/booking-form";
import BookingDetailsSummary from "../components/booking-details-summary/booking-details-summary";
import { useSearchContext } from "../contexts/search-context";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/app-context";

const Booking = () => {
  const search = useSearchContext();
  const { listingId } = useParams();
  const { stripePromise } = useAppContext();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: listing } = useQuery(
    "fetchListingById",
    async () => apiClient.fetchListingById(listingId as string),
    {
      enabled: !!listingId,
    }
  );
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        listingId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!listingId && numberOfNights > 0,
    }
  );

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      {listing && (
        <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          listing={listing}
        />
      )}
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
