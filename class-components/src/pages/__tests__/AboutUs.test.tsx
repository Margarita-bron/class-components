import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AboutUs from '../AboutUsPage';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: (): typeof mockedNavigate => mockedNavigate,
}));

describe('AboutUs component Tests', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
  });

  it('should render main titles and paragraph', () => {
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Collaboration/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /This project is aimed at introducing the basics of React/i
      )
    ).toBeInTheDocument();
  });

  it('should render student`s image with correct alt attributes and src', () => {
    const studentImg = screen.getByAltText('student`s photo');
    expect(studentImg).toBeInTheDocument();
    expect(studentImg).toBeInTheDocument();
    expect(studentImg.getAttribute('src')).toBeTruthy();
  });

  it('should render mentor`s image with correct alt attributes and src', () => {
    const mentorImg = screen.getByAltText('mentor`s photo');
    expect(mentorImg).toBeInTheDocument();
    expect(mentorImg).toBeInTheDocument();
    expect(mentorImg.getAttribute('src')).toBeTruthy();
  });

  it('should render school`s image with correct alt attributes and src', () => {
    const schoolImg = screen.getByAltText('school`s photo');
    expect(schoolImg).toBeInTheDocument();
    expect(schoolImg).toBeInTheDocument();
    expect(schoolImg.getAttribute('src')).toBeTruthy();
  });

  it('should render correct links with href and target blank', () => {
    const linksToTest = [
      {
        text: /Student, Project Owner — Margarita Savonevskaya/i,
        href: 'https://github.com/Margarita-bron',
      },
      {
        text: /Mentor — Sergei Kustov/i,
        href: 'https://github.com/sergikenergy',
      },
      {
        text: /RSSchool \(The Rolling Scopes School\)/i,
        href: 'https://rs.school/',
      },
    ];

    linksToTest.forEach(({ text, href }) => {
      const link = screen.getByRole('link', { name: text });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('should render "Go back home" button and triggers navigation on click', () => {
    const button = screen.getByRole('button', { name: /go back home/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
