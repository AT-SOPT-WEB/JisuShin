import React from 'react';
import { inputContainer, label, input, errorMessage } from './styles.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ 
  id, 
  label: labelText, 
  error, 
  ...props 
}) => {
  return (
    <div className={inputContainer}>
      {labelText && <label htmlFor={id} className={label}>{labelText}</label>}
      <input 
        id={id}
        className={input}
        {...props}
      />
      {error && <p className={errorMessage}>{error}</p>}
    </div>
  );
};

export default Input;