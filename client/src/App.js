import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navigation from "./components/Navigation";
import LoadingPage from "./pages/LoadingPage";
import CreateNote from "./pages/CreateNote";

function App() {
    const location = useLocation();
    const isOnLoadingPage = location.pathname === "/";
    //sets path for loading page

    return (
        <>
            {!isOnLoadingPage && <Navigation />}
            {/* if user is on loading page, navigation tab does not display */}
            <Routes>
                <Route path="/" element={<LoadingPage />}></Route>
                <Route path="/home" element={<Homepage />} />
                <Route path="/add_note" element={<CreateNote />} />
            </Routes>
        </>
    );
}

export default App;
