import './App.css';
import { Component, type ReactNode } from 'react';
import { SearchBar } from './components/searchBar/SearchBar';

type AppState = {
  currentQuery: string;
};

class App extends Component<object, AppState> {
  state = {
    currentQuery: '',
  };

  handleChangeSearchQuery = (query: string): void => {
    localStorage.setItem('searchQuery', query);
    this.setState({ currentQuery: query });
  };

  render(): ReactNode {
    return (
      <>
        <h1>Hello!</h1>
        <SearchBar
          currentQuery={this.state.currentQuery}
          handleChangeSearchQuery={this.handleChangeSearchQuery}
        />
      </>
    );
  }
}

export default App;
