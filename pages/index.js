import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import BooksList from '@/components/BooksList';
import CategorySlider from '@/components/CategorySlider';

const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:';

export default function Home({
  bestsellers,
  newReleases,
  fiction,
  nonfiction,
  selfHelp,
  business,
}) {
  const [dynamicSec, setDynamicSec] = useState();
  const [dynamicData, setDynamicData] = useState();

  console.log(dynamicSec);

  const handleDynamicSec = (sub) => {
    // setDynamicData();
    setDynamicSec(sub);
  };

  useEffect(() => {
    const fetchDynamicSec = async () => {
      const res = await fetch(
        baseUrl + dynamicSec.toLocaleLowerCase().split(' ').join('')
      );
      const data = await res.json();
      setDynamicData(data);
    };

    if (dynamicSec) {
      fetchDynamicSec();
    }
  }, [dynamicSec]);

  console.log(dynamicData);

  return (
    <>
      <Head>
        <title>Book Finder</title>
        <meta name="description" content="Book Finder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="scroll-pt-28">
        <CategorySlider handleDynamicSec={handleDynamicSec} />

        {dynamicSec && (
          <BooksList data={dynamicData} title={dynamicSec} dynamic={true} />
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
        `${baseUrl}fiction+nonfiction&orderBy=relevance${
          query.bestsellers ? `&maxResults=${query.bestsellers}` : ''
        }`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}fiction+nonfiction&orderBy=newest${
          query.newreleases ? `&maxResults=${query.newreleases}` : ''
        }`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}fiction&orderBy=relevance${
          query.fiction ? `&maxResults=${query.fiction}` : ''
        }`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}nonfiction&orderBy=relevance${
          query.nonfiction ? `&maxResults=${query.nonfiction}` : ''
        }`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}self-help&orderBy=relevance${
          query.selfhelp ? `&maxResults=${query.selfhelp}` : ''
        }`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}business&orderBy=relevance${
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
