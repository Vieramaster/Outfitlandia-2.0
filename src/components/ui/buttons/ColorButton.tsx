interface ColorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hex: string;
}

export const ColorButton = ({ hex, ...props }: ColorButtonProps) => (
  <li>
    <button
      className="w-20 h-10 cursor-pointer"
      style={{ backgroundColor: hex }}
      {...props}
    />
  </li>
);
