import { render, screen } from '@testing-library/react';
import { Catalog } from '../Catalog';
import { mockData } from '../__mocks__/mockData';

describe('Results/CardList Component Tests: Rendering Tests', () => {
  it('renders correct number of items when data is provided', () => {
    render(<Catalog resultData={mockData} loading={false} error={null} />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockData.length);
  });
  it('displays "no results" message when data array is empty', async () => {
    render(<Catalog resultData={[]} loading={false} error={null} />);
    expect(screen.getByText(/data is empty/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching data', () => {
    render(<Catalog resultData={[]} loading={true} error={null} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });
});

describe('Results/CardList Component Tests:Error Handling Tests', () => {
  it('displays error message when API call fails', async () => {
    render(<Catalog resultData={[]} loading={false} error="error" />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
