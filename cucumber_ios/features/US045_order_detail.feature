Feature: US045 订单列表详情
  作为一名已登陆用户，我应当能够在订单列表页面中
  看到我的订单信息 人工测

  @reset_driver
  Scenario: AC_US045_01
    Given 我在 "主页面"
    When 我点击按钮 "更多"
    And 我点击按钮 "订单"
    Then 我应当到达 "密码登陆页面"

  Scenario: AC_US045_03
    Given 清除数据
    Given 我已使用 "test@gmail.com" 登录
    Given 创建一个用户订单，且订单状态为待付款 (创建数据)
      |ac         |order_status |user|
      |AC_US047_01|unpaid       |test@gmail.com|
    And 我按下按钮 "刷新当前页"
    Then pending: 我能看到 "订单编号,订单状态,赛事Logo,赛事标题,比赛时间,比赛地点,门票金额" 这些元素



