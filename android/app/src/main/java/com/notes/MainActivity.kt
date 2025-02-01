package com.notes

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String {
    return "notes"
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flag [fabricEnabled].
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return DefaultReactActivityDelegate(this, mainComponentName)
  }

  /**
   * If you're using gesture handler, ensure to wrap your content in
   * RNGestureHandlerEnabledRootView for Android.
   */
  override fun createRootView(): RNGestureHandlerEnabledRootView {
    return RNGestureHandlerEnabledRootView(this)
  }
}
