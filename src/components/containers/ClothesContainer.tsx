interface ClothesContainerProps {
  style: "shoes" | "belt";
  image: string;
  altImage: string;
}
const divStyle = {
  shoes: "w-full h-1/2 bg-violet-900 ",
  belt: "w-1/2 h-full bg-violet-900",
};

export const ClothesContainer = ({
  style,
  image,
  altImage,
}: ClothesContainerProps) => {
  const isStyle = style === "shoes" ? "h-5/6" : "w-5/6";

  return (
    <div
      className={`${divStyle[style]} flex items-center justify-center `}
      aria-labelledby={style}
      id={style}
    >
      <img src={image} alt={altImage} className={`${isStyle}  `} />
    </div>
  );
};
