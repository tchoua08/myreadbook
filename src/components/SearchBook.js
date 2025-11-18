import Book from "./Book";

export default function SearchBook({ book, onUpdateShelf }) {   
    return ( 
        <li key={book.id}>
            <Book book={book} onUpdateShelf={onUpdateShelf} />
        </li>   
     );}