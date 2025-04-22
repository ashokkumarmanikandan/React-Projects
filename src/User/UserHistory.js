import {memo, useContext, useEffect, useState} from "react";
import {Context} from "../App";
import ListItems from "../Components/ListItems";
import UserNav from "../Components/UserNav";

const UserHistory = memo(()=>{
    const {users, setUsers, books, setBooks,currentUser,setCurrentUser} = useContext(Context);
    const [sortedData, setSortedData] = useState(books);

    const history = currentUser.checkedBooks.reverse().map((userBook) =>{
        let findBook;
        books.find((book)=>{
            if(book.id === userBook.id){
                findBook = book;
            }
        })
        return {...findBook,checkedTime:userBook.checkedTime,returnedTime:userBook.returnedTime};
    }
    )

    useEffect(()=>{
        setSortedData(history)
    },[])


    return(
        <div className="app">
            <UserNav/>
            {sortedData.length === 0 ?(<p className={"validation-error"}>📚 You have no checked out books</p>):
                <ListItems sortedData={sortedData} userType={"user-history"}/>
            }
        </div>
    )
})

export default UserHistory;