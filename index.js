
// Import all the required packages
var PushNotifications = require('ibm-push-notifications').PushNotifications;
var Notification = require('ibm-push-notifications').Notification;
var PushMessageBuilder = require('ibm-push-notifications').PushMessageBuilder;
var PushNotificationsApiKey = require('ibm-push-notifications').PushNotificationsWithApiKey;



// initialize with push service appSecret or apikey
var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");

var myPushNotifications = new PushNotificationsApiKey(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-bluemix-push-apikey");


// Get authtoken 
myPushNotifications.getAuthToken(function(hastoken,token){
	console.log(hastoken, token);
});

//For APNs settings
var apns = PushMessageBuilder.APNs.badge(1).interactiveCategory("Accept")
.iosActionKey("PUSH_OFFER").sound("sound.mp3").type(Notification.APNsType.DEFAULT)
.payload({ "alert" : "20% Off for you" }).titleLocKey("OFFER")
.locKey("REPLYTO")
.launchImage("launchImage1.png")
.titleLocArgs(["Jenna","Frank"]).locArgs(["Jenna","Frank"]).subtitle("IBM Cloud")
.title("IBM")
.attachmentUrl("https://developer.blackberry.com/native/files/documentation/images/text_messages_icon.png")
.build();


// create FCM message
var style = PushMessageBuilder.FCMStyle.type(Notification.FCMStyleTypes
    .BIGTEXT_NOTIFICATION).text("IBM Push").title("Big Text Notification").url("https://developer.blackberry.com/native/files/documentation/images/text_messages_icon.png")
    .lines(["IBM", "IBM Cloud", "Big Text Notification"]).build();
var lights = PushMessageBuilder.FCMLights.ledArgb(Notification.FCMLED.BLACK)
    .ledOffMs(1).ledOnMs(1).build();

//Also timetolive setting is provided which specifies how long (in seconds)
//The message should be kept in FCM storage if the device is offline.
var fcm = PushMessageBuilder.FCM.collapseKey("ping")
    .interactiveCategory("Accept").delayWhileIdle(true)
    .payload({ "alert" : "20% Off for you" }).androidTitle("FCM title")
    .priority(Notification.FCMPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0)
    .icon("http://www.iconsdb.com/icons/preview/purple/message-2-xxl.png")
    .sync(true).visibility(Notification.Visibility.PUBLIC)
    .style(style).lights(lights).build();


//For Safari. 
//All the three settings are mandatory to provide.
var safariWeb = PushMessageBuilder.SafariWeb.title("IBM").urlArgs(["www.IBM.com"])
    .action("View").build();

//For Firefox
var firefoxWeb = PushMessageBuilder.FirefoxWeb.title("IBM")
    .iconUrl("http://www.iconsdb.com/icons/preview/purple/message-2-xxl.png")
    .timeToLive(1.0).payload({ "alert" : "20% Off for you" }).build();

//For ChromeAppExtension. 
//You need to provide proper iconUrl or else chromeApp would not work.
var chromeAppExt = PushMessageBuilder.ChromeAppExt.collapseKey("ping")
    .delayWhileIdle(true).title("IBM")
    .iconUrl("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTptVxkAVpfhZO0h2KXbnQLg16yvDa7uF-y1t5KGmABDxJ13XoHR1YklGM").timeToLive(1.0)
    .payload({ "alert" : "20% Off for you" }).build();

//For Chrome
var chromeWeb = PushMessageBuilder.ChromeWeb.title("IBM")
    .iconUrl("http://www.iconsdb.com/icons/preview/purple/message-2-xxl.png")
    .timeToLive(1.0).payload({ "alert" : "20% Off for you" }).build();
        
var settings = PushMessageBuilder.Settings.apns(apns).fcm(fcm).safariWeb(safariWeb)
.firefoxWeb(firefoxWeb).chromeAppExt(chromeAppExt).chromeWeb(chromeWeb).build();       

var message = PushMessageBuilder.Message.alert("20% Off Offer for you")
.url("www.ibm.com").build();

var target = PushMessageBuilder.Target.platforms(
    [Notification.Platform.Apple, Notification.Platform.Google,
    Notification.Platform.WebChrome,Notification.Platform.WebFirefox,
        Notification.Platform.WebSafari,Notification.Platform.AppExtChrome]).build();
        
var notificationExample = Notification.message(message)
    .target(target).settings(settings).build();

// Send to one device
myPushNotifications.send(notificationExample, function(error, response, body) {
    console.log("Error: " + error);
    console.log("Response: " + JSON.stringify(response));
    console.log("Body: " + body);
});

