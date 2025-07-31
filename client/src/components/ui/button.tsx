import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  size = 'default', 
  children, 
  className = '',
  ...props 
}) => {
  // Base styles
  let variantClasses = '';
  let sizeClasses = '';
  
  // Variant styles
  switch (variant) {
    case 'default':
      variantClasses = 'bg-primary hover:bg-primary/90 text-white';
      break;
    case 'primary':
      variantClasses = 'bg-primary hover:bg-primary/90 text-white';
      break;
    case 'outline':
      variantClasses = 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700';
      break;
    case 'ghost':
      variantClasses = 'bg-transparent hover:bg-gray-100 text-gray-700';
      break;
    case 'link':
      variantClasses = 'bg-transparent underline text-primary hover:text-primary/80';
      break;
  }
  
  // Size styles
  switch (size) {
    case 'default':
      sizeClasses = 'h-10 px-4 py-2';
      break;
    case 'sm':
      sizeClasses = 'h-8 px-3 text-sm';
      break;
    case 'lg':
      sizeClasses = 'h-12 px-6 text-lg';
      break;
    case 'icon':
      sizeClasses = 'h-10 w-10 p-0';
      break;
  }
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;