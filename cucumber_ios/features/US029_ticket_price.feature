Feature: US029 购票-购票金额
  作为一名已登陆用户，我应当能够在购票页面看到购票的金额

  @reset_driver
  Scenario: AC_US029_01 金额应格式化
    Given 创建赛事，赛事门票金额为 168168 (创建数据)
      |ac      |clear|ticket_status|ticket_price|
      |AC_US029|true |selling      |168168   |
    And 我已使用 "test@gmail.com" 登录
    When 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    And 我点击 "购票" 进入 "购票页面"
    Then 看到的 "票金额" 应为 "168,168"
