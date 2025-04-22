import './App.css';
import User from "./User/User";
import Admin from "./Admin/Admin";
import {createContext, memo, useState} from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Favourites from "./User/Favourites";
import UserHistory from "./User/UserHistory";
import DeletedBooks from "./Admin/DeletedBooks";
import Login from './Login';
import Signup from './SignUp';
import PNF from "./Components/PNF";

export const Context = createContext(null);

const App = memo(()=> {
    const userDetails = [{id:1,Password:"Ashok",role:"Admin"},{id:2,Password:"Ashok",role:"user" ,checkedBooks:[], fav :[]}];
    const bookDetails  = [
        { id: 1, name: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, count: 5 ,checked:0, isRemoved : false},
        { id: 2, name: "1984", author: "George Orwell", year: 1949, count: 10 ,checked:10, isRemoved : false},
        { id: 5, name: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951, count: 10 ,checked:0, isRemoved : false},
        { id: 3, name: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, count: 0 ,checked:0, isRemoved : false},
        { id: 4, name: "Pride and Prejudice", author: "Jane Austen", year: 1813, count: 10 ,checked:0, isRemoved : false},
    ];
    const [users, setUsers] = useState(userDetails);
    const [books,setBooks] = useState(bookDetails);
    const [currentUser, setCurrentUser] = useState({id:2,Password:"Ashok",role:"user" ,checkedBooks:[], fav :[]});
    const [bookID, setBookID] = useState(6);

    return (
        <div className="App">
        <Context.Provider value={{users,setUsers,books,setBooks,currentUser, setCurrentUser,bookID,setBookID}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path={"signup"} element={<Signup setCurrentUser={setCurrentUser} setUsers={setUsers} users={users} />}/>
                    <Route path="/admin">
                        <Route path={""} element={<Admin />}></Route>
                        <Route path={"deletedBooks"} element={<DeletedBooks/>}></Route>
                    </Route>
                    <Route path="/user" >
                        <Route path="" element={<User />} />
                        <Route path={"favourites"} element={<Favourites />} />
                        <Route path={"history"} element={<UserHistory />} />
                    </Route>
                    <Route path={"/*"} element={<PNF />}></Route>
                </Routes>
            </BrowserRouter>
        </Context.Provider>
        </div>
    );
})

export default App;
