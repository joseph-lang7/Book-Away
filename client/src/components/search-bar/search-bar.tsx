import { FormEvent, useState } from "react";
import { useSearchContext } from "../../contexts/search-context";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(() => {
    const storedDate = sessionStorage.getItem("checkOut");
    const initialDate = storedDate ? new Date(storedDate) : new Date();
    initialDate.setDate(initialDate.getDate() + 1);
    return initialDate;
  });
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const currentDate = new Date();
  const clearedDateDefault = new Date(
    currentDate.getTime() + 24 * 60 * 60 * 1000
  );

  const handleClear = () => {
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(clearedDateDefault);
    setAdultCount(1);
    setChildCount(0);
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 m-5 bg-white rounded shadow-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 items-center gap-4 justify-center"
    >
      <label>
        Destination:
        <div className="flex border-4 rounded-md flex-row items-center flex-1 bg-white p-2">
          <MdTravelExplore size={25} className="mr-2" />
          <input
            type="text"
            placeholder="Where are you going?"
            className="text-md w-full focus:outline-none"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>
      </label>

      <label>
        People:
        <div className="flex bg-white border-4 rounded-md px-2 py-1 gap-2 ">
          <label className="items-center flex">
            Adults:
            <input
              type="number"
              className="w-full p-1 focus:outline-none font-bold"
              min={1}
              max={20}
              value={adultCount}
              onChange={(event) => setAdultCount(parseInt(event.target.value))}
            />
          </label>
          <label className="items-center flex">
            Children:
            <input
              type="number"
              className="w-full p-1 focus:outline-none font-bold"
              min={0}
              max={20}
              value={childCount}
              onChange={(event) => setChildCount(parseInt(event.target.value))}
            />
          </label>
        </div>
      </label>
      <div>
        <label>
          Check-In:
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-In Date"
            className="min-w-full p-2 focus:outline-none bg-white border-4 rounded-md"
            wrapperClassName="min-w-full"
          />
        </label>
      </div>
      <div>
        <label>
          Check-Out:
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-Out Date"
            className="min-w-full p-2 focus:outline-none bg-white border-4 rounded-md"
            wrapperClassName="min-w-full"
          />
        </label>
      </div>
      <div className="flex gap-1 self-end">
        <button
          type="submit"
          className="w-2/3 bg-blue-600 text-white p-2 font-bold text-xl hover:bg-black transition-all duration-500 rounded-md h-full"
        >
          Search
        </button>
        <button
          onClick={() => handleClear()}
          type="button"
          className="w-1/3 bg-red-600 text-white p-2 font-bold text-xl hover:bg-black transition-all duration-500 rounded-md h-full"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
