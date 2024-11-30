import React from 'react';
import PropTypes from 'prop-types';


const Button = ({ type = 'button', children, onClick, className, variant = 'primary' }) => {
  const baseClasses = "w-full px-4 py-2 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Variant-specific styles
  const variantClasses = {
    primary: "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "text-gray-800 bg-gray-300 hover:bg-gray-400 focus:ring-gray-500",
    danger: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition duration-200 font-semibold",
    success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
    warning: "text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-400 font-semibold"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
};

export default Button;
