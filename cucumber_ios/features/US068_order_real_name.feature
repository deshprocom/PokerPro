Feature: US0068 订单详情-待付款-实名展示
  作为一名已登陆用户，在订单列表待付款中实名审核中

  @reset_driver
  Scenario: AC_US068_01 订单详情-待付款-实名审核中
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    And 用户购买了电子票 (创建数据)
      |ac      |user|
      |AC_US054|test@gmail.com|
    When 我在 "主页面"
    And 我点击按钮 "左上"
    And 我点击 "订单" 进入 "订单列表页面"
    And 我点击 "第一个订单" 进入 "订单详情页面"
    And 我点击按钮 "联系客服付款"
    And 我能看到 "正在实名审核中，请稍后"
    And 我在Alert中点击 "取消"