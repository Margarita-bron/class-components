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
    <form ref={formRef} onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input name="name" type="text" placeholder="John" required />
        {fieldErrors.name && <p style={{ color: 'red' }}>{fieldErrors.name}</p>}
      </div>

      <div>
        <label>Age:</label>
        <input name="age" type="number" placeholder="30" required min={13} />
        {fieldErrors.age && <p style={{ color: 'red' }}>{fieldErrors.age}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />
        {fieldErrors.email && (
          <p style={{ color: 'red' }}>{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label>Password:</label>
        <input name="password" type="password" required />
        {fieldErrors.password && (
          <p style={{ color: 'red' }}>{fieldErrors.password}</p>
        )}
      </div>

      <div>
        <label>Confirm Password:</label>
        <input name="confirmPassword" type="password" required />
        {fieldErrors.confirmPassword && (
          <p style={{ color: 'red' }}>{fieldErrors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label>Gender:</label>
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

      <div>
        <label>
          <input name="acceptTerms" type="checkbox" /> I accept terms
        </label>
        {fieldErrors.acceptTerms && (
          <p style={{ color: 'red' }}>{fieldErrors.acceptTerms}</p>
        )}
      </div>

      <div>
        <label>Picture:</label>
        <input name="picture" type="file" accept=".png,.jpeg" />
        {fieldErrors.picture && (
          <p style={{ color: 'red' }}>{fieldErrors.picture}</p>
        )}
      </div>
      <div>
        <label>Country:</label>
        <select name="country">
          <option value="">Choose country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={status === 'submitting'}>
        Submit
      </button>
      {status === 'submitting' && <p>Submitting...</p>}
    </form>
  );
}
