import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchBar } from '../SearchBar';
import App from '../../../App';
import { fetchBooks } from '../../../service/books-api';

vi.mock('../../../service/books-api');

describe('SearchBar: User Interaction Tests&LocalStorage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('updates input value when user types', () => {
    render(<SearchBar currentQuery="" handleChangeSearchQuery={() => {}} />);
    const input = screen.getByPlaceholderText(/Search.../i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ehtrhsthet' } });
    expect(input.value).toBe('ehtrhsthet');
  });

  it('saves search term to localStorage when search button is clicked (handleChangeSearchQuery)', () => {
    const mockHandle = vi.fn();
    render(<SearchBar currentQuery="" handleChangeSearchQuery={mockHandle} />);

    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  books  ' } });
    fireEvent.click(button);

    expect(mockHandle).toHaveBeenCalledWith('books');
  });
  it('updates input value when user types', async () => {
    render(<App />);
    const input = await screen.findByPlaceholderText(/Search.../i);
    await userEvent.type(input, 'test input');
    expect(input).toHaveValue('test input');
  });

  it('saves search term to localStorage when search button is clicked (handleChangeSearchQuery)', async () => {
    render(<App />);
    const input = await screen.findByPlaceholderText(/Search.../i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'test query');
    await userEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('test query');
  });

  it('triggers search callback with correct parameters (trims whitespace from search input before saving)', async () => {
    render(<App />);
    const input = await screen.findByPlaceholderText(/Search.../i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, '  query with whitespace ');
    await userEvent.click(button);

    await waitFor(() => {
      expect(fetchBooks).toHaveBeenCalledWith('query with whitespace');
    });
  });

  it('retrieves saved search term on component mount from localStorage', async () => {
    localStorage.setItem('searchQuery', 'saved query');
    render(<App />);

    const input = await screen.findByPlaceholderText(/Search.../i);
    expect(input).toHaveValue('saved query');

    await waitFor(() => {
      expect(fetchBooks).toHaveBeenCalledWith('saved query');
    });
  });

  it('overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('searchQuery', 'old query');

    render(<App />);
    const input = await screen.findByPlaceholderText(/Search.../i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'overwrited query');
    await userEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('overwrited query');
    await waitFor(() => {
      expect(fetchBooks).toHaveBeenCalledWith('overwrited query');
    });
  });
});
