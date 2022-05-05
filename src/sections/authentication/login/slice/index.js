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
    typeMess: true,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.data = action.payload;
      state.typeMess = true;
    },

    loginFail: state => {
      state.typeMess = false;
    },
  },
});

export default slice.reducer;

const { loginSuccess, loginFail } = slice.actions;
export const login = action => async dispatch => {
  try {
    const userId = localStorage.getItem('userId');
    const res = await getDetailUser(userId);
    dispatch(loginSuccess(res.data));
    localStorage.setItem('dataUser', JSON.stringify(res.data));
  } catch (e) {
    localStorage.setItem('dataUser', '');
    localStorage.setItem('access_token', '');
    const navigate = useNavigate();
    navigate('/login', { replace: true });
    dispatch(loginFail());
    return console.error(e.message);
  }
};
