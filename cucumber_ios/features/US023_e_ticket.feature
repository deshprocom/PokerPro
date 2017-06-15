Feature: US023 购票-电子票
  作为一名已登陆，未实名的用户
  我应当能够在购票页面中选择电子票，输入电子邮箱，并添加实名信息
  以便于购票下单

  @reset_driver
  Scenario: AC_US023_01 电子邮箱应可输入
    Given 创建赛事，赛事门票金额为 168168 (创建数据)
      | ac       | clear | ticket_status | ticket_price |
      | AC_US023 | true  | selling       | 168168       |
    And 我已使用 "test@gmail.com" 登录
    When 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    And 我点击 "购票" 进入 "购票页面"
    And 我点击按钮 "电子票"
    Then 我在 "邮箱" 输入 "aaa@test.com"

  Scenario: AC_US023_02 清除email
    Given 我在 "购票页面"
    When 我在 "邮箱" 输入 "aaa@test.com"
    Then 我点击按钮 "清除邮箱"

  Scenario: AC_US023_03 不显示收货地址
    Given 我在 "购票页面"
    When 我点击按钮 "电子票"
    Then "收货地址" 应隐藏

  Scenario: AC_US023_04 跳转到实名信息
    Given 我在 "购票页面"
    When 上滑
    Then 我点击按钮 "添加实名信息"

  Scenario: AC_US023_05 增加实名信息后，可编辑
    Given 我在 "真实姓名" 输入 "bree"
    And 我在 "身份证号" 输入 "441522199506185977"
    And 上传图片
    And  我点击 "提交" 回到 "购票页面"
    When 我点击按钮 "编辑实名信息"
    And  我点击 "提交" 回到 "购票页面"

  Scenario: AC_US023_06 成功购票
    And 我在 "邮箱" 输入 "aaa@test.com"
    And  我点击按钮 "购票下单"
    Then 我在Alert中点击 "OK"

  Scenario: AC_US023_07 切换账号
    Given 创建赛事，赛事门票金额为 168168 (创建数据)
      | ac       | clear | ticket_status | ticket_price |
      | AC_US023 | true  | selling       | 168168       |
    And 退出登录
    When 我点击按钮 "左上"
    Given 我已使用 "test12@gmail.com" 登录
    When 我在 "主页面" 点击 "第一个赛事" 进入 "赛事详情页面"
    And 我点击 "购票" 进入 "购票页面"
    When 应不存在 "编辑实名信息"

#  Scenario: AC_US023_06 回到主页应显示已购   需要人工
#    Given 我按下按钮 "回到主页"
#    Then 我能看到 "已购"



