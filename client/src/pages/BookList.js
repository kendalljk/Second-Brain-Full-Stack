import React, { useEffect, useState } from "react";
import { Container, Col, Row, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import addIcon from "../icons/add-icon.png";

const BookList = ({
  bookData,
  page,
  myNote,
  setMyNote,
  setToReadList,
}) => {
  const navigate = useNavigate();
  const booksPerPage = 5;
  const start = (page - 1) * booksPerPage;
  const end = start + booksPerPage;

  console.log("BookList Book Data", bookData)
  console.log("Page", page)

  const navToNote = (book) => {
    const selectedBookData = {
      key: book.key,
      title: book.title,
      author: book.author,
      coverArtUrl: book.coverArtUrl,
    };
    console.log("Selected Book Data:", selectedBookData);
    setMyNote((prevNote) => ({
      ...prevNote,
      ...selectedBookData,
    }));
    navigate(`/createnote/${encodeURIComponent(book.title)}`);
  };

  const [showAlert, setShowAlert] = useState(false);
  const addToTBR = (book) => {
    const selectedBookData = {
      key: book.key,
      title: book.title,
      author: book.author,
      coverArtUrl: book.coverArtUrl,
    };
    setToReadList((prevReadList) => [...prevReadList, selectedBookData]);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const [buttonMessage, setButtonMessage] = useState("");
  const [hoveredBook, setHoveredBook] = useState(null);
  const handleMouseEnter = (key) => {
    setHoveredBook(key);
    document.getElementById(`addToTBR-${key}`).classList.add("expanded");
    setTimeout(() => {
      setButtonMessage("+ TBR");
    }, 400);
  };
  //expands first, then displays message

  const handleMouseLeave = (key) => {
    setHoveredBook(null);
    const button = document.getElementById(`addToTBR-${key}`);
    if (button) {
      setButtonMessage("");
    }
    setTimeout(() => {
      button.classList.remove("expanded");
    }, 100);
  };
  //removes message first, then expanded

  return (
    <Container className="text-center">
      {showAlert && (
        <Alert
          className="fadeOutRight"
          variant="success"
          onClose={() => {
            setShowAlert(false);
          }}
          dismissible={true}
        >
          Book was added to your TBR list!
        </Alert>
      )}
      <Row className="d-flex justify-content-center">
        {bookData.slice(start, end).map((book) => (
          <Col className="d-flex justify-content-center" key={book.key}>
            <Card
              className="bookCard"
              style={{
                width: "12rem",
                height: "21rem",
                boxShadow: "5px 2px 5px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Img
                className="bookImg"
                variant="top"
                src={book.coverArtUrl}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "13rem",
                }}
              />
              <Card.Body
                style={{
                  padding: "2% 0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Card.Title as="h6">{book.title}</Card.Title>
                <Card.Text>By: {book.author}</Card.Text>
              </Card.Body>
              <Button
                id={`addToTBR-${book.key}`} // ensures styling applies to specific button hovered over
                variant="outline-primary"
                onClick={() => addToTBR(book)}
                onMouseEnter={() => handleMouseEnter(book.key)}
                onMouseLeave={() => handleMouseLeave(book.key)}
                style={{
                  position: "absolute",
                  top: "2%",
                  right: "5%",
                  border: "none",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "100%",
                  backgroundColor: "#08090AC1",
                  textAlign: "left",
                }}
              >
                <img
                  src={addIcon}
                  alt="Add to Read List"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    height: "2rem",
                    width: "2rem",
                  }}
                />
                {hoveredBook === book.key && buttonMessage}
              </Button>
              <Button variant="outline-primary" onClick={() => navToNote(book)}>
                Add a note
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;
