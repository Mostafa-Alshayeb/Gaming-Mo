import { getGame } from "@/app/api/api";
import GamesSlider from "@/app/components/nav/GamesSlider";
import SwiperCard from "@/app/components/nav/SwiperCard";
import Image from "next/image";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await Promise.resolve(params); // ✅ هيك params بصير Promise
  const game = await getGame(id);
  console.log(game);
  const {
    screenshots,
    data,
    similar,
  }: {
    screenshots: { results: any[] };
    data: Game;
    similar: { results: any[] };
  } = game;
  console.log(data.ratings);
  console.log("SCREENSHOTS", screenshots);

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
            className="h-full"
            item={[
              // عناصر background_image و background_image_additional
              data.background_image,
              data.background_image_additional,
              ...screenshots.results.map((screenshot) => screenshot.image),
            ].map((src, index) => ({
              id: index,
              card: (
                <div className="rounded-xl overflow-hidden h-[36rem] w-full relative">
                  <Image
                    src={src}
                    alt={data.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ),
              src,
            }))}
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
