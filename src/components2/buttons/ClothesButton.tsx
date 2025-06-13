interface ClothesButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
}

export const ClothesButton = ({ image, ...props }: ClothesButtonProps) => (
  <button
    className=" clothesButton bg-green-800 flex justify-center items-center cursor-pointer select-none drag-none"
    {...props}
  >
    <img src={image} alt="Clothing item" className="w-5/6 " />
  </button>
);
