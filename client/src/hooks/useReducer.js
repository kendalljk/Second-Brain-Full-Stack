export const INITIAL_STATE = {
    bookData: {
        bookTitle: "",
        bookAuthor: "",
        bookCover: null,
        bookSummary: "",
        bookGenre: "",
        bookQuotes: "",
        bookNotes: "",
        bookFinished: false,
    },
    loading: false,
    error: false,
};

export const ACTION_TYPES = {
    START_ADD_NOTE: "START_ADD_NOTE",
    SUCCESS_ADD_NOTE: "SUCCESS_ADD_NOTE",
    ERROR_ADD_NOTE: "ERROR_ADD_NOTE",

    START_CREATE_NOTE: "START_CREATE_NOTE",
    SUCCESS_CREATE_NOTE: "SUCCESS_CREATE_NOTE",
    ERROR_CREATE_NOTE: "ERROR_CREATE_NOTE",

    START_EDIT_NOTE: "START_EDIT_NOTE",
    SUCCESS_EDIT_NOTE: "SUCCESS_EDIT_NOTE",
    ERROR_EDIT_NOTE: "ERROR_EDIT_NOTE",

    START_DELETE_NOTE: "START_DELETE_NOTE",
    SUCCESS_DELETE_NOTE: "SUCCESS_DELETE_NOTE",
    ERROR_DELETE_NOTE: "ERROR_DELETE_NOTE",

    START_FETCH_COVER: "START_FETCH_COVER",
    SUCCESS_FETCH_COVER: "SUCCESS_FETCH_COVER",
    ERROR_FETCH_COVER: "ERROR_FETCH_COVER",
};

//COMPLETE REDUCER FUNCTIONS FOR ADD, EDIT, DELETE

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.START_CREATE_NOTE:
            return {
                ...state,
                bookData: {
                    ...state.myNote,
                    ...action.payload,
                },
                loading: true,
                error: false,
            };
        case ACTION_TYPES.SUCCESS_CREATE_NOTE:
            return {
                ...state,
                bookData: action.payload,
                loading: false,
                error: false,
            };
        case ACTION_TYPES.ERROR_CREATE_NOTE:
            return {
                ...state,
                bookData: {},
                loading: false,
                error: true,
            };

        case ACTION_TYPES.START_ADD_NOTE:
            return {
                ...state,
                bookData: {
                    ...state.bookData,
                    ...action.payload,
                },
                loading: true,
                error: false,
            };
        case ACTION_TYPES.SUCCESS_ADD_NOTE:
            return {
                ...state,
                bookData: action.payload,
                loading: false,
                error: false,
            };
        case ACTION_TYPES.ERROR_ADD_NOTE:
            return {
                ...state,
                bookData: {},
                loading: false,
                error: true,
            };

        case ACTION_TYPES.START_FETCH_COVER:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case ACTION_TYPES.SUCCESS_FETCH_COVER:
            return {
                ...state,
                bookData: {
                    ...state.bookData,
                    bookCover: action.payload,
                },
                loading: false,
                error: false,
            };
        case ACTION_TYPES.ERROR_FETCH_COVER:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};
