import type { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import { RootState } from '../../store/rootReducer';

const Leaderboard: NextPage = () => {
  const { leaderboard } = useSelector((state: RootState) => state.leaderboard);

  return (
    <div className="h-screen text-center text-red-700">
      <Head>
        <title>Leaderboard | Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
      </Head>

      <Navbar />
      <div className="flex flex-col">
        <h1 className="text-white text-3xl font-semibold mt-4">Leaderboard</h1>
        <div className="mx-auto h-0.5 w-80 bg-gradient-to-r from-redOne to-redTwo mt-1 mb-4"></div>

        <div
          className="bg-gray grid grid-cols-4 gap-3 w-1/2 mx-auto px-10 py-7 rounded-lg text-center mt-5"
          style={{ boxShadow: '0px -3px 86px 0px #00000080' }}
        >
          <h3 className=" text-white text-xl font-bold">Rank</h3>
          <h3 className=" text-white text-xl font-bold">Username</h3>
          <h3 className=" text-white text-xl font-bold">Wallet Address</h3>
          <h3 className="text-white text-xl font-bold">Points</h3>
          <div className="mx-auto h-0.5 w-full bg-gradient-to-r from-redOne to-redTwo col-span-4 mt-2 mb-4"></div>
          {leaderboard && leaderboard.length > 0 ? (
            leaderboard.map((user: any, i: number) => (
              <>
                <h3 className="text-white text-base">{i + 1}</h3>
                <h3 className="text-white text-base">{user.username}</h3>
                <h3 className="text-white text-base">
                  {`${user.address.substring(0, 5)}...${user.address.substring(
                    user.address.length - 4
                  )}`}
                </h3>
                <h3 className="text-white text-base">{user.points}</h3>
              </>
            ))
          ) : (
            <h1 className="text-center my-10 text-white text-sm">
              No leaderboard data to show
            </h1>
          )}{' '}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
