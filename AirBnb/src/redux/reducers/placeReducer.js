export const get_places = 'get_places';

const initialState = {
  id: '',
  country: '',
  description: '',
  imageUrl: '',
  region: '',
};

export default function actionForReducer(state = initialState, payload) {
  switch (payload.type) {
    // case email_update:
    //   return {
    //     ...state,
    //     email: payload.email,
    //   };
    // case fullname_update:
    //   return {
    //     ...state,
    //     fullname: payload.fullname,
    //   };
    default:
      return state;
  }
}
