import "./App.css";
import { useEffect, useState } from "react";
import { getAll, update,search } from "./BooksAPI";
import BookList from "./components/BookList";
import SearchPage from "./components/SearchPage";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch books from API or perform other side effects here
    getAll().then((books) => setBooks(books));
  }, []);

   // mettre a jour les livres lorsqu'on change de etagere
   const updateBookShelf = (updatedBook, newShelf) => {
   update(updatedBook, newShelf).then(() => {
     // Mettre a jour l'etat local des livres
     setBooks((prevBooks) => {
       // Verifier si le livre existe deja dans l'etat
       const bookExists = prevBooks.some((book) => book.id === updatedBook.id);
       if (bookExists) {
         // Mettre a jour l'etagere du livre existant
         return prevBooks.map((book) =>
           book.id === updatedBook.id ? { ...book, shelf: newShelf } : book
         );
       } else {
         // Ajouter le nouveau livre avec la bonne etagere
         return [...prevBooks, { ...updatedBook, shelf: newShelf }];
       }
     });
   });  
  }
  // recherche des livres
  const searchBooks = (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    search(query, 20).then((results) => {
      if (results.error) {
        setSearchResults([]);
      } else {
        // Mettre a jour les resultats de recherche avec les etageres correctes
        const updatedResults = results.map((result) => {
          const bookInShelf = books.find((book) => book.id === result.id);
          return bookInShelf ? { ...result, shelf: bookInShelf.shelf } : result;
        });
        setSearchResults(updatedResults);
      }
    });
  }

  return (
    <div className="app">
      {showSearchPage ? (
       <SearchPage 
       results={searchResults} 
       onSearch={searchBooks} 
       onUpdateShelf={updateBookShelf}
       onClose={() => setShowSearchpage(false) } 
       />
      ) : (
       <BookList
        updateBookShelf={updateBookShelf}
        books={books} 
        onOpenSearch={() => setShowSearchpage(true)} />
      )}
    </div>
  );
}

export default App;
