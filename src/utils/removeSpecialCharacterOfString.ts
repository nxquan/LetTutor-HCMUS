// Write a function that remove a special character from the string
export const removeSpecialCharacter = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};
