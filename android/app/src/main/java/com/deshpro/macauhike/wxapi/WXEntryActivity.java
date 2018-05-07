package com.deshpro.macauhike.wxapi;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;


import com.theweflex.react.WeChatModule;

/**
 * Created by lorne on 2017/6/30.
 */


public class WXEntryActivity extends Activity {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();

    }
}