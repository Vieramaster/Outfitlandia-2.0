import { useState } from "react";
import { Card } from "../cards/Card";
import { LoaderIcon } from "../../icons/LoaderIcon";
interface ClothesButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
  name: string;
}

export const ClothesButton = ({
  image,
  name,
  ...props
}: ClothesButtonProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Card>
      <button
        className=" size-full bg-cards
                   flex justify-center 
                   items-center cursor-pointer 
                   select-none drag-none neumorphic
                   rounded-lg border
                   border-background
                   hover:border-detail
                   duration-300
                   relative
                  "
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
    </Card>
  );
};
