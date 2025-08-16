import { useState } from "react";
import { Card } from "../cards/Card";
import { LoaderIcon } from "../../icons/LoaderIcon";
interface ClothesButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
  name: string;
  isNameVisible: boolean;
}

export const ClothesButton = ({
  image,
  name,
  isNameVisible,
  ...props
}: ClothesButtonProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Card isDescription={isNameVisible}>
        <button
          className={`
                   ${
                     isNameVisible
                       ? "w-full h-[calc(100%_-_2rem)]"
                       : "size-full"
                   }
                   bg-cards
                   flex justify-center 
                   items-center cursor-pointer 
                   select-none drag-none neumorphic
                   rounded-lg border
                   border-background
                   hover:border-detail
                   duration-300
                   relative
            `}
          {...props}
          aria-label={`select ${name}`}
          title={`select ${name}`}
        >
          {!loaded && <LoaderIcon className="absolute z-50" />}
          <img
            src={image}
            alt={name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            draggable={false}
            className="object-cover w-[90%] "
          />
        </button>
        {isNameVisible && (
          <p className="text-2xl text-center text-off-white">{name}</p>
        )}
      </Card>
    </>
  );
};
