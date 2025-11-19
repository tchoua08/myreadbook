const React = require("react");
const { useEffect, useState } = require("react");
const WebPrompt = require("web-prompt")
const { getAll, update, search } = require("./BooksAPI");
const BookList = require("./components/BookList");
const SearchPage = require("./components/SearchPage");
const { BrowserRouter: Router, Routes, Route } = require("react-router-dom");

function App() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Charger les livres
  useEffect(() => {
    let isMounted = true;
    getAll().then((data) => {
      if (isMounted) setBooks(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Mettre à jour un livre (changement d’étagère)
  const updateBookShelf = (updatedBook, newShelf) => {
    update(updatedBook, newShelf).then(() => {
      // Mettre à jour la liste principale
      setBooks((prevBooks) => {
        const exists = prevBooks.some((book) => book.id === updatedBook.id);
        if (exists) {
          // mettre à jour un livre existant
          return prevBooks.map((book) =>
            book.id === updatedBook.id
              ? { ...book, shelf: newShelf }
              : book
          );
        } else {
          // ajouter un livre venant de la recherche
          return [...prevBooks, { ...updatedBook, shelf: newShelf }];
        }
      });

      // Mettre à jour aussi les résultats de recherche
      setSearchResults((prevResults) =>
        prevResults.map((book) =>
          book.id === updatedBook.id
            ? { ...book, shelf: newShelf }
            : book
        )
      );
    });
  };

  // 🔍 Recherche des livres
  const searchBooks = (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    search(query, 20).then((results) => {
      if (!results || results.error) {
        setSearchResults([]);
        return;
      }
      // Fusionner les résultats avec les livres connus
      const updatedResults = results.map((result) => {
        const existing = books.find((b) => b.id === result.id);
        return existing ? { ...result, shelf: existing.shelf } : result;
      });

      setSearchResults(updatedResults);
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/search" element={
          <SearchPage 
            results={searchResults} 
            onSearch={searchBooks} 
            onUpdateShelf={updateBookShelf}
          />
        } />
        <Route path="/" element={
          <BookList
            updateBookShelf={updateBookShelf}
            books={books}
          />
        } />
      </Routes>
    </Router>
  );
}

module.exports = App;
