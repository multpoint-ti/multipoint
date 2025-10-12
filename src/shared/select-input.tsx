import React from 'react';

interface SelectInputProps {
  options: { value: string; label: string }[];
  id: string;
  onSelect: (value: string) => void;
  value: string;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, id, onSelect, value, className }) => {
  return (
    <div className={`flex flex-col border border-gray-300 pr-2 rounded-md ${className}`}>
      <select id={id} className="p-2 w-full border-none focus:outline-none rounded-md" value={value} onChange={(e) => onSelect(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
