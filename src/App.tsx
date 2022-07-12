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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getInitialBooks = async () => {
      setLoading(true);
      setBooks(await getBooksByTitle(searchTerm));
      setLoading(false);
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
        <p>searchTerm: {searchTerm}</p>
        <p>Results: </p>
      </div>
      <main>
        {!loading && books.length >= 1 ? (
          <SearchResults books={books} />
        ) : (
          <h2>Loading</h2>
        )}
      </main>
      {/* Results Feed */}
      {/* Page Selection */}
    </div>
  );
}

export default App;
