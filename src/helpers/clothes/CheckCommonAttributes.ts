import { ListStructureType, StyleType } from "../../data/types/ClothesTypes";
import { WeatherType } from "../../data/types/ClothesTypes";

const CheckCommonAttributes = (item: ListStructureType): boolean => {
  const getIntersection = (arrays: string[][]): string[] =>
    arrays.reduce((acc, curr) => acc.filter((value) => curr.includes(value)));

  const styles: StyleType[][] = Object.values(item).map(
    (garment) => garment.style
  );
  const weathers: WeatherType[][] = Object.values(item).map(
    (garment) => garment.weather
  );

  const commonStyles = getIntersection(styles);
  const commonWeathers = getIntersection(weathers);

  return commonStyles.length > 0 && commonWeathers.length > 0;
};

export default CheckCommonAttributes;
