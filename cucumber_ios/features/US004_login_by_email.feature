Feature: US_004 邮箱登录
  为了正常使用需要登录身份的功能
  作为一个已经用邮箱注册过的用户
  我想要用邮箱和密码登录系统

  Background:
    Given 我已经用邮箱 test@gmail.com 与密码 test123 注册过账号 (创建数据)
      |ac      |clear|email|
      |AC_US004|true |test@gmail.com|

  @reset_driver
  Scenario: AC_US004_02 登录错误: 正确邮箱+错误密码登录
    Given 我在 "主页面" 点击 "登录/注册" 进入 "登录页面"
    When 我在 "邮箱或手机" 输入 "test@gmail.com"
    And 我在 "密码" 输入 "b123456"
    And 我按下按钮 "登录"
    Then 我应当看到浮动提示 "用户密码不匹配"

  Scenario: AC_US004_03 登录错误: 没有输入用户名和密码
    Given 我在 "邮箱或手机" 输入 ""
    When 我在 "密码" 输入 ""
    And 我按下按钮 "登录"
    Then 我应当看到浮动提示 "请填写完整"

  Scenario: AC_US004_04 登录错误: 输入用户名没有输入密码
    Given 我在 "密码" 输入 ""
    When 我按下按钮 "登录"
    Then 我应当看到浮动提示 "请填写完整"

  Scenario: AC_US004_01 正常邮箱+密码登录
    Given 我在 "邮箱或手机" 输入 "test@gmail.com"
    When 我在 "密码" 输入 "test123"
    And 我按下按钮 "登录"
    Then 我应当到达 "主页面"
    And 等待 2 秒后退出


