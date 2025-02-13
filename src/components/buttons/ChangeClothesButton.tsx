import { ReactNode } from "react";
import { BeltButtonSize } from "../../data/ComponentSizes";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

export const ChangeClothesButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={`${BeltButtonSize} bg-green-800`} {...props}>
      {children}
    </button>
  );
};
