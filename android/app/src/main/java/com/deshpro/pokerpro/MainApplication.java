package com.deshpro.pokerpro;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.theweflex.react.WeChatPackage;
import com.zzy.umshare.UMShareModulePackage;
import com.github.yamill.orientation.OrientationPackage;
import com.brentvatne.react.ReactVideoPackage;

import cn.jpush.reactnativejpush.JPushPackage;
import in.esseak.react_native_umeng.UmengPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;
import com.beefe.picker.PickerViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.pusherman.networkinfo.RNNetworkInfoPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private boolean SHUTDOWN_TOAST = true;
    private boolean SHUTDOWN_LOG = true;
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new WeChatPackage(),
            new UMShareModulePackage(),
            new OrientationPackage(),
            new ReactVideoPackage(),
            new UmengPackage(),
            new RCTSplashScreenPackage(),
            new RCTSwipeRefreshLayoutPackage(),
            new PickerViewPackage(),
            new PickerPackage(),
            new ReactNativeI18n(),
            new BlurViewPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new RNNetworkInfoPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
