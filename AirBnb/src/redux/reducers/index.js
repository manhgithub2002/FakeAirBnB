import {combineReducers} from 'redux';
import userInfo from './infoReducer';
import placeInfo from './placeReducer';

const reducer = combineReducers({
  personalInfo: userInfo,
  placeInfo: placeInfo,
});

export default (state, action) => reducer(state, action);
