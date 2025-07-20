import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders search input and search button', () => {
    render(<SearchBar currentQuery="" handleChangeSearchQuery={() => {}} />);
    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage (props.currentQuery) on mount', () => {
    render(
      <SearchBar currentQuery="React" handleChangeSearchQuery={() => {}} />
    );
    const input = screen.getByPlaceholderText(/Search.../i) as HTMLInputElement;
    expect(input.value).toBe('React');
  });

  it('shows empty input when no saved term exists', () => {
    render(<SearchBar currentQuery="" handleChangeSearchQuery={() => {}} />);
    const input = screen.getByPlaceholderText(/Search.../i) as HTMLInputElement;
    expect(input.value).toBe('');
  });
});
