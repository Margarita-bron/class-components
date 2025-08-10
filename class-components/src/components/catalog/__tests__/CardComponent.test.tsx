import { render, screen } from '@testing-library/react';
import {
  mockData,
  mockDataWithDescription,
  mockDataWithoutDescription,
} from '../mocks/mockData';
import { Catalog } from '../Catalog';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

type mockTypeWithoutDescription = {
  key: string;
  author_name: string[];
  title: string;
};
type mockTypeWithDescription = {
  key: string;
  title: string;
  description: string;
};
function testBooks<T extends { title: string }>(
  data: T[],
  checkFn: (book: T, listItem: HTMLElement) => void
): void {
  for (const book of data) {
    const listItem = screen.getByText(book.title).closest('li');
    expect(listItem).toBeInTheDocument();
    checkFn(book, listItem!);
  }
}

describe('Card/Item Component Tests', () => {
  it('should display item name, authors and description correctly', async () => {
    render(
      <Provider store={store}>
        {' '}
        <Catalog
          resultData={mockData}
          loading={false}
          error={null}
          onSelectItem={() => {}}
        />
      </Provider>
    );
    for (const book of mockData) {
      const listItem = screen.getByText(book.title).closest('li');
      expect(listItem).toBeInTheDocument();
      const authorsString = book.author_name.join(', ');
      expect(listItem).toHaveTextContent(authorsString);
      if (book.description) {
        expect(listItem).toHaveTextContent(book.description);
      }
    }
  });
  it('should render books with description', () => {
    render(
      <Provider store={store}>
        {' '}
        <Catalog
          resultData={mockDataWithDescription}
          loading={false}
          error={null}
          onSelectItem={() => {}}
        />
      </Provider>
    );

    testBooks<mockTypeWithDescription>(
      mockDataWithDescription,
      (book, listItem) => {
        expect(listItem).toHaveTextContent(book.description);
      }
    );
  });

  it('must render books without description', () => {
    render(
      <Provider store={store}>
        <Catalog
          resultData={mockDataWithoutDescription}
          loading={false}
          error={null}
          onSelectItem={() => {}}
        />
      </Provider>
    );

    testBooks<mockTypeWithoutDescription>(
      mockDataWithoutDescription,
      (_, listItem) => {
        expect(listItem).not.toHaveTextContent(/Description:/i);
      }
    );
  });

  it('should render books with authors', () => {
    render(
      <Provider store={store}>
        <Catalog
          resultData={mockDataWithoutDescription}
          loading={false}
          error={null}
          onSelectItem={() => {}}
        />
      </Provider>
    );

    testBooks<mockTypeWithoutDescription>(
      mockDataWithoutDescription,
      (book, listItem) => {
        expect(listItem).toHaveTextContent(book.author_name.join(', '));
      }
    );
  });
  it('must renders books without authors', () => {
    render(
      <Provider store={store}>
        <Catalog
          resultData={mockDataWithDescription}
          loading={false}
          error={null}
          onSelectItem={() => {}}
        />
      </Provider>
    );

    testBooks<mockTypeWithDescription>(
      mockDataWithDescription,
      (_, listItem) => {
        expect(listItem).not.toHaveTextContent(/Author\(s\):/i);
      }
    );
  });
});
