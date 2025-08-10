import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyData } from '../EmptyData';

describe('EmptyData component', () => {
  it('should renders the "data is empty" message', () => {
    render(<EmptyData />);

    const headingElement = screen.getByRole('heading', {
      level: 1,
      name: /data is empty/i,
    });
    expect(headingElement).toBeInTheDocument();
  });
});
