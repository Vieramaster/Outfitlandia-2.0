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
      bg-green-800 
      flex justify-center 
      items-center 
      cursor-pointer 
      select-none drag-none"
      {...props}
      aria-label={`select ${name}`}
      title={`select ${name}`}
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        draggable={false}
        className="object-cover w-5/6 "
      />
    </button>
  </Card>
);
