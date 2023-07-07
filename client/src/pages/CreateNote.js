import React, { useReducer } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ACTION_TYPES, INITIAL_STATE, reducer } from "../hooks/useReducer";

const CreateNote = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    //supported formats for cover inputs
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formDataForUploads = new FormData();
        formDataForUploads.append("bookCover", values.bookCover);
        try {
            // Upload file
            const uploadResponse = await axios.post(
                "/uploads",
                formDataForUploads
            );
            //dispatch START_CREATE_NOTE w/ form values as payload
            dispatch({ type: ACTION_TYPES.START_CREATE_NOTE, payload: values });

            const formDataForNotes = new FormData();
            console.log("Cover upload", uploadResponse);
            //add book cover string from uploadResponse
            formDataForNotes.append("coverPath", uploadResponse.data.data.url); // Add this line
            //add rest of form values to formDataForNotes
            Object.entries(values).forEach(([key, value]) => {
                if (key !== "bookCover") {
                    if (key === "bookQuotes" || key === "bookNotes") {
                        value
                            .split("\n")
                            .forEach((item) =>
                                formDataForNotes.append(key, item.trim())
                            );
                    } else {
                        formDataForNotes.append(key, value);
                    }
                }
            });
            console.log("Note upload", ...formDataForNotes);
            await axios.post("/notes", formDataForNotes);
            //dispatch SUCCESS_CREATE_NOTE if successful
            dispatch({
                type: ACTION_TYPES.SUCCESS_CREATE_NOTE,
                payload: values,
            });

            resetForm();
        } catch (error) {
            //dispatch ERROR_CREATE_NOTE if error
            dispatch({ type: ACTION_TYPES.ERROR_CREATE_NOTE });
            console.error(`Failed to create note: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Formik
                initialValues={INITIAL_STATE.note}
                validationSchema={Yup.object({
                    bookTitle: Yup.string()
                        .max(30, "Must be 30 characters or less")
                        .required("Required"),
                    bookAuthor: Yup.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    bookSummary: Yup.string()
                        .min(20, "Must be at least 20 characters")
                        .max(300, "Must be 300 characters or less")
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
                    bookQuotes: Yup.string()
                        .required("Book quotes are required")
                        .test(
                            "is-string-array",
                            "Must be line-separated strings",
                            (value) => {
                                if (value) {
                                    return value
                                        .split("\n")
                                        .every(
                                            (item) =>
                                                typeof item.trim() ===
                                                    "string" &&
                                                item.trim() !== ""
                                        );
                                }
                                return true;
                            }
                        ),
                    bookNotes: Yup.string()
                        .required("Book notes are required")
                        .test(
                            "is-string-array",
                            "Must be line-separated strings",
                            (value) => {
                                if (value) {
                                    return value
                                        .split("\n")
                                        .every(
                                            (item) =>
                                                typeof item.trim() ===
                                                    "string" &&
                                                item.trim() !== ""
                                        );
                                }
                                return true;
                            }
                        ),
                    bookFinished: Yup.boolean(),
                    bookCover: Yup.mixed()
                        .required("A book cover is required")
                        .test(
                            "fileFormat",
                            "Unsupported Format",
                            (value) =>
                                value && SUPPORTED_FORMATS.includes(value.type)
                        ),
                })}
                onSubmit={handleSubmit}
            >
                {({ submitting, setFieldValue }) => (
                    <Form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "5%",
                            width: "75%",
                            margin: " 5% auto",
                            border: "2px solid",
                        }}
                    >
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
                            className="my-3"
                            variant="primary"
                            type="submit"
                            disabled={state.submitting}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateNote;
