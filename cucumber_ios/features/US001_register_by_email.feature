Feature: US_001 邮箱注册
  作为一名非注册用户，我需要用邮箱号，使得我可以完成注册

  @reset_driver
  Scenario: AC_US001_01 注册错误: 错误邮箱注册
    Given 我在 "主页面"
    When 我在 "主页面" 点击 "登录/注册" 进入 "密码登录页面"
    And 我点击 "注册" 进入 "手机注册页面"
    And 我点击 "使用邮箱注册" 进入 "邮箱注册页面"
    And 我在 "邮箱" 输入 "aa@desh"
    And 我在 "密码" 输入 "test123"
    And 我按下按钮 "完成"
    Then 我应当看到浮动提示 "您的电子邮件格式不正确"

  Scenario: AC_US001_02 下一步按钮是灰色状态
    Given 我在 "邮箱" 输入 ""
    Then "完成" 按钮置灰，无法点击

  Scenario: AC_US001_03 成功跳转到 手机注册页面
    Given 我在 "邮箱注册页面"
    When 我按下按钮 "使用手机注册"
    Then 我应当到达 "手机注册页面"

  Scenario: AC_US001_04 成功跳转到 密码登录页面
    Given 我点击 "使用邮箱注册" 回到 "邮箱注册页面"
    When 我按下按钮 "我已有账号"
    Then 我应当到达 "密码登录页面"

  Scenario: AC_US001_05 注册错误 邮箱已注册
    Given 我已经用邮箱 test@gmail.com 注册过账号 (创建数据)
      | ac       | clear | email          |
      | AC_US001 | true  | test@gmail.com |
    When 我点击 "注册" 进入 "手机注册页面"
    And 我点击 "使用邮箱注册" 回到 "邮箱注册页面"
    And 我在 "邮箱" 输入 "test@gmail.com"
    And 我在 "密码" 输入 "test123"
    And 我按下按钮 "完成"
    Then 我应当看到浮动提示 "邮箱已被使用"

#  Scenario: AC_US001_06  备注：重复ac,与AC_US001_01重复

  Scenario: AC_US001_07 注册错误 密码格式错误
    Given 我在 "邮箱" 输入 "test@gmail.com"
    When 我在 "密码" 输入 "123456"
    And 我按下按钮 "完成"
    Then 我应当看到浮动提示 "密码格式不正确"

  Scenario: AC_US001_08 注册成功
    Given 我在 "邮箱" 输入 "test12@gmail.com"
    When 我在 "密码" 输入 "test123456"
    And 我按下按钮 "完成"
    Then 我应当到达 "主页面"
