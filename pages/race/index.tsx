import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Countdown from '../../components/Countdown';
import Navbar from '../../components/Navbar';
import DRIVERS from '../../data/drivers.json';
import RACE from '../../data/race.json';
import TEAMS from '../../data/teams.json';
import withAuth from '../../hoc/withAuth';
import useNFT from '../../hooks/useNFT';
import useUser from '../../hooks/useUser';
import { RootState } from '../../store/rootReducer';

const Race: NextPage = () => {
  const [team, setTeam] = useState('mclaren');

  const { garage } = useSelector((state: RootState) => state.garage);
  const { address, authenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { user } = useSelector((state: RootState) => state.user);

  const { updateNFTPoints } = useNFT();
  const { getUser } = useUser();

  async function backDriver(driver: string, itemId: number) {
    const response = await fetch(
      `/api/wager?address=${address}&driver=${driver}&itemId=${itemId}`
    );
    const data = await response.json();
    console.log(data);
    await getUser(address);
  }

  async function claimPoints() {
    //fetch points to scored from F1 race standings and update garage points on firebase
    const response = await fetch(`/api/points?address=${address}`);
    const data = await response.json();
    console.log(data);
    const pointsScored = data.points;

    //update token uri
    await updateNFTPoints(parseInt(data.itemId), pointsScored);

    //refetch user
    await getUser(address);
  }

  return (
    <div className="h-screen text-center text-red-700">
      <Head>
        <title>Race | Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <div className="flex-1 flex flex-col">
        <h1 className="text-white text-3xl font-semibold mt-4">
          Upcoming Race
        </h1>
        <div className="mx-auto h-0.5 w-80 bg-gradient-to-r from-redOne to-redTwo mt-1 mb-3"></div>

        <div
          className="bg-gray my-4 mx-auto w-3/4 flex-1 rounded-xl flex h-full"
          style={{ boxShadow: '0px -3px 86px 0px #00000080' }}
        >
          <div className="w-1/3 bg-gradient-to-b from-redOne to-redTwo rounded-lg flex flex-col items-start py-8 px-6 text-left">
            <div className="flex w-full justify-between items-center">
              <div>
                <h3 className="text-lg text-black font-semibold">Grand Prix</h3>
                <h4 className="text-lg text-white font-bold mt-1">
                  {RACE.name}
                </h4>
              </div>
              <Image
                src={`https://ipfs.infura.io/ipfs/${RACE.flag}`}
                width={106}
                height={53}
              />
            </div>
            <h3 className="text-lg text-black font-semibold mt-2">Track</h3>
            <h4 className="text-lg text-white font-bold mt-1">{RACE.track}</h4>
            <h3 className="text-lg text-black font-semibold mt-2">Date</h3>
            <h4 className="text-lg text-white font-bold mt-1">{RACE.date}</h4>
            <h3 className="text-lg text-black font-semibold mt-2 mb-3">
              Begins in
            </h3>
            <Countdown timestamp={RACE.timestamp} />
            <div className="flex items-center justify-center w-full mt-3">
              <Image
                src={`https://ipfs.infura.io/ipfs/${RACE.circuit}`}
                width={377}
                height={270}
              />
            </div>
          </div>
          {user.wager ? (
            <div className="p-14 w-full flex-1 flex items-center justify-center">
              <div>
                <Image
                  src={require(`../../public/img/drivers/${user.wager.driver}.png`)}
                  width={350}
                  height={280}
                />
                <p className="my-3 text-white font-semibold text-xl">
                  Congratulations! You backed{' '}
                  <span className="capitalize">
                    {user.wager.driver.replace('-', ' ')}
                  </span>{' '}
                  with your{' '}
                  <span>
                    {
                      garage.find(
                        (item: any) => item.itemId == user.wager.itemId
                      ).name
                    }
                  </span>{' '}
                  for the <span>{RACE.name}</span>.
                </p>
                <button
                  onClick={() => claimPoints()}
                  className="border-2 border-black my-2 bg-gradient-to-r from-redOne to-redTwo text-white font-semibold text-lg py-2 px-10 rounded-xl"
                >
                  Claim
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full p-6 flex-1">
              <div className="">
                <h1 className="text-2xl text-white font-bold my-2 text-left">
                  Teams
                </h1>
                <div className="mt-5 flex w-full justify-between">
                  {TEAMS.map((team) => {
                    return (
                      <div
                        key={team.key}
                        onClick={() => setTeam(team.key)}
                        className="cursor-pointer text-white"
                      >
                        <Image
                          src={require(`../../public/img/teams/${team.key}.png`)}
                          width={56}
                          height={56}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-7">
                <h1 className="text-2xl text-white font-bold my-2 text-left">
                  Drivers
                </h1>
                <div className="mt-5 flex">
                  {/* @ts-ignore */}
                  {DRIVERS[`${team}`].map((driver, i) => {
                    return (
                      <div
                        key={driver.key}
                        className={`w-full ${
                          i === 0 && 'border-r-2 border-gray-mute'
                        }`}
                      >
                        <Image
                          src={require(`../../public/img/drivers/${driver.key}.png`)}
                          width={249}
                          height={200}
                        />
                        <h3 className="my-3 text-lg font-semibold text-white">
                          {driver.name}
                        </h3>
                        <button
                          onClick={() => backDriver(driver.key, 1)}
                          // onClick={() => claimPoints()}
                          className="border-2 border-black my-1 bg-gradient-to-r from-redOne to-redTwo text-white font-semibold text-base py-2 px-10 rounded-xl"
                        >
                          Support
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Race);
