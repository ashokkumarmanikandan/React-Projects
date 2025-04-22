import {memo, useEffect} from "react";
import '../App.css'
import Search from "../Components/Search";
import SortedData from "../Components/SortedData";
import ListItems from "../Components/ListItems";
import {useState, useContext} from "react";
import {Context} from "../App";
import UserNav from "../Components/UserNav";
import {sortHandler} from "../Components/utils";


const Favourites = memo(() => {
    const {books, setBooks, currentUser, setCurrentUser} = useContext(Context);

    const currentUserCheck = currentUser;

    const [sortedData, setSortedData] = useState(books);
    const [searchInput, setSearchInput] = useState("");
    const [sort, setSort] = useState("ID-Asc");
    const [criteria, setCriteria] = useState("All");

    useEffect(() => {
        const currentUserFav = books.filter((book) => currentUser.fav.includes(book.id));
        const sorted = sortHandler([...currentUserFav], sort);
        setSortedData(sorted);
        console.log(books);
        console.log(sorted);
    }, [sort, currentUser.fav,books]);

    const commonProps = {books, setBooks, sortedData, setSortedData, sort, setSort, currentUser, setCurrentUser};

    return (
        <div className="App">
                <UserNav/>
                <Search searchInput={searchInput} setCriteria={setCriteria} setSearchInput={setSearchInput}
                        criteria={criteria}/>
                <SortedData sort={sort} setSort={setSort}/>
                {sortedData.length === 0 ? (
                        <p className={"validation-error"}>You haven't added any favourites yet</p>) :
                    (<ListItems searchInput={searchInput} {...commonProps} userType={"user-fav"} criteria={criteria}/>)
                }
            </div>
    )})

export default Favourites;
