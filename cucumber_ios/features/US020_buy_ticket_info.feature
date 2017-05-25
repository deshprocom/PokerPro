Feature: US0020 购票详情-赛事简介
  作为一名注册用户，我需要在购票页面中还能查看本场比赛的简介，包括内容

  @reset_driver
  Scenario: AC_US0020_01 我在购票页面中，看到的赛事简介应有标题，时间，地点元素
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac         |clear|ticket_status|
      |AC_US017   |true |selling|
    Given 我已使用 "test@qq.com" 登录
    Given 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    Given 我在 "赛事详情页面" 点击 "购票" 进入 "购票页面"
    Then 我能看到 "2017APT启航站"
    Then 我能看到 "2017"
    Then 我能看到 "澳门"
    Then 我能看到 "10,000"

  Scenario: AC_US0020_02 我在购票页面中，点击赛事简介，应跳转到赛事详情页面
    Given 我按下按钮 "赛事详情"
    Then 我应当到达 "赛事详情页面"