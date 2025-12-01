import { getGame } from "@/app/api/api";
import GamesSlider from "@/app/components/nav/GamesSlider";
import SwiperCard from "@/app/components/nav/SwiperCard";

import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const game = await getGame(id);
  console.log(game);
  const {
    screenshots,
    data,
    similar,
  }: { screenshots: any[]; data: Game; similar: any[] } = game;
  console.log(data.ratings);
  return (
    <div className=" mt-10">
      <div>
        <div className=" col-span-4 flex flex-col gap-2">
          <h1 className=" text-2xl text-white font-semibold">{data.name}</h1>
          <div className=" text-white font-semibold text-base">
            Rating count : {data.ratings_count}
          </div>
          <SwiperCard
            slidesPerView={1}
            className=" h-full"
            item={[
              ...screenshots.results,
              data.background_image,
              data.background_image_additional,
            ].map((screenshot) => {
              return {
                card: (
                  <div className=" rounded-xl overflow-hidden h-[36rem] w-full relative">
                    <Image
                      src={screenshot.image || screenshot}
                      alt={data.name}
                      fill
                      className=" object-cover"
                    />
                  </div>
                ),
                src: screenshot.image || screenshot,
              };
            })}
            paginationImages
          />
          <p className=" mt-10 col-span-2 text-white  text-base">
            {data.description_raw}
          </p>
        </div>
      </div>{" "}
      <GamesSlider title="Similar Games" games={similar.results} />
    </div>
  );
};

export default page;
