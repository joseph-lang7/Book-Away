import SearchBar from "../search-bar/search-bar";

const Hero = () => {
  return (
    <div className="w-full max-w-full h-[800px] relative">
      <img
        src="/beach.jpg"
        alt="beach"
        className="w-full h-full object-cover brightness-[45%]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-14">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
          Relax, you are booking with BookAway
        </h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
