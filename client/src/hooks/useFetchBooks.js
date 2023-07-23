import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ACTION_TYPES } from "../hooks/useReducer";
import { BookContext } from "../contexts/BookContext";

const OPEN_LIBRARY_API = "https://openlibrary.org/search.json";
const COVER_LIBRARY_API = "https://covers.openlibrary.org/b/id/";
const BOOKS_LIMIT = 5;

const useFetchBooks = ({ bookTitle, authorName }, page, submitting) => {
    const [booksReturned, setBooksReturned] = useState([]);
    const { state, dispatch } = useContext(BookContext);

    const buildBookData = (book) => {
        const key = book.key;
        const title = book.title;
        const author = book.author_name
            ? book.author_name[0]
            : "Unknown Author";
        const COVER_API_URL = `${COVER_LIBRARY_API}${book.cover_i}-L.jpg`;
        return {
            key: key,
            title: title,
            author: author,
            coverArtUrl: COVER_API_URL,
        };
    };

    const fetchData = async (page, querySearch, bookDataWithCover, source) => {
        const OPEN_LIBRARY_API_URL = `${OPEN_LIBRARY_API}?${querySearch}&limit=10&page=${page}&jscmd=data`;
        try {
            const response = await axios.get(OPEN_LIBRARY_API_URL, {
                timeout: 5000,
                cancelToken: source.token,
            });

            for (let book of response.data.docs) {
                if (book.cover_i) {
                    bookDataWithCover.push(buildBookData(book));
                }
                if (bookDataWithCover.length >= BOOKS_LIMIT) {
                    break;
                }
            }

            if (bookDataWithCover.length < BOOKS_LIMIT) {
                return fetchData(
                    page + 1,
                    querySearch,
                    bookDataWithCover,
                    source
                );
            }
        } catch (error) {
            console.log("Error while fetching books:", error);
            dispatch({ type: ACTION_TYPES.ERROR_FETCH_COVER });
        }
    };

    useEffect(() => {
        let source = axios.CancelToken.source();

        if (submitting) {
            const fetchBooks = async () => {
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
                try {
                    await fetchData(
                        page,
                        querySearch,
                        bookDataWithCover,
                        source
                    );
                    setBooksReturned(bookDataWithCover);
                    dispatch({
                        type: ACTION_TYPES.SUCCESS_FETCH_COVER,
                        payload: bookDataWithCover,
                    });
                } catch (error) {
                    if (axios.isCancel(error)) {
                        console.log("Request cancelled:", error);
                    } else {
                        console.log("Error while fetching books:", error);
                        dispatch({ type: ACTION_TYPES.ERROR_FETCH_COVER });
                    }
                }
            };

            fetchBooks();
        }

        return () => {
            source.cancel("Request cancelled");
        };
    }, [bookTitle, authorName, page, submitting, dispatch]);

    return { booksReturned, setBooksReturned };
};

export default useFetchBooks;
