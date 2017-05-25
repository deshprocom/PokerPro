Feature: US0015 更多赛事-日历
  作为一名用户，我需要通过关键字搜索赛事

  @reset_driver
  Scenario: AC_US0016_01 更多赛事-关键字-'澳门'
    Given 创建第一个赛事，在当前日期的赛事 (创建数据)
      |ac      |clear|name|begin_date|end_date|
      |AC_US013|true |2017APT澳门启航站|2017-01-01|2111-02-02|
    When 我点击按钮 "更多赛事"
    And 我应当到达 "更多赛事页面"
    And 我点击 "关键字搜索" 进入 "关键字搜索界面"
    And 我在 "赛事关键字" 输入 "澳门"
    Then 在 "第一个赛事" 可匹配到 "澳门"

  Scenario: AC_US0016_01 更多赛事-关键字-'日本'
    Given 我在 "赛事关键字" 输入 "日本"
    Then 我应当到达 "无数据提示界面"
