interface ClothesSectionProps {
  children: React.ReactNode;
}
export const ClothesSection = ({ children }: ClothesSectionProps) => (
  <section className="bg-yellow-500 h-full grid place-content-center">
    {children}
  </section>
);
//
interface ClothesInventoryProps {
  children: React.ReactNode;
}
export const ClothesInventory = ({ children }: ClothesInventoryProps) => (
  <ul className="bg-red-800  grid grid-cols-2 gap-2 place-items-center">
    {children}
  </ul>
);
interface ClothesButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
}

export const ClothesButton = ({ image, ...props }: ClothesButtonProps) => (
  <button
    className=" size-full bg-green-800 flex justify-center items-center cursor-pointer select-none drag-none"
    {...props}
  >
    <img src={image} alt="Clothing item" className="size-5/6" />
  </button>
);

interface CardProps {
  children: React.ReactNode;
  type: "big" | "small";
}
export const Card = ({ children, type }: CardProps) => {
  const variants = {
    big: "w-[9rem] h-[14rem] flex-col bg-orange-400",
    small: "w-full h-1/2 bg-sky-400",
  };
  return (
    <div
      className={`  flex gap-2 place-content-center items-center ${variants[type]}`}
    >
      {children}
    </div>
  );
};
export const SmallButton = () => (
  <button className="bg-violet-800 w-1/2 h-full rounded-xl "></button>
);

export const Home = () => {
  return (
    <>
      <ClothesSection>
        <ClothesInventory>
          {Array.from({ length: 4 }).map((_, index) => {
            return index !== 3 ? (
              <Card type="big" key={index}>
                <ClothesButton image="" />
              </Card>
            ) : (
              <Card type="big" key={index}>
                <Card type="small">
                  <SmallButton />
                  <SmallButton />
                </Card>
                <Card type="small">
                  <img src="" alt="" className="size-5/6" />
                </Card>
              </Card>
            );
          })}
        </ClothesInventory>
      </ClothesSection>
    </>
  );
};

/**<section className="bg-orange-900 h-full w-full absolute top-0 -z-0"></section>
 * 
 *       <section className="bg-red-600 grow-1 w-full  lg:h-full lg:w-1/2  2xl:w-1/3 grid place-content-center">
        <div className="grid grid-cols-2 gap-4 place-items-center bg-red-900 w-[19rem] md:w-[27rem]  "></div>
      </section>
 */
