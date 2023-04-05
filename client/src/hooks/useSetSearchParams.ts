import { useSearchParams } from "react-router-dom";

const useSetSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const search = searchParams.get("search");
  const tags = searchParams.get("tags");

  const setFilter = (filterValue: string) => {
    setSearchParams({
      filter: filterValue ? filterValue : "",
      search: search ? search : "",
      tags: tags ? tags : "",
    });
  };

  const setSearch = (searchValue: string) => {
    setSearchParams({
      filter: filter ? filter : "",
      search: searchValue ? searchValue : "",
      tags: tags ? tags : "",
    });
  };

  const setTags = (tagsValue: string) => {
    setSearchParams({
      filter: filter ? filter : "",
      search: search ? search : "",
      tags: tagsValue ? tagsValue : "",
    });
  };

  return [filter, setFilter, search, setSearch, tags, setTags];
};

export default useSetSearchParams;
