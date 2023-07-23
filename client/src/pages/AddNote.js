import React, { useState, useContext, useEffect } from "react";
import { BookContext } from "../contexts/BookContext";

const AddNote = () => {
  const { state, dispatch } = useContext(BookContext);
  console.log(state);

  return (
    
    <div>
      <img src={state.bookData.bookCover} alt={state.bookData.bookTitle}/>
    </div>
  )
};

export default AddNote;
