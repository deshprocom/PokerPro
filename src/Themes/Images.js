const images = {
    month: require('../../source/month.png'),
    monthE: require('../../source/monthE.png'),
    nav_close: require('../../source/nav_Close.png'),
    icon_biyan: require('../../source/icon_biyan.png'),
    icon_guanbi: require('../../source/icon_guanbi.png'),
    icon_mima: require('../../source/icon_mima.png'),
    icon_shouji: require('../../source/icon_shouji.png'),
    icon_weixuanzhong: require('../../source/icon_weixuanzhong.png'),
    icon_xuanzhong: require('../../source/icon_xuanzhong.png'),
    icon_yanjing: require('../../source/icon_yanjing.png'),
    icon_yanzhenma: require('../../source/icon_yanzhenma.png'),
    icon_youxiang: require('../../source/icon_youxiang.png'),
    icon_zhanghao: require('../../source/icon_zhanghao.png'),
    icon_return: require('../../source/icon_return.png'),
    icon_blackspots: require('../../source/icon_blackspots.png'),
    icon_camera: require('../../source/icon_camera.png'),
    icon_cancel: require('../../source/icon_cancel.png'),
    icon_closed: require('../../source/icon_closed.png'),
    icon_deshpro: require('../../source/icon_deshpro.png'),
    icon_exclaRmation: require('../../source/icon_exclamation.png'),
    icon_longframe: require('../../source/icon_longframe.png'),
    icon_love: require('../../source/icon_love.png'),
    icon_match: require('../../source/icon_match.png'),
    icon_more: require('../../source/icon_more.png'),
    icon_open: require('../../source/icon_open.png'),
    icon_order: require('../../source/icon_order.png'),
    icon_phone: require('../../source/icon_phone.png'),
    icon_search_gray: require('../../source/icon_search_gray.png'),
    icon_search: require('../../source/icon_search.png'),
    icon_service: require('../../source/icon_service.png'),
    icon_setup: require('../../source/icon_setup.png'),
    icon_shortframe: require('../../source/icon_shortframe.png'),
    icon_slide: require('../../source/icon_slide.png'),
    icon_slide_down: require('../../source/icon_Slidedownward.png'),
    icon_spot: require('../../source/icon_spot.png'),
    icon_spotl: require('../../source/icon_spotl.png'),
    icon_time: require('../../source/icon_time.png'),
    icon_trophy: require('../../source/icon_trophy.png'),
    img_head: require('../../source/img_headportrait.png'),
    tab_search: require('../../source/tab_search.png'),
    load_gif: require('../../source/Load2.gif'),
    tickit: require('../../source/tickit.gif'),
    home_competition: require('../../source/home/home_competition.png'),
    home_def_harid: require('../../source/home/home_def_harid.png'),
    home_follow: require('../../source/home/home_follow.png'),
    home_gold: require('../../source/home/home_gold.png'),
    home_gray: require('../../source/home/home_gray.png'),
    home_highlights: require('../../source/home/home_highlights.png'),
    home_left_click: require('../../source/home/home_left_click.png'),
    home_match: require('../../source/home/home_match.png'),
    home_more_one: require('../../source/home/home_more_one.png'),
    home_more: require('../../source/home/home_side.png'),
    home_notification: require('../../source/home/home_remind.png'),
    home_open: require('../../source/home/home_open.png'),
    home_over_one: require('../../source/home/home_over_one.png'),
    home_over: require('../../source/home/home_over.png'),
    home_poker: require('../../source/home/home_poker.png'),
    home_prize: require('../../source/home/home_prize.png'),
    home_right_click: require('../../source/home/home_right_click.png'),
    home_spot: require('../../source/home/home_spot.png'),
    home_typeface: require('../../source/home/home_typeface.png'),
    home_bg: require('../../source/home/home_bg_image.png'),
    home_bg_races: require('../../source/home/home_bg_race.png'),
    home_unstart: require('../../source/home/home_races_unstart.png'),
    home_no: require('../../source/home/home_no.png'),
    home_fail: require('../../source/home/home_fail.png'),
    home_ordered: require('../../source/home/home_ordered.png'),
    home_avatar: require('../../source/home/home_avatar.png'),
    sign_bg: require('../../source/login/sign_bg_image.png'),
    sign_choice_no: require('../../source/login/sign_choice_no.png'),
    sign_choice: require('../../source/login/sign_choice.png'),
    sign_close: require('../../source/login/sign_close.png'),
    sign_close_gray: require('../../source/login/sign_close_one.png'),
    sign_eye_open: require('../../source/login/sign_eye_open.png'),
    sign_eye: require('../../source/login/sign_eye.png'),
    sign_logo_poker: require('../../source/login/sign_logo_poker.png'),
    sign_number: require('../../source/login/sign_number.png'),
    sign_password: require('../../source/login/sign_password.png'),
    sign_return: require('../../source/login/sign_retrun.png'),
    match_ticket: require('../../source/races/macth_ticket.png'),
    match_service: require('../../source/races/match_service.png'),
    match_share: require('../../source/races/match_share.png'),
    match_prize: require('../../source/races/match_prize.png'),
    match_point: require('../../source/races/match_point.png'),
    slide_edit: require('../../source/slide/sidebar_modify.png'),
    slide_order: require('../../source/slide/sidebar_order.png'),
    slide_service: require('../../source/slide/sidebar_service.png'),
    slide_setting: require('../../source/slide/sidebar_set-up.png'),
    ticket_arrow: require('../../source/buy/ticket_arrow.png'),
    ticket_check: require('../../source/buy/ticket_check.png'),
    ticket_check2: require('../../source/buy/ticket_check2.png'),
    ticket_edit: require('../../source/buy/ticket_edit.png'),
    ticket_prompt: require('../../source/buy/ticket_prompt.png'),
    ticket_security: require('../../source/buy/ticket_security.png'),
    ticket_security2: require('../../source/buy/ticket_securitys.png'),
    prompt_service: require('../../source/buy/prompt_service.png'),
    e_ticket_buy_zh: require('../../source/buy/e_ticket_buy_zh.png'),
    entity_ticket_buy_zh: require('../../source/buy/entity_tickey_buy_zh.png'),
    e_ticket_buy_en: require('../../source/buy/e_ticket_buy_en.png'),
    entity_ticket_buy_en: require('../../source/buy/entity_tickey_buy_en.png'),
    name_id: require('../../source/buy/name_id.png'),
    name_passport: require('../../source/buy/name_passport.png'),
    set_closed: require('../../source/setting/set_closed.png'),
    set_exclamation: require('../../source/setting/set_exclamation.png'),
    set_eye_close: require('../../source/setting/set_eye_close.png'),
    set_eye: require('../../source/setting/set_eye.png'),
    set_fork: require('../../source/setting/set_fork.png'),
    set_fork2: require('../../source/setting/set_fork2.png'),
    set_more: require('../../source/setting/set_more.png'),
    set_open: require('../../source/setting/set_open.png'),
    load_no_data: require('../../source/load/load_no_data.png'),
    load_refresh: require('../../source/load/load_refresh.png'),
    load_wifi: require('../../source/load/load_wifi.png'),
    races_bg: require('../../source/races/races_bg.png'),
    user_real_failed: require('../../source/order/user_real_failed.png'),
    user_real_pending: require('../../source/order/user_real_pending.png'),
    en_real_failed: require('../../source/order/en_real_fail.png'),
    en_real_pending: require('../../source/order/en_real_handing.png'),
    schedule: require('../../source/races/schedule.png'),
    search: require('../../source/races/search.png'),
    prev: require('../../source/races/prev.png'),
    search_gray: require('../../source/races/search_gray.png'),
    back: require('../../source/races/back.png'),
    slid_business: require('../../source/slide/slid_business.png'),
    set_poker: require('../../source/setting/set_poker.png'),
    race_location: require('../../source/races/race_location.png'),
    race_time: require('../../source/races/race_time.png'),
    race_triangle: require('../../source/races/triangle.png'),
    news_outline: require('../../source/news/outline.png'),
    news_triangle: require('../../source/news/triangle.png'),
    empty_image: require('../../source/empty/empty_ticket.png'),
    news_share: require('../../source/news/news_share.png'),
    race_type: require('../../source/races/race_type.png'),
    race_type_selected: require('../../source/races/race_type_selected.png'),
    race_type_unselect: require('../../source/races/race_type_unselect.png'),
    load_error: require('../../source/load/load_error.png'),
    set_back: require('../../source/setting/set_back.png'),
    home_badge: require('../../source/home/home_badge.png'),
    dark_back: require('../../source/home/dark_back.png'),
    up_triangle: require('../../source/order/up_triangle.png'),
    down_triangle: require('../../source/order/down_triangle.png'),
    ic_back: require('../../source/order/ic_back.png'),
    side_select: require('../../source/order/side_select.png'),
    side_selected: require('../../source/order/side_seleced.png'),
    empty_ticket: require('../../source/empty/empty_ticket.png'),
    home_img: require('../../source/home/home_img.png'),
    home_fire: require('../../source/home/home_fire.png'),
    more: require('../../source/home/more.png'),
    home_news: require('../../source/home/home_news.png'),
    home_sort1: require('../../source/home/home_sort1.png'),
    home_ticket1: require('../../source/home/home_ticket.png'),
    home_video1: require('../../source/home/home_video1.png'),
    item_sale: require('../../source/home/item_sale.png'),
    home_clock: require('../../source/home/home_clock.png'),
    home_adr: require('../../source/home/home_adr.png'),
    race_doing: require('../../source/home/race_doing.png'),
    race_end: require('../../source/home/race_end.png'),
    race_unstart: require('../../source/home/race_unstart.png'),
    race_wait: require('../../source/home/race_wait.png'),
    home_head: require('../../source/home/home_head.png'),
    edit: require('../../source/buy/edit.png'),
    handle: require('../../source/buy/handle.png'),
    handle2: require('../../source/buy/handle2.png'),
    adr_right: require('../../source/buy/adr_right.png'),
    adr_select: require('../../source/buy/adr_select.png'),
    adr_selected: require('../../source/buy/adr_selected.png'),
    video_play: require('../../source/news/video_play.png'),
    post_id_image: require('../../source/buy/postIDImage.png'),
    mask: require('../../source/Mask.png'),
    shape: require('../../source/rank/Shape.png'),
    gold: require('../../source/rank/gold.png'),
    silver: require('../../source/rank/silver.png'),
    copper: require('../../source/rank/copper.png'),
    Group: require('../../source/rank/Group6.png'),
    Group_em: require('../../source/rank/Rectangle.png'),
    web_left: require('../../source/news/web_left.png'),
    web_page: require('../../source/news/web_page.png'),
    web_right: require('../../source/news/web_right.png'),
    web_refresh: require('../../source/news/web_refresh.png'),
    rank_bg: require('../../source/rank/rank_bg.png'),
    share: require('../../source/rank/share.png'),
    share2: require('../../source/rank/share2.png'),
    poker_search: require('../../source/rank/search_poker.png'),
    select_e_ticket: require('../../source/buy/select_e_ticket.png'),
    selected_e_ticket: require('../../source/buy/selected_e_ticket.png'),
    select_entity: require('../../source/buy/select_entity.png'),
    selected_entity: require('../../source/buy/selected_entity.png'),
    pay_select: require('../../source/pay/pay_select.png'),
    pay_selected: require('../../source/pay/pay_selected.png'),
    pay_close: require('../../source/pay/pay_close.png'),
    pay_card: require('../../source/pay/pay_card.png'),
    pay_ticket: require('../../source/pay/pay_ticket.png'),
    verified_add: require('../../source/verified/add.png'),
    verified_avatar: require('../../source/verified/avatar.png'),
    verified_card: require('../../source/verified/card.png'),
    verified_edit: require('../../source/verified/edit.png'),
    verified_select: require('../../source/verified/select.png'),
    verified_selected: require('../../source/verified/selected.png'),
    verified_exmple: require('../../source/verified/exmple.png'),
    verifed_passport: require('../../source/verified/passport.png'),

    pukes: require('../../source/navigation/pukes.png'),
    raceBegin: require('../../source/navigation/raceBegin.png'),
    is: require('../../source/navigation/is>.png'),
    location: require('../../source/navigation/location.png'),
    time: require('../../source/navigation/time.png'),
    button: require('../../source/navigation/button.png'),
    oval: require('../../source/navigation/oval.png'),
    home: require('../../source/navigation/home.png'),
    home2: require('../../source/navigation/home2.png'),
    information: require('../../source/navigation/information.png'),
    information2: require('../../source/navigation/information2.png'),
    mine: require('../../source/navigation/mine.png'),
    mine2: require('../../source/navigation/mine2.png'),
    rank: require('../../source/navigation/rank.png'),
    rank2: require('../../source/navigation/rank2.png'),
    begin: require('../../source/navigation/begin.png'),
    business: require('../../source/navigation/business.png'),
    order: require('../../source/navigation/order.png'),
    settings: require('../../source/navigation/settings.png'),
    customer_service_tel: require('../../source/navigation/customer_service_tel.png'),
    speaker: require('../../source/navigation/speaker.png'),
    news_search: require('../../source/news/news_search.png'),
    video_share: require('../../source/news/video_share.png'),
    search_notice: require('../../source/navigation/search_notice.png'),
    search_notice2: require('../../source/navigation/search_notice2.png'),
    top: require('../../source/navigation/top.png'),
    coming: require('../../source/navigation/coming.png'),
    nav_mall: require('../../source/navigation/nav_mall.png'),
    nav_malled: require('../../source/navigation/nav_malled.png'),
    rightImg: require('../../source/navigation/rightImg.png'),
    shopping_cart: require('../../source/mall/cart.png'),
    mall_filter: require('../../source/mall/mall_filter.png'),
    sort_down: require('../../source/mall/sort_down.png'),
    sort_up: require('../../source/mall/sort_up.png'),
    sort: require('../../source/mall/sort.png'),
    mall_del: require('../../source/mall/mall_del.png'),
    shoppingCart: require('../../source/mall/shoppingCart.png'),
    close: require('../../source/mall/close.png'),
    closeWhite: require('../../source/mall/closeWhite.png'),
    cut: require('../../source/mall/cut.png'),
    add: require('../../source/mall/add.png'),
    mall_return: require('../../source/mall/mall_return.png'),
    mall_share: require('../../source/mall/mall_share.png'),
    search_empty: require('../../source/mall/search_empty.png'),
    camera: require('../../source/mall/camera.png'),

    radioSelected: require('../../source/cart/radioSelected.png'),
    radio: require('../../source/cart/radio.png'),
    emptyCart: require('../../source/cart/emptyCart.png'),
    poker_key: require('../../source/navigation/poker_key.png'),
    expand: require('../../source/order/expand.png'),
    positioning: require('../../source/order/positioning.png'),
    return_radio: require('../../source/mall/return_radio.png'),
    return_radio_selected: require('../../source/mall/return_radio_selected.png'),
    logistics: require('../../source/mall/logistics.png'),
    order_line: require('../../source/order/order_line.png'),
    mall_order: require('../../source/mall/mall_order.png'),
    ticket_order: require('../../source/mall/ticket_order.png'),
    delivery: require('../../source/mall/delivery.png'),
    mall_up: require('../../source/mall/mall_up.png'),
    loading: require('../../source/setting/loading.gif'),
    imgDel: require('../../source/mall/imgDel.png'),

    comment: require('../../source/comment/comment.png'),
    pen: require('../../source/comment/pen.png'),
    commentWhite: require('../../source/comment/commentWhite.png'),
    like: require('../../source/comment/like.png'),
    likeRed: require('../../source/comment/likeRed.png'),
    forward: require('../../source/comment/forward.png'),
    person_dynamic: require('../../source/navigation/person_dynamic.png'),
    listLike: require('../../source/comment/listLike.png'),
    black_fire: require('../../source/crowd/black_fire.png'),
    poker_b: require('../../source/navigation/poker_b.png'),
    poker_P: require('../../source/navigation/poker_P.png'),
    crowd: require('../../source/navigation/crowd.png'),
    crowd_banner: require('../../source/crowd/crowd_banner.png'),
    clickImg: require('../../source/crowd/clickImg.png'),
    clickImgBlue: require('../../source/crowd/clickImgBlue.png'),
    crowd_close: require('../../source/crowd/crowd_close.png'),
    crowd_starting: require('../../source/crowd/crowd_starting.png'),
    timely_matchRed: require('../../source/crowd/timely_matchRed.png'),
    pay_help: require('../../source/mall/pay_help.png'),
    wx_pay: require('../../source/buy/weixin.png'),
    ranking: require('../../source/navigation/ranking.png'),

    APPbanner: require('../../source/crowd/APPbanner.png'),
    none: require('../../source/crowd/none.png'),

    icon_share_qq: require('../../source/share/icon_share_qq.png'),
    icon_share_sina: require('../../source/share/icon_share_sina.png'),
    icon_share_wechat: require('../../source/share/icon_share_wechat.png'),
    icon_share_wxcircle: require('../../source/share/icon_share_wxcircle.png'),
    social: {
        close: require('../../source/social/close.png'),
        article: require('../../source/social/article.png'),
        moment: require('../../source/social/moment.png'),
        close_blue: require('../../source/social/close_blue.jpg'),
        row_delete: require('../../source/social/row_delete.png'),
        row_arrange: require('../../source/social/row_arrange.png'),
        address: require('../../source/social/address.png'),
        icon_articleedit: require('../../source/social/icon_articleedit.png'),
        icon_send_mood: require('../../source/social/icon_send_mood.jpg'),
        reply: require('../../source/social/reply.png'),
        more_3: require('../../source/social/more_3.png'),
        like_red: require('../../source/social/like_red.png'),
        like_gray: require('../../source/social/like_gray.png'),
        comment_gray: require('../../source/social/comment_gray.png'),
        article_delete: require('../../source/social/delete.png'),
        more_4: require('../../source/social/more_4.png'),
        user_topic: require('../../source/social/user_topic.png')
    }

};

export default images

