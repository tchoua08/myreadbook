 
 
 import SearchBook from "./SearchBook";
 
 export default function SearchPage({ onClose , results, onSearch, onUpdateShelf}) {
   return (
 <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={onClose}
            >
              Close
            </a>
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
                <SearchBook key={book.id} book={book} onUpdateShelf={onUpdateShelf} />  
                ))}
            </ol>
          </div>
        </div>
    );
}