import {updateEmail, fullname_update} from '../reducers/infoReducer';

export const updateEmail = email => async dispatch => {
  try {
    //1. Side-effect gọi lên server hoặc làm gì đấy bất đông bộ (middleware-thunk giúp bạn làm việc này)
    console.log('bat dau goi len server');

    // 2. Cập nhập thông tin của infoReducer trong store
    dispatch({
      type: updateEmail,
      email: email,
    });
  } catch (error) {
    console.log(error);
  }
};
