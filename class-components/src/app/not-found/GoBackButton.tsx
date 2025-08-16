'use client';
import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-md !bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Go back home
    </button>
  );
}
