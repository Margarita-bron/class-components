import { Component, type ChangeEvent, type ReactNode } from 'react';

type SearchBarProps = {
  currentQuery: string;
  handleChangeSearchQuery: (query: string) => void;
};

type SearchBarState = {
  query: string;
};

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      query: props.currentQuery,
    };
  }

  handleQuery = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: e.target.value });
  };

  handleSearchButton = (): void => {
    const pureQuery = this.state.query.trim();
    this.props.handleChangeSearchQuery(pureQuery);
  };

  render(): ReactNode {
    return (
      <>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.query}
          onChange={this.handleQuery}
        />
        <button onClick={this.handleSearchButton}>Search</button>
      </>
    );
  }
}
