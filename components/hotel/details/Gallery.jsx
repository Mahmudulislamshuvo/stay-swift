import Image from "next/image";

const Gallery = ({ gallery }) => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 imageshowCase">
        <Image src={gallery?.[0]} alt="" width={500} height={500} />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
          {gallery?.slice(1).map((image, i) => (
            <Image
              key={i}
              src={image}
              alt={`Gallery image ${i + 1}`}
              width={500}
              height={500}
              className="object-cover w-full h-full p-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
