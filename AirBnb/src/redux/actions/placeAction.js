// import {doc, getDoc} from 'firebase/firestore';
import {get_places} from '../reducers/placeReducer';
// import {db} from '../../config/firebase';

// const getPlaces = async () => {
//   const docRef = doc(db, 'places');
//   const docSnap = await getDoc(docRef);

//   return docSnap;
// };
export const get_places = () => async dispatch => {
  try {
    //1. Side-effect gọi lên server hoặc làm gì đấy bất đông bộ (middleware-thunk giúp bạn làm việc này)
    console.log('bat dau goi len server');
    const places = await getPlaces();
    // 2. Cập nhập thông tin của infoReducer trong store
    dispatch({
      type: get_places,
    });
  } catch (error) {
    console.log(error);
  }
};
