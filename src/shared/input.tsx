import React from 'react';

interface InputProps {
  id: string;
  value: string;
  placeholder: string;
  className?: string;
}

//tornar input atual variante, e criar uma variante para text area
const Input: React.FC<InputProps> = ({ id, value, className, placeholder, }) => {
  return (
    <div className={`flex flex-col border border-gray-300 rounded-md ${className}`}>
      <input id={id} className="p-2 w-full border-none focus:outline-none rounded-md" placeholder={placeholder} value={value} onChange={(e) => e.target.value} />
    </div>
  );
};

export default Input;
