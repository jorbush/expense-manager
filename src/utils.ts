export const isValidCategoryStructure = (
  data: any
): data is Record<string, string[]> => {
  return (
    typeof data === 'object' &&
    data !== null &&
    Object.values(data).every(
      (value) =>
        Array.isArray(value) && value.every((item) => typeof item === 'string')
    )
  );
};
