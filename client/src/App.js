import "./App.css";
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { BookProvider } from "./contexts/BookContext";
import Homepage from "./pages/Homepage";
import Navigation from "./components/Navigation";
import LoadingPage from "./pages/LoadingPage";
import CreateNote from "./pages/CreateNote";
import BookList from "./pages/BookList";
import BookSearch from "./pages/BookSearch";
import AddNote from "./pages/AddNote";
import DisplayNotes from "./pages/DisplayNotes";

function App() {
    const [page, setPage] = useState(1); // ensures displays first result each time
    const location = useLocation();
    const isOnLoadingPage = location.pathname === "/"; //sets path for loading page

    return (
        <>
            {!isOnLoadingPage && <Navigation />}
            {/* if user is on loading page, navigation tab does not display */}
            <BookProvider>
                <Routes>
                    <Route path="/" element={<LoadingPage />}></Route>
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/booksearch" element={<BookSearch />}>
                        <Route
                            path="/booksearch/:query"
                            element={<BookList />}
                        />
                    </Route>
                    <Route path="/create_note" element={<CreateNote />} />
                    <Route path="/add_note" element={<AddNote />} />
                    <Route path="/my_notes" element={<DisplayNotes />} />
                </Routes>
            </BookProvider>
        </>
    );
}

export default App;
