Feature: US055 订单详情-订单明细
  作为一名已登录用户，我应当在订单详情能查看到我的订单明细，使得我能了解当时付款的金额
  
  @reset_driver
  Scenario: AC_US055_01 商品金额与应付金额一一致
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    And 用户购买了电子票 (创建数据)
      |ac         |user          |price|original_price|
      |AC_US055_01|test@gmail.com|10000|10000         |
    When 我在 "主页面"
    And 我点击按钮 "左上"
    And 我点击 "订单" 进入 "订单列表页面"
    And 我点击 "第一个订单" 进入 "订单详情页面"
    Then 看到的 "商品金额" 应为 "10,000元"
    And 看到的 "应付金额" 应为 "10,000元"

  Scenario: AC_US055_02 商品金额与应付金额不一致
    Given 用户购买了电子票 (创建数据)
      |ac         |user          |price|original_price|
      |AC_US055_02|test@gmail.com|8888 |10000         |
    When 我按下按钮 "刷新当前页"
    Then 看到的 "商品金额" 应为 "10,000元"
    And 看到的 "应付金额" 应为 "8,888元"
    And 看到的 "合计" 应为 "8888"

