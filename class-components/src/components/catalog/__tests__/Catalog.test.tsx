import { render, screen } from '@testing-library/react';
import { mockData } from '../mocks/mockData';
import { Catalog } from '../Catalog';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

describe('Results/CardList Component Tests', () => {
  describe('Error Handling Tests', () => {
    it('should display error message when API call fails', async () => {
      render(
        <Provider store={store}>
          <Catalog
            resultData={[]}
            loading={false}
            error={{
              status: 500,
              data: 'Internal Server Error',
            }}
            isFetching={false}
            onSelectItem={() => {}}
          />
        </Provider>
      );
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
  describe('Rendering Tests', () => {
    it('should render list of items with predefined length', () => {
      render(
        <Provider store={store}>
          <Catalog
            resultData={mockData}
            loading={false}
            error={undefined}
            isFetching={false}
            onSelectItem={() => {}}
          />
        </Provider>
      );
      const items = screen.getAllByRole('listitem');
      expect(items.length).toBe(mockData.length);
    });
    it('need to display a phrase indicating an empty list', async () => {
      render(
        <Provider store={store}>
          <Catalog
            resultData={[]}
            loading={false}
            error={undefined}
            isFetching={false}
            onSelectItem={() => {}}
          />
        </Provider>
      );
      expect(screen.getByText(/data is empty/i)).toBeInTheDocument();
    });

    it('must show loading spinner while fetching data', () => {
      render(
        <Provider store={store}>
          <Catalog
            resultData={[]}
            loading={true}
            error={undefined}
            isFetching={false}
            onSelectItem={() => {}}
          />
        </Provider>
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
