'use client';

import { SwitchButton } from './ui/switch-button';
import classes from 'classnames';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const setPageArray = (totalPages: number): number[] => {
  const pages: number[] = [];
  for (let i: number = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
};

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const t = useTranslations('MainPage');
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;

  const handlePageChange = (page: number): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`/?${params.toString()}`);
  };

  return (
    <div
      className={classes(
        'body-container__theme-light dark:body-container__theme-dark flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'
      )}
    >
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p
            className={classes(
              'text-gray-700" body-container__theme-light dark:body-container__theme-dark text-sm'
            )}
          >
            Showing{' '}
            <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * 10, totalPages * 10)}
            </span>{' '}
            of <span className="font-medium">{totalPages * 10}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            <SwitchButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &#8592; {t('Pagination.Previous')}
            </SwitchButton>

            {setPageArray(totalPages).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={classes(
                  'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:outline-offset-0',
                  page === currentPage
                    ? 'z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    : 'body-container__theme-light dark:body-container__theme-dark text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20'
                )}
              >
                {page}
              </button>
            ))}

            <SwitchButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              classes="ml-3"
            >
              {t('Pagination.Next')} &#8594;
            </SwitchButton>
          </nav>
        </div>
      </div>
    </div>
  );
};
