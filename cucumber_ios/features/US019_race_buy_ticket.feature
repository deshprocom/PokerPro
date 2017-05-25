Feature: US019 赛事详情-购票
  一名非注册用户，点击立即购票，将弹出注册页面

  @reset_driver
  Scenario: AC_US019_01 用户未登陆：           密码登录页面
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac      |clear|ticket_status|
      |AC_US019|true |selling|
    And 我按下按钮 "刷新当前页"
    And 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    When 我按下按钮 "购票"
    Then 我应当到达 "密码登录页面"

  Scenario: AC_US019_02 用户已登陆：未购票
    Given 我已使用 "test@qq.com" 登录
    And 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    When 我按下按钮 "购票"
    Then 我应当到达 "购票页面"
