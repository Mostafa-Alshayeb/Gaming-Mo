"use client";

import { getUser } from "@/app/actions/auth";
import { getGamesByIds, searchGames } from "@/app/api/api";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
  return { user, isLoading };
};
export const useGetGamesWithIds = (ids: string[]) => {
  const { data: games, isLoading } = useQuery({
    queryKey: [`games-${ids}`],
    queryFn: () => getGamesByIds(ids),
  });
  return { games, isLoading };
};

export const useGetGames = ({
  query = "",
  page = 1,
  pageSize = 22,
  filters = [],
  isDisabled = false,
}: {
  query?: string;
  page?: number;
  pageSize?: number;
  filters?: any[];
  isDisabled?: boolean;
}) => {
  const isQueryEmpty = query.trim() === "";

  const { data: games, isLoading } = useQuery({
    queryKey: [`games-${page}-${JSON.stringify(filters)}-${query}`],
    queryFn: async () => {
      const res = await searchGames(query, page, filters, pageSize);
      console.log("SEARCH RESULT:", res);
      return res;
    },
    enabled: !isDisabled,
  });

  return { games, isLoading };
};
