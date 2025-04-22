const sortHandler = (bookItems, sortId ) => {
    switch (sortId) {
        case "ID-Asc":
            bookItems.sort((a, b) => a.id - b.id);
            break;
        case "ID-Dsc":
            bookItems.sort((a, b) => b.id - a.id);
            break;
        case "Name-Asc":
            bookItems.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "Name-Dsc":
            bookItems.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "Auth-Asc":
            bookItems.sort((a, b) => a.author.localeCompare(b.author));
            break;
        case "Auth-Dsc":
            bookItems.sort((a, b) => b.author.localeCompare(a.author));
            break;
        case "Year-Asc":
            bookItems.sort((a, b) => a.year - b.year);
            break;
        case "Year-Dsc":
            bookItems.sort((a, b) => b.year - a.year);
            break;
    }
    return bookItems
}

const getISTDateTime = () =>{
    return new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"});
}

export {sortHandler,getISTDateTime};