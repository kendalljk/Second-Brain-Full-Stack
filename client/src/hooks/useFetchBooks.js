import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ACTION_TYPES } from "../hooks/useReducer";
import { BookContext } from "../contexts/BookContext";

const OPEN_LIBRARY_API = "https://openlibrary.org/search.json";
const COVER_LIBRARY_API = "https://covers.openlibrary.org/b/id/";

const useFetchBooks = ({ bookTitle, authorName }, page, submitting) => {
    const [booksReturned, setBooksReturned] = useState([]);
    const { state, dispatch } = useContext(BookContext);

    const fetchData = async (page, querySearch, bookDataWithCover) => {
        const OPEN_LIBRARY_API_URL = `${OPEN_LIBRARY_API}?${querySearch}&limit=10&page=${page}&jscmd=data`;
        try {
            const response = await axios.get(OPEN_LIBRARY_API_URL);
            const data = response.data;
            const bookResults = data.docs;

            for (let i = 0; i < bookResults.length; i++) {
                const book = bookResults[i];
                const key = book.key;
                const title = book.title;
                const author = book.author_name
                    ? book.author_name[0]
                    : "Unknown Author";
                if (book.cover_i) {
                    const COVER_API_URL = `${COVER_LIBRARY_API}${book.cover_i}-L.jpg`;
                    bookDataWithCover.push({
                        key: key,
                        title: title,
                        author: author,
                        coverArtUrl: COVER_API_URL,
                    });
                }

                if (bookDataWithCover.length >= 5) {
                    break;
                }
            }

            // If we have less than 5 books with covers, fetch the next page
            if (bookDataWithCover.length < 5) {
                return fetchData(page + 1, querySearch, bookDataWithCover);
            }
        } catch (error) {
            console.log("Error while fetching books:", error);
            dispatch({ type: ACTION_TYPES.ERROR_FETCH_COVER });
        }
    };

    useEffect(() => {
        if (submitting) {
            const fetchBooks = async () => {
                console.log("Fetching books for page:", page);
                dispatch({ type: ACTION_TYPES.START_FETCH_COVER });

                let querySearch = "";
                if (bookTitle && authorName) {
                    querySearch = `q=${encodeURIComponent(
                        bookTitle
                    )}&author=${encodeURIComponent(authorName)}`;
                } else if (bookTitle) {
                    querySearch = `title=${encodeURIComponent(bookTitle)}`;
                } else if (authorName) {
                    querySearch = `author=${encodeURIComponent(authorName)}`;
                }

                const bookDataWithCover = [];

                await fetchData(page, querySearch, bookDataWithCover);

                setBooksReturned(bookDataWithCover);
                dispatch({
                    type: ACTION_TYPES.SUCCESS_FETCH_COVER,
                    payload: bookDataWithCover,
                });
            };

            fetchBooks();
        }
    }, [bookTitle, authorName, page, submitting, dispatch]);

    return { booksReturned, setBooksReturned};
};

export default useFetchBooks;
