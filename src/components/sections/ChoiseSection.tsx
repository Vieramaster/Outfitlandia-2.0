interface Section {
  isHidden: boolean;
}

export const ChoiseSection = ({ isHidden }: Section) => {
  const hidden = isHidden ? "absolute w-full h-full" : "w-0 h-0 hidden";
  return (
    <section className={`${hidden} bg-green-800 order-2 lg:order-3`}></section>
  );
};
