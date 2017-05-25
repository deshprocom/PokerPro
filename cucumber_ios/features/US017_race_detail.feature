Feature: US017 赛事详情
  赛事详情页面的简介：包含赛事标题、图片、奖池、时间、地点

  @reset_driver
  Scenario: AC_US017 售票状态: 售票中
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac     |clear|ticket_status|
      |AC_US017|true |selling|
    Given 我按下按钮 "刷新当前页"
    Given 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    Then 看到的 "售票状态" 应为 "售票中"

  Scenario: AC_US017_02 售票状态: 售票结束
    Given 创建第一个赛事，且售票状态为售票结束 (创建数据)
      |ac      |clear|ticket_status|
      |AC_US017|true  |end|
    Given 我点击 "左上" 回到 "主页面"
    Given 我按下按钮 "刷新当前页"
    Given 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    Then 看到的 "售票状态" 应为 "售票结束"

  Scenario: AC_US017_03 售票状态: 票已售完
    Given 创建第一个赛事，且售票状态为票已售完 (创建数据)
      |ac      |clear|ticket_status|
      |AC_US017|true |sold_out|
    Given 我点击 "左上" 回到 "主页面"
    Given 我按下按钮 "刷新当前页"
    Given 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    Then 看到的 "售票状态" 应为 "票已售完"


  Scenario: AC_US017_04 赛事状态: 进行中
    Given 创建第一个赛事，且赛事状态为进行中 (创建数据)
      |ac      |clear|status|
      |AC_US017|true |1|
    Given 我点击 "左上" 回到 "主页面"
    Given 我按下按钮 "刷新当前页"
    Given 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    Then 看到的 "赛事状态" 应为 "进行中"

  Scenario: AC_US017_05 赛事状态: 未开始
    Given 创建第一个赛事，且赛事状态为未开始 (创建数据)
      |ac      |clear|status|
      |AC_US017|true |0|
    Given 我点击 "左上" 回到 "主页面"
    Given 我按下按钮 "刷新当前页"
    Given 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    Then 看到的 "赛事状态" 应为 "未开始"

  Scenario: AC_US017_06 赛事状态: 已结束
    Given 创建第一个赛事，且赛事状态为已结束 (创建数据)
      |ac      |clear|status|
      |AC_US017|true |2|
    Given 我按下按钮 "刷新当前页"
    Then 看到的 "赛事状态" 应为 "已结束"

  Scenario: AC_US017_07 赛事状态: 已终止
    Given 创建第一个赛事，且赛事状态为已终止 (创建数据)
      |ac      |clear|status|
      |AC_US017|true |3|
    Given 我按下按钮 "刷新当前页"
    Then 看到的 "赛事状态" 应为 "已终止"

  Scenario: AC_US017_08 赛事简介
    Given 我在 "赛事详情页面"
    Then 我能看到 "赛事标题,赛事状态,售票状态,奖池,比赛时间,比赛地点" 这些元素