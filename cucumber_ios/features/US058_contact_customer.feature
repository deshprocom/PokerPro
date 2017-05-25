Feature: US058 订单详情-联系客服
  作为一名已登录购票用户，我应当在订单详情中有联系客服
  使得我能在待付款待订单中联系到客服

  @reset_driver
  Scenario: AC_US058_01 订单详情-联系客服
    Given 清除数据
    And 我已使用 "test@gmail.com" 登录
    Given 创建一个用户订单，且订单状态为待付款 (创建数据)
      |ac            |order_status|user|
      |AC_US056_01   |unpaid|test@gmail.com|
    When 我点击按钮 "左上"
    And 我点击按钮 "订单"
    And 我应当到达 "订单列表页面"
    And 我点击 "第一个订单" 进入 "订单详情页面"
    Then 我能看到 "联系客服付款"


  Scenario: AC_US058_02 联系客服-弹窗提示
    Given 我点击按钮 "联系客服付款"
    And 我能看到 "客服热线"
    And 我能看到 "0755-83765566"
    And 我在Alert中点击 "取消"

  Scenario: AC_US058_03 联系客服-弹窗提示
    Given 我点击按钮 "联系客服付款"
    And 我在Alert中点击 "点击拨打"