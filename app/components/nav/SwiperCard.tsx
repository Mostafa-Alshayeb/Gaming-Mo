"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import type SwiperType from "swiper";

interface SwiperCardProps {
  item: { id?: number | string; card: ReactNode; src?: string }[];
  paginationImages?: boolean;
  className?: string;
  slidesPerView?: number;
  autoplay?: number;
}

export default function SwiperCard({
  item = [],
  paginationImages,
  className,
  slidesPerView,
  autoplay,
}: SwiperCardProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 3.7));
    }, 110);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!swiper) return;

    const handleSlideChange = () => setProgress(0);
    swiper.on("slideChange", handleSlideChange);

    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, [swiper]);

  return (
    <div className="flex flex-col gap-4 ">
      <Swiper
        autoplay={{ delay: autoplay || 3000 }}
        loop={true}
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={slidesPerView || 1}
        onSwiper={(instance) => setSwiper(instance)}
        className={`w-full ${className || "h-96"}`}
      >
        {item.map(({ card, id }, index) => (
          <SwiperSlide key={id ?? index}>{card}</SwiperSlide>
        ))}
      </Swiper>

      {paginationImages && (
        <div className="flex items-center gap-4 relative z-10">
          {item.map(({ src }, i) => (
            <div
              key={i}
              onClick={() => swiper?.slideToLoop(i)}
              className={`relative h-40 w-full max-w-lg cursor-pointer rounded-xl overflow-hidden
          transition-all duration-200
         hover:-translate-y-5 hover:shadow-xl hover:opacity-100
          ${
            swiper?.realIndex === i
              ? "shadow-md border-2 border-cyan-400 opacity-90 -translate-y-5"
              : ""
          }
        `}
              style={{ zIndex: swiper?.realIndex === i ? 2 : 1 }}
            >
              {swiper?.realIndex === i && (
                <div
                  style={{ width: `${progress}%` }}
                  className="absolute inset-0  h-full z-10 bg-gray-600 opacity-50 transition-all duration-200"
                />
              )}
              {src && (
                <Image
                  alt={`thumbnail ${i + 1}`}
                  src={src}
                  fill
                  className={` object-cover object-top`}
                  priority={i === 0}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
