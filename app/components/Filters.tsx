"use client";
import { useState } from "react";
import GridContainer from "@/app/components/defaults/GridContainer";
import { useGetGames } from "@/lib/QueryFunctions";
import GameSkeleton from "./GameSkeleton";
import GameCard from "./GameCard";
import Empty from "./defaults/Empty";
import { PaginationCustom } from "./PaginationCustom";

const Filters = ({ genres }: { genres: any[] }) => {
  const [page, setPage] = useState(1);
  const [activeGenres, setActiveGenres] = useState<number[]>([]);

  const { games, isLoading } = useGetGames({
    query: "games",
    page,
    filters:
      activeGenres.length > 0
        ? [{ filterName: "genres", option: activeGenres?.join(",") }]
        : [],
  });

  const totalPages = Math.ceil(games?.data.count / 21);

  return (
    <GridContainer className="gap-5 relative" cols={12}>
      <div className="col-span-12 lg:col-span-2 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
        <div className="flex flex-wrap lg:flex-col gap-3 bg-main py-4 px-4 sm:px-6 lg:px-8 rounded-2xl">
          {genres.map((genre: any) => (
            <button
              key={genre.id}
              onClick={() => {
                activeGenres.includes(genre.id)
                  ? setActiveGenres(
                      activeGenres.filter((id) => id !== genre.id)
                    )
                  : setActiveGenres([...activeGenres, genre.id]);
              }}
              className={`text-base font-semibold text-white rounded-xl p-2 hover:cursor-pointer transition-colors duration-200 ${
                activeGenres.includes(genre.id)
                  ? "bg-cyan-400"
                  : "bg-neutral-800"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <GridContainer cols={2} className="col-span-12 lg:col-span-10 gap-3">
        {isLoading ? (
          <GameSkeleton number={22} />
        ) : games?.data.results.length > 0 ? (
          games?.data.results.map((game: Game) => (
            <GameCard key={game.id} screenBig={false} wishlist game={game} />
          ))
        ) : (
          <Empty message="Sorry, no games found in this page" />
        )}
      </GridContainer>

      <div className="col-span-12 mt-4">
        <PaginationCustom setPage={setPage} page={page} count={totalPages} />
      </div>
    </GridContainer>
  );
};

export default Filters;
