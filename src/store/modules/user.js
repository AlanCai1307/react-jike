import { createSlice } from '@reduxjs/toolkit'
import {request} from "@/utils";
import { setToken as _setToken, getToken, removeToken } from '@/utils'
const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    }
  }
})

// 解构出actionCreater
const { setToken,setUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer
// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm)
    dispatch(setToken(res.data.token))
  }
}

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

export { fetchLogin ,fetchUserInfo}
export default userReducer