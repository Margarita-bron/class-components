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
        value={query}
        placeholder="enter country name.."
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
