interface ClothesSectionProps {
  children: React.ReactNode;
}

export const ClothesSection = ({ children }: ClothesSectionProps) => (
  <section className="bg-yellow-500 h-full grid place-content-center">
    {children}
  </section>
);
