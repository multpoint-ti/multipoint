import React from 'react';

interface InputProps {
  id: string;
  value: string;
  placeholder: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "email";
}

const Input: React.FC<InputProps> = ({ id, value, className, placeholder, onChange, type, }) => {
  return (
    <div className={`flex flex-col border border-gray-300 rounded-md ${className}`}>
      <input type={type} id={id} className="p-2 w-full border-none focus:outline-none rounded-md" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
