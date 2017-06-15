Feature: US044 订单页面
  作为一名已登陆用户，我应当能够在订单页面，
  看到我的订单状态

  @reset_driver
  Scenario: AC_US044_01
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    When 我点击按钮 "左上"
    And 我点击按钮 "订单"
    Then 我应当到达 "订单列表页面"

  Scenario: AC_US044_02
    Given 创建一个用户订单，且订单状态为待付款 (创建数据)
      |ac      |user|
      |AC_US044|test@gmail.com|
    And 点击原生button "待付款"
    Then 在 "第一个订单" 可匹配到 "待付款"

  Scenario: AC_US044_03
    Given 创建一个用户订单，且订单状态为待发货(创建数据)
      |ac         |status|user|
      |AC_US044_03|paid  |test@gmail.com|
    And 点击原生button "全部"
    And 下拉刷新
    And 在 "第一个订单" 可匹配到 "待发货"

#  Scenario: AC_US044_04 不需要该状态控制
#    Given 创建一个用户订单，且订单状态为待发货 (创建数据)
#      |ac         |status   |user|
#      |AC_US044_04|unshipped|test@gmail.com|
#    And 下拉刷新
#    Then 在 "第一个订单" 可匹配到 "待发货"

  Scenario: AC_US044_05
    Given 创建一个用户订单，且订单状态为已完成 (创建数据)
      |ac         |status   |user|
      |AC_US044_05|completed|test@gmail.com|
    And 下拉刷新
    Then 在 "第一个订单" 可匹配到 "已完成"

  Scenario: AC_US044_06
    Given 创建一个用户订单，且订单状态为已取消 (创建数据)
      |ac         |status  |user|
      |AC_US044_06|canceled|test@gmail.com|
    And 下拉刷新
    Then 在 "第一个订单" 可匹配到 "已取消"
