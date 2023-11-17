import { createSlice } from '@reduxjs/toolkit'
import {request} from "@/utils";
const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token: localStorage.getItem('token_key') || '',
  },
  // 同步修改方法
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      localStorage.setItem('token_key', action.payload)
    }
  }
})

// 解构出actionCreater
const { setToken } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer
// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm)
    dispatch(setToken(res.data.token))
  }
}

export { fetchLogin }
export default userReducer