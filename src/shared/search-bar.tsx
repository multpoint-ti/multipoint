import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="flex w-full items-center gap-2 rounded-full border border-gray-oxide-steel px-4 py-2">
      <input
        type="text"
        placeholder="Digite para pesquisar"
        className="w-full bg-transparent focus:outline-none text-sm md:text-base"
      />
      <Search className="h-5 w-5 text-red-amber-torque" />
    </div>
  );
}