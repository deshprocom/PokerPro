Feature: US0013 更多赛事
  作为一名用户，我需要全部的赛事列表，使得我能查看所有赛事

  @reset_driver
  Scenario: AC_US0013_01 更多赛事-没有赛事
    Given 清除数据
    When 我点击按钮 "更多赛事"
    And 我应当到达 "更多赛事界面"
    Then 我应当到达 "无数据提示界面"

#  Scenario: AC_US0013_02 更多赛事-网络异常  须手工测
#    Given 清除数据
#    When 我点击按钮 "更多赛事"
#    And 我应当到达 "更多赛事界面"
#    Then 我应当到达 "网络异常提示界面"

  Scenario: AC_US0013_03 更多赛事-有列表数据
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac      |clear|name|begin_date|end_date|
      |AC_US013|true |2017APT启航站|2111-01-01|2111-02-02|
    And 我按下按钮 "回到主页"
    When 我点击按钮 "更多赛事"
    And 我应当到达 "更多赛事界面"
    Then 在 "第一个赛事" 可匹配到 "2017APT启航站"
    And 在 "第一个赛事" 可匹配到 "奖池"
    And 在 "第一个赛事" 可匹配到 "地点"
    And 在 "第一个赛事" 可匹配到 "2111.01.01-2111.02.02"

  Scenario: AC_US0013_04 更多赛事-上拉加载未来数据
    Given 我按下按钮 "回到主页"
    And 创建多条数据 (创建数据)
      |ac      |clear|
      |ac_us013_04|true |
    When 我点击按钮 "更多赛事"
    And 我应当到达 "更多赛事界面"
    And 上滑
    And 上滑
    And 上滑
    Then 可看到更多的未来赛事

  Scenario: AC_US0013_05 更多赛事-下拉加载历史数据
    Given 我按下按钮 "回到主页"
    And 创建多条数据 (创建数据)
      |ac         |clear|
      |ac_us013_05|true |
    When 我点击按钮 "更多赛事"
    And 我应当到达 "更多赛事界面"
    And 下拉刷新
    Then 可看到更多的历史赛事