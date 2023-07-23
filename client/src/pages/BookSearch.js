import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import BookList from "./BookList";
import useFetchBooks from "../hooks/useFetchBooks";
import { BookContext } from "../contexts/BookContext";
import { useNavigate } from "react-router-dom";
import { ACTION_TYPES } from "../hooks/useReducer";
import leftArrow from "../icons/left-arrow.png";
import rightArrow from "../icons/right-arrow.png";

const BookSearch = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1); // ensures displays first result each time
    const [submitting, setSubmitting] = useState(false);

    const {
        state: { loading },
        dispatch,
    } = useContext(BookContext);

    const [searchParams, setSearchParams] = useState({
        bookTitle: "",
        authorName: "",
    });

    const [fetchParams, setFetchParams] = useState({
        bookTitle: "",
        authorName: "",
    });

    const { booksReturned, setBooksReturned } = useFetchBooks(
        fetchParams,
        page,
        submitting
    );

    useEffect(() => {
        setPage(1);
        setSearchParams({
            bookTitle: "",
            authorName: "",
        });
        setFetchParams({
            bookTitle: "",
            authorName: "",
        });
    }, []); // clears search params when page is mounted

    useEffect(() => {
        if (booksReturned.length > 0) {
            // If book data is successfully fetched and is not empty, reset search params
            setSearchParams({
                bookTitle: "",
                authorName: "",
            });
        }
    }, [booksReturned]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true); // triggers API call
        console.log("...fetching");
        setFetchParams(searchParams); // Set fetchParams as searchParams for the fetch call
        setSearchParams({ bookTitle: "", authorName: "" }); // Clear the search input fields
        dispatch({ type: ACTION_TYPES.START_FETCH_COVER }); // Dispatch action to start fetching covers

        const searchQuery =
            searchParams.bookTitle && searchParams.authorName
                ? `/bookSearch/${encodeURIComponent(
                      searchParams.bookTitle
                  )}&author=${encodeURIComponent(searchParams.authorName)}`
                : searchParams.bookTitle
                ? `/bookSearch/${encodeURIComponent(searchParams.bookTitle)}`
                : searchParams.authorName
                ? `/bookSearch/${encodeURIComponent(searchParams.authorName)}`
                : "/bookSearch";

        navigate(searchQuery); // Navigate to the book list page with the dynamic URL
    };

    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
        setSubmitting(true);
    };

    const handlePrevClick = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
        setSubmitting(true);
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <Container
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <BookList
                booksReturned={booksReturned}
                setBooksReturned={setBooksReturned}
            />
            {booksReturned.length > 0 && (
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
            <div
                className="justify-content-center"
                style={{
                    width: "40%",
                    marginTop: booksReturned.length > 0 ? "3rem" : "11%",
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
                            onChange={(e) =>
                                setSearchParams((prevState) => ({
                                    ...prevState,
                                    bookTitle: e.target.value,
                                }))
                            }
                        />
                    </Form.Group>
                    <Form.Group className="" controlId="formAuthorName">
                        <Form.Control
                            className="mt-3"
                            type="text"
                            name="authorName"
                            placeholder="Author"
                            value={searchParams.authorName}
                            onChange={(e) =>
                                setSearchParams((prevState) => ({
                                    ...prevState,
                                    authorName: e.target.value,
                                }))
                            }
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
