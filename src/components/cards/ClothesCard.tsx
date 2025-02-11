const buttonType = {
  normal: "w-[10rem] h-[14rem] bg-red-500",
  belt: "h-full w-1/2",
  shoes: "w-full h-1/2",
};

interface button {
  type: 'normal' | 'belt' | 'shoes';
}

export const ClothesCard = ({ type }: button) => {

  return <button className={`${buttonType[type]}`}>
    
  </button>;
};
