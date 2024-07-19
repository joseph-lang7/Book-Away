import { ListingType } from "../../shared/types";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
type Props = {
  booking: ListingType;
};

const MyBookingCard = ({ booking }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={booking.imageUrls[0]}
          className="w-full h-full oject-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_3fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: booking.starRating }).map((_, index) => (
                <AiFillStar key={index} className="text-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{booking.type}</span>
          </div>
          <Link
            to={`/detail/${booking._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {booking.name}
          </Link>
        </div>
        <div>
          <div className="line-clamp-4">{booking.description}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {booking.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {amenity}
              </span>
            ))}
            <span className="text-sm">
              {booking.amenities.length > 3 &&
                `+${booking.amenities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <span className="font-bold">
              ${booking.pricePerNight} per night
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;
