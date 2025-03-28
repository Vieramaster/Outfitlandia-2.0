import { Spinner } from "../loadingsAndErrors/Spinner";

interface GeolocationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const GeolocationButton = ({
  children,
  loading,
  ...props
}: GeolocationButtonProps) => {
  return (
    <button
      className="size-14 lg:size-18 2xl:size-22 bg-amber-400 gird place-items-center"
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
