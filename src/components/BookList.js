    
    import BookShelf from "./BookShelf";
    
    export default function BookList({ books, onOpenSearch, updateBookShelf }) {
      return (
    <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
                <BookShelf  title="Currently Reading" books={books.filter(book => book.shelf === "currentlyReading")} updateBookShelf={updateBookShelf} />
                <BookShelf  title="Want to Read" books={books.filter(book => book.shelf === "wantToRead")} updateBookShelf={updateBookShelf} />
                <BookShelf  title="Read" books={books.filter(book => book.shelf === "read")} updateBookShelf={updateBookShelf}  /> 
            </div>
          </div>
          <div className="open-search">
            <a onClick={onOpenSearch}>Add a book</a>
          </div>
        </div>
        );
    }