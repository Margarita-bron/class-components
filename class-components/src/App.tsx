import './App.css';
import { Component, type ReactNode } from 'react';
import { SearchBar } from './components/searchBar/SearchBar';
import { fetchBooks, type Book } from './service/books-api';

type AppState = {
  currentQuery: string;
  resultData: Book[];
  loading: boolean;
  error: string | null;
};

class App extends Component<object, AppState> {
  state = {
    currentQuery: '',
    resultData: [],
    loading: false,
    error: null,
  };

  handleChangeSearchQuery = async (query: string): Promise<void> => {
    localStorage.setItem('searchQuery', query);
    this.setState({ currentQuery: query });
    this.handleFetchBooks(query);
  };

  handleFetchBooks = async (query?: string): Promise<void> => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetchBooks(query ?? this.state.currentQuery);
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
      <>
        <h1>Hello!</h1>
        <SearchBar
          currentQuery={this.state.currentQuery}
          handleChangeSearchQuery={this.handleChangeSearchQuery}
        />
        <div>
          <ul>
            {this.state.resultData.map((book: Book) => (
              <li key={book.key}>
                <strong>{book.title}</strong>
                {book.author_name && (
                  <p>Автор(ы): {book.author_name.join(', ')}</p>
                )}
                {book.first_sentence && (
                  <p>
                    {Array.isArray(book.first_sentence)
                      ? book.first_sentence[0]
                      : book.first_sentence}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default App;
