import { toast } from 'vue3-toastify';

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

export const showToastError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};
