import { useSearchParams } from "react-router-dom";

const useSetSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramFilter = searchParams.get("filter");
  const paramSearch = searchParams.get("search");
  const paramTags = searchParams.get("tags");

  const setParamFilter = (filterValue: string) => {
    setSearchParams({
      filter: filterValue ? filterValue : "",
      search: paramSearch ? paramSearch : "",
      tags: paramTags ? paramTags : "",
    });
  };

  const setParamSearch = (searchValue: string) => {
    setSearchParams({
      filter: paramFilter ? paramFilter : "",
      search: searchValue ? searchValue : "",
      tags: paramTags ? paramTags : "",
    });
  };

  const setTags = (tagsValue: string) => {
    setSearchParams({
      filter: paramFilter ? paramFilter : "",
      search: paramSearch ? paramSearch : "",
      tags: tagsValue ? tagsValue : "",
    });
  };

  return {
    paramFilter,
    setParamFilter,
    paramSearch,
    setParamSearch,
    paramTags,
    setTags,
  };
};

export default useSetSearchParams;
