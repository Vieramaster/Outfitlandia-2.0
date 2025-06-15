interface BeltCardProps {
  image: string;
}
export const BeltCard = ({ image }: BeltCardProps) => (
  <div className="w-1/2 bg-green-500" aria-label="belt">
    <img src={image} alt="shoes" />
  </div>
);