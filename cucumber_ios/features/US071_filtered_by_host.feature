Feature: US071 更多赛事-类型筛选
  可通过主办方筛选赛事

  @reset_driver
  Scenario: AC_US071_01 更多赛事-类型筛选
    Given 创建主办方为wpt的赛事 (创建数据)
      |ac      |clear|host_name|race_name|
      |AC_US071|true |wpt|2017-WPT启航站  |
    When 我点击按钮 "更多赛事"
    And 我应当到达 "更多赛事界面"
    And 我点击按钮 "筛选主办方"
    And 我点击按钮 "第一个主办方"
    And 我点击按钮 "完成筛选主办方"
    Then 在 "第一个赛事" 可匹配到 "2017-WPT启航站"


  Scenario: AC_US071_02 更多赛事-类型筛选 + 日期筛选
    Given 创建主办方为wpt的赛事 (创建数据)
      |ac      |clear|host_name|race_name|begin_date|end_date|
      |AC_US071|true |wpt|2017-WPT启航站  |2017-01-01|2111-02-02|
    And 我按下按钮 "回到主页"
    When 我点击按钮 "更多赛事"
    And 我应当到达 "更多赛事界面"
    And 我点击按钮 "筛选主办方"
    And 我点击按钮 "第一个主办方"
    And 我点击按钮 "完成筛选主办方"
    Then 在 "第一个赛事" 可匹配到 "2017-WPT启航站"
    And 我点击 "日历按钮" 进入 "日历界面"
    And 点击原生button "18"
    And 我点击按钮 "日历按钮"
    Then 在 "第一个赛事" 可匹配到 "2017.01.01-2111.02.02"
    Then 在 "第一个赛事" 可匹配到 "2017-WPT启航站"

  Scenario: AC_US071_03 更多赛事-类型筛选 + 日期筛选
    Given 创建主办方为wpt的赛事 (创建数据)
      |ac      |clear|host_name|race_name|begin_date|end_date|
      |AC_US071|true |wpt|2017-WPT启航站  |2017-01-01|2017-02-02|
    And 我按下按钮 "回到主页"
    When 我点击按钮 "更多赛事"
    And 我应当到达 "更多赛事界面"
    And 我点击按钮 "筛选主办方"
    And 我点击按钮 "第一个主办方"
    And 我点击按钮 "完成筛选主办方"
    Then 在 "第一个赛事" 可匹配到 "2017-WPT启航站"
    And 我点击 "日历按钮" 进入 "日历界面"
    And 点击原生button "18"
    And 我点击按钮 "日历按钮"
    Then 应不存在 "第一个赛事"

