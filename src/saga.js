import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';


export function* watcherSaga() {
  yield takeLatest('FETCH_POSTS', getSaga);
  yield takeLatest('DELETE_POST', deleteSaga);
  yield takeLatest('EDIT_POST', editSaga);
}

function fetchPosts() {
  return axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts',
  });
}

function deletePost(action) {
  return axios({
    method: 'delete',
    url: `https://jsonplaceholder.typicode.com/posts/${action.post.id}`,
    data: { title: action.post.title, userId: action.post.userId, body: action.post.body },
  });
}

function editPost(action) {
  return axios({
    method: 'patch',
    url: `https://jsonplaceholder.typicode.com/posts/${action.post.id}`,
    data: { title: action.post.title, userId: action.post.userId, body: action.post.body },
  });
}


function* getSaga() {
  const response = yield call(fetchPosts);
  const post = response;

  if (response.status === 200 || response.status === 201) { yield put({ type: 'POSTS_FETCHED', post }); } else { yield put({ type: 'API_CALL_FAILURE' }); }
}

function* deleteSaga(action) {
  const response = yield call(deletePost, action);


  if (response.status === 200 || response.status === 201) {
    yield put({ type: 'POST_DELETED', value: action.post.id });
  } else { yield put({ type: 'API_CALL_FAILURE' }); }
}

function* editSaga(action) {
  const response = yield call(editPost, action);
  const post = response;

  if (response.status === 200 || response.status === 201) {
    yield put({ type: 'POST_EDITED', post: { ...post, id: action.post.id } });
  } else { yield put({ type: 'API_CALL_FAILURE' }); }
}
