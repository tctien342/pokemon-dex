import { usePokeDetail } from "@/hooks/queries/use-poke-detail";
import Image from "next/image";
import { useState } from "react";
import { LoadingSVG } from "./icons/loading-svg";

export const PokeCard: IComponent<{
  name: string;
}> = ({ name }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data, isLoading, isError } = usePokeDetail(name);

  const image = data?.sprites.other.showdown.front_default;

  const handleOnLoad = () => {
    setImageLoaded(true);
  };

  if (isError) {
    return (
      <div className="w-full flex flex-col">
        <div className="flex w-full aspect-square relative justify-center items-center">
          <code className="mx-auto py-1 capitalize text-center text-red-500">
            {name} not found
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full aspect-square relative justify-center items-center">
        {(!imageLoaded || isLoading) && (
          <LoadingSVG className="absolute w-10 h-10 m-auto" />
        )}
        {!!image && (
          <Image
            alt={`Image of pokemon ${name}`}
            src={image}
            loading="lazy"
            className="m-auto w-[96px] h-[96px] object-contain"
            width={96}
            height={96}
            // GIF images are not supported by next/image
            unoptimized
            onLoad={handleOnLoad}
          />
        )}
      </div>
      <code className="mx-auto py-1 capitalize text-center">{name}</code>
    </div>
  );
};
