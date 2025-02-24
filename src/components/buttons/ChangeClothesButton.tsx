import { ReactNode } from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

export const ChangeClothesButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className={` bg-green-800 active:bg-yellow-200  w-1/2 h-full  cursor-pointer `}
      {...props}
    >
      {children}
    </button>
  );
};
