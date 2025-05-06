import React from 'react';

function Input({
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
  maxLength,
  ...rest
}) {
  const baseClasses = 'w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';
  const disabledClasses = disabled ? 'disabled:bg-gray-100 disabled:text-gray-500' : '';
  
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseClasses} ${disabledClasses} ${className}`}
      maxLength={maxLength}
      {...rest}
    />
  );
}

export default Input;