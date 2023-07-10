export const INITIAL_STATE = {
    bookData: {
        bookTitle: "",
        bookAuthor: "",
        bookCover: null,
    },
    myNote: {
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
    START_CREATE_NOTE: "START_CREATE_NOTE",
    SUCCESS_CREATE_NOTE: "SUCCESS_CREATE_NOTE",
    ERROR_CREATE_NOTE: "ERROR_CREATE_NOTE",
    START_FETCH_COVER: "START_FETCH_COVER",
    SUCCESS_FETCH_COVER: "SUCCESS_FETCH_COVER",
    ERROR_FETCH_COVER: "ERROR_FETCH_COVER",
};

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.START_CREATE_NOTE:
            return {
                ...state,
                myNote: {
                    ...state.myNote,
                    ...action.payload,
                },
                loading: true,
                error: false,
            };
        case ACTION_TYPES.SUCCESS_CREATE_NOTE:
            return {
                ...state,
                myNote: action.payload,
                loading: false,
                error: false,
            };
        case ACTION_TYPES.ERROR_CREATE_NOTE:
            return {
                ...state,
                myNote: {},
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
