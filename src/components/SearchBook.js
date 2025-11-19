import Book from "./Book";

export default function SearchBook({ book, onUpdateShelf }) {   
    return ( 
            <Book book={book} onUpdateShelf={onUpdateShelf} />
     );}