export const INITIAL_STATE = {
    note: {
        bookTitle: "",
        bookAuthor: "",
        bookSummary: "",
        bookGenre: "",
        bookQuotes: "",
        bookNotes: "",
        bookFinished: false,
        bookCover: null,
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
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "START_CREATE_NOTE":
        return {
              ...state,
              note: {
                ...state.note,
                ...action.payload
                },
                loading: true,
                error: false,
            };
        case "SUCCESS_CREATE_NOTE":
        return {
              ...state,
                note: action.payload,
                loading: false,
                error: false,
        };
      case "ERROR_CREATE_NOTE":
        return {
          ...state,
          note: {},
          loading: false,
          error: true,
        }
        case "START_FETCH_COVER":
            return {

                note: {},
                loading: true,
                error: false,
            };
        case "SUCCCESS_FETCH_COVER":
            return {
                note: {},
                loading: false,
                error: false,
            };
        case "ERROR_FETCH_COVER":
            return {
                note: {},
                loading: false,
                error: true,
            };
        default:
            return {
                state,
            };
    }
};
