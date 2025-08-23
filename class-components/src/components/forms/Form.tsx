import { useActionState, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  const [state, formAction, isPending] = useActionState();
  const formRef = useRef();
  const nameInputRef = useRef();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const handleError = useErrorHandler();
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  function handleChange(e) {
    setName(e.target.value);
    setAnswer(e.target.value);
  }

  async function formAction(formData) {
    setIsSubmitting(true);
    try {
      addOptimisticMessage(formData.get('message'));
      formRef.current.reset();
      nameInputRef.current.focus();
      setStatus('success');
    } catch (error) {
      setStatus('typing');
      setError(err);
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function FormErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>There was an error while submitting the form</p>
        <p>Error: {error.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  if (status === 'success') {
    return <h1>That's right!</h1>;
  }

  return (
    <ErrorBoundary FallbackComponent={FormErrorFallback}>
      <>
        <form action={formAction} ref={formRef}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              {...register('name')}
              disabled={status === 'submitting'}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              {...register('age')}
              disabled={status === 'submitting'}
            />
            {errors.age && <p>{errors.age.message}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              {...register('email')}
              disabled={status === 'submitting'}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              {...register('password')}
              disabled={status === 'submitting'}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input
              type="password"
              {...register('confirmPassword')}
              disabled={status === 'submitting'}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
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
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <div>
            <label htmlFor="acceptTerms">
              <input type="checkbox" {...register('acceptTerms')} />I agree to
              the terms and conditions as set out by the user agreement
            </label>
            {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
          </div>

          <div>
            <label htmlFor="picture"></label>
            <input
              type="file"
              accept=".png,.jpeg,.jpg"
              {...register('picture')}
            />
            {errors.picture && <p>{errors.picture.message}</p>}
          </div>

          <button
            formAction={formAction}
            disabled={answer.length === 0 || status === 'submitting'}
          ></button>
          {isPending ? 'Loading...' : state}
        </form>
        {error !== null && <p className="Error">{error.message}</p>}
      </>
    </ErrorBoundary>
  );
}
