import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import leftArrow from "../icons/left-arrow.png";
import rightArrow from "../icons/right-arrow.png";

const BookSearch = ({ bookData, setBookData, page, setPage }) => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useState({
        bookTitle: "",
        authorName: "",
    });

    const [lastSearchParams, setLastSearchParams] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        return () => {
            setBookData([]); // Clears bookData array when component unmounts so buttons dissappear when no books are displayed
        };
    }, []);

    useEffect(() => {
        if (lastSearchParams.bookTitle || lastSearchParams.authorName) {
            fetchBooks(lastSearchParams, page);
        }
    }, [page]); //fetches new bookData when page changes

    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrevClick = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

  const fetchBooks = async ({ bookTitle, authorName }, page) => {
          console.log("Fetching books for page:", page);

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

        const OPEN_LIBRARY_API = `https://openlibrary.org/search.json?${querySearch}&limit=5&page=${page}`;

        try {
          const response = await axios.get(OPEN_LIBRARY_API);
          console.log("API response", response.data)
            const data = response.data;
            const bookResults = data.docs;
            const bookDataWithCover = [];

            for (let i = 0; i < bookResults.length; i++) {
                const book = bookResults[i];
                const key = book.key;
                const title = book.title;
                const author = book.author_name
                    ? book.author_name[0]
                    : "Unknown Author";
                if (book.cover_i) {
                    const COVER_LIBRARY_API = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
                    bookDataWithCover.push({
                        key: key,
                        title: title,
                        author: author,
                        coverArtUrl: COVER_LIBRARY_API,
                    });
                }
            }
            setBookData(bookDataWithCover);
            navigate(`/booksearch/${bookTitle ? bookTitle : authorName}`);
        } catch (error) {
            console.log("Error while fetching books:", error);
        } finally {
            setSearchParams({
                bookTitle: "",
                authorName: "",
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchBooks(searchParams, 1); // Start from page 1 when a new search is performed
        setLastSearchParams(searchParams);
        setSearchParams({
            bookTitle: "",
            authorName: "",
        });
    };

    return (
        <Container
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Outlet bookData={bookData} />
            {bookData.length > 0 && (
                <div className="d-flex justify-content-center mt-3">
                    <Button className="booklist-button">
                        <img
                            src={leftArrow}
                            alt="left arrow"
                            onClick={handlePrevClick}
                        />
                    </Button>
                    <Button
                        className="booklist-button"
                        onClick={handleNextClick}
                    >
                        <img src={rightArrow} alt="right arrow" />
                    </Button>
                </div>
            )}
            {/* div containing buttons only appears if books are being displayed */}
            <div
                className="justify-content-center"
                style={{
                    width: "40%",
                    marginTop: bookData.length > 0 ? "3rem" : "11%",
                }}
            >
                <h6 className="text-center formTitle">Search for Book</h6>
                <Form
                    className="bookSearchForm"
                    onSubmit={handleSubmit}
                    style={{
                        boxShadow: "10px 10px 10px 5px rgba(0, 0, 0, 0.2)",
                        height: "50%",
                    }}
                >
                    <Form.Group className="" controlId="formBookTitle">
                        <Form.Control
                            className="mt-3"
                            type="text"
                            name="bookTitle"
                            placeholder="Title"
                            value={searchParams.bookTitle}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="" controlId="formAuthorName">
                        <Form.Control
                            className="mt-3"
                            type="text"
                            name="authorName"
                            placeholder="Author"
                            value={searchParams.authorName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button
                            className="search-button my-4"
                            variant="primary"
                            type="submit"
                        >
                            Search
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default BookSearch;
