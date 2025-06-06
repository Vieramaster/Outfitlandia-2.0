export enum ERROR_MESSAGE {
  INVALID_ARRAY = "The  array is null, undefined, or invalid",
  INVALID_OBJECT = "the object does not exist or is undefined",
  INVALID_KEYS = "The key is undefined or misspelled",
  INVALID_VALUE = "The value is undefined or misspelled",
  INVALID_ARRAY_COLOR = "The  array color is null, undefined, or invalid",
}

export enum ERROR_MESSAGE_API {
  COMBINE_COLORS = "CombineColors API error:",
  CLOTHES = "Clothes API error:",
  CLOTHES_COLORS = "Clothes API error faliure in colors object ",
  WEATHER = "Weather API error:",
}

export enum ERROR_MESSAGE_COMBINE_COLORS {
  API = "Error in the API combineColor: ",
  COMBINE_OBJECT = "Error in a combination object of the combineColor API: ",
  COMBINE_OBJECT_KEYS = "Error in some key combination object of the combineColor API: ",
  CLOTHES = "Error in the object clothes in combineColor API: ",
  SHOES = "Error in the shoes array in the API combineColors: ",
}
