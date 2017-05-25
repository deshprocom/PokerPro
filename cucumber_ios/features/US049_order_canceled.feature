Feature: US049 个人中心-订单待发货
  作为一名已登录用户，我应当在已完成的列表中
  能查看到我取消的订单

  @reset_driver
  Scenario: AC_US049_01 待付款 - 已取消订单
    Given 清除数据
    Given 我已使用 "test@gmail.com" 登录
    Given 创建一个用户订单，且订单状态为待付款 (创建数据)
      |ac         |order_status     |user|
      |ac_us050_01|canceled   |test@gmail.com|
    When 我点击按钮 "左上"
    And 我点击按钮 "订单"
    And 我应当到达 "订单列表页面"
    And 在 "第一个订单" 可匹配到 "订单编号"
    And 在 "第一个订单" 可匹配到 "已取消"
