    
    import BookShelf from "./BookShelf";
    import { Link } from "react-router-dom";
    
    export default function BookList({ books, updateBookShelf }) {
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
            <Link to="/search">Add a book</Link>
          </div>
        </div>
        );
    }