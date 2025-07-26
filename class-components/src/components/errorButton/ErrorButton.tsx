import React, { useState } from 'react';

const ErrorButton: React.FC = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Test error');
  }

  const handleClick = (): void => {
    setThrowError(true);
  };

  return (
    <button className="error-button" onClick={handleClick}>
      CALL ERROR
    </button>
  );
};
export default ErrorButton;
