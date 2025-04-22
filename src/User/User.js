import '../App.css'
import Search from "../Components/Search";
import SortedData from "../Components/SortedData";
import ListItems from "../Components/ListItems";
import {useState, useContext, useEffect, memo} from "react";
import {Context} from "../App";
import UserNav from "../Components/UserNav";
import {sortHandler} from "../Components/utils";

const User = memo((props)=>{
    const { books, setBooks, currentUser, setCurrentUser} = useContext(Context);
    const [sortedData, setSortedData] = useState(books);
    const [searchInput, setSearchInput] = useState("");
    const [sort, setSort] = useState("ID-Asc");
    const [criteria, setCriteria] = useState("All");

    useEffect(() => {
        const sorted = sortHandler([...books], sort);
        setSortedData(sorted);
    }, [sort,books]);

    const commonProps = {books, setBooks, sortedData, setSortedData,sort,setSort,currentUser,setCurrentUser};

    return (
        <div className="App">
            <UserNav currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            <Search searchInput={searchInput} setCriteria={setCriteria} setSearchInput={setSearchInput} criteria={criteria}/>
            <SortedData sort={sort} setSort={setSort}/>
             <ListItems searchInput={searchInput} {...commonProps} userType={"user"} criteria={criteria}/>
        </div>
    )
})

export default User;