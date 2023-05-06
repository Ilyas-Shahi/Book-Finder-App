import Image from 'next/image';
import { useRef, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';

const BooksList = ({ data, title }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperRef = useRef();

  return (
    <div className="px-5 my-10">
      <h2 className="mb-6 text-3xl">{title}</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          660: {
            slidesPerView: 2,
          },
          880: {
            slidesPerView: 3,
          },
          1080: {
            slidesPerView: 4,
          },
        }}
        className="relative !pr-24 mySwiper"
      >
        {data?.items?.map((book, index) => (
          <SwiperSlide key={index} className="pt-14">
            <div className="p-3 bg-gray-100 rounded-lg dark:bg-slate-700">
              <div className="flex gap-3">
                <Image
                  src={book.volumeInfo.imageLinks.thumbnail}
                  width={100}
                  height={100}
                  alt="Book Cover"
                  className="z-10 object-cover -mt-16 rounded-md h-36"
                />

                <div>
                  {book.volumeInfo.authors.slice(0, 2).map((author, index) => (
                    <p key={index} className="text-sm">
                      {author}
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

              <h3 className="mt-4 mb-2 text-lg">
                {book.volumeInfo.title.length > 32
                  ? `${book.volumeInfo.title.substring(0, 24)}...`
                  : book.volumeInfo.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}

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

        <button
          className="absolute top-0 right-0 z-20 h-full"
          onClick={() => {
            swiperRef?.current.slideNext();
            setActiveSlideIndex(swiperRef?.current?.activeIndex);
          }}
        >
          <BsChevronRight size={20} />
        </button>

        {activeSlideIndex > 0 && (
          <div className="absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-white dark:from-slate-800" />
        )}

        <div className="absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-white dark:from-slate-800" />
      </Swiper>
    </div>
  );
};
export default BooksList;
