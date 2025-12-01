import React from "react";
import SwiperCard from "./SwiperCard";
import CardInfo from "./CardInfo";
import Image from "next/image";

const HeroSlider = () => {
  return (
    <div className="mt-8 z-0">
      <SwiperCard
        paginationImages
        className=" h-[500px] z-0"
        item={[
          {
            card: (
              <section className="w-full h-full  overflow-hidden rounded-2xl relative flex items-center justify-center">
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className=" object-cover object-center
 absolute w-full h-full inset-0"
                >
                  <source src="/spidervideo.mp4" type="video/mp4" />
                </video>
                <CardInfo
                  image="/news1title.webp"
                  title="BE GREATER TOGETHER"
                  desc="Peter Parker & Miles Morales return for an exciting new adventure in the acclaimed Marvel’s Spider-Man franchise, out October 20 for PS5."
                />
              </section>
            ),
            src: "/videoframe_3492.png",
          },
          {
            card: (
              <section className="w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl relative flex items-center justify-center">
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className=" object-cover object-top
 absolute w-full h-full inset-0"
                >
                  <source
                    src="/call-of-duty-black-ops-6-animated-hero-mobile-01-en-22may24.mp4"
                    type="video/mp4"
                  />
                </video>
                <CardInfo
                  image="/call-of-duty-black-ops-6-logo-01-en-21may24.webp"
                  title="Call of Duty: Black Ops 6"
                  desc="Last chance to pre-order and get access to additional premium content. Call of Duty®: Black Ops 6 launches on October 25th"
                />
              </section>
            ),
            src: "/videoframe_2145.png",
          },
          {
            card: (
              <section className="w-full h-full  overflow-hidden rounded-2xl relative flex items-center justify-center">
                <Image
                  src={
                    "/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.webp"
                  }
                  fill
                  alt="dragon ball"
                  className=" object-cover object-center"
                />
                <CardInfo
                  image="/Dragon-Ball-Sparking-Zero-logo-01-03oct24.webp"
                  title="Dragon Ball: Sparking Zero"
                  desc="A legendary series has returned. Reach new levels of power in Dragon Ball: Sparking! Zero, out now on PS5"
                />
              </section>
            ),

            src: "/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.webp",
          },
          {
            card: (
              <section className="w-full h-full  overflow-hidden rounded-2xl relative flex items-center justify-center">
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className=" object-cover object-top
 absolute w-full h-full inset-0"
                >
                  <source
                    src="/cyberpunk-2077-phantom-liberty-video-hero-01-en-11sep23.mp4"
                    type="video/mp4"
                  />
                </video>
                <CardInfo
                  image="/iconcyber.webp"
                  title="Freedom Always Comes At A Price…"
                  desc="As cyber-enhanced mercenary V, join secret agent Solomon Reed to unravel a web of sinister political machinations."
                />
              </section>
            ),
            src: "/videoframe_4910.png",
          },
        ]}
      />
    </div>
  );
};

export default HeroSlider;
