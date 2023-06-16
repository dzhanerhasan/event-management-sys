import axios from "axios";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_FRIENDS_REQUEST,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_FAILURE,
  DELETE_FRIEND,
} from "./types";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const fetchFriendsRequest = () => {
  return {
    type: FETCH_FRIENDS_REQUEST,
  };
};

export const fetchFriendsSuccess = (friends) => {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    payload: friends,
  };
};

export const fetchFriendsFailure = (error) => {
  return {
    type: FETCH_FRIENDS_FAILURE,
    payload: error,
  };
};

export const deleteFriend = (username) => {
  return {
    type: DELETE_FRIEND,
    payload: username,
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("http://localhost:8000/api/users/current-user/", config)
      .then((response) => {
        const user = response.data.user;
        dispatch(fetchUserSuccess(user));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};

export const fetchFriends = (username) => {
  return (dispatch) => {
    dispatch(fetchFriendsRequest());
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`http://localhost:8000/api/users/profile/${username}/`, { headers })
      .then((response) => {
        const friends = response.data.friends;
        dispatch(fetchFriendsSuccess(friends));
      })
      .catch((error) => {
        dispatch(fetchFriendsFailure(error.message));
      });
  };
};
