import React, { useState } from 'react';
import SearchComponent from "../../components/SearchComponent";
import ApartmentList from "../ApartmentsLists";

const Search = () => {
    const [apartments, setApartments] = useState([]);

    return (
        <div>
            <SearchComponent onSearch={setApartments} />
            <ApartmentList apartments={apartments} />
        </div>
    );
};

export default Search;
