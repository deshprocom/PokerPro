##
# 1. 按所在页面进行分类排序
# 2. 不同页面存在相同关键字（button或input), id应相同
# 3. 在下面注释中出现 '已被定义' 的前缀， 是为说明相同的关键字，在所处hash中已被定义，不需要重新定义

VIEW_MAPPING = {
    home_page: '主页面',
    page_more_races: '更多赛事页面',
    page_login_account: '密码登录页面',
    page_login_code: '验证码登录页面',
    page_phone_register: '手机注册页面',
    page_email_register: '邮箱注册页面',
    page_input_password: '输入密码页面',
    page_problem: '忘记密码页面',
    page_race_intro: '赛事详情页面',
    page_buy_ticket: '购票页面',
    page_real_name: '实名信息页面',
    page_add_real_name: '新增实名信息页面',
    page_ticket_notice: '购票须知页面',
    page_order_list: '订单列表页面',
    page_order_info: '订单详情页面',
    page_change_pwd_by_pwd: '通过密码修改密码界面',
    page_setting: '设置页面',
    page_security: '账号安全页面',
    page_modify_pwd_by_pwd: '通过密码修改密码界面',
    page_business: '商务合作界面',
    view_no_data: '无数据提示界面',
    page_profile: '个人资料界面',
    page_calendar: '日历界面',
    page_search_date: '日历过滤界面',
    page_keyword_search: '关键字搜索界面',
    page_race_info: '赛事详情界面',
    page_race_side: '边赛信息界面',
    page_race_result: '主赛结果界面',
    page_sub_race: '边赛详情界面',
    page_poker_player: '牌手界面',
    page_news_main: '资讯主界面',
    page_news_1: '资讯1新闻界面',
    page_news_4: '资讯4名人界面',
    page_news_2: '资讯2行业界面',
    page_news_info: '资讯内容界面',
    page_news_search: '资讯搜索界面',
    BlindsList: '盲注结构列表',
    ScheduleList: '赛程表列表',
    page_ticket: '票务界面',
    page_change_bind: '更换手机号界面',
    page_bind: '绑定手机界面',
    page_bind_old_code: '输入已绑定手机验证码界面',
    page_bind_know: '我知道了界面',
    page_bind_input_phone: '更换新手机号界面',
    page_bind_new_code: '输入绑定手机验证码界面',
    page_message: '通知消息界面',
    item_order_1: '订单通知类型1',
    item_certification_2: '实名通知类型2',

}.invert

BUTTON_MAPPING = {
    # 主页面
    btn_to_login: '登录/注册',
    btn_races_1: '第一个赛事',
    btn_race_detail: '赛事详情',
    btn_order: '订单',
    btn_setup: '设置',
    btn_account_security: '账号安全',
    btn_change_password: '修改密码',
    btn_more_races: '更多赛事',
    btn_home_news: '资讯',


    # 密码登录页面
    btn_bar_right: '注册',
    btn_bar_left: '左上',
    btn_login: '登录',
    btn_problem: '忘记密码',
    btn_switch_code_login: '手机验证码登录',
    btn_eyes: '眼睛',

    # 验证码登录页面
    btn_switch_login_account: '账号密码登录',
    btn_get_code: '获取验证码',
    # 已被定义：注册，登录，遇到问题

    # 手机注册页面
    btn_switch_email_register: '使用邮箱注册',
    btn_next: '下一步',
    btn_have_account: '我已有账号',
    # 已被定义：获取验证码

    # 邮箱注册页面
    btn_switch_phone_register: '使用手机注册',
    # 已被定义：下一步，我已有账号

    # 输入密码页面
    btn_complete: '完成',

    # 忘记密码页面
    login_do_code: '使用邮箱找回密码',

    # 赛事详情页面
    btn_buy: '购票',
    btn_service: '客服',
    btn_ticket_notice: '购票须知',
    赛事详情: '赛事详情Tab',
    边赛信息: '边赛信息Tab',
    主赛结果: '主赛结果Tab',
    btn_races_side_0: '边赛列表第一条',
    btn_race_info: '赛程表',
    btn_race_result: '赛事结果',
    btn_race_blinds: '盲注结构',
    txt_name_0: '参赛人0',

    # 购票页面
    btn_e_ticket: '电子票',
    btn_certification: '添加实名信息',
    btn_edit_id: '编辑实名信息',
    btn_clear_email: '清除邮箱',
    btn_buy_ticket: '购票下单',
    btn_buy_notice: '购票须知',

    # 订单列表页面
    btn_orders_0: '第一个订单',
    btn_order_cancel: '取消订单',
    btn_call: '联系客服付款',
    btn_user_real: '修改实名信息',

    # 帮助测试用的
    btn_keyboard_dismiss: '回收键盘',
    btn_home_page: '回到主页',
    btn_refresh: '刷新当前页',
    btn_personal: '个人中心',
    btn_save: '保存',
    btn_submit: '提交',

    #设置
    btn_exit: '退出登录',
    btn_certain: '确定',
    btn_business_cooperation: '商务合作',
    btn_business_phone: '联系电话',
    btn_head: '侧滑头像',
    btn_phone_num: '绑定手机号',
    btn_bind: '绑定',
    btn_change_phone: '更换手机号',
    btn_bind_know: '我知道了',
    btn_bind_back: '绑定弹窗左上',
    btn_bind_close: '绑定弹窗关闭',
    btn_bind_send: '验证码',

    #个人资料
    btn_real_name: '实名信息',
    #更多赛事
    btn_calendar: '日历按钮',
    btn_search: '关键字搜索',
    btn_main_race: '主赛信息',
    btn_sub_race: '边赛信息',
    btn_main_result: '主赛结果',
    btn_hosts_complete: '完成筛选主办方',
    btn_host_1: '第一个主办方',
    btn_race_hosts: '筛选主办方',
    #票务
    btn_ticket_row_0: '票务列表1',
    btn_home_ticket: '票务',

    #资讯
    btn_news_type_1: '资讯类别1新闻',
    btn_news_type_2: '资讯类别2行业',
    btn_news_type_4: '资讯类别4名人',
    btn_news_row_1: '资讯置顶项1',
    btn_news_row_2: '资讯列表项2',
    btn_news_search: '搜索资讯',


    txt_markdown: 'Markdown',


}.invert

