import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BiLinkExternal, BiLoaderAlt } from 'react-icons/bi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { IoReloadOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';

import placeholderImg from '@/public/placeholder.png';

const BooksList = ({ data, title }) => {
  const [numOfBooks, setNumOfBooks] = useState(10);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [sliderEnd, setSliderEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const swiperRef = useRef();

  useEffect(() => {
    if (numOfBooks > 10 && numOfBooks <= 30) {
      setIsLoading(data.items?.length !== numOfBooks);

      router.push(
        {
          query: {
            ...router.query,
            [title.toLowerCase().split(' ').join('')]: numOfBooks,
          },
        },
        undefined,
        { scroll: false }
      );
    }
  }, [numOfBooks, data?.items?.length, title]);

  return (
    <div
      id={title.toLocaleLowerCase().split(' ').join('')}
      className="px-4 pb-8 my-10 border-b md:px-8 dark:border-slate-600 scroll-mt-20"
    >
      <h2 className="mb-6 text-2xl md:text-3xl">{title}</h2>

      <Swiper
        slidesPerView={1.3}
        spaceBetween={10}
        navigation={true}
        centeredSlides={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          660: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          880: {
            slidesPerView: 3,
            centeredSlides: false,
          },
          1080: {
            slidesPerView: 4,
            centeredSlides: false,
          },
        }}
        className="relative !pr-8 md:!pr-24 mySwiper"
      >
        {data?.items?.map((book, index) => (
          <SwiperSlide key={index} className="pt-14">
            <div className="p-3 bg-gray-100 rounded-lg dark:bg-slate-700">
              <div className="flex gap-3">
                <Image
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks?.thumbnail
                      : placeholderImg
                  }
                  width={100}
                  height={100}
                  loading="lazy"
                  alt="Book Cover"
                  className="z-10 object-cover w-24 -mt-16 rounded-md shadow h-36"
                />

                <div>
                  {book.volumeInfo.authors?.slice(0, 2).map((author, index) => (
                    <p key={index} className="text-xs md:text-sm">
                      {author.substring(0, 24)}
                      {book.volumeInfo.authors.length > 1 && index == 0 && ','}
                    </p>
                  ))}

                  <a
                    href={book.volumeInfo.previewLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="px-2 pb-0.5 text-sm mt-2 rounded-full bg-gray-200 hover:bg-gray-50 dark:bg-slate-600 dark:hover:bg-slate-500">
                      Preview <BiLinkExternal className="inline" />
                    </button>
                  </a>
                </div>
              </div>

              <h3 className="mt-4 mb-2 text-base md:text-lg">
                {book.volumeInfo.title.length >= 32
                  ? `${book.volumeInfo.title.substring(0, 24)}...`
                  : book.volumeInfo.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}

        {(isLoading || numOfBooks < 30) && !title.includes('Search') && (
          <SwiperSlide className="my-auto pt-14">
            <div
              onClick={() => {
                setNumOfBooks(numOfBooks + 10);
                if (!isLoading) setSliderEnd(false);
              }}
              className="flex flex-col items-center justify-center gap-3 p-3 mx-auto my-auto bg-gray-100 rounded-lg cursor-pointer h-28 w-36 dark:bg-slate-700 hover:dark:bg-slate-600 hover:bg-gray-200"
            >
              {isLoading ? (
                <BiLoaderAlt size={28} className="animate-spin" />
              ) : (
                <IoReloadOutline size={26} />
              )}
              <span>{isLoading ? 'Loading' : 'Load More'}</span>
            </div>
          </SwiperSlide>
        )}

        {activeSlideIndex > 0 && (
          <button
            className="absolute top-0 left-0 z-20 h-full"
            onClick={() => {
              swiperRef?.current.slidePrev();
              setActiveSlideIndex(swiperRef?.current?.activeIndex);
              setSliderEnd(swiperRef?.current?.isEnd);
            }}
          >
            <BsChevronLeft size={20} />
          </button>
        )}

        {!sliderEnd && (
          <button
            className="absolute top-0 right-0 z-20 h-full"
            onClick={() => {
              swiperRef?.current.slideNext();
              setActiveSlideIndex(swiperRef?.current?.activeIndex);
              setSliderEnd(swiperRef?.current?.isEnd);
            }}
          >
            <BsChevronRight size={20} />
          </button>
        )}

        {activeSlideIndex > 0 && (
          <div className="absolute top-0 left-0 z-10 w-14 h-full md:w-32 bg-gradient-to-r from-white dark:from-slate-800" />
        )}

        <div className="absolute top-0 right-0 z-10 h-full w-14 md:w-32 bg-gradient-to-l from-white dark:from-slate-800" />
      </Swiper>
    </div>
  );
};
export default BooksList;
