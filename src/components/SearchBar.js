import React, { useState } from 'react';
import universityData from '../components/universities_data.json';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        if (value.trim() !== '') {
            setLoading(true);
            const filteredSuggestions = universityData.filter((uni) =>
                uni['University Name'].toLowerCase().includes(value.toLowerCase())
            ).slice(0, 5); // Limiting suggestions to 5
            setSuggestions(filteredSuggestions);
            setLoading(false);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
        handleUniversitySelection(suggestion);
    };

    const handleUniversitySelection = (selectedUniversity) => {
        // Redirect to the details page of the selected university
        // You can use react-router-dom's history.push() or any other routing mechanism here
        console.log(`Redirecting to details page of ${selectedUniversity}`);
    };
    return (
        <label
            className="mx-auto  relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
            htmlFor="search-bar"
        >
            <input
                id="search-bar"
                placeholder="Search any university..."
                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                value={searchTerm}
                onChange={handleChange}
            />
            <button
                className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
            >
                <div className="relative">
                    {loading && (
                        <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                            <svg
                                className="opacity-0 animate-spin w-full h-full"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    )}
                    <div className="flex items-center transition-all opacity-1 valid:">
                        <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                            {loading ? 'Searching...' : 'Search'}
                        </span>
                    </div>
                </div>
            </button>
            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelectSuggestion(suggestion['University Name'])} // Render the University Name property
                        >
                            {suggestion['University Name']} {/* Render the University Name property */}
                        </li>
                    ))}
                </ul>
            )}
        </label>
    );
};

export default SearchBar;
