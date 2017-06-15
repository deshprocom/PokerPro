Feature: US059 待付款-取消订单
  作为一名已登陆购票的用户，我应当在待付款订单详情中有取消订单
  使得我能在不买门票的情况下自主取消订单

  @reset_driver
  Scenario: AC_US059_01 未付款订单
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    And 用户购买了电子票 (创建数据)
      |ac      |user|
      |AC_US059|test@gmail.com|
    When 我在 "主页面"
    And 我点击按钮 "左上"
    And 我点击 "订单" 进入 "订单列表页面"
    Then 我点击 "第一个订单" 进入 "订单详情页面"

  Scenario: AC_US059_02 未付款订单
    Given 我在 "订单详情页面"
    And 我按下按钮 "取消订单"
    Then 我在Alert中点击 "确认"
