Feature: US042 实名
  作为一名已登陆用户，我需要在更换账号后，看到对应的实名信息

  @reset_driver
  Scenario: AC_US0030_01 购票-客服热线
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac         |clear|ticket_status|
      |AC_US017   |true |selling|
    And 我已使用 "test@qq.com" 登录
    And 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    And 我在 "赛事详情页面" 点击 "购票" 进入 "购票页面"
    When 我按下按钮 "客服"
    Then 我应当看到浮动提示 "客服"