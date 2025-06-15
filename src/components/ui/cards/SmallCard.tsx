interface SmallCardProps {
  children: React.ReactNode;
  arial?: string;
}
export const SmallCard = ({ arial, children }: SmallCardProps) => (
  <div
    className="bg-sky-400  w-full h-1/2 flex gap-2 place-content-center items-center"
    aria-label={arial}
  >
    {children}
  </div>
);
