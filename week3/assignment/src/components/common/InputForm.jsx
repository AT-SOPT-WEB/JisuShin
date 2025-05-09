import { useState } from 'react';

function InputForm({
  onSubmit,
  placeholder,
  disabled = false,
  maxLength,
  autoFocus = false,
  className = '',
  ariaLabel,
  ariaRequired = false,
  ...rest
}) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSubmit(value.trim());
      setValue('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6" role="search">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 ${className}`}
        maxLength={maxLength}
        autoFocus={autoFocus}
        aria-label={ariaLabel || placeholder}
        aria-required={ariaRequired}
        aria-disabled={disabled}
        {...rest}
      />
    </form>
  );
}

export default InputForm;