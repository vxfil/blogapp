import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { postReducer } from './reducers/posts';
import { modalToggle } from './reducers/modalToggle';
import { getProfileInfo } from './reducers/getProfileInfo';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  postReducer,
  modalToggle,
  getProfileInfo,
});

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
