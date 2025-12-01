import Image from "next/image";
import HeroSlider from "../components/nav/HeroSlider";
import { getGamesByIds, searchGames } from "../api/api";
import SwiperCard from "../components/nav/SwiperCard";
import Link from "next/link";
import GamesSlider from "../components/nav/GamesSlider";
import { connect } from "../actions/connet";

export default async function Home() {
  await connect();
  const data = await searchGames("", 2, [], 9);
  const ps5 = await searchGames(
    "",
    1,
    [
      { filterName: "platforms", option: "187" },
      {
        filterName: "ordering",
        option: "-metacritic",
      },
    ],
    10
  );
  const pc = searchGames("", 1, [{ filterName: "platforms", option: "4" }], 10);
  const { results } = data.data;
  const customGames = await getGamesByIds([
    "799265",
    "58550",
    "2462",
    "494384",
    "452642",
    "452634",
  ]);

  return (
    <>
      <HeroSlider />
      <GamesSlider title="Top Games for PS5" games={ps5.data.results} />
      <GamesSlider title="Top PC Games" games={results} />
      <GamesSlider
        title="TPLAYSTATION EXCLUSIVES"
        slidesPerView={2}
        screenBig
        big
        games={customGames.map((game) => game.data)}
      />
      <GamesSlider
        title="Top Games"
        slidesPerView={4}
        games={(await pc).data.results}
      />
    </>
  );
}
