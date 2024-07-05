const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="text-3xl text-white font-bold tracking-tight">
          BookAway
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer hover:underline">Contact</p>
          <p className="cursor-pointer hover:underline">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
