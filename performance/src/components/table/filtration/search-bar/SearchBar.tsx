/*import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';*/

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
};

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        placeholder="enter country name.."
        onChange={(e) => setQuery(e.target.value)}
        defaultValue={query}
      />
    </div>
  );
}
