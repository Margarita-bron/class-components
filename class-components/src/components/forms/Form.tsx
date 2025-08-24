'use client';

import { v4 as uuidv4 } from 'uuid';
import { useActionState, useEffect, useRef, useState } from 'react';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCountriesSelector } from '../../redux/selectors/countries-selector';
import { fetchCountries } from '../../redux/slices/countries-slice';
import { useAppDispatch } from '../../hooks/typed-react-redux-hooks';
import { IFormInput } from '../../types/form';
import { addFormRecord } from '../../redux/slices/form-data-slice';
import { schema } from '../../yup/schema';

const defaultValues: IFormInput = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: null,
  acceptTerms: false,
  picture: null,
  country: null,
};

export default function Form({ onClose }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema) as Resolver<IFormInput>,
    mode: 'onChange',
    defaultValues,
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const countries = useCountriesSelector();
  const [status, setStatus] = useState('typing');
  const [error, setError] = useState(null);

  const onSubmitHandler = async (formData) => {
    setStatus('submitting');
    try {
      if (formData.picture && formData.picture.length > 0) {
        const file = formData.picture[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const newRecord = {
            id: uuidv4(),
            ...formData,
            picture: reader.result,
          };
          dispatch(addFormRecord(newRecord));
          setStatus('success');
          reset();
          onClose();
        };
        reader.readAsDataURL(file);
      } else {
        dispatch(addFormRecord(formData));
        setStatus('success');
        reset();
      }
    } catch (error) {
      setError(error);
      setStatus('typing');
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
    onClose();
  }

  return (
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
            <input type="checkbox" {...register('acceptTerms')} />I agree to the
            terms and conditions as set out by the user agreement
          </label>
          {errors.acceptTerms && <p>{String(errors.acceptTerms.message)}</p>}
        </div>

        <div>
          <label htmlFor="picture">
            <input type="file" accept=".png,.jpeg" {...register('picture')} />
            Image
          </label>
          {errors.picture && <p>{String(errors.picture.message)}</p>}
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <Controller
            name="country"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <select {...field} id="country" value={field.value ?? ''}>
                <option value="">Choose country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <button type="submit" disabled={!isValid || isSubmitting}></button>
        {status === 'submitting' && 'Loading...'}
      </form>
    </>
  );
}
