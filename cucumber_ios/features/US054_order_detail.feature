Feature: US054 订单详情-收货方式
  作为一名已登录用户，我应当在订单详情能查看到我下单的收货方式，使得我能够知道我拿到票的方式
  
  @reset_driver
  Scenario: AC_US054_01 电子票
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    And 用户购买了电子票 (创建数据)
      |ac      |user|
      |AC_US054|test@gmail.com|
    When 我在 "主页面"
    And 我点击按钮 "左上"
    And 我点击 "订单" 进入 "订单列表页面"
    And 我点击 "第一个订单" 进入 "订单详情页面"
    Then 看到的 "邮箱" 应为 "test@gmail.com"

#  Scenario: AC_US054_02 实体票
#    Given 用户购买了实体票 (创建数据)
#      |ac      |clear|
#      |AC_US054|true |