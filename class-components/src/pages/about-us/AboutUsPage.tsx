import author from './images/author.jpg';
import school from './images/school.svg';
import mentor from './images/mentor.jpg';
import { useNavigate } from 'react-router-dom';
import './about-us.css';
import { useContext } from 'react';
import { Theme, ThemeContext } from '../../context/theme-context';
import classes from 'classnames';

export const AboutUsPage = () => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate('/');
  };
  const { themeStyle } = useContext(ThemeContext);
  return (
    <div
      className={classes('relative isolate px-6 py-24 sm:py-32 lg:px-8', {
        'bg-white': themeStyle == Theme.Light,
        'bg-black': themeStyle === Theme.Dark,
      })}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600">About Us</h2>
        <p
          className={classes(
            'mt-2 text-6xl font-semibold tracking-tight text-balance sm:text-6xl',
            {
              'text-gray-900': themeStyle == Theme.Light,
              'text-gray-400': themeStyle == Theme.Dark,
            }
          )}
        >
          Our Collaboration
        </p>
      </div>
      <p
        className={classes(
          'mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty sm:text-xl/8',
          {
            'text-gray-600': themeStyle == Theme.Light,
            'text-gray-500': themeStyle == Theme.Dark,
          }
        )}
      >
        This project is aimed at introducing the basics of React to students,
        through the development of weekly sprints
      </p>
      <div className="about-us-wrapper">
        <div className="about-page">
          {' '}
          <img
            alt="student`s photo"
            src={author}
            width="100vw"
            className="inline-block rounded-full ring-2 ring-white"
          />
          <p>
            <a href="https://github.com/Margarita-bron" target="_blank">
              Student, Project Owner — Margarita Savonevskaya
            </a>{' '}
          </p>
        </div>
        <div className="about-page">
          {' '}
          <img
            alt="mentor`s photo"
            src={mentor}
            width="100vw"
            className="inline-block rounded-full ring-2 ring-white"
          />
          <p>
            <a href="https://github.com/sergikenergy" target="_blank">
              Mentor — Sergei Kustov
            </a>{' '}
          </p>
        </div>
        <div className="about-page">
          <img
            alt="school`s photo"
            src={school}
            width="100vw"
            className="inline-block rounded-full ring-2 ring-white"
          />
          <p
            className={classes('about-description', {
              'text-gray-900': themeStyle == Theme.Light,
              'text-gray-500': themeStyle == Theme.Dark,
            })}
          >
            <a href="https://rs.school/" target="_blank">
              RSSchool (The Rolling Scopes School)
            </a>{' '}
            — is a free, international educational platform focused on learning
            development, including front-end development using React. It helps
            students understand React through a structured curriculum, hands-on
            assignments, mentoring, and community engagement.
          </p>
        </div>
      </div>
      <button
        className="rounded-md !bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleClick}
      >
        Go back home
      </button>
    </div>
  );
};
