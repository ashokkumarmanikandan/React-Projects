import {memo} from "react";


const description = memo(({book,setBook})=>{

    console.log(book);

    function closeDesc() {
        setBook(null);
    }

    return (
        <div className="overlay" onClick={closeDesc}>
        <div className="description">
            <h1 style={{marginBottom:"30px"}}>Book Detail</h1>
            <label>Book ID : <span> {book.id}</span></label>
            <label>Book Name : <span>{book.name}</span></label>
            <label>Author Name : <span>{book.author}</span></label>
            <label>Published Year : <span>{book.year}</span></label>
            <button onClick={closeDesc}>Close</button>
        </div>
        </div>
    )
})

export default description;