import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchBooks } from '../../../service/books-api';
import type { MockInstance } from 'vitest';
import { SearchBar } from '../SearchBar';
import { MemoryRouter } from 'react-router-dom';
import { MainPage } from '../../../pages/MainPage';

vi.mock('../../../service/books-api');

describe('SearchBar Tests', () => {
  describe('SearchBar Tests: User Interaction Tests', () => {
    let input: HTMLInputElement;
    let button: HTMLButtonElement;
    let setItemMock: ReturnType<typeof vi.spyOn>;

    beforeEach(async () => {
      setItemMock = vi
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {});
      render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      );
      input = (await screen.findByPlaceholderText(
        /Search.../i
      )) as HTMLInputElement;
      button = screen.getByRole('button', { name: /search/i });
    });

    it('should update input value during user types', () => {
      const newValue = 'smth';
      fireEvent.change(input, { target: { value: newValue } });
      expect(input.value).toBe(newValue);
    });

    it('should update input value after user types', async () => {
      const newValue = 'test input';
      await userEvent.clear(input);
      await userEvent.type(input, newValue);
      expect(input).toHaveValue(newValue);
    });

    it('should save search term to localStorage when search button is clicked (handleChangeSearchQuery)', async () => {
      const newValue = 'test query';
      await userEvent.clear(input);
      await userEvent.type(input, newValue);
      await userEvent.click(button);

      expect(setItemMock).toHaveBeenCalledWith(
        'searchQuery',
        JSON.stringify(newValue)
      );
    });

    it('should trigger search callback with correct parameters (trims whitespace from search input before saving)', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, '  query with whitespace ');
      await userEvent.click(button);

      await waitFor(() => {
        expect(fetchBooks).toHaveBeenCalledWith('query with whitespace', 1);
      });
    });

    afterEach(() => {
      cleanup();
      vi.clearAllMocks();
      vi.restoreAllMocks();
    });
  });
  describe('SearchBar Tests: LocalStorage Integration', () => {
    let getItemMock: MockInstance<(key: string) => string | null>;
    let setItemMock: ReturnType<typeof vi.spyOn>;

    beforeEach(async () => {
      getItemMock = vi
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementation(() => null);
      setItemMock = vi
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {});
    });

    it('should retrieve saved search term on component mount from localStorage', async () => {
      const newValue = 'saved query';
      getItemMock.mockReturnValueOnce(JSON.stringify(newValue));

      render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      );
      expect(await screen.findByPlaceholderText(/Search.../i)).toHaveValue(
        newValue
      );

      await waitFor(() => {
        expect(fetchBooks).toHaveBeenCalledWith(newValue, 1);
      });
    });

    it('should overwrite existing localStorage value when new search is performed', async () => {
      getItemMock.mockReturnValueOnce(JSON.stringify('old query'));

      render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      );
      const inputAfterMock = (await screen.findByPlaceholderText(
        /Search.../i
      )) as HTMLInputElement;
      const buttonAfterMock = screen.getByRole('button', { name: /search/i });

      const newValue = 'overwrited query';
      await userEvent.clear(inputAfterMock);
      await userEvent.type(inputAfterMock, newValue);
      await userEvent.click(buttonAfterMock);

      expect(setItemMock).toHaveBeenCalledWith(
        'searchQuery',
        JSON.stringify(newValue)
      );
      await waitFor(() => {
        expect(fetchBooks).toHaveBeenCalledWith(newValue, 1);
      });
    });

    afterEach(() => {
      cleanup();
      vi.clearAllMocks();
      vi.restoreAllMocks();
    });
  });

  describe('SearchBar Tests: LocalStorage Integration', () => {
    it('should save search term to localStorage when search button is clicked (handleChangeSearchQuery)', () => {
      const mockHandle = vi.fn();
      render(
        <MemoryRouter>
          <SearchBar currentQuery="" handleChangeSearchQuery={mockHandle} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(
        'Search...'
      ) as HTMLInputElement;
      const button = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: '  books  ' } });
      fireEvent.click(button);

      expect(mockHandle).toHaveBeenCalledWith('books');
    });

    afterEach(() => {
      vi.clearAllMocks();
      vi.restoreAllMocks();
    });
  });
});
