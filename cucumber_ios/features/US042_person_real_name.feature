Feature: US042 实名
  作为一名已登陆用户，我应当能够个人信息页面，查看实名信息

  @reset_driver
  Scenario: AC_US0042_01 个人信息-实名
    Given 清除数据
    And 我已使用 "test@qq.com" 登录
    And 我在 "主页面"
    When 我点击按钮 "左上"
    And 我点击 "侧滑头像" 进入 "个人资料界面"
    Then 我点击 "实名信息" 进入 "实名信息页面"


#选择系统图片不知道怎么处理