import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import { render, screen } from '@testing-library/react';
import { BookItem } from '../BookItem';
import { mockData } from '../../mocks/mockData';
import { configureStore } from '@reduxjs/toolkit';
import {
  toggleItem,
  type SelectedBook,
} from '../../../../store/selectedBooksSlice';
import selectedBooksReducer from '../../../../store/selectedBooksSlice';

const book: SelectedBook = {
  id: 'book1',
  name: 'Book One',
  description: 'Description',
};

describe('Book Item Tests', () => {
  it('should render correctly title, authors, img of book item', () => {
    render(
      <Provider store={store}>
        <BookItem book={mockData[0]} onSelectItem={() => {}} />
      </Provider>
    );

    expect(screen.getByText(mockData[0].title)).toBeInTheDocument();
    const authorsText = mockData[0].author_name.join(', ');
    expect(screen.getByText(`Author(s): ${authorsText}`)).toBeInTheDocument();
    const img = screen.getByAltText(`Cover for ${mockData[0].title}`);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining(mockData[0].cover_i.toString())
    );
  });

  it('checkbox reflects selection state and toggles selection on change', () => {
    const store = configureStore({
      reducer: { selectedBooks: selectedBooksReducer },
    });

    render(
      <Provider store={store}>
        <BookItem book={mockData[0]} onSelectItem={() => {}} />
      </Provider>
    );
    expect(store.getState().selectedBooks.books).toHaveLength(0);

    store.dispatch(toggleItem(book));
    expect(store.getState().selectedBooks.books).toHaveLength(1);
    expect(store.getState().selectedBooks.books[0]).toEqual({
      id: book.id,
      name: book.name,
      description: book.description,
    });

    store.dispatch(toggleItem(book));
    expect(store.getState().selectedBooks.books).toHaveLength(0);
  });
});
