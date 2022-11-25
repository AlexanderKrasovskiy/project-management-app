import { LoginRequestModel, RegisterRequestModel } from '../models/auth.model';

export const generateNewUser = (
  formValue: {
    nameInput: string;
    loginInput: string;
    passwordInput: string;
  },
  avatar: string,
): RegisterRequestModel => ({
  name: `${formValue.nameInput}_${avatar}`,
  login: formValue.loginInput,
  password: formValue.passwordInput,
});

export const generateLoginUser = (formValue: {
  loginInput: string;
  passwordInput: string;
}): LoginRequestModel => ({
  login: formValue.loginInput,
  password: formValue.passwordInput,
});

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const shuffle = (array: Array<string>): Array<string> => {
  const array1 = array;
  for (let i = 0; i < array1.length; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array1[i];
    array1[i] = array1[j];
    array1[j] = tmp;
  }
  return array1;
};

export const generatePassword = (): string => {
  const arr = [];
  const minLength = 8;
  const maxLength = 12;
  const lowerCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'j',
    'k',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const upperCharacters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const numbers = ['2', '3', '4', '5', '6', '7', '8', '9'];
  const specials = [
    '!',
    '#',
    '$',
    '%',
    '&',
    "'",
    '(',
    ')',
    '*',
    '+',
    ',',
    '-',
    '.',
    ':',
    ';',
    '<',
    '=',
    '>',
    '?',
    '@',
    '^',
    '_',
    '`',
    '{',
    '}',
    '~',
  ];

  const length = randomNumber(minLength, maxLength);

  const lowerCharactersNumber = randomNumber(1, length - 3);
  const upperCharactersNumber = randomNumber(
    1,
    length - 2 - lowerCharactersNumber,
  );
  const numbersNumber = randomNumber(
    1,
    length - 1 - lowerCharactersNumber - upperCharactersNumber,
  );
  const specialsNumber =
    length - lowerCharactersNumber - upperCharactersNumber - numbersNumber;

  for (let i = 0; i < lowerCharactersNumber; i += 1) {
    arr.push(lowerCharacters[randomNumber(0, lowerCharacters.length - 1)]);
  }
  for (let i = 0; i < upperCharactersNumber; i += 1) {
    arr.push(upperCharacters[randomNumber(0, upperCharacters.length - 1)]);
  }
  for (let i = 0; i < numbersNumber; i += 1) {
    arr.push(numbers[randomNumber(0, numbers.length - 1)]);
  }
  for (let i = 0; i < specialsNumber; i += 1) {
    arr.push(specials[randomNumber(0, specials.length - 1)]);
  }
  return shuffle(arr).join('');
};
