Feature: US052 订单详情-赛事信息
  作为一名已登录用户，我应当在订单详情中查看到赛事的
  相关信息，包括简介

  @reset_driver
  Scenario: AC_US052_01 订单详情-赛事信息
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    And 创建订单 (创建数据)
      |ac      |user          |
      |AC_US051|test@gmail.com|
    When 我点击按钮 "左上"
    And 我点击按钮 "订单"
    And 我应当到达 "订单列表页面"
    And 我点击 "第一个订单" 进入 "订单详情页面"
    And 我点击按钮 "赛事详情"
    Then 我应当到达 "赛事详情页面"

  Scenario: AC_US052_02 订单详情-赛事信息
    When 我点击按钮 "返回"
    Then 我应当到达 "订单详情页面"