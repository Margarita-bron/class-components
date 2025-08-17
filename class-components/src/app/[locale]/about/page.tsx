import Link from 'next/link';
import Image from 'next/image';
import classes from 'classnames';
import './about-us.css';

export default function AboutUsPage() {
  return (
    <div
      className={classes(
        'white dark:black relative isolate px-6 py-24 sm:py-32 lg:px-8'
      )}
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
            'mt-2 text-6xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-gray-400'
          )}
        >
          Our Collaboration
        </p>
      </div>
      <p
        className={classes(
          'mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-500'
        )}
      >
        This project is aimed at introducing the basics of React to students,
        through the development of weekly sprints
      </p>
      <div className="about-us-wrapper">
        <div className="about-page">
          {' '}
          <Image
            alt="student`s photo"
            src="/about-us/author.jpg"
            width={100}
            height={100}
            className="inline-block rounded-full ring-2 ring-white"
          />
          <p>
            <Link href="https://github.com/Margarita-bron" target="_blank">
              Student, Project Owner — Margarita Savonevskaya
            </Link>{' '}
          </p>
        </div>
        <div className="about-page">
          {' '}
          <Image
            alt="mentor`s photo"
            src="/about-us/mentor.jpg"
            width={100}
            height={100}
            className="inline-block rounded-full ring-2 ring-white"
          />
          <p>
            <a href="https://github.com/sergikenergy" target="_blank">
              Mentor — Sergei Kustov
            </a>{' '}
          </p>
        </div>
        <div className="about-page">
          <Image
            alt="school`s photo"
            src="/about-us/school.svg"
            width={100}
            height={100}
            className="inline-block rounded-full ring-2 ring-white"
          />
          <p
            className={classes(
              'about-description text-gray-900 dark:text-gray-500'
            )}
          >
            <Link href="https://rs.school/" target="_blank">
              RSSchool (The Rolling Scopes School)
            </Link>{' '}
            — is a free, international educational platform focused on learning
            development, including front-end development using React. It helps
            students understand React through a structured curriculum, hands-on
            assignments, mentoring, and community engagement.
          </p>
        </div>
      </div>
    </div>
  );
}
