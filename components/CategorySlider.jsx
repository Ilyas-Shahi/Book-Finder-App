import 'swiper/css';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';

const categories = [
  'Bestsellers',
  'New Releases',
  'Fiction',
  'Nonfiction',
  'Self Help',
  'Business',
  'Mystery',
  'Health',
  'Art',
  'General',
  'History',
  'Investing',
  'Mind',
  'Science',
  'Thrillers',
  'Technology',
];

const CategorySlider = ({ handleDynamicSec }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperRef = useRef();

  return (
    <div className="sticky top-0 z-50 px-4 py-2 bg-white md:px-6 md:py-3 dark:bg-slate-800">
      <Swiper
        slidesPerView={3}
        spaceBetween={8}
        navigation={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          520: {
            slidesPerView: 4,
          },
          670: {
            slidesPerView: 6,
          },
          1020: {
            slidesPerView: 8,
          },
        }}
        className="relative !pr-24 mySwiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Link
              href={
                index > 5
                  ? '#dynamicSec'
                  : `#${category.toLocaleLowerCase().split(' ').join('')}`
              }
            >
              <div
                onClick={() => {
                  index > 5 && handleDynamicSec(category);
                }}
                className="p-1 text-center bg-gray-100 rounded-full dark:bg-slate-700 cursor-pointer"
              >
                {category}
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {/* Nav buttons */}
        {activeSlideIndex > 0 && (
          <button
            className="absolute top-0 left-0 z-20 h-full"
            onClick={() => {
              swiperRef?.current.slidePrev();
              setActiveSlideIndex(swiperRef?.current?.activeIndex);
            }}
          >
            <BsChevronLeft size={20} />
          </button>
        )}

        {!swiperRef?.current?.isEnd && (
          <button
            className="absolute top-0 right-0 z-20 h-full"
            onClick={() => {
              swiperRef?.current.slideNext();
              setActiveSlideIndex(swiperRef?.current?.activeIndex);
            }}
          >
            <BsChevronRight size={20} />
          </button>
        )}

        {activeSlideIndex > 0 && (
          <div className="absolute top-0 left-0 z-10 h-full w-28 md:w-60 bg-gradient-to-r from-white dark:from-slate-800" />
        )}

        <div className="absolute top-0 right-0 z-10 h-full w-28 md:w-60 bg-gradient-to-l from-white dark:from-slate-800" />
      </Swiper>
    </div>
  );
};
export default CategorySlider;
