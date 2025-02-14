interface Section {
  isHidden: boolean;
}

export const ChoiseSection = ({ isHidden }: Section) => {

    console.log(isHidden)
  return (
    <section
      className={`${
        isHidden ? "absolute w-full h-full" : "w-0 h-0 hidden"
      } bg-green-800`}
    ></section>
  );
};
