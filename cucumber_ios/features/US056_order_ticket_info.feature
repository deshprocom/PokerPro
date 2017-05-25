Feature: US056 订单详情-购票须知
  作为一名已登陆用户，我应当在订单详情能查看到购票须知
  使得我能了解交易流程

  @reset_driver
  Scenario: AC_US056_01 订单详情-赛事信息
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    Given 创建一个用户订单，且订单状态为待付款 (创建数据)
      |ac            |order_status|user|
      |AC_US056_01   |unpaid|test@gmail.com|
    When 我点击按钮 "左上"
    And 我点击按钮 "订单"
    And 我应当到达 "订单列表页面"
    And 我点击 "第一个订单" 进入 "订单详情页面"
    Then 我能看到 "购票须知"