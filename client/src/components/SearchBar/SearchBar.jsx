
import { Search } from "lucide-react";
import "./SearchBar.css";

function SearchBar({
    value,
    onChange,
    placeholder = "Search..."
}) {
    return (
        <div className="common-search-bar">

            <Search className="common-search-icon" size={22} />

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />

        </div>
    );
}

export default SearchBar;
