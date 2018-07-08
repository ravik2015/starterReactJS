/*
 * @file: user.js
 * @description: Reducers and actions for store/manipulate Interview Records's  data
 * @date: 04.07.2018
 * @author: Jasdeep Singh
*/

import * as TYPE from "../../constants/action-types";

/******** Reducers ********/

export default function reducer(state = [], action) {
  switch (action.type) {
    case TYPE.SAVE_RECORD:
      return [action.data, ...state];

    case TYPE.GET_RECORD:
      return action.data; 

    case TYPE.UPDATE_RECORD:
      const index = state.findIndex( value => value._id === action.data._id);
      state[index].title = action.data.title;
      state[index].markers = action.data.timeStamps;
      return [...state];   
        
    case TYPE.LOG_OUT:
      return [];

    default:
      return state;
  }
}
