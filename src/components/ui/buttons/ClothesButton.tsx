import { Card } from "../cards/Card";
interface ClothesButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
  name: string;
}

export const ClothesButton = ({
  image,
  name,
  ...props
}: ClothesButtonProps) => (
  <Card>
    <button
      className=" size-full 
      bg-cards
      flex justify-center 
      items-center 
      cursor-pointer 
      select-none drag-none neumorphic
      rounded-lg
      border
      border-background
      hover:border-detail
      hover:scale-101
      duration-300
      "
      {...props}
      aria-label={`select ${name}`}
      title={`select ${name}`}
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        draggable={false}
        className="object-cover w-5/6  "
      />
    </button>
  </Card>
);
