import { Data } from "../types/react-app-env";

const defaultFields = ["author_name", "title", "isbn"];

export const getBooksByTitle = async (
  title: string,
  fields: string[] = defaultFields,
  limit: number = 10
) => {
  const query = `http://openlibrary.org/search.json?title=${title}&fields=${fields}&limit=${limit}`;
  const res = await fetch(query);
  const data: Data = await res.json();
  return data;
};

type Size = "S" | "M" | "L";

export const getBookCover = (isbn: string, size: Size = "S") => {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
};
