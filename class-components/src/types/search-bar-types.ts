export type SearchBarProps = {
  currentQuery: string;
  handleChangeSearchQuery: (query: string) => void;
};

export type SearchBarState = {
  query: string;
};
