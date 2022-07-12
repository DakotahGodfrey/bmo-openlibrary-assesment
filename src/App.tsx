/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Search, SearchResults } from "./components/Search";
import { Docs } from "./types/react-app-env";
import { getBookCover, getBooksByTitle } from "./utils/search";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
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
      <div>
        <Search searchHandler={handleSearch} value={searchTerm} />
      </div>

      <main>
        {searchTerm === "" ? (
          <h2>Please enter a search term</h2>
        ) : loading === "idle" && books.length >= 1 ? (
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
    </div>
  );
}

export default App;
