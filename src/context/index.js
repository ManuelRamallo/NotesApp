import { combineReducers } from 'redux';
import notes from './noteContext';
import football from './footballContext';

export default combineReducers({
    notes,
    football
});