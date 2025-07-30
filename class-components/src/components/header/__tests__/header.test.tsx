import { render, screen } from '@testing-library/react';
import Header from '../Header';
import research from '../../../assets/research.ico';
import { MemoryRouter } from 'react-router-dom';
import { mockNavigation } from '../__mocks__/mockNavigation';

describe('Header Tests', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it('should display main logo image with correct alt and src', () => {
    const logoImage = screen.getByAltText(/Open Library/i);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', research);
  });

  it('should display right links', () => {
    for (const item of mockNavigation) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: item.name })).toHaveAttribute(
        'href',
        item.href
      );
    }
  });
});
