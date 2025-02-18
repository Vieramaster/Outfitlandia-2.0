const divStyle = {
  shoes: "w-full h-1/2",
  belt: "w-1/2 h-full ",
};

interface Props {
  style: "shoes" | "belt";
  image: string;
  altImage: string;
}

export const ClothesContainer = ({ style, image, altImage }: Props) => {
  const isStyle = style === "shoes" ? "h-5/6" : "w-5/6";

  return (
    <div
      className={`${divStyle[style]} flex items-center justify-center `}
      aria-labelledby={style}
    >
      <img src={image} alt={altImage} className={`${isStyle}  `} />
    </div>
  );
};
