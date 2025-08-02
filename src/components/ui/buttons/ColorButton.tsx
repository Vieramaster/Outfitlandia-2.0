import { HexType } from "../../../types/clothes/clothes.types";
interface ColorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hex: HexType;
}

export const ColorButton = ({ hex, ...props }: ColorButtonProps) => (
  <button
    className="w-full h-2/3 cursor-pointer rounded-md  border border-transparent hover:border-detail hover:scale-102 duration-200"
    style={{ backgroundColor: hex }}
    {...props}
  />
);
