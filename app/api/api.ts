// import { APIURL, KEY } from "../constants/index";

// const fetchFn = async (url: string, cache?: number) => {
//   try {
//     const res = await fetch(url, {
//       next: { revalidate: cache || 3600 },
//     });
//     console.log("FETCHING:", url);

//     if (!res.ok) {
//       console.error("❌ Fetch Error:", res.status, res.statusText, url);
//       return null;
//     }

//     return await res.json();
//   } catch (err) {
//     console.error("❌ Network Error:", err, url);
//     return null;
//   }
// };

// export const searchGames = async function (
//   query?: string,
//   page = 1,
//   filters?: { filterName: string; option: string }[],
//   page_size = 20,
//   cache: number = 0
// ) {
//   const filterStr = filters
//     ?.map((f) => `${f.filterName}=${f.option}`)
//     .join("&");
//   const url = `${APIURL}games?search=${query}&page_size=${page_size}&page=${page}${
//     filterStr ? "&" + filterStr : ""
//   }&key=${KEY}`;

//   const data = await fetchFn(url, cache);

//   if (!data) throw new Error("No data returned from API or unauthorized");
//   const count = data.count || 0;
//   return { data, count };
// };

// export const getGame = async function (id: string) {
//   try {
//     const data = await fetchFn(`${APIURL}games/${id}?key=${KEY}`); //details
//     const screenshots = await fetchFn(
//       `${APIURL}games/${id}/screenshots?&key=${KEY}`
//     ); //screenshots
//     const similar = await fetchFn(
//       `${APIURL}games/${id}/game-series?key=${KEY}`
//     ); //simimlar
//     return { data, screenshots, similar };
//   } catch (err) {
//     throw err;
//   }
// };
// export const getGameFromgenres = async function (genre = "51") {
//   const data = await fetchFn(
//     `${APIURL}games?genres=${genre}&page_size=15&key=${KEY}`
//   );
//   return data;
// };
// export const gamebyplatforms = async function (
//   id: string,
//   page = 1,
//   page_size = 20
// ) {
//   const data = await fetchFn(
//     `${APIURL}games?platforms=${id}&page_size=${
//       page_size || 40
//     }&page=${page}&key=${KEY}`
//   );
//   return data;
// };
// export const getGamesByIds = async function (ids: string[]) {
//   const data = await Promise.all(ids.map((id) => getGame(id)));
//   return data;
// };

import { APIURL, KEY } from "../constants/index";

// ----------------------------
// GENERIC FETCH FUNCTION
// ----------------------------
const fetchFn = async (url: string, cache?: number) => {
  try {
    console.log("🔵 FETCHING:", url);

    const res = await fetch(url, {
      next: { revalidate: cache || 3600 },
    });

    if (!res.ok) {
      console.error("❌ Fetch Error:", res.status, res.statusText, url);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Network Error:", err, url);
    return null;
  }
};

// ----------------------------
// SEARCH GAMES FUNCTION
// ----------------------------
export const searchGames = async function (
  query: string = "",
  page = 1,
  filters: { filterName: string; option: string }[] = [],
  page_size = 20,
  cache: number = 0
) {
  // 🟦 FIX: don't add empty filters
  const filterStr =
    filters && filters.length > 0
      ? "&" +
        filters
          .map((f) => `${f.filterName}=${encodeURIComponent(f.option)}`)
          .join("&")
      : "";

  const url = `${APIURL}games?search=${encodeURIComponent(
    query
  )}&page_size=${page_size}&page=${page}${filterStr}&key=${KEY}`;

  const data = await fetchFn(url, cache);

  if (!data) {
    throw new Error("API returned null or unauthorized request");
  }

  return {
    data,
    count: data.count ?? 0,
  };
};

// ----------------------------
// GET GAME DETAILS
// ----------------------------
export const getGame = async function (id: string) {
  try {
    const data = await fetchFn(`${APIURL}games/${id}?key=${KEY}`);
    const screenshots = await fetchFn(
      `${APIURL}games/${id}/screenshots?key=${KEY}`
    );
    const similar = await fetchFn(
      `${APIURL}games/${id}/game-series?key=${KEY}`
    );

    return { data, screenshots, similar };
  } catch (err) {
    throw err;
  }
};

// ----------------------------
// GET GAMES BY GENRE
// ----------------------------
export const getGameFromgenres = async function (genre = "51") {
  return await fetchFn(
    `${APIURL}games?genres=${genre}&page_size=15&key=${KEY}`
  );
};

// ----------------------------
// GET GAMES BY PLATFORM
// ----------------------------
export const gamebyplatforms = async function (
  id: string,
  page = 1,
  page_size = 20
) {
  return await fetchFn(
    `${APIURL}games?platforms=${id}&page_size=${
      page_size || 40
    }&page=${page}&key=${KEY}`
  );
};

// ----------------------------
// GET MULTIPLE GAMES BY IDS
// ----------------------------
export const getGamesByIds = async function (ids: string[]) {
  return await Promise.all(ids.map((id) => getGame(id)));
};
