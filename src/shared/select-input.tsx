import React from 'react';

interface SelectInputProps {
  options: { value: string; label: string }[];
  id: string;
}

const SelectInput: React.FC<SelectInputProps & { onSelect: (value: string) => void }> = ({ options, id, onSelect }) => {
  return (
    <div className="flex flex-col">
      <select id={id} className="p-2 w-60 border border-gray-400 rounded-md">
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
