interface ColorButton extends React.ComponentPropsWithoutRef<"button"> {
  hex: string;
}

export const ColorButton = ({ hex, ...props }: ColorButton) => {
  return (
    <button className="w-20 h-10 cursor-pointer"  style={{ backgroundColor: hex }} {...props} />
  );
};
