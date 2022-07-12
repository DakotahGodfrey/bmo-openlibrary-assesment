import { Docs } from "../types/react-app-env";
import { getBookCover } from "../utils/search";

interface ISearchProps {
  searchHandler: (e: { target: { value: string } }) => void;
  value: string;
}
export const Search: React.FC<ISearchProps> = ({ searchHandler, value }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type='search'
        name='search'
        id='search'
        value={value}
        placeholder={value === "" ? "search" : ""}
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

export const SearchResults: React.FC<ISearchResultsProps> = ({ books }) => {
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
