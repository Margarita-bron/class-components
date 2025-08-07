import { vi, type Mock } from 'vitest';

vi.mock('../../../service/books-api', () => ({
  fetchBookDetail: vi.fn(),
}));
import { fetchBookDetail } from '../../../service/books-api';

import { render, screen, fireEvent } from '@testing-library/react';
import { mockData } from '../../catalog/mocks/mockData';
import type { Book } from '../../../types/book';
import { BookCard } from '../bookCard';
import type { Nullable } from '../../../types/common';

describe('BookCard component Tests', () => {
  const mockBookKey = '/works/OL99529W';
  const mockOnClose = vi.fn();
  const fetchBookDetailMock = fetchBookDetail as Mock<
    (
      bookKey: string
    ) => Promise<{ resultData: Nullable<Book>; error: Nullable<string> }>
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call error message when fetch fails', async () => {
    fetchBookDetailMock.mockRejectedValue(new Error('error'));

    render(<BookCard bookKey={mockBookKey} onClose={mockOnClose} />);

    expect(
      await screen.findByText(/error loading details/i)
    ).toBeInTheDocument();

    expect(screen.queryByText(mockData[0].title)).not.toBeInTheDocument();
  });

  it('should call onClose when Close button is clicked', async () => {
    fetchBookDetailMock.mockResolvedValue({
      resultData: mockData[0],
      error: null,
    });

    render(<BookCard bookKey={mockBookKey} onClose={mockOnClose} />);
    await screen.findByText(mockData[0].title);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render null when book data is null', () => {
    fetchBookDetailMock.mockResolvedValue({ resultData: null, error: null });

    const { container } = render(
      <BookCard bookKey={''} onClose={mockOnClose} />
    );

    expect(container.firstChild).toBeNull();
  });
});
