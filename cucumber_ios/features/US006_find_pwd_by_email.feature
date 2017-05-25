Feature: US-006 忘记密码-邮箱找回
  作为一名忘记密码的用户，我需要用已认证的邮箱, 使得我能够找回密码

  @reset_driver
  Scenario: AC-US006-01 没有任何输入
    Given 我在 "主页面" 点击 "登录/注册" 进入 "密码登录页面"
    And 我点击 "忘记密码" 进入 "忘记密码页面"
    And 我按下按钮 "使用邮箱找回密码"
    Then "下一步" 按钮置灰，无法点击

  Scenario: AC-US006-02 没有任何输入 点击获取验证码
    When 我按下按钮 "获取验证码"
    Then 我应当看到浮动提示 "您的电子邮件格式不正确"

  Scenario: AC-US006-03 错误格式的邮箱 点击获取验证码
    And 我在 "邮箱" 输入 "desh@pro"
    And 我按下按钮 "获取验证码"
    Then 我应当看到浮动提示 "您的电子邮件格式不正确"

  Scenario: AC-US006-04 错误格式的邮箱 点击获取验证码
    And 我在 "邮箱" 输入 "ricky@deshpro"
    And 我按下按钮 "获取验证码"
    Then 我应当看到浮动提示 "您的电子邮件格式不正确"

#  Scenario: AC_US006_05  备注：重复ac,与AC_US006_07重复

  Scenario: AC-US006-06 未输入邮箱 但输入了验证码
    When 我在 "邮箱" 输入 ""
    And 我在 "验证码" 输入 "aaa"
    And 我按下按钮 "获取验证码"
    Then 我应当看到浮动提示 "您的电子邮件格式不正确"

  Scenario: AC-US006-07 输入正确的邮箱 及正确的验证码
    Given 我已经用邮箱 test@deshpro.com 注册过账号 (创建数据)
      |ac         |clear|email|
      |AC_US006_07|true |test@deshpro.com|
    And 我在 "邮箱" 输入 "test@deshpro.com"
    And 我按下按钮 "获取验证码"
    And 我在 "验证码" 输入 "123456"
    And 隐藏键盘
    And 我按下按钮 "下一步"
    Then 我应当到达 "输入密码页面"

  Scenario: AC-US006-08 输入正确的邮箱 及正确的验证码
    Given 我已经用邮箱 test@deshpro.com 注册过账号 (创建数据)
      |ac         |clear|email|
      |AC_US006_08|true |test@deshpro.com|
    And 我在 "密码" 输入 "123456"
    And 我按下按钮 "完成"
    Then 我应当看到浮动提示 "密码格式不正确"

  Scenario: AC-US006-09 输入正确的邮箱 及正确的验证码
    Given 我按下按钮 "回到主页"
    When 我在 "主页面" 点击 "登录/注册" 进入 "密码登录页面"
    And 我点击 "忘记密码" 进入 "忘记密码页面"
    And 我按下按钮 "使用邮箱找回密码"
    And 我在 "邮箱" 输入 "test@deshpro.com"
    And 我按下按钮 "获取验证码"
    And 我在 "验证码" 输入 "123456"
    And 我按下按钮 "下一步"
    And 我在 "密码" 输入 "a123456"
    And 我按下按钮 "完成"
    Then 我应当到达 "密码登录页面"
