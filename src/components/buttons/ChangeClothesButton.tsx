import { ReactNode } from "react";


interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

export const ChangeClothesButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={`w-1/2 h-full  bg-green-800`} {...props}>
      {children}
    </button>
  );
};
