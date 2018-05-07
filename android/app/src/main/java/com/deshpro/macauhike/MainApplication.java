package com.deshpro.macauhike;

import android.app.Application;

import cn.jiguang.share.android.api.JShareInterface;
import cn.jiguang.analytics.android.api.JAnalyticsInterface;

import com.facebook.react.ReactApplication;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.reactlibrary.RNReactNativeThumbPackage;
import com.zmxv.RNSound.RNSoundPackage;
import org.reactnative.camera.RNCameraPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.rnfs.RNFSPackage;
import io.jchat.android.JMessageReactPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;

import cn.jiguang.share.reactnative.JSharePackage;
import cn.jpush.reactnativejanalytics.JAnalyticsPackage;

import com.cmcewen.blurview.BlurViewPackage;
import com.beefe.picker.PickerViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.theweflex.react.WeChatPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.brentvatne.react.ReactVideoPackage;

import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import cn.jpush.reactnativejpush.JPushPackage;

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
            new ReactNativeAudioPackage(),
            new RNReactNativeThumbPackage(),
            new RNSoundPackage(),
            new RNCameraPackage(),
                    new ImageResizerPackage(),
                    new RNFSPackage(),
                    new JMessageReactPackage(SHUTDOWN_TOAST),
                    new RNI18nPackage(),
                    new JSharePackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
                    new JAnalyticsPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
                    new BlurViewPackage(),
                    new PickerViewPackage(),
                    new LinearGradientPackage(),
                    new WeChatPackage(),
                    new OrientationPackage(),
                    new ReactVideoPackage(),
                    new RCTSplashScreenPackage(),
                    new RCTSwipeRefreshLayoutPackage(),
                    new PickerPackage(),
                    new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
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
        JAnalyticsInterface.init(this);
        JShareInterface.init(this);
    }
}
