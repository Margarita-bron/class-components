import { render, screen } from '@testing-library/react';
import { Catalog } from '../Catalog';
import { mockData } from '../__mocks__/mockData';

describe('Results/CardList Component Tests', () => {
  describe('Error Handling Tests', () => {
    it('should display error message when API call fails', async () => {
      render(<Catalog resultData={[]} loading={false} error="error" />);
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
  describe('Rendering Tests', () => {
    it('should render list of items with predefined length', () => {
      render(<Catalog resultData={mockData} loading={false} error={null} />);
      const items = screen.getAllByRole('listitem');
      expect(items.length).toBe(mockData.length);
    });
    it('need to display a phrase indicating an empty list', async () => {
      render(<Catalog resultData={[]} loading={false} error={null} />);
      expect(screen.getByText(/data is empty/i)).toBeInTheDocument();
    });

    it('must show loading spinner while fetching data', () => {
      render(<Catalog resultData={[]} loading={true} error={null} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