INPUT_MAPPING = {
    # 密码登录页面
    input_username: '邮箱或手机',
    input_password: '密码',

    # 验证码登录页面
    input_phone: '手机号',
    input_code: '验证码',

    # 手机注册页面
    # 已被定义：手机号，验证码

    # 邮箱注册页面
    input_email: '邮箱',

    # 实名认证
    input_real_name: '真实姓名',
    input_id_card: '身份证号',

    # 修改密码
    input_old_pwd: '旧密码',
    input_new_pwd: '新密码',
    input_bind_code: '绑定验证码',
    # 赛事
    input_keyword: '赛事关键字',
    input_ticket_search: '票务关键字',

    #资讯
    input_news_search: '资讯搜索输入',


}.invert

TEXT_MAPPING = {
    # 赛事详情页
    txt_races_status: '赛事状态',
    txt_races_ticket: '售票状态',
    txt_races_prize: '奖池',
    txt_races_title: '赛事标题',
    txt_races_period: '比赛时间',
    txt_races_address: '比赛地点',

    txt_level_1: '盲注级别1',
    txt_blind_1: '盲注1',
    txt_ante_1: '盲注前注1',
    txt_time_1: '盲注时间1',
    txt_blind_content_2: '盲注休息2',
    txt_day_1: 'Day1',
    txt_month_1: '日期1',
    txt_begin_time_1: '开始时间1',

    # 购票页面
    txt_ticket_price: '票金额',
    txt_races_price: '赛事门票',
    txt_races_logo: '赛事Logo',

    # 订单页面
    txt_order_status: '订单状态',
    txt_order_number: '订单编号',
    txt_email: '邮箱',
    txt_price: '应付金额',
    txt_original_price: '商品金额',
    txt_total_price: '合计',
    im_pending: '审核中',
    im_failed: '审核失败',

    # 边赛页面
    txt_race_title: '边赛标题',
    txt_race_time: '边赛时间',
    txt_race_addr: '边赛地点',
    txt_race_buy_in: '边赛买入',
    txt_race_blinds: '边赛盲注',
    txt_race_price: '边赛奖池',
    txt_race_joinNum: '边赛人数',
    txt_ranking_0: '名次0',
    txt_earning_0: '奖金0',
    txt_score_0: 'POY0',
    txt_poker_avatar: '牌手头像',
    txt_poker_name: '牌手姓名',
    txt_poker_country: '牌手国籍',

    #资讯
    txt_news_title: '资讯标题',
    txt_news_date: '资讯日期',
    txt_news_source: '资讯来源',
    txt_markdown: 'Markdown',

    #设置
    txt_phone_security: '已绑定的手机号',

    #通知消息
    txt_title_1: '通知标题1',
    txt_notice_time_1: '通知时间1',
    txt_content_1: '通知内容1',
    txt_order_num_1:'通知订单编号1',
    txt_title_2: '通知标题2',


}.invert