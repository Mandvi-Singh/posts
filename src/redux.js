
const FETCH_POSTS = 'FETCH_POSTS';
const POSTS_FETCHED = 'POSTS_FETCHED';
const API_CALL_FAILURE = 'API_CALL_FAILURE';
const POST_DELETED = 'POST_DELETED';
const POST_EDITED = 'POST_EDITED';


const initialState = {
  deleting: false,
  editing: false,
  fetching: false,
  data: null,
  error: null,
  toBeDeleted: null,
  edited: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, fetching: true, error: null };
    case POSTS_FETCHED:
      return { ...state, fetching: false, data: action.post.data };


    case POST_EDITED:
      return {
        ...state, editing: true, deleting: false, edited: action.post.data,
      };
    case POST_DELETED:


      return {
        ...state, editing: false, deleting: true, toBeDeleted: action.value,
      };

    case API_CALL_FAILURE:
      return {
        ...state, fetching: false, data: null, error: true,
      };
    default:
      return state;
  }
}
