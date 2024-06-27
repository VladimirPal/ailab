export const pluralIntl = new Intl.PluralRules("en-US", { type: "cardinal" });

export function pluralize(value, values) {
  return values[pluralIntl.select(value)];
}

export const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const capitalizeFirstLetter = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export function deepMerge(obj1, obj2) {
  const result = {};

  // Merge properties from obj1
  Object.keys(obj1).forEach((key) => {
    if (obj1[key] instanceof Object) {
      result[key] = deepMerge({}, obj1[key]);
    } else {
      result[key] = obj1[key];
    }
  });

  // Merge properties from obj2
  Object.keys(obj2).forEach((key) => {
    if (obj2[key] instanceof Object) {
      if (result[key] && result[key] instanceof Object) {
        result[key] = deepMerge(result[key], obj2[key]);
      } else {
        result[key] = deepMerge({}, obj2[key]);
      }
    } else {
      result[key] = obj2[key];
    }
  });

  return result;
}
