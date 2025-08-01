import type { ReactNode } from 'react';
import cl from 'classnames';

type Props = {
  onClick: VoidFunction;
  children: ReactNode;
  classes?: string;
  disabled?: boolean;
};

export const SwitchButton = ({
  children,
  onClick,
  classes,
  disabled,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cl(
        'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50',
        classes
      )}
    >
      {children}
    </button>
  );
};
