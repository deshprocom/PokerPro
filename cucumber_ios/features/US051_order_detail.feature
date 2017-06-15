Feature: US051 订单详情
  作为一名已登录用户，我应当在订单详情中查看到订单详情的详细信息

  @reset_driver
  Scenario: AC_US051_01 应有相应的元素
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    And 创建订单 (创建数据)
      |ac      |user          |
      |AC_US051|test@gmail.com|
    When 我在 "主页面"
    And 我点击按钮 "左上"
    And 我点击 "订单" 进入 "订单列表页面"
    Then 我点击 "第一个订单" 进入 "订单详情页面"

  Scenario: AC_US051_02 返回列表页面
    Given 我在 "订单详情页面"
    Given 我点击按钮 "左上"
    Then 我应当到达 "订单列表页面"
