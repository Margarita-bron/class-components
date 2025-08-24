import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .min(13, 'You must be at least 13 years old')
    .required('Age is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'The password must contain a number')
    .matches(/[A-Z]/, 'The password must contain a capital letter')
    .matches(/[a-z]/, 'The password must contain a lowercase letter')
    .matches(/[^a-zA-Z0-9]/, 'The password must contain a special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), 'Passwords must match'])
    .required('Confirm your password!!!'),
  gender: yup
    .string()
    .oneOf(['male', 'female', 'non-binary', 'neither'], 'Select a valid gender')
    .nullable()
    .notRequired(),
  acceptTerms: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions')
    .default(false)
    .required(),
  picture: yup
    .mixed()
    .test(
      'fileSize',
      'File too large(max 2MB)',
      (img) => img && img[0]?.size <= 2000000
    )
    .test(
      'fileType',
      'Allow only PNG/JPEG',
      (img) =>
        img && img[0] && ['image/png', 'image/jpeg'].includes(img[0].type)
    )
    .nullable()
    .notRequired(),
  country: yup.string().nullable().default(null).required(),
});
