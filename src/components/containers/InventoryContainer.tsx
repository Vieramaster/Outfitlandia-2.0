import { ReactNode } from "react";
import { CardSize } from "../../data/ComponentSizes";

interface InventoryContainerProps {
  children: ReactNode;
}

export const InventoryContainer = ({ children }: InventoryContainerProps) => {
  return <div className={`${CardSize} bg-orange-400 flex flex-col gap-4`}>{children}</div>;
};
