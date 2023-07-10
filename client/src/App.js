import "./App.css";
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navigation from "./components/Navigation";
import LoadingPage from "./pages/LoadingPage";
import CreateNote from "./pages/CreateNote";
import BookList from "./pages/BookList";
import BookSearch from "./pages/BookSearch";
import { BookProvider } from "./contexts/BookContext";

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
                    <Route
                        path="/booksearch"
                        element={
                            <BookSearch
                                page={page}
                                setPage={setPage}
                            />
                        }
                    >
                        <Route
                            path="/booksearch/:query"
                            element={
                                <BookList page={page} />
                            }
                        />
                    </Route>
                    <Route path="/create_note" element={<CreateNote />} />
                </Routes>
            </BookProvider>
        </>
    );
}

export default App;
