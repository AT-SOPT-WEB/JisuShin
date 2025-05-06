import React from 'react';

function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  type = 'button',
  ...rest 
}) {
  // 버튼 스타일 변형에 따른 클래스 설정
  const baseClasses = 'px-4 py-2 rounded-lg transition-colors focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    close: 'bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600'
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;