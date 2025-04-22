import '../App.css';
import {memo, useCallback, useEffect, useRef, useState} from "react";

const AddEditBook = memo((props) => {
    const {type, books, bookID, setBooks, setBookID, setDialog, dialog,setSortedData} = props;

    const [book, setBook] = useState({
        name: dialog.name ?? "",
        author: dialog.author ?? "",
        year: dialog.year ?? "",
        count: dialog.count ?? ""
    });
    const nameRef = useRef(null);
    const authorRef = useRef(null);
    const yearRef = useRef(null);
    const countRef = useRef(null);
    const [nameInfo, setNameInfo] = useState(false);
    const [authorInfo, setAuthorInfo] = useState(false);
    const [yearInfo, setYearInfo] = useState(false);
    const [countInfo, setCountInfo] = useState(false);

    const setHandler = useCallback((e, book, setBook) => {
        e.preventDefault();
        setBook({...book, [e.target.name]: e.target.value});
    }, [])

    const editBook = useCallback((e, dialog, books, setBooks, setDialog, book) => {
        e.preventDefault();
        const isValidForm = formValidation(book);
        if(isValidForm) {
            setBooks(prevBooks => {
                const findIndex = prevBooks.findIndex(book => book.id === dialog.id);
                const updatedBooks = [
                    ...prevBooks.slice(0, findIndex),
                    {
                        ...book,
                        id: dialog.id,
                        checked: dialog.checked
                    },
                    ...prevBooks.slice(findIndex + 1)
                ];
                setSortedData(updatedBooks);
                return updatedBooks;
            });
            setDialog(null);
        }
    }, []);


    const formValidation =  useCallback((book)=> {
        setNameInfo(false);
        setAuthorInfo(false);
        setYearInfo(false);
        setCountInfo(false);

        const nameC = /\w+$/.test(book.name);
        const authorC = /\w+$/.test(book.author);
        const yearC = /\d+/.test(book.year);
        const countC = /\d+/.test(book.count);

        if(!countC){
            setCountInfo(true);
            countRef.current.focus();
        }
        if(!yearC){
            setYearInfo(true);
            yearRef.current.focus();
        }
        if(!authorC){
            setAuthorInfo(true);
            authorRef.current.focus();
        }

        if (!nameC) {
            setNameInfo(true);
            nameRef.current.focus();
        }
        return nameC && authorC && yearC && countC;
    },[])

    const addBook = useCallback((e, bookID, books, setBooks, setBookID, setDialog, book) => {
        e.preventDefault();
        const isValidForm = formValidation(book);
        if(isValidForm){
            const newBook = {...book, id: bookID, checked: 0, isRemoved: false};
            setBooks(prevBooks => {
                const updatedBooks = [...prevBooks, newBook];
                setSortedData(updatedBooks);
                return updatedBooks;
            });
            setBookID(bookID + 1);
            setDialog(null);
        }
    }, []);

    return (
        <div className="modal">
            <form className="modal-content"
                  onSubmit={(e) => type.current === "Add" ? addBook(e, bookID, books, setBooks, setBookID, setDialog, book) :
                      editBook(e, dialog, books, setBooks, setDialog, book)}
            >
                <h1>{type.current === "Add" ? "Add" : "Edit"} Book</h1>

                <input ref={nameRef} autoFocus={true} name={"name"} placeholder={"Enter Book Name"}
                       onChange={(e) => setHandler(e, book, setBook)}
                       value={book.name}/>
                {nameInfo && <p className={"error"}>Enter valid name</p>}

                <input ref={authorRef} name={"author"} placeholder={"Enter author name"}
                       onChange={(e) => setHandler(e, book, setBook)}
                       value={book.author}/>
                {authorInfo && <p className={"error"}>Enter valid author name</p>}

                <input type={"number"} ref={yearRef} name={"year"} placeholder={"Enter Year"}
                       onChange={(e) => setHandler(e, book, setBook)}
                       value={book.year}/>
                {yearInfo && <p className={"error"}>Enter valid year</p>}

                <input type={"number"} ref={countRef} name={"count"} placeholder={"Enter Count"}
                       onChange={(e) => setHandler(e, book, setBook)}
                       value={book.count}/>
                {countInfo && <p className={"error"}>Enter valid count</p>}

                <div className={"action-btn"}>
                    <button>{type.current === "Edit" ? "Save" : "Add"}</button>
                    <button onClick={() => setDialog(null)}>Cancel</button>
                </div>
            </form>
        </div>
    )
})

export default AddEditBook;