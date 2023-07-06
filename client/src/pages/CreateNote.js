import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialFormState = {
    bookTitle: "",
    bookAuthor: "",
    bookSummary: "",
    bookGenre: "",
    bookQuotes: "",
    bookNotes: "",
    bookFinished: false,
    bookCover: "",
};

const CreateNote = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      console.log()
        const formDataForUploads = new FormData();
        formDataForUploads.append("bookCover", values.bookCover);

        const formDataForNotes = new FormData();

        try {
            // Upload file
            const uploadResponse = await axios.post(
                "/uploads",
                formDataForUploads
            );

            formDataForNotes.append("coverPath", uploadResponse.data.path);

            Object.entries(values).forEach(([key, value]) => {
                if (key !== "bookCover") {
                    formDataForNotes.append(key, value);
                }
            });

            await axios.post("/notes", formDataForNotes);

            resetForm();
        } catch (error) {
            console.error(`Failed to create note: ${error.message}`);
        }

        setSubmitting(false);
    };

    return (
        <div>
            <Formik
                initialValues={initialFormState}
                validationSchema={Yup.object({
                    bookTitle: Yup.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    bookAuthor: Yup.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    bookSummary: Yup.string()
                        .min(50, "Must be at least 50 characters")
                        .required("Required"),
                    bookGenre: Yup.string()
                        .oneOf([
                            "biography",
                            "business",
                            "contemporary",
                            "fantasy",
                            "historicalFiction",
                            "history",
                            "humor",
                            "mystery",
                            "nonFiction",
                            "personalDevelopment",
                            "philosophy",
                            "scienceFiction",
                            "youngAdult",
                        ])
                        .required("Select a genre"),
                    bookFinished: Yup.boolean(),
                    bookQuotes: Yup.string(),
                    bookNotes: Yup.string(),
                    bookCover: Yup.mixed(),
                })}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <label htmlFor="bookTitle">Book title</label>
                        <Field id="bookTitle" name="bookTitle" type="text" />
                        <ErrorMessage name="bookTitle" />

                        <label htmlFor="bookAuthor">Book author</label>
                        <Field id="bookAuthor" name="bookAuthor" type="text" />
                        <ErrorMessage name="bookAuthor" />

                        <label htmlFor="bookGenre">Book genre</label>
                        <Field
                            id="bookGenre"
                            name="bookGenre"
                            as="select"
                            className="bookGenre"
                        >
                            <option value="">Select a genre</option>
                            <option value="biography">
                                Biography/ Autobiography
                            </option>
                            <option value="business">Business</option>
                            <option value="contemporary">Contemporary</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="historicalFiction">
                                Historical Fiction
                            </option>
                            <option value="history">History</option>
                            <option value="humor">Humor</option>
                            <option value="mystery">Mystery/ Suspense</option>
                            <option value="nonfiction">Non-Fiction</option>
                            <option value="personalDevelopment">
                                Personal Development
                            </option>
                            <option value="philosophy">Philosophy</option>
                            <option value="scienceFiction">
                                Science Fiction
                            </option>
                            <option value="youngAdult">
                                Young Adult/ Teen
                            </option>
                            /
                        </Field>
                        <ErrorMessage name="bookGenre" />

                        <label htmlFor="bookSummary">Book summary</label>
                        <Field
                            id="bookSummary"
                            name="bookSummary"
                            as="textarea"
                            className="bookSummary"
                        />
                        <ErrorMessage name="bookSummary" />

                        <label htmlFor="bookQuotes">Book quotes</label>
                        <Field
                            id="bookQuotes"
                            name="bookQuotes"
                            as="textarea"
                            className="bookQuotes"
                        />

                        <label htmlFor="bookNotes">Book notes</label>
                        <Field
                            id="bookNotes"
                            name="bookNotes"
                            as="textarea"
                            className="bookNotes"
                        />

                        <label htmlFor="bookFinished">Book finished</label>
                        <Field
                            id="bookFinished"
                            name="bookFinished"
                            as="input"
                            type="checkbox"
                        />

                        <label htmlFor="bookCover">Add Book cover</label>
                        <input
                            id="bookCover"
                            name="bookCover"
                            type="file"
                            onChange={(event) => {
                                setFieldValue(
                                    "bookCover",
                                    event.currentTarget.files[0]
                                );
                            }}
                        />

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
            <p>It's the Formik, dawg</p>
        </div>
    );
};

export default CreateNote;

/*
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const initialFormState = {
    bookAuthor: "",
    bookTitle: "",
    bookSummary: "",
    bookQuotes: "",
    bookNotes: "",
    bookFinished: false,
    bookCover: null,
};

const CreateNote = () => {
    const [formState, setFormState] = useState(initialFormState);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataForUploads = new FormData();
        formDataForUploads.append("bookCover", formState.bookCover);

        const formDataForNotes = new FormData();

        try {
            // Upload file
            const uploadResponse = await axios.post(
                "/uploads",
                formDataForUploads
            );

            formDataForNotes.append("coverPath", uploadResponse.data.path);

            Object.entries(formState).forEach(([key, value]) => {
                if (key !== "bookCover") {
                    formDataForNotes.append(key, value);
                }
            });

            await axios.post("/notes", formDataForNotes);

            resetForm();
        } catch (error) {
            setError(`Failed to create note: ${error.message}`);
        }
    };

    const resetForm = () => {
        setFormState(initialFormState);
    };

    const handleInputChange = (e) => {
        const value =
            e.target.type === "file"
                ? e.target.files[0]
                : e.target.type === "checkbox"
                ? e.target.checked
                : e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: value,
        });
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="bookTitle"
                        placeholder="Enter book title"
                        value={formState.bookTitle}
                        onChange={handleInputChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="bookAuthor"
                        placeholder="Enter book author"
                        value={formState.bookAuthor}
                        onChange={handleInputChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formSummary">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="bookSummary"
                        placeholder="Enter brief summary"
                        value={formState.bookSummary}
                        onChange={handleInputChange}
                        style={{
                            height: "100px",
                        }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formQuotes">
                    <Form.Label>Quotes</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="bookQuotes"
                        placeholder="Your favorite quotes here"
                        value={formState.bookQuotes}
                        onChange={handleInputChange}
                        style={{
                            height: "100px",
                        }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="bookNotes"
                        placeholder="Your notes and takeaways here"
                        value={formState.bookNotes}
                        onChange={handleInputChange}
                        style={{
                            height: "100px",
                        }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formFinished">
                    <Form.Check
                        type="checkbox"
                        name="bookFinished"
                        label="Finished"
                        value={formState.bookFinished}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Add book cover</Form.Label>
                    <Form.Control
                        type="file"
                        name="bookCover"
                        id="fileInput"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default CreateNote;
*/
