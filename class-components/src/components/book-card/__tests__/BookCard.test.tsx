import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockData } from '../../catalog/mocks/mockData';
import { BookCard } from '../bookCard';
import { wrapper } from '../../../redux/mocks/store';
import { bookApi } from '../../../redux/services/bookApi';

describe('BookCard component Tests', () => {
  const mockBookKey = '/works/OL99529W';
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  function mockUseGetBookDetailQuery(
    overrides: Partial<ReturnType<typeof bookApi.useGetBookDetailQuery>>
  ) {
    const defaultMock = {
      data: null,
      error: null,
      isLoading: false,
      refetch: vi.fn(),
    };
    vi.spyOn(bookApi, 'useGetBookDetailQuery').mockReturnValue({
      ...defaultMock,
      ...overrides,
    } as any);
  }

  /*it('should call error message when fetch fails', async () => {
    const errorObj = { status: 500, data: 'Internal Server Error' };
    mockUseGetBookDetailQuery({
      error: errorObj,
      isLoading: false,
    });

    render(<BookCard bookKey={mockBookKey} onClose={mockOnClose} />, {
      wrapper: wrapper,
    });

    expect(
      await screen.findByText(/Oops... Problem with book details/i)
    ).toBeInTheDocument();

    expect(screen.queryByText(mockData[0].title)).not.toBeInTheDocument();
  });*/
  /*
  it('should call onClose when Close button is clicked', async () => {
    mockUseGetBookDetailQuery({ data: mockData[0] });

    render(<BookCard bookKey={mockBookKey} onClose={mockOnClose} />, {
      wrapper: wrapper,
    });
    await screen.findByText(mockData[0].title);

    expect(await screen.findByText(mockData[0].title)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
*/
  /*it('should render null when book data is null', () => {
    mockUseGetBookDetailQuery({
      data: null,
      error: null,
      isLoading: false,
    });

    const { container } = render(
      <BookCard bookKey={mockBookKey} onClose={mockOnClose} />,
      {
        wrapper,
      }
    );

    expect(container.firstChild).toBeNull();
  });*/

  it('should display book details correctly when data is present', async () => {
    mockUseGetBookDetailQuery({ data: mockData[0], isLoading: false });

    render(<BookCard bookKey={mockBookKey} onClose={mockOnClose} />, {
      wrapper,
    });

    expect(await screen.findByText(mockData[0].title)).toBeInTheDocument();
  });
});
