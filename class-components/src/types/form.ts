export type IFormInput = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'non-binary' | 'neither' | null;
  acceptTerms: boolean;
  picture: string | null;
  country: string | null;
};

export type IFormInputRecord = IFormInput & {
  id: string;
};
