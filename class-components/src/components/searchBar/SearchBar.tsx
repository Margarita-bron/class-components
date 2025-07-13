import { Component, type ChangeEvent, type ReactNode } from 'react';
import './search-bar.css';
import type {
  SearchBarProps,
  SearchBarState,
} from '../../types/search-bar-types.ts';

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      query: props.currentQuery,
    };
  }

  componentDidUpdate(prevProps: SearchBarProps): void {
    if (prevProps.currentQuery !== this.props.currentQuery) {
      this.setState({ query: this.props.currentQuery });
    }
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
      <div className="search-wrapper">
        <input
          className="search-input"
          name="Search Books Input"
          type="text"
          placeholder="Search..."
          value={this.state.query}
          onChange={this.handleQuery}
        />
        <button className="search-button" onClick={this.handleSearchButton}>
          Search
        </button>
      </div>
    );
  }
}
