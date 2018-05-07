package com.deshpro.macauhike;

import com.facebook.react.ReactActivity;

import android.os.Bundle;

import com.reactnativecomponent.splashscreen.RCTSplashScreen;    //import RCTSplashScreen

import cn.jpush.android.api.JPushInterface;

import android.content.Intent;
import android.content.res.Configuration;

import cn.jiguang.analytics.android.api.JAnalyticsInterface;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PokerPro";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        RCTSplashScreen.openSplashScreen(this);   //open splashscreen
        //RCTSplashScreen.openSplashScreen(this, true, ImageView.ScaleType.FIT_XY);   //open splashscreen fullscreen
        super.onCreate(savedInstanceState);
        JPushInterface.init(this);
    }

    @Override
    protected void onResume() {
        super.onResume();

        JPushInterface.onResume(this);
        JAnalyticsInterface.onPageStart(this, this.getClass().getCanonicalName());
    }

    @Override
    protected void onPause() {
        super.onPause();

        JPushInterface.onPause(this);

    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        JAnalyticsInterface.onPageEnd(this, this.getClass().getCanonicalName());
    }
}
