/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Docs } from "./types/react-app-env";
import { getBookCover, getBooksByTitle } from "./utils/search";

interface ISearchProps {
  searchHandler: (e: { target: { value: string } }) => void;
  value: string;
}
const Search: React.FC<ISearchProps> = ({ searchHandler, value }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type='search'
        name='search'
        id='search'
        value={value}
        onChange={(e) => searchHandler(e)}
      />
    </form>
  );
};

interface IResultProps {
  title: string;
  authorName: string;
  isbn?: string;
}

const Result: React.FC<IResultProps> = ({ title, authorName, isbn }) => {
  return (
    <div>
      <p>
        <strong>{title}</strong>
      </p>
      <p>Author: {authorName}</p>
      {isbn && <img src={getBookCover(isbn, "M")} alt={`cover of ${title}`} />}
    </div>
  );
};
interface ISearchResultsProps {
  books: Docs[];
}

const SearchResults: React.FC<ISearchResultsProps> = ({ books }) => {
  return (
    <ul>
      {books.map(({ title, isbn, author_name }) => (
        <li key={isbn ? isbn[0] : title}>
          <Result
            title={title}
            authorName={author_name ? author_name[0] : ""}
            isbn={isbn ? isbn[0] : ""}
          />
        </li>
      ))}
    </ul>
  );
};
function App() {
  const [searchTerm, setSearchTerm] = useState<string>("harry potter");
  const [books, setBooks] = useState<Docs[]>([]);
  const [loading, setLoading] = useState<"searching" | "idle" | "error">(
    "idle"
  );

  useEffect(() => {
    const getInitialBooks = async () => {
      setLoading("searching");
      const results = await getBooksByTitle(searchTerm);
      if (results.numFound === 0) {
        setLoading("error");
        return;
      }
      setBooks(results.docs);
      setLoading("idle");
    };
    getInitialBooks();
  }, [searchTerm]);
  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className='app'>
      {/* Header Component */}
      {/* Search Input */
      /*Filter Dropdown */}
      <div>
        <Search searchHandler={handleSearch} value={searchTerm} />
      </div>
      <main>
        {loading === "idle" && books.length >= 1 ? (
          <div>
            <p>Results: {books.length}</p>
            <SearchResults books={books} />
          </div>
        ) : loading === "error" ? (
          <h2>No Results</h2>
        ) : (
          <h2>Searching</h2>
        )}
      </main>
      {/* Results Feed */}
      {/* Page Selection */}
    </div>
  );
}

export default App;
