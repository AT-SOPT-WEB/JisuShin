import React from 'react';
import { button } from './styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  disabled = false, 
  onClick, 
  ...props 
}) => {
  const buttonClass = disabled ? button.disabled : button[variant];

  return (
    <button 
      className={buttonClass} 
      disabled={disabled} 
      onClick={disabled ? undefined : onClick} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;