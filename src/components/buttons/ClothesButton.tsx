import {
  CardSize,
  ShoesButtonSize,
  BeltButtonSize,
} from "../../data/ComponentSizes";

const buttonType = {
  normal: `${CardSize} bg-red-500`,
  belt: BeltButtonSize,
  shoes: ShoesButtonSize,
};

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant: "normal" | "belt" | "shoes";
  image: string;
}

export const ClothesButton = ({ variant, image, ...props }: ButtonProps) => {
  const isShoes = variant === "shoes" ? "h-[90%] w-auto " : " w-[90%] h-auto";

  return (
    <button
      className={`${buttonType[variant]} bg-green-800 flex justify-center items-center`}
      {...props}
    >
      <img src={image} alt="Clothing item" className={isShoes} />
    </button>
  );
};
