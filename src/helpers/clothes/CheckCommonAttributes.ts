import { ListStructureType, StyleType } from "../../data/types/ClothesTypes";
import { WeatherType } from "../../data/types/ClothesTypes";

/**
 * The function checks if the passed object has common styles and weathers among its properties.
 * It returns true if both conditions are met, otherwise it returns false.
 * 
 * @param item - An object that categorizes each type of clothing item, associating each category with an array of the corresponding garments.
 * @returns - Returns true if the garments share any characteristics; otherwise, returns false.
 */
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
