interface Section {
  isHidden: boolean;
}

export const ChoiseSection = ({ isHidden }: Section) => {
  return (
    <section
      className={`${isHidden ? "w-0 h-0" : "grow-1 z-20 absolute"} bg-green-800`}
    ></section>
  );
};
