import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");


console.log('outside constructor called');

class DistanceService {

  constructor(){
    this.initialize();
  }

  initialize() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
        // process the action
      },
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  trigger(title, description) {
    PushNotification.localNotification({
        /* Android Only Properties */
        ticker: title, // (optional)
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        smallIcon: "", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: description, // (optional) default: "message" prop
        vibrate: true, // (optional) default: true
        //vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: "some_tag", // (optional) add tag to message
        group: "group", // (optional) add group to message
        groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: "high", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        importance: "high", // (optional) set notification importance, default: high
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
        shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
        channelId: "your-custom-channel-id", // (optional) custom channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

        when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
        usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
        timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

        messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.


        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

        /* iOS only properties */
        alertAction: "view", // (optional) default: view
        category: "", // (optional) default: empty string

        /* iOS and Android properties */
        id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        title: title, // (optional)
        message: description, // (required)
        userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      });

  }

  isNearby(lat1, lon1, lat2, lon2) {
   var p = 0.017453292519943295;    // Math.PI / 180
   var c = Math.cos;
   var a = 0.5 - c((lat2 - lat1) * p)/2 +
           c(lat1 * p) * c(lat2 * p) *
           (1 - c((lon2 - lon1) * p))/2;
   return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

}

export default new DistanceService();
