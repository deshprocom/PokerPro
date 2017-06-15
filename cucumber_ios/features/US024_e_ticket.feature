Feature: US024 购票-电子票
  作为一名已登陆，已实名的用户
  我应当能够在购票页面中选择电子票，输入电子邮箱，查看实名信息
  以便于购票下单

  @reset_driver
  Scenario: AC_US024_01 电子邮箱应可输入
    Given 创建赛事，赛事门票金额为 168168 (创建数据)
      |ac      |clear|ticket_status|ticket_price|
      |AC_US024|true |selling      |168168   |
    And 我已使用 "test@gmail.com" 登录
    When 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    And 我点击 "购票" 进入 "购票页面"
    And 我点击按钮 "电子票"
    Then 我在 "邮箱" 输入 "aaa@test.com"

  Scenario: AC_US024_02 不显示收货地址
    Given 我在 "购票页面"
    When 我点击按钮 "电子票"
    Then "收货地址" 应隐藏

#  Scenario: AC_US024_03 跳转到实名信息
#    Given 我在 "购票页面"
#    And 我点击按钮 "实名信息"
#    Then 我应当到达 "实名信息页面"
