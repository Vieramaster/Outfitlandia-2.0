import { ClothesCard } from "../cards/ClothesCard";

export const MainSection = () => {
  return (
    <section className="bg-yellow-300 w-full px-4 grid grid-cols-2 gap-2 place-items-center">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-gray-300 w-[10rem] h-[14rem]">
          {index === 3 ? (
            <>
              <div></div>
              <div></div>
            </>
          ) : (
            <ClothesCard type="normal" />
          )}
        </div>
      ))}
    </section>
  );
};
