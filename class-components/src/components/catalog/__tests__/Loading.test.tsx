import { render, screen } from '@testing-library/react';
import { Catalog } from '../Catalog';

describe('Loading component tests', () => {
  it('renders loading indicator', () => {
    render(<Catalog resultData={[]} loading={true} error={null} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });
  it('shows/hides based on loading prop', () => {
    render(<Catalog resultData={[]} loading={false} error={null} />);
    const spinner = screen.queryByRole('status', { hidden: true });
    expect(spinner).not.toBeInTheDocument();
  });
  it('has accessible aria-label', () => {
    render(<Catalog resultData={[]} loading={true} error={null} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'loading');
  });
});
