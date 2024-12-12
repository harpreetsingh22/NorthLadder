export enum RequestHeaders {
  REQUEST_ID = 'x-request-id',
  APP_PLATFORM = 'app-platform',
  APP_TYPE = 'app-type',
  APP_VERSION = 'app-version',
  DEVICE_ID = 'app-device-id',
  LOCALE = 'locale',
  X_FORWARDED_FOR = 'x-forwarded-for',
  X_FORWARDED_PATH = 'x-forwarded-path',
  AUTHORIZATION = 'authorization',
  X_API_KEY = 'x-api-key',
  USER_AGENT = 'user-agent',
  REFERER = 'referer',
  APPSFLYER_UID = 'appsflyer-uid',
  X_USER_IP = 'x-user-ip',
  X_SOURCE_IP = 'x-source-ip',
}

export enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
}

export enum RegistrationAppType {
  IOS = 'ios',
  WEB = 'desktop',
  ANDROID = 'android',
  MWEB = 'mweb',
}

export enum RegistrationPlatform {
  RAR = 'RAR',
}

export enum RegistrationAppPlatform {
  WEBVIEW_APP = 'webview_app',
  WEBSITE = 'website',
  MOBILE_WEBSITE = 'mobile_website',
  NATIVE_APP = 'native_app',
}

export enum SupportedLanguage {
  EN = 'en',
}
