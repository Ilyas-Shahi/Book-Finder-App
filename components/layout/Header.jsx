import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  BsFillSunFill,
  BsHeartFill,
  BsMoonStarsFill,
  BsSearch,
  BsXLg,
} from 'react-icons/bs';

import useIsMobile from '@/hooks/useIsMobile';

const Header = ({ handleSearch }) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }
  return (
    <header className="flex items-center justify-between px-4 py-4 sm:px-8 md:px-10">
      <p
        className={`text-xl font-extrabold sm:text-2xl ${
          showMobileSearch && isMobile && 'hidden'
        }`}
      >
        BOOK FINDER
      </p>

      <div
        className={`flex gap-3 ${
          showMobileSearch && 'flex-grow sm:flex-grow-0'
        }`}
      >
        <form
          className={`sm:flex sm:mr-4 relative w-full ${
            showMobileSearch && isMobile ? 'flex' : 'hidden'
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(e.target.search.value);
          }}
        >
          <input
            type="text"
            name="search"
            placeholder="Search by Title, Author, or Series"
            className="w-full sm:w-64 pl-4 bg-gray-100 rounded-l-full dark:bg-slate-700 focus:outline-none dark:hover:bg-slate-600 hover:bg-gray-200"
          />
          <button className="p-2 bg-gray-100 rounded-r-full sm:px-3 dark:bg-slate-700 dark:hover:bg-slate-600 hover:bg-gray-200">
            <BsSearch size={20} />
          </button>
        </form>

        <div
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="p-2 sm:hidden bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600 dark:bg-slate-700"
        >
          {showMobileSearch ? <BsXLg size={20} /> : <BsSearch size={20} />}
        </div>

        <div
          className={`p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600 dark:bg-slate-700 ${
            showMobileSearch && isMobile && 'hidden'
          }`}
        >
          {theme === 'dark' ? (
            <BsFillSunFill size={20} onClick={() => setTheme('light')} />
          ) : (
            <BsMoonStarsFill size={20} onClick={() => setTheme('dark')} />
          )}
        </div>

        <div
          className={`p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600 dark:bg-slate-700 ${
            showMobileSearch && isMobile && 'hidden'
          }`}
        >
          <BsHeartFill size={20} />
        </div>
      </div>
    </header>
  );
};
export default Header;
