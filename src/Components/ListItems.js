import '../App.css';
import {memo, useCallback, useEffect, useState} from "react";
import Favourite from '../Images/Favourite.png';
import unFavourite from '../Images/unFavourite.png';
import {getISTDateTime} from './utils';
import Description from "./Description";


const ListItems = memo((props) => {
            const {
                books,
                setBooks,
                userType,
                setDialog,
                type,
                sortedData,
                currentUser,
                setCurrentUser,
                searchInput,
                criteria
            } = props;

            const [emptyText, setEmptyText] = useState(null);
            const [desc, setDesc] = useState(false);

            const filteredBooks = () => {
                if (!searchInput) {
                    return sortedData;
                }
                if (criteria === "All") {
                    return [...sortedData.filter((book) =>
                        String(book["id"]).toLowerCase().includes(searchInput.toLowerCase()) ||
                        String(book["name"]).toLowerCase().includes(searchInput.toLowerCase()) ||
                        String(book["author"]).toLowerCase().includes(searchInput.toLowerCase()) ||
                        String(book["year"]).toLowerCase().includes(searchInput.toLowerCase())
                    )];
                }

                const lowerSearch = searchInput.toLowerCase();
                return sortedData.filter((book) => {
                    const value = book[criteria];
                    if (value === undefined || value === null) return false;
                    return value.toString().toLowerCase().includes(lowerSearch);
                });
            }


            const editHandler = useCallback((book, setDialog, type) => {
                setDialog(book);
                type.current = "Edit";
            }, []);

            const deleteHandler = useCallback((id, books, setBooks) => {
                setBooks(books.map((book) => {
                        if (book.id === id) {
                            return {...book, isRemoved: true};
                        }
                        return book;
                    }
                ));
            }, []);

            function checkBook(id) {
                const updatedUser = {
                    ...currentUser,
                    checkedBooks: [...currentUser.checkedBooks, {id: id, checkedTime: getISTDateTime(), returnedTime: ""}]
                };
                setCurrentUser(updatedUser);

                const updateBook = books.map((book) => {
                    if (book.id === id) {
                        return {...book, count: book.count - 1, checked: book.checked + 1};
                    }
                    return book;
                })
                setBooks(updateBook);
            }

            function returnBook(id) {
                const updatedUser = {
                    ...currentUser,
                    checkedBooks: currentUser.checkedBooks.map((book) => {
                        if (book.id === id && book.returnedTime === "") {
                            return {...book, returnedTime: getISTDateTime()}
                        }
                        return book;
                    }),
                }
                setCurrentUser(updatedUser);

                console.log(updatedUser);

                const updateBook = books.map((book) => {
                    if (book.id === id) {
                        return {...book, count: book.count + 1, checked: book.checked - 1};
                    }
                    return book;
                })
                setBooks(updateBook);
            }

            function addFav(id) {
                const updatedUser = {...currentUser, fav: [...currentUser.fav, id]};
                setCurrentUser(updatedUser);
            }

            function removeFav(id) {
                const updatedUser = {...currentUser, fav: currentUser.fav.filter((bookID) => bookID !== id)}
                setCurrentUser(updatedUser);
            }

            const output = userType === "Admin" || userType === "user-fav" || userType === "user" ? filteredBooks() : sortedData;

            useEffect(() => {
                if (sortedData.length === 0 && searchInput.length !== 0) setEmptyText(`No books found for "${searchInput}". Please try a different keyword.`);
                else if (sortedData.length === 0) setEmptyText("Books not available.")
                else if (output.length === 0) setEmptyText(`No books found for "${searchInput}". Please try a different keyword.`);
                else setEmptyText(null)
            }, [output]);

            const columns = ["ID", "Name", "Author", "Year"];
            if (userType === "Admin") {
                columns.push("Count", "Checked", "Actions");
            } else if (userType === "user-history") {
                columns.push("Checked Time", "Returned time");
            } else if (userType === "user-fav" || userType === "user") {
                columns.push("Favourite", "Action");
            }

            const loadConditionalRows = (book, isChecked, isFav) => {
                if (userType === "user-history") {
                    return (
                        <>
                            <td>{book.checkedTime}</td>
                            <td style={{color: book.returnedTime === "" ? "red" : "black"}}>
                                {book.returnedTime === "" ? "Not returned" : book.returnedTime}
                            </td>
                        </>
                    );
                }
                if (userType === "Admin") {
                    return (
                        <>
                            <td>{book.count}</td>
                            <td>{book.checked}</td>
                            <td>
                                <button onClick={() => editHandler(book, setDialog, type)}>Edit</button>
                                <button
                                    disabled={book.checked > 0}
                                    onClick={() => deleteHandler(book.id, books, setBooks)}
                                >
                                    Remove
                                </button>
                            </td>
                        </>
                    );
                }
                if (userType === "user" || userType === "user-fav") {
                    return (
                        <>
                            <td>
                                <img src={userType === "user-fav" ? Favourite : isFav ? Favourite : unFavourite}
                                     alt="fav-icon"
                                     style={{height: 20, width: 20, cursor: "pointer"}}
                                     onClick={() => {
                                         userType === "user-fav" ? removeFav(book.id) : isFav ? removeFav(book.id) : addFav(book.id);
                                     }}
                                />
                            </td>
                            <td>
                                <button
                                    onClick={() => isChecked ? returnBook(book.id) : checkBook(book.id)}>
                                    {isChecked ? "Return" : "Check"}
                                </button>
                            </td>
                        </>
                    )
                }
            }

            if (emptyText) {
                return <p className={"validation-error"}>{emptyText}</p>
            }

            function descHandler(book) {
                if (userType !== "user-history" && userType !== "deleted") {
                    setDesc(book);
                }
            }

            return (
                <>
                    <table style={{borderCollapse: "separate", borderSpacing: "0 15px"}}>
                        <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col}>{col}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {output.map((book, index) => {

                            let isChecked, isFav, count
                            const isBookRemoved = book.isRemoved;
                            let shouldShowRow = (userType === "user-history" || userType === "deleted" || !isBookRemoved);
                            if (!shouldShowRow) return null;

                            if (userType !== "user-history" && userType !== "deleted") {
                                isChecked = userType !== "Admin" && userType !== "user-history" && userType !== "deleted" &&
                                    currentUser.checkedBooks?.some((b) => book.id === b.id && b.returnedTime === "");
                                isFav = userType === "user" && currentUser.fav.includes(book.id);
                                count = book.count;
                                shouldShowRow = (((count === 0 && isChecked) || count !== 0) || userType === "user-history" || userType === "deleted" || userType === "Admin");
                                if (!shouldShowRow) return null;
                            }
                            return (
                                <tr key={userType === "user-history" ? index : book.id}>
                                    <td>{book.id}</td>
                                    <td className={userType === "Admin" || userType === "user" || userType === "user-fave" ? "desc" : ""}
                                        onClick={(e) => descHandler(book)}>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.year}</td>
                                    {loadConditionalRows(book, isChecked, isFav)}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    {desc && <Description book={desc} setBook={setDesc}/>}
                </>
            );
        }
    )
;

export default ListItems;
