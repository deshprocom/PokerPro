Feature: US062 个人中心-退出登录
  作为一名已登陆用户，我应该有一个退出，使得我能够
  重新切换账户登录app

  @reset_driver
  Scenario: AC_US062_01 退出登录
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    And 我在 "主页面"
    When 我点击按钮 "左上"
    And 我点击按钮 "设置"
    And 我点击按钮 "退出登录"
    And 等待 5 秒后
    And 我在Alert中点击 "取消"
    Then 我应当到达 "设置页面"


  Scenario: AC_US062_02 退出登录
    And 等待 5 秒后
    And 我点击按钮 "退出登录"
    And 等待 5 秒后
    And 我在Alert中点击 "确定"
    Then 我应当到达 "密码登录页面"