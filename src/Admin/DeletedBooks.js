import {memo, useContext, useEffect, useState} from "react";
import ListItems from "../Components/ListItems";
import AdminNav from "../Components/AdminNav";
import {Context} from "../App";

const DeleteBooks = memo(()=>{
    const {books} = useContext(Context);
    const deletedBooks =  books.filter(book => book.isRemoved);
    const [sortedData] = useState(deletedBooks);

    return (
        <div className="app">
            <div className="App">
                <AdminNav/>
                {sortedData.length === 0 ? (<p className={"validation-error"}>🗑️ No books have been deleted.</p>):
                    (<ListItems userType={"deleted"} sortedData={sortedData}/>)
                }
            </div>
        </div>
    )
})

export default DeleteBooks;