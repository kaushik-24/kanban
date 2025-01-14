import { Search } from "lucide-react";

  interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
      <div className="mb-6 mt-[5vh] ">
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 "  size={20} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>
    );
  };
  export default SearchBar;