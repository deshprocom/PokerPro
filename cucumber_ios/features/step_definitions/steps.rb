# These are the 'step definitions' which Cucumber uses to implement features.
#
# Each step starts with a regular expression matching the step you write in
# your feature description.  Any variables are parsed out and passed to the
# step block.
#
# The instructions in the step are then executed with those variables.
#
# In this example, we're using rspec's assertions to test that things are happening,
# but you can use any ruby code you want in the steps.
#
# The '$driver' object is the appium_lib driver, set up in the cucumber/support/env.rb
# file, which is a convenient place to put it as we're likely to use it often.
# This is a different use to most of the examples;  Cucumber steps are instances
# of `Object`, and extending Object with Appium methods (through 
# `promote_appium_methods`) is a bad idea.
#
# For more on step definitions, check out the documentation at
# https://github.com/cucumber/cucumber/wiki/Step-Definitions
#
# For more on rspec assertions, check out
# https://www.relishapp.com/rspec/rspec-expectations/docs

Given(/^我已经用邮箱 (.*) 与密码 (.*) 注册过账号$/) do |email, password|
  # sleep(1)
  puts "DEBUG: email: #{email}"
  puts "DEBUG: password: #{password}"
end

Given(/^我在 "([^"]*)" 点击 "(.*?)" 进入 "(.*?)"$/) do |location, button, dest|
  location_id = VIEW_MAPPING[location]
  button_id = BUTTON_MAPPING[button]
  dest_id = VIEW_MAPPING[dest]

  wait do
    puts "DEBUG: #{location} => #{location_id}"
    id(location_id)
  end

  wait do
    puts "DEBUG: #{button} => #{button_id}"
    id(button_id)
  end
  id(button_id).click

  wait do
    puts "DEBUG: #{dest} => #{dest_id}"
    id(dest_id)
  end
end

When(/^我点击 "([^"]*)" [进入|回到]+ "(.*?)"$/) do |button, dest|
  button_id = BUTTON_MAPPING[button]
  dest_id = VIEW_MAPPING[dest]
  wait do
    puts "DEBUG: #{button} => #{button_id}"
    element = id(button_id)
    puts "DEBUG: got button: #{button_id}, #{element}"
  end
  id(button_id).click

  wait do
    puts "DEBUG: #{dest} => #{dest_id}"
    id(dest_id)
  end
end

When(/^我[按下|点击]+按钮 "(.*?)"$/) do |button|
  button_id = BUTTON_MAPPING[button]
  wait do
    puts "DEBUG: '#{button}' => #{button_id}"
    element = id(button_id)
    puts "DEBUG: got button: #{button_id}, #{element}"
  end
  id(button_id).click
end

When(/^点击原生button "(.*?)"$/) do |button|
  wait do
    puts "DEBUG: #{button}"
    element = id(button)
    puts "DEBUG: got button: #{element}"
  end
  id(button).click
end

Given(/^我在 "(.*?)" 输入 "(.*?)"$/) do |input, value|
  input_id = INPUT_MAPPING[input]
  puts "DEBUG: #{input} => #{input_id}"
  input_box = nil
  wait do
    input_box = id(input_id)
  end
  input_box.clear
  input_box.type "#{value}"
  sleep 1
end

And(/^等待 (\d+) 秒后.*/) do |seconds|
  sleep(seconds.to_i)
end

Then(/^我应当看到浮动提示 "(.+)"$/) do |msg|
  msg.strip!
  puts "DEBUG: 期待 #{msg}"
  wait { find(msg) }
end

Then(/^我应当到达 "([^"]*)"$/) do |location|
  location_id = VIEW_MAPPING[location]
  wait do
    puts "DEBUG: #{location} => #{location_id}"
    id(location_id)
  end
end

Given(/^我在 "([^"]*)"$/) do |location|
  location_id = VIEW_MAPPING[location]
  wait do
    puts "DEBUG: #{location} => #{location_id}"
    id(location_id)
  end
end

Given(/.*\(创建数据\)$/) do |table|
  params = table.hashes.first
  ac = params.delete('ac').downcase
  result = RemoteFactory.create(ac, params)
  puts result.parsed_body
end

