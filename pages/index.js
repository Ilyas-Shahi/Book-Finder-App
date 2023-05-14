import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import BooksList from '@/components/BooksList';
import CategorySlider from '@/components/CategorySlider';
import Header from '@/components/layout/Header';

const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

export default function Home({
  bestsellers,
  newReleases,
  fiction,
  nonfiction,
  selfHelp,
  business,
}) {
  const [dynamicCategory, setDynamicCategory] = useState();
  const [searchInp, setSearchInp] = useState();
  const [dynamicSection, setDynamicSection] = useState();
  // const [dynamicSectionData, setDynamicSectionData] = useState();

  const { query } = useRouter();

  const handleDynamicCategory = (sub) => {
    // setDynamicSection();
    setDynamicCategory(sub);
  };

  const handleSearch = (inp) => {
    setSearchInp(inp);
  };

  useEffect(() => {
    setDynamicSection();

    const dynamicCategoryId = dynamicCategory
      ?.toLocaleLowerCase()
      .split(' ')
      .join('');

    const fetchDynamicCategory = async () => {
      const res = await fetch(
        `${baseUrl}subject:${dynamicCategoryId}${
          query[dynamicCategoryId]
            ? `&maxResults=${query[dynamicCategoryId]}`
            : ''
        }`
      );
      const data = await res.json();
      // setDynamicSectionData(data);
      setDynamicSection((prev) => ({
        ...prev,
        title: dynamicCategory,
        data,
      }));
    };

    fetchDynamicCategory();
  }, [dynamicCategory, query]);

  console.log(dynamicSection);
  // console.log(dynamicSectionData);

  // useEffect(() => {
  //   // const dynamicSecId = dynamicSec?.toLocaleLowerCase().split(' ').join('');

  //   const fetchSearch = async () => {
  //     const res = await fetch(`${baseUrl}${searchInp}`);
  //     const data = await res.json();
  //     setDynamicSection({ ...dynamicSection, data });
  //   };

  //   fetchSearch();
  // }, [searchInp, dynamicSection]);

  return (
    <>
      <Head>
        <title>Book Finder</title>
        <meta name="description" content="Book Finder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="scroll-pt-28">
        <Header handleSearch={handleSearch} />

        <CategorySlider handleDynamicCategory={handleDynamicCategory} />

        {(dynamicCategory || searchInp) && (
          <div className="mb-20">
            {dynamicSection ? (
              <BooksList
                data={dynamicSection?.data}
                title={dynamicSection?.title}
                dynamic={true}
              />
            ) : (
              <div className="flex flex-col items-center bg-slate-600 p-4">
                <BiLoaderAlt size={28} className="animate-spin" />

                <p className="text-xl">Loading</p>
              </div>
            )}
          </div>
        )}

        <BooksList data={bestsellers} title={'Bestsellers'} />
        <BooksList data={newReleases} title={'New releases'} />
        <BooksList data={fiction} title={'Fiction'} />
        <BooksList data={nonfiction} title={'Nonfiction'} />
        <BooksList data={selfHelp} title={'Self help'} />
        <BooksList data={business} title={'Business'} />
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const [bestsellers, newReleases, fiction, nonfiction, selfHelp, business] =
    await Promise.all([
      fetch(
        `${baseUrl}subject:fiction+nonfiction&orderBy=relevance${
          query.bestsellers ? `&maxResults=${query.bestsellers}` : ''
        }`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}subject:fiction+nonfiction&orderBy=newest${
          query.newreleases ? `&maxResults=${query.newreleases}` : ''
        }`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}subject:fiction&orderBy=relevance${
          query.fiction ? `&maxResults=${query.fiction}` : ''
        }`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}subject:nonfiction&orderBy=relevance${
          query.nonfiction ? `&maxResults=${query.nonfiction}` : ''
        }`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}subject:self-help&orderBy=relevance${
          query.selfhelp ? `&maxResults=${query.selfhelp}` : ''
        }`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}subject:business&orderBy=relevance${
          query.business ? `&maxResults=${query.business}` : ''
        }`
      ).then((res) => res.json()),
    ]);

  return {
    props: {
      bestsellers,
      newReleases,
      fiction,
      nonfiction,
      selfHelp,
      business,
    },
  };
}
