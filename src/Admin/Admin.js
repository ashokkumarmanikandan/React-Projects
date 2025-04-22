import '../App.css';
import {Context} from "../App";
import {memo, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import AddEditBook from "../Components/AddEditBook";
import ListItems from "../Components/ListItems";
import Search from "../Components/Search";
import SortedData from "../Components/SortedData";
import {sortHandler} from "../Components/utils";
import AdminNav from "../Components/AdminNav";

 const Admin = memo(()=>{
    const {books, setBooks, bookID, setBookID,currentUser} = useContext(Context);
    const [dialog, setDialog] = useState(false);
    const type = useRef(null);
    const [sortedData, setSortedData] = useState(books);
    const [searchInput, setSearchInput] = useState("");
    const [criteria, setCriteria] = useState("All");
    const [sort, setSort] = useState("ID-Asc");

    const addBooks = useCallback(() => {
        setDialog(true);
        type.current = "Add";
    }, [])

    useEffect(() => {
        const sorted = sortHandler([...books], sort);
        setSortedData(sorted);
    }, [books, sort]);

    const commonProps = {books, setBooks, bookID, setBookID, dialog, setDialog, type, sortedData, setSortedData,sort,setSort};

    return (
        <div className="app">
            <AdminNav/>
            <Search searchInput={searchInput} setCriteria={setCriteria} setSearchInput={setSearchInput} criteria={criteria}/>
            <button onClick={addBooks}>Add book</button>
            <SortedData sort={sort} setSort={setSort}/>
            {dialog && <AddEditBook {...commonProps}/>}
            <ListItems searchInput={searchInput} {...commonProps} userType={"Admin"} criteria={criteria}/>
        </div>
        )
})

export default Admin;