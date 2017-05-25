Feature: US083 赛事票务
  可以快速查看app中含有票务的赛事

  @reset_driver
  Scenario: AC_US083_01 进入票务界面
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac         |clear|ticket_status|
      |AC_US017   |true |selling|
    When 我在 "主页面" 点击 "票务" 进入 "票务界面"
    Then 我能看到 "票务搜索框" 这些元素


  Scenario: AC_US083_02 票务界面提示为空
    Given 清除数据
    And 我按下按钮 "回到主页"
    When 我在 "主页面" 点击 "票务" 进入 "票务界面"
    Then 我应当到达 "无数据提示界面"


  Scenario: AC_US083_04 票务列表
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac         |clear|ticket_status|
      |AC_US017   |true |selling|
    And 我按下按钮 "回到主页"
    When 我在 "主页面" 点击 "票务" 进入 "票务界面"
    Then 在 "票务列表1" 可匹配到 "售票中"
    And 在 "票务列表1" 可匹配到 "地址:澳门"
    And 在 "票务列表1" 可匹配到 "2017APT启航站"

  Scenario: AC_US083_06 票务列表加载更多票务
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac       |clear|ticket_status|
      |AC_US017 |true |selling|
    And 我按下按钮 "回到主页"
    When 我在 "主页面" 点击 "票务" 进入 "票务界面"
    And 上滑
    And 上滑
    And 上滑
    Then 我能看到 "APT更多的赛事"

  Scenario: AC_US083_07 票务界面进入赛事详情
    Given 创建第一个赛事，且售票状态为售票中 (创建数据)
      |ac         |clear|ticket_status|
      |AC_US017   |true |selling|
    And 我按下按钮 "回到主页"
    When 我在 "主页面" 点击 "票务" 进入 "票务界面"
    Then 我点击 "票务列表1" 进入 "赛事详情页面"
