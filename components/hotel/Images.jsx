"use client";

import Image from "next/image";
import { useState } from "react";
import demoImg from "../../public/hero-bg.jpg";
import Link from "next/link";

const Images = ({ hotel }) => {
  const [imgSrc, setImgSrc] = useState(hotel.thumbNailUrl);

  return (
    <>
      <Link href={`/hotels/${hotel.id}`}>
        <Image
          src={imgSrc}
          className="max-h-[162px] max-w-[240px] object-cover"
          alt={hotel.name}
          width={240}
          height={162}
          onError={() => {
            setImgSrc(demoImg);
          }}
        />
      </Link>
    </>
  );
};

export default Images;
