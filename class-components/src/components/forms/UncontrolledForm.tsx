'use client';

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../hooks/typed-react-redux-hooks';
import { useCountriesSelector } from '../../redux/selectors/countries-selector';
import { fetchCountries } from '../../redux/slices/countries-slice';
import { addFormRecord } from '../../redux/slices/form-data-slice';
import { IFormInputRecord } from '../../types/form';
import { schema } from '../../yup/schema';
import * as yup from 'yup';

interface FormProps {
  onClose: () => void;
}

export default function UncontrolledForm({ onClose }: FormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const countries = useCountriesSelector();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [status, setStatus] = useState<'typing' | 'submitting' | 'success'>(
    'typing'
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const rawGender = formData.get('gender');
    const allowedGenders = ['male', 'female', 'non-binary', 'neither'] as const;

    const gender = rawGender
      ? (rawGender as (typeof allowedGenders)[number])
      : null;

    const pictureEntry = formData.get('picture');
    const pictureFile = pictureEntry instanceof File ? pictureEntry : null;

    const rawData: IFormInputRecord = {
      id: uuidv4(),
      name: String(formData.get('name')),
      age: Number(formData.get('age')),
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      confirmPassword: String(formData.get('confirmPassword')),
      gender,
      acceptTerms: formData.get('acceptTerms') === 'on',
      picture: null,
      country: String(formData.get('country')) || null,
    };

    try {
      const validated = await schema.validate(rawData, {
        abortEarly: false,
        stripUnknown: true,
      });

      setFieldErrors({});

      const record: IFormInputRecord = {
        id: uuidv4(),
        name: validated.name,
        age: validated.age,
        email: validated.email,
        password: validated.password,
        confirmPassword: validated.confirmPassword,
        gender: validated.gender ?? null,
        acceptTerms: validated.acceptTerms ?? false,
        country: validated.country ?? null,
        picture: null,
      };

      if (pictureFile && pictureFile.size > 0) {
        const reader = new FileReader();
        reader.onloadend = () => {
          record.picture = reader.result as string;
          dispatch(addFormRecord(record));
          setStatus('success');
          form.reset();
          onClose();
        };
        reader.readAsDataURL(pictureFile);
      } else {
        dispatch(addFormRecord(record));
        setStatus('success');
        form.reset();
        onClose();
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorMap: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) errorMap[e.path] = e.message;
        });
        setFieldErrors(errorMap);
      }
      setStatus('typing');
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="border-gray-200p-7 mx-auto max-w-md rounded-lg"
    >
      <div className="mb-5">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          placeholder="John"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {fieldErrors.name && <p style={{ color: 'red' }}>{fieldErrors.name}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="age">Age:</label>
        <input
          name="age"
          type="number"
          placeholder="30"
          required
          min={13}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {fieldErrors.age && <p style={{ color: 'red' }}>{fieldErrors.age}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {fieldErrors.email && (
          <p style={{ color: 'red' }}>{fieldErrors.email}</p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {fieldErrors.password && (
          <p style={{ color: 'red' }}>{fieldErrors.password}</p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          name="confirmPassword"
          type="password"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {fieldErrors.confirmPassword && (
          <p style={{ color: 'red' }}>{fieldErrors.confirmPassword}</p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="gender">Gender:</label>
        <select name="gender">
          <option value="">Choose gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="neither">I prefer not to say</option>
        </select>
        {fieldErrors.gender && (
          <p style={{ color: 'red' }}>{fieldErrors.gender}</p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="acceptTerms">
          <input name="acceptTerms" type="checkbox" /> I agree to the terms and
          conditions as set out by the user agreement
        </label>
        {fieldErrors.acceptTerms && (
          <p style={{ color: 'red' }}>{fieldErrors.acceptTerms}</p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="picture">Picture:</label>
        <input
          name="picture"
          type="file"
          accept=".png,.jpeg"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {fieldErrors.picture && (
          <p style={{ color: 'red' }}>{fieldErrors.picture}</p>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="country">Country:</label>
        <select name="country">
          <option value="">Choose country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
      >
        Submit
      </button>
      {status === 'submitting' && <p>Submitting...</p>}
    </form>
  );
}