Given(/^我已使用 "([^"]*)" 登录$/) do |value|
  result = RemoteFactory.create('ac_us001', email: value)
  puts result.parsed_body
  puts '回到主页'
  id(BUTTON_MAPPING['回到主页']).click if exists { id(BUTTON_MAPPING['回到主页']) }

  to_login = BUTTON_MAPPING['登录/注册']
  wait do
    puts '登录/注册'
    id(to_login).click
  end

  email_input = INPUT_MAPPING['邮箱或手机']
  password_input = INPUT_MAPPING['密码']
  login = BUTTON_MAPPING['登录']
  wait do
    id(email_input)
  end
  id(email_input).clear
  id(email_input).type "#{value}"
  sleep 1

  id(password_input).clear
  id(password_input).type 'test123'
  sleep 1

  id(login).click
end

Given(/^退出登录$/) do
  puts '回到主页'
  id(BUTTON_MAPPING['回到主页']).click if exists { id(BUTTON_MAPPING['回到主页']) }

  bar_left = BUTTON_MAPPING['左上']
  wait do
    puts '左上'
    id(bar_left).click
  end

  setup = BUTTON_MAPPING['设置']
  wait do
    puts '设置'
    id(setup).click
  end

  btn_exit = BUTTON_MAPPING['退出登录']
  wait do
    puts '退出登录'
    id(btn_exit).click
  end

  id('确定').click
end

Given(/^清除数据$/) do
  result = RemoteFactory.create('clear')
  puts result.parsed_body
end

Then(/^我应当看到 "(.*?)" 显示 "(.+)"$/) do |location, msg|
  msg.strip!
  puts "DEBUG: 期待 #{msg}"
  location_id = INPUT_MAPPING[location]
  wait {
    puts "DEBUG: #{location} => #{location_id}"
    id(location_id)
  }
  id(location_id).value.eql?(msg)
end

Then(/^"([^"]*)" 按钮置灰，无法点击$/) do |button_text|
  pending
end

Then(/^"([^"]*)" 按钮无法点击$/) do |button_text|
  pending
end

Then(/^看到的 "([^"]*)" 应为 "([^"]*)"$/) do |text_name, value|
  text_id = TEXT_MAPPING[text_name]
  wait {
    puts "DEBUG: #{text_name} => #{text_id}"
    id(text_id)
  }

  target_value = id(text_id).value.strip
  puts "DEBUG: #{target_value} eql? #{value}"
  raise unless target_value.eql?(value)
end

Then(/^我能看到 "([^"]*)" 这些元素$/) do |elements|
  elements.split(',').each do |element|
    element
    id(TEXT_MAPPING[element])
  end
end

And(/^我在Alert中点击 "(.+)"$/) do |button_text|
  wait(1) do
    tag('UIAAlert')
    button(button_text).click
  end
end

And(/^上传图片$/) do
  id('btn_picker_image').click
  wait(10) do
    id('Z图库').click
  end
  wait(10) do
    id('好').click
  end
  wait(10) do
    id('Camera Roll').click
  end
  wait do
    tag('XCUIElementTypeCell').click
  end
  sleep 1
end

Then(/^隐藏键盘$/) do
  hide_keyboard('Return')
end

And(/^打印调试 (.+)$/) do |debug_name|
  debug_name.strip!
  if debug_name == 'page'
    page
  elsif debug_name == 'source'
    source
  end
end

Then(/^"([^"]*)" 应隐藏/) do |button_text|
  pending
end

Then(/^我能看到 "(.+)"$/) do |msg|
  msg.strip!
  puts "DEBUG: 期待 #{msg}"
  find(msg)
end

And(/^上滑$/) do
  # swipe start_x: 300, start_y: 300, offest_x: 0, offset_y: -200
  swipe direction: 'up'
end

And(/^下拉刷新$/) do
  # swipe start_x: 300, start_y: 300, offest_x: 0, offset_y: 200
  swipe direction: 'down'
  sleep 1
end

Then(/^我应该找不到 "([^"]*)" 这些元素$/) do |elements|
  elements.split(',').each do |element|
    raise "存在#{element}这个元素" if exists { id(TEXT_MAPPING[element]) }
  end
end

Then(/^应不存在 "([^"]*)"$/) do |button|
  raise "存在#{button}" if exists { id(BUTTON_MAPPING[button]) }
end

Then(/^在 "([^"]*)" 可匹配到 "([^"]*)"$/) do |button, element|
  button_id = BUTTON_MAPPING[button]
  label = ''
  wait do
    puts "DEBUG: #{button} => #{button_id}"
    label = id(button_id).label
    puts "DEBUG: got label: #{label}"
  end
  raise "未匹配到#{element}" unless label.match(element)
end

Then(/^pending:.*$/) do
  pending
end
