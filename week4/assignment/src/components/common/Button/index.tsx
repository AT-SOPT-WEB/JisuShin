import React from 'react';
import { button } from './styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  disabled = false, 
  onClick, 
  className = '',
  ...props 
}) => {
  const buttonStyle = disabled ? button.disabled : button[variant];

  return (
    <button 
      className={`${buttonStyle} ${className}`}
      disabled={disabled} 
      onClick={disabled ? undefined : onClick} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;