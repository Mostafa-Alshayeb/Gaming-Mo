"use client";

import { useGetGames } from "@/lib/QueryFunctions";
import { AnimatePresence } from "framer-motion";
import { SearchIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import MotionItem from "../defaults/MotionItem";

const Search = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const outsideRef = useRef<HTMLDivElement | null>(null);

  const { games, isLoading } = useGetGames({
    query: search,
    isDisabled: search === "",
  });

  useEffect(() => {
    const handler = (e: any) => {
      if (outsideRef.current && !outsideRef.current.contains(e.target)) {
        setActive(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setSearch(query), 500);
    return () => clearTimeout(t);
  }, [query]);

  const fallbackImg = "/fallback.png";

  return (
    <div
      ref={outsideRef}
      className={
        "relative w-full flex items-center gap-2 px-3 py-2 border border-input rounded-xl bg-main md:w-[60%] lg:w-[40%]"
      }
    >
      <input
        value={query}
        onChange={(e) => {
          setActive(true);
          setQuery(e.target.value);
        }}
        placeholder="Search games..."
        className="w-full bg-transparent text-gray-50 text-base py-2 px-2 outline-none placeholder:text-gray-400"
      />

      <div className="flex items-center gap-2">
        <XIcon
          className="cursor-pointer w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors"
          onClick={() => {
            setQuery("");
            setSearch("");
          }}
        />
        <SearchIcon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 duration-150" />
      </div>

      <AnimatePresence>
        {active && (
          <MotionItem
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "auto", opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 w-full z-50 bg-[#222425] rounded-2xl shadow-sm max-h-[50vh] overflow-y-auto mt-2"
          >
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 px-4 py-2 space-y-2"
                >
                  <Skeleton className="h-20 w-[40%] rounded-2xl" />
                  <div className="flex flex-col gap-2 w-[60%]">
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                </div>
              ))
            ) : games?.data?.results?.length > 0 ? (
              games?.data.results.map((game: any) => (
                <div
                  key={game.id}
                  className="flex flex-col gap-2 px-4 py-2 hover:bg-cyan-600 transition-colors duration-200"
                >
                  <Link
                    href={`/game/${game.id}`}
                    className="flex gap-3 items-start w-full h-full"
                    onClick={() => setActive(false)}
                  >
                    <div className="relative overflow-hidden w-[40%] h-20 rounded-2xl bg-neutral-900 flex-shrink-0">
                      <Image
                        src={game.background_image || fallbackImg}
                        alt={game.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h1 className="font-semibold text-white text-sm sm:text-base truncate">
                      {game.name}
                    </h1>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-white py-4 text-sm sm:text-base">
                No games found with "{search}"
              </p>
            )}
          </MotionItem>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
