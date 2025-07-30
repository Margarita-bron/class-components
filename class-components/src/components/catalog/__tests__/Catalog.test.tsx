import { render, screen } from '@testing-library/react';
import { mockData } from '../__mocks__/mockData';
import Catalog from '../Catalog';

describe('Results/CardList Component Tests', () => {
  describe('Error Handling Tests', () => {
    it('should display error message when API call fails', async () => {
      render(
        <Catalog
          resultData={[]}
          loading={false}
          error="error"
          onSelectItem={() => {}}
        />
      );
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
  describe('Rendering Tests', () => {
    it('should render list of items with predefined length', () => {
      render(
        <Catalog
          resultData={mockData}
          loading={false}
          error={null}
          onSelectItem={() => {}}
        />
      );
      const items = screen.getAllByRole('listitem');
      expect(items.length).toBe(mockData.length);
    });
    it('need to display a phrase indicating an empty list', async () => {
      render(
        <Catalog
          resultData={[]}
          loading={false}
          error={null}
          onSelectItem={() => {}}
        />
      );
      expect(screen.getByText(/data is empty/i)).toBeInTheDocument();
    });

    it('must show loading spinner while fetching data', () => {
      render(
        <Catalog
          resultData={[]}
          loading={true}
          error={null}
          onSelectItem={() => {}}
        />
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
