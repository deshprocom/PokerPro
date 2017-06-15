Feature: US0020 购票详情-购票须知
  作为一名注册用户，我需要在购票能看到购票的须知
  使得我能够了解购票的内容信息

  @reset_driver
  Scenario: AC_US0021_02 购票须知
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac         |clear|ticket_status|
      |AC_US017   |true |selling|
    And 我已使用 "test@qq.com" 登录
    And 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    And 我在 "赛事详情页面" 点击 "购票" 进入 "购票页面"
    When 我点击按钮 "购票须知"
    Then 我应当到达 "购票须知页面"

  # Scenario: AC_US0021_01 购票须知有小红点标识  须人工测
  # Scenario: AC_US0021_03 重新回到购票页面 小红点消失  须人工测
  # Scenario: AC_US0021_04 第二次进入购票页面 小红点没有 须人工测

