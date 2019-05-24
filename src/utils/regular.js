/**
 * @Description: 验证密码 是 长度(6 - 21)的英数组合密码。
 * @author 蔡昂 （cgh1999520@gmail.com）
 * @date 2019/3/26  14:49
 */
export const validPassword = (rule, value, callback) => {
  let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
  if (!value) {
    callback(new Error('请输入密码'))
    return
  } else if (!regExp.test(value)) {
    callback(new Error('密码格式不正确，密码需长度(6 - 21)的英数组合密码'))
    return
  }
  callback()
}

/**
 * @Description:  正则验证手机号是否正确
 * @author 蔡昂 （cgh1999520@gmail.com）
 * @date 2019/4/8  13:55
 */
export const validPhoneNum = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号'))
    return
  } else if (!/^1[34578]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号'))
    return
  }
  callback()
}
