import React from 'react';

interface InputTextAreaProps {
  id: string;
  value: string;
  placeholder: string;
  className?: string;
}

//tornar input atual variante, e criar uma variante para text area
const InputTextArea: React.FC<InputTextAreaProps> = ({ id, value, className, placeholder, }) => {
  return (
    <div className={`flex flex-col border border-gray-300 rounded-md ${className}`}>
      <textarea id={id} className="p-2 w-full h-full border-none focus:outline-none rounded-md min-h-[180px]" placeholder={placeholder} value={value} onChange={(e) => e.target.value} />
    </div>
  );
};

export default InputTextArea;
