import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import GarageCard from '../../components/GarageCard';
import useNFT from '../../hooks/useNFT';

const Garage: NextPage = () => {
  const { fetchMintedNFTs } = useNFT();

  useEffect(async () => {
    await fetchMintedNFTs();
  }, []);

  return (
    <div className="text-center text-red-700">
      <Head>
        <title>Garage | Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex">
        <div className="w-1/2 p-10">
          <div className="bg-gray w-full h-full rounded-lg">
            <div className="flex">
              <Image
                src={require(`../../public/img/teams/ferrari.png`)}
                width={56}
                height={56}
              />
              <div className="flex flex-col">
                <h1 className="text-white text-base">Mizan Ali</h1>
                <h3 className="text-white text-base">@mizanxali</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-10">
          <div className="grid grid-cols-2 gap-10">
            <GarageCard />
            <GarageCard />
            <GarageCard />
            <GarageCard />
            <GarageCard />
            <GarageCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garage;
