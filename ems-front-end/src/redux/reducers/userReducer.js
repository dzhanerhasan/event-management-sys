import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_FRIENDS_REQUEST,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_FAILURE,
  DELETE_FRIEND,
} from "../actions/types";

const initialState = {
  loading: false,
  user: {},
  friends: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        user: {},
        error: action.payload,
      };
    case FETCH_FRIENDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        friends: action.payload,
        error: "",
      };
    case FETCH_FRIENDS_FAILURE:
      return {
        ...state,
        loading: false,
        friends: [],
        error: action.payload,
      };
    case DELETE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter((friend) => friend !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
