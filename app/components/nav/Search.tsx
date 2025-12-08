"use client";

import { useGetGames } from "@/lib/QueryFunctions";
import { AnimatePresence } from "framer-motion";
import { SearchIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import MotionItem from "../defaults/MotionItem";
import { Input } from "@/components/ui/input";

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
      className="w-full flex relative group items-center gap-2 justify-between px-4 border border-input rounded-xl md:w-[40%] bg-main"
    >
      <input
        value={query}
        onChange={(e) => {
          setActive(true);
          setQuery(e.target.value);
        }}
        placeholder="Search games..."
        className="py-2 text-base w-full bg-transparent text-gray-50 border-none outline-none placeholder:text-gray-400  "
      />

      <div className="flex items-center gap-2">
        <XIcon
          className="cursor-pointer"
          onClick={() => {
            setQuery("");
            setSearch("");
          }}
        />
        <SearchIcon className="w-5 h-5 cursor-pointer group-hover:text-cyan-400 duration-150" />
      </div>

      <AnimatePresence>
        {active && (
          <MotionItem
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "auto", opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute w-full top-full z-50 bg-[#222425] rounded-2xl shadow-sm max-h-[40vh] overflow-y-scroll left-0"
          >
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="space-y-2 flex items-start gap-2 px-4 py-2"
                >
                  <Skeleton className="h-20 w-[40%] rounded-2xl" />
                  <div className="flex flex-col gap-3">
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))
            ) : games?.data?.results?.length > 0 ? (
              games?.data.results.map((game: any) => (
                <div
                  key={game.id}
                  className="hover:bg-cyan-600 duration-200 flex flex-col gap-2 px-4 py-2"
                >
                  <Link
                    href={`/game/${game.id}`}
                    className="flex gap-3 items-start w-full h-full"
                    onClick={() => setActive(false)}
                  >
                    <div className="rounded-2xl relative overflow-hidden w-[40%] bg-neutral-900 h-20">
                      <Image
                        src={game.background_image || fallbackImg}
                        alt={game.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h1 className="font-semibold text-white">{game.name}</h1>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-white py-4">
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
