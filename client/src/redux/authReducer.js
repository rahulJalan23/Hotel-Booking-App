const initialState = null;
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, ...action.payload };
    case 'LOGGED_OUT_USER':
      return null;
    default:
      return state;
  }
};
export default authReducer;
