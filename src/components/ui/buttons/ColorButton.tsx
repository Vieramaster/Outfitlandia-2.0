interface ColorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hex: string;
}

export const ColorButton = ({ hex, ...props }: ColorButtonProps) => (
  <button
    className="w-20 h-10 cursor-pointer rounded-lg lg:w-28 lg:h-14 border border-transparent hover:border-detail hover:scale-102 duration-200"
    style={{ backgroundColor: hex }}
    {...props}
  />
);
