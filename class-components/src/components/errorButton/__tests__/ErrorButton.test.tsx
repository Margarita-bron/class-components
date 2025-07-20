import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorButton } from '../ErrorButton';

describe('ErrorButton tests', () => {
  it('renders button and throws error when clicked', () => {
    expect(() => {
      render(<ErrorButton />);
      const button = screen.getByText(/call error/i);
      fireEvent.click(button);
    }).toThrowError('Test error');
  });
});
