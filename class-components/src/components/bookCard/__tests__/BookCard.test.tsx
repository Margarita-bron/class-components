import { vi, type Mock } from 'vitest';

vi.mock('../../../service/books-api', () => ({
  fetchBookDetail: vi.fn(),
}));
import { fetchBookDetail } from '../../../service/books-api';

import { render, screen, fireEvent } from '@testing-library/react';
import { mockData } from '../../catalog/__mocks__/mockData';
import type { Book } from '../../../types/books-app-types';
import BookCard from '../bookCard';

describe('BookCard component Tests', () => {
  const mockBookKey = '/works/OL99529W';
  const mockOnClose = vi.fn();
  const fetchBookDetailMock = fetchBookDetail as Mock<
    (
      bookKey: string
    ) => Promise<{ resultData: Book | null; error: string | null }>
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  /*it('should renders book details after successful fetch', async () => {

    render(<BookCard bookKey={mockBookKey} onClose={mockOnClose} />);

    expect(screen.getByRole('status')).toBeInTheDocument();

    expect(await screen.findByText(mockData[0].title)).toBeInTheDocument();
    const authorsParagraph = screen.getByText(/Authors:/i);
    expect(authorsParagraph).toHaveTextContent('Edith Nesbit');

    if (mockData[0].description) {
      expect(screen.getByText(mockData[0].description)).toBeInTheDocument();
    }

    expect(
      screen.queryByText(/error loading details/i)
    ).not.toBeInTheDocument();
  });

  */ it('renders error message when fetch fails', async () => {
    fetchBookDetailMock.mockRejectedValue(new Error('error'));

    render(<BookCard bookKey={mockBookKey} onClose={mockOnClose} />);

    expect(
      await screen.findByText(/error loading details/i)
    ).toBeInTheDocument();

    expect(screen.queryByText(mockData[0].title)).not.toBeInTheDocument();
  });

  it('calls onClose when Close button is clicked', async () => {
    fetchBookDetailMock.mockResolvedValue({
      resultData: mockData[0],
      error: null,
    });

    render(<BookCard bookKey={mockBookKey} onClose={mockOnClose} />);
    await screen.findByText(mockData[0].title);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders null when book data is null (before fetch)', () => {
    fetchBookDetailMock.mockResolvedValue({ resultData: null, error: null });

    const { container } = render(
      <BookCard bookKey={mockBookKey} onClose={mockOnClose} />
    );

    expect(container.firstChild).toBeNull();
  });
});
