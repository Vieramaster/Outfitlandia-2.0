import { CardSize } from "../../data/ComponentSizes";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
}

export const ClothesButton = ({ image, ...props }: ButtonProps) => {
  return (
    <button
      className={`${CardSize} bg-green-800 flex justify-center items-center`}
      {...props}
    >
      <img src={image} alt="Clothing item" className="w-5/6" />
    </button>
  );
};
