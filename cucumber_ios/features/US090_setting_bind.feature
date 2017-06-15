Feature: US090 作为一个邮箱注册用户，我需要一个手机号绑定的的功能，使得我能用手机号与账户关联提高安全性
  界面在./setting/BindingPhonePage

  @reset_driver
  Scenario: AC_US090_1 用邮箱test@gmail.com登录 手机已绑定
    And 我在 "主页面"
    When 我点击按钮 "左上"
    And 我点击按钮 "设置"
    And 我点击按钮 "账号安全"
    And 我点击 "绑定手机号" 进入 "绑定手机界面"
    And 我在 "手机号" 输入 "13507551234"
    And 我点击按钮 "获取验证码"
    And 我在 "验证码" 输入 "234151"
    And 我点击按钮 "绑定"
    Then 我应当看到浮动提示 "用户已存在"

  Scenario: AC_US090_2 用邮箱test@gmail.com登录 手机未绑定-验证码错误
    And 我在 "绑定手机界面"
    And 我在 "手机号" 输入 "13507551231"
    And 我点击按钮 "获取验证码"
    And 我在 "验证码" 输入 "123512"
    And 我点击按钮 "绑定"
    Then 我应当看到浮动提示 "验证码不匹配"

  Scenario: AC_US090_2 用邮箱test@gmail.com登录 手机未绑定-验证码错误
    And 我在 "绑定手机界面"
    And 我在 "手机号" 输入 "13507551231"
    And 我点击按钮 "获取验证码"
    And 我在 "验证码" 输入 "234156"
    And 我点击按钮 "绑定"
    Then 我应当看到浮动提示 "手机号绑定成功"


