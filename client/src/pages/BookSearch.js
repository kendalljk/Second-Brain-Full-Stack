import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../icons/left-arrow.png";
import rightArrow from "../icons/right-arrow.png";

const BookSearch = ({ bookData, setBookData, bookIndex, setBookIndex }) => {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        bookTitle: "",
        authorName: "",
    });

    useEffect(() => {
        return () => {
            setBookData([]); // Clears bookData array when component unmounts so buttons dissappear when no books are displayed
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNextClick = () => {
        setBookIndex((prevIndex) =>
            Math.min(prevIndex + 5, bookData.length - 5)
        );
    };

    useEffect(() => {
        console.log("Book Index", bookIndex);
    }, [bookIndex]);
    //ensures that state is updated to make handlePrevClick function correctly

    const handlePrevClick = () => {
        setBookIndex((prevIndex) => Math.max(prevIndex - 5, 0));
    };

    console.log("book data", bookData);

    const fetchBook = async (e) => {
        e.preventDefault();
        const { bookTitle, authorName } = formState;

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

        const OPEN_LIBRARY_API = `https://openlibrary.org/search.json?${querySearch}`;
        try {
            const response = await fetch(OPEN_LIBRARY_API);
            if (!response.ok) {
                throw new Error("Fetch Failed");
            }

            const data = await response.json();
            const bookResults = data.docs;
            console.log("Books from API:", bookResults);
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
            setBookIndex(0);

            navigate(`/booksearch/${bookTitle ? bookTitle : authorName}`);
        } catch (error) {
            console.log(error);
        } finally {
            setFormState({
                bookTitle: "",
                authorName: "",
            });
        }
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
                    onSubmit={fetchBook}
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
                            value={formState.bookTitle}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="" controlId="formAuthorName">
                        <Form.Control
                            className="mt-3"
                            type="text"
                            name="authorName"
                            placeholder="Author"
                            value={formState.authorName}
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
