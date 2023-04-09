import { useSearchParams } from "react-router-dom";

const useSetSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const paramSearch = searchParams.get("search");
  const tags = searchParams.get("tags");

  const setFilter = (filterValue: string) => {
    setSearchParams({
      filter: filterValue ? filterValue : "",
      search: paramSearch ? paramSearch : "",
      tags: tags ? tags : "",
    });
  };

  const setParamSearch = (searchValue: string) => {
    setSearchParams({
      filter: filter ? filter : "",
      search: searchValue ? searchValue : "",
      tags: tags ? tags : "",
    });
  };

  const setTags = (tagsValue: string) => {
    setSearchParams({
      filter: filter ? filter : "",
      search: paramSearch ? paramSearch : "",
      tags: tagsValue ? tagsValue : "",
    });
  };

  return { filter, setFilter, paramSearch, setParamSearch, tags, setTags };
};

export default useSetSearchParams;
