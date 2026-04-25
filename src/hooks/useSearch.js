import { useSearchParams, useNavigate } from "react-router";

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  const setQuery = (value) => {
    setSearchParams({ q: value });
  };

  const goToSearch = (value) => {
    navigate(`/search?q=${value}`);
  };

  return { query, setQuery, goToSearch };
};

