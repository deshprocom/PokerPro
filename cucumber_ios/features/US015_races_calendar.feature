Feature: US0015 更多赛事-日历
  作为一名用户，我需要一个时间表，是的我能快速查看日期表
  中是否有我相关的赛事

  @reset_driver
  Scenario: AC_US0015_01 更多赛事-日历-选中具体日期
    Given 创建第一个赛事，在当前日期的赛事 (创建数据)
      |ac      |clear|name|begin_date|end_date|
      |AC_US013|true |2017APT启航站|2017-01-01|2111-02-02|
    When 我点击按钮 "更多赛事"
    And 我应当到达 "更多赛事页面"
    And 我点击 "日历按钮" 进入 "日历界面"
    And 点击原生button "18"
    And 我点击按钮 "日历按钮"
    Then 在 "第一个赛事" 可匹配到 "2017.01.01-2111.02.02"

  Scenario: AC_US0015_02 更多赛事-日历-选中具体日期，显示无数据
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac      |clear|name|begin_date|end_date|
      |AC_US013|true |2017APT启航站|2017-01-01|2017-02-02|
    When 我点击 "日历按钮" 进入 "日历界面"
    And 点击原生button "22"
    And 我点击按钮 "日历按钮"
    Then 我应当到达 "无数据提示界面"

    #当天有赛事，标记手测