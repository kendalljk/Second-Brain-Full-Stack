import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navigation from "./components/Navigation";
import LoadingPage from "./pages/LoadingPage";
import CreateNote from "./pages/CreateNote";
import BookList from "./pages/BookList";
import BookSearch from "./pages/BookSearch";
import { useState } from "react";

function App() {
    const [bookData, setBookData] = useState([]); //booksearch buttons only appear when length > 0
    const [bookIndex, setBookIndex] = useState(0); // ensures displays first result each time
    const location = useLocation();
    const isOnLoadingPage = location.pathname === "/"; //sets path for loading page

    return (
        <>
            {!isOnLoadingPage && <Navigation />}
            {/* if user is on loading page, navigation tab does not display */}
            <Routes>
                <Route path="/" element={<LoadingPage />}></Route>
                <Route path="/home" element={<Homepage />} />
                <Route
                    path="/booksearch"
                    element={
                        <BookSearch
                            bookData={bookData}
                            setBookData={setBookData}
                            bookIndex={bookIndex}
                            setBookIndex={setBookIndex}
                        />
                    }
                >
                    <Route
                        path="/booksearch/:query"
                        element={
                            <BookList
                                bookData={bookData}
                                bookIndex={bookIndex}
                            />
                        }
                    />
                </Route>
                <Route path="/create_note" element={<CreateNote />} />
            </Routes>
        </>
    );
}

export default App;
