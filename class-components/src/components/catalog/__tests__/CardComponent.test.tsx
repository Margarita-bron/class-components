import { render, screen } from '@testing-library/react';
import { Catalog } from '../Catalog';
import { incompleteMockData, mockData } from '../__mocks__/mockData';

describe('Card/Item Component Tests', () => {
  it('displays item name, authors and description correctly, Correctly displays item names and descriptions', async () => {
    render(<Catalog resultData={mockData} loading={false} error={null} />);
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
  it('handles missing props gracefully, Handles missing or undefined data gracefully', () => {
    render(
      <Catalog resultData={incompleteMockData} loading={false} error={null} />
    );

    for (const book of incompleteMockData) {
      const listItem = screen.getByText(book.title).closest('li');
      expect(listItem).toBeInTheDocument();

      if (book.author_name) {
        const authorsString = book.author_name.join(', ');
        expect(listItem).toHaveTextContent(authorsString);
      } else {
        expect(listItem).not.toHaveTextContent(/Author\(s\):/i);
      }

      if (book.description) {
        expect(listItem).toHaveTextContent(book.description);
      } else {
        expect(listItem).not.toHaveTextContent(/Description:/i);
      }
    }
  });
});
