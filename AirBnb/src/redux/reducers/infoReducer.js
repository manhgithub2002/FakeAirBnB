export const email_update = 'email_update';
export const fullname_update = 'fullname_update';

const initialState = {
  email: '',
  fullname: '',
  userType: '',
};

export default function actionForReducer(state = initialState, payload) {
  switch (payload.type) {
    case email_update:
      return {
        ...state,
        email: payload.email,
      };
    case fullname_update:
      return {
        ...state,
        fullname: payload.fullname,
      };
    default:
      return state;
  }
}
