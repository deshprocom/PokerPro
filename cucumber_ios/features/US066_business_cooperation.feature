Feature: US066 设置-商务合作
  作为一名用户，我应该能查看商务合作

  @reset_driver
  Scenario: AC_US066_01 商务合作
    And 我在 "主页面"
    When 我点击按钮 "左上"
    And 我点击按钮 "设置"
    And 我点击按钮 "商务合作"
    Then 我应当到达 "商务合作界面"

  Scenario: AC_US066_02 商务合作
    When 我点击按钮 "联系电话"
    And 等待 5 秒后
    And 我在Alert中点击 "取消"
    And 等待 5 秒后
    Then 我应当到达 "商务合作界面"