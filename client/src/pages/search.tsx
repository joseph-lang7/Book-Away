import { useSearchContext } from "../contexts/search-context";

const Search = () => {
  const search = useSearchContext();
  console.log(search);
  return <div>SearchPage</div>;
};

export default Search;
