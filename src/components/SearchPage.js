 
 
 import SearchBook from "./SearchBook";
 import { Link } from "react-router-dom";
 
 export default function SearchPage({ results, onSearch, onUpdateShelf}) {
   return (
 <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to="/"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {results.map((book) => ( 
                   <li key={book.id}>
                     <SearchBook key={book.id} book={book} onUpdateShelf={onUpdateShelf} />  
                   </li>   
                ))}
            </ol>
          </div>
        </div>
    );
}