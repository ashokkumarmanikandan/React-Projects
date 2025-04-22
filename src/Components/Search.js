import {memo} from "react";

const Search = memo((props)=> {

    const {searchInput, setSearchInput,criteria , setCriteria} = props;

    const setSearchIn = (e) => {
        setSearchInput(e.target.value);
    };

    const setCriteriaChange = (e) => {
        setCriteria(e.target.value);
    };

    return (
        <span className="search">
            <select value={criteria} onChange={setCriteriaChange}
                    style={{padding: '5px', margin: '5px'}}>
                <option value={"All"}>All</option>
                <option value={"id"}>ID</option>
                <option value={"name"}>Name</option>
                <option value={"author"}>Author</option>
                <option value={"year"}>Year</option>
            </select>
            <input
                placeholder="Search..."
                value={searchInput}
                onChange={setSearchIn}
            />
        </span>
    );
})

export default Search;