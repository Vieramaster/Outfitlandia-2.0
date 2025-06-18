interface BeltCardProps {
  image: string;
  arial: string;
}
export const BeltCard = ({ image, arial }: BeltCardProps) => (
  <div
    className="w-1/2 h-full bg-green-500 grid place-content-center"
    aria-label={arial}
  >
    <img src={image} alt="shoes" className="w-5/6" />
  </div>
);
