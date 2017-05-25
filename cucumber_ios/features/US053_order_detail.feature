Feature: US053 订单详情-订单信息
  作为一名已登录用户，我应当在订单详情查看订单的信息，使得我可以了解目前的订单状态

  @reset_driver
  Scenario: AC_US053_01 待付款
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    And 创建待付款订单 (创建数据)
      |ac      |user|
      |AC_US053|test@gmail.com|
    When 我在 "主页面"
    And 我点击按钮 "左上"
    And 我点击 "订单" 进入 "订单列表页面"
    And 我点击 "第一个订单" 进入 "订单详情页面"
    Then 看到的 "订单状态" 应为 "待付款"

  Scenario: AC_US053_02 待发货
    Given 创建待付款订单 (创建数据)
      |ac         |status|user|
      |AC_US053_02|paid  |test@gmail.com|
    And 我按下按钮 "刷新当前页"
    Then 看到的 "订单状态" 应为 "待发货"

#  Scenario: AC_US053_03 待发货   去除了该状态控制
#    Given 创建待付款订单 (创建数据)
#      |ac         |status   |user|
#      |AC_US053_02|unshipped|test@gmail.com|
#    And 我按下按钮 "刷新当前页"
#    Then 看到的 "订单状态" 应为 "待发货"

  Scenario: AC_US053_04 已完成
    Given 创建待付款订单 (创建数据)
      |ac         |status   |user|
      |AC_US053_02|completed|test@gmail.com|
    And 我按下按钮 "刷新当前页"
    Then 看到的 "订单状态" 应为 "已完成"

#  Scenario: AC_US053_05  手工测试
#    Given 我在 "订单详情页面"
#    Then 我能看到 "订单编号,下单时间,订单状态" 这些元素
