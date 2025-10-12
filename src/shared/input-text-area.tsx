import React from 'react';

interface InputTextAreaProps {
  id: string;
  value: string;
  placeholder: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputTextArea: React.FC<InputTextAreaProps> = ({ id, value, className, placeholder, onChange, }) => {
  return (
    <div className={`flex flex-col border border-gray-300 rounded-md ${className}`}>
      <textarea id={id} className="p-2 w-full h-full border-none focus:outline-none rounded-md min-h-[180px]" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default InputTextArea;
