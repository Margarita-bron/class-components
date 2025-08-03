export const getInitialValueFromLocalStorage = <T>(
  key: string,
  initialValue: T
) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};
