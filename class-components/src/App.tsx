import './App.css';
import { Component, type ReactNode } from 'react';
import { SearchBar } from './components/searchBar/SearchBar';
import { fetchBooks } from './service/books-api';
import type { AppState } from './types/books-app-types';
import { Catalog } from './components/catalog/Catalog';
import { ErrorButton } from './components/errorButton/ErrorButton';

class App extends Component<object, AppState> {
  state = {
    currentQuery: '',
    resultData: [],
    loading: false,
    error: null,
  };

  componentDidMount(): void {
    const lastQuery = localStorage.getItem('searchQuery') || '';
    this.setState({ currentQuery: lastQuery }, () => {
      this.handleFetchBooks(lastQuery);
    });
  }

  handleChangeSearchQuery = async (query: string): Promise<void> => {
    localStorage.setItem('searchQuery', query);
    this.setState({ currentQuery: query });
    this.handleFetchBooks(query);
  };

  handleFetchBooks = async (query?: string): Promise<void> => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetchBooks(query ?? '');
      this.setState({
        resultData: response.resultData,
        loading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ loading: false, error: error.message });
      } else {
        this.setState({ loading: false, error: String(error) });
      }
    }
  };

  render(): ReactNode {
    return (
      <div className="app-wrapper">
        <SearchBar
          currentQuery={this.state.currentQuery}
          handleChangeSearchQuery={this.handleChangeSearchQuery}
        />

        <Catalog
          resultData={this.state.resultData}
          loading={this.state.loading}
          error={this.state.error}
        />

        <ErrorButton />
      </div>
    );
  }
}

export default App;
