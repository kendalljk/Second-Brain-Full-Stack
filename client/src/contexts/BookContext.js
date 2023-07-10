import React from "react";
import { createContext, useReducer } from "react";
import { INITIAL_STATE, reducer } from "../hooks/useReducer";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <BookContext.Provider value={{ state, dispatch }}>
            {children}
        </BookContext.Provider>
    );
};