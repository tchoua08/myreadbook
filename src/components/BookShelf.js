 
    import Book from "./Book";
    export default function BookShelf({ title, books, updateBookShelf }) {   
   return ( <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.map((book) => (
                      <li key={book.id}>
                      <Book 
                      book={book}
                      onUpdateShelf={updateBookShelf} />
                      </li>
                    ))} 
                  </ol>
                </div>
              </div>
             
            </div>
        
           );
       }   