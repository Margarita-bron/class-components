import { render, screen } from '@testing-library/react';
import { Catalog } from '../Catalog';

describe('Loading component tests', () => {
  it('should render loading indicator', () => {
    render(
      <Catalog
        resultData={[]}
        loading={true}
        isFetching={true}
        onSelectItem={() => {}}
      />
    );
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });
  it('should hide loading indicator', () => {
    render(
      <Catalog resultData={[]} error={undefined} onSelectItem={() => {}} />
    );
    const spinner = screen.queryByRole('status', { hidden: true });
    expect(spinner).not.toBeInTheDocument();
  });
  it('may has accessible aria-label', () => {
    render(
      <Catalog
        resultData={[]}
        loading={true}
        isFetching={true}
        onSelectItem={() => {}}
      />
    );
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'loading');
  });
});
