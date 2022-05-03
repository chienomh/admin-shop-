import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { getDetailUser, getInforAPI } from 'src/services/loginAPI';

// Slice
export const slice = createSlice({
  name: 'user',
  initialState: {
    data: {
      user: null,
      id: null,
      name: '',
      address: '',
      user_name: '',
      age: null,
      email: '',
      gender: '',
      phone: '',
      roles: [],
    },
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default slice.reducer;

const { loginSuccess } = slice.actions;
export const login = action => async dispatch => {
  console.log(action);
  try {
    const userId = localStorage.getItem('userId');
    const res = await getDetailUser(userId);
    dispatch(loginSuccess(res.data));
  } catch (e) {
    localStorage.setItem('access_token', '');
    const navigate = useNavigate();
    navigate('/login', { replace: true });
    return console.error(e.message);
  }
};
