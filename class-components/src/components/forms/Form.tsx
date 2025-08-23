'use client';

import { useActionState, useRef, useState } from 'react';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type IFormInput = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: FileList;
  country: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be a positive number')
    .min(6)
    .integer('Age must be an integer')
    .required('Age is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
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
    .oneOf(
      ['male', 'female', 'non-binary', 'neither'],
      'Select a valid gender'
    ),
  acceptTerms: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed()
    .test('fileSize', 'Max 2MB', (value) => !value || value[0]?.size <= 2000000)
    .test(
      'fileType',
      'Allow only PNG/JPEG',
      (value) => !value || ['image/png', 'image/jpeg'].includes(value?.type)
    ),
  country: yup.string(),
});

export default function Form() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const [status, setStatus] = useState('typing');
  const [error, setError] = useState(null);
  const { showBoundary } = useErrorBoundary();

  const onSubmitHandler = async (formData) => {
    setStatus('submitting');
    try {
      if (formData.picture && formData.picture.length > 0) {
        const file = formData.picture[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          formData.pictureBase64 = reader.result;
          reset();
        };
        reader.readAsDataURL(file);
        setStatus('success');
        reset();
      }
    } catch (error) {
      setError(error);
      setStatus('typing');
      showBoundary(error);
    }
  };

  function FormErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>There was an error while submitting the form</p>
        <p>Error: {error.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  if (status === 'success' && isSubmitSuccessful) {
    return <h1>Форма успешно отправлена!</h1>;
  }

  return (
    <ErrorBoundary FallbackComponent={FormErrorFallback}>
      <>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              {...register('name')}
              placeholder="John"
              disabled={status === 'submitting'}
            />
            {errors.name && <p>{String(errors.name.message)}</p>}
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              {...register('age')}
              placeholder="45"
              disabled={status === 'submitting'}
            />
            {errors.age && <p>{String(errors.age.message)}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              {...register('email')}
              placeholder="johntaylor@gmail.com"
              disabled={status === 'submitting'}
            />
            {errors.email && <p>{String(errors.email.message)}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              {...register('password')}
              disabled={status === 'submitting'}
            />
            {errors.password && <p>{String(errors.password.message)}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input
              type="password"
              {...register('confirmPassword')}
              disabled={status === 'submitting'}
            />
            {errors.confirmPassword && (
              <p>{String(errors.confirmPassword.message)}</p>
            )}
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select {...register('gender')}>
              <option value="">Choose gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="neither">I prefer not to say</option>
            </select>
            {errors.gender && <p>{String(errors.gender.message)}</p>}
          </div>

          <div>
            <label htmlFor="acceptTerms">
              <input type="checkbox" {...register('acceptTerms')} />I agree to
              the terms and conditions as set out by the user agreement
            </label>
            {errors.acceptTerms && <p>{String(errors.acceptTerms.message)}</p>}
          </div>

          <div>
            <label htmlFor="picture"></label>
            <input type="file" accept=".png,.jpeg" {...register('picture')} />
            {errors.picture && <p>{String(errors.picture.message)}</p>}
          </div>

          <div>
            <label htmlFor="country">Страна:</label>
            <Controller
              name="country"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Выберите страну</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <button type="submit" disabled={status === 'submitting'}></button>
          {status === 'submitting' && 'Loading...'}
        </form>
        {error !== null && <p className="Error">{error}</p>}
      </>
    </ErrorBoundary>
  );
}
