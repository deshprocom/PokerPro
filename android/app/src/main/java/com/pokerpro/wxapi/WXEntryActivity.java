package com.pokerpro.wxapi;

import com.umeng.weixin.callback.WXCallbackActivity;
import com.theweflex.react.WeChatModule;
import android.os.Bundle;

/**
 * Created by lorne on 2017/6/30.
 */

public class WXEntryActivity extends WXCallbackActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatModule.handleIntent(getIntent());
    finish();
  }
}
