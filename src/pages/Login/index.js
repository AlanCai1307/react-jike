import './index.scss'
import {Card, Form, Input, Button, message} from 'antd'
import logo from '@/assets/logo.png'
import {useDispatch} from "react-redux";
import {fetchLogin} from "@/store/modules/user";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // 点击登录按钮时触发 参数values即是表单输入数据
  const onFinish = async formValue => {
    console.log(formValue)
    await dispatch(fetchLogin(formValue))
    // 1. 跳转到首页
    navigate('/')
    // 2. 提示一下用户
    message.success('登录成功')
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={ onFinish } validateTrigger={['onBlur']}>
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对'
              }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" maxLength={6}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login