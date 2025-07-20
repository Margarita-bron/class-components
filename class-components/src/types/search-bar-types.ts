export type SearchBarProps = {
  currentQuery: string;
  handleChangeSearchQuery: (_query: string) => void;
};

export type SearchBarState = {
  query: string;
};
