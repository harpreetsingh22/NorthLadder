import * as Toys from '@hapipal/toys';
import { RequestHeaders, RegistrationAppType } from '@interfaces/common';

export default Toys.onPreHandler(
  async (request, h) => {
    const { headers } = request;

    // user ip Address. support of vercel ip only.
    request.pre.userIP = headers[RequestHeaders.X_USER_IP] || headers[RequestHeaders.X_SOURCE_IP];

    // trace id
    request.pre.traceId = headers[RequestHeaders.REQUEST_ID];

    // SourceMeta
    const appType = headers[RequestHeaders.APP_TYPE];
    const appVersion = headers[RequestHeaders.APP_VERSION];
    const appDeviceId = headers[RequestHeaders.DEVICE_ID];
    const appPlatform = headers[RequestHeaders.APP_PLATFORM];
    const referrer = headers[RequestHeaders.REFERER];
    const appsFlyerUid = headers[RequestHeaders.APPSFLYER_UID];
    request.pre.appType = appType ? appType.toLowerCase() : undefined;
    request.pre.appVersion = appVersion;
    request.pre.appDeviceId = appDeviceId;
    request.pre.appPlatform = appPlatform;
    request.pre.referrer = referrer;
    request.pre.appsFlyerUid = appsFlyerUid;

    // is mobile app
    if (appType === RegistrationAppType.IOS || appType === RegistrationAppType.ANDROID) {
      request.pre.isMobileAppRequest = true;
    }

    // locale
    request.pre.locale = headers[RequestHeaders.LOCALE];

    return h.continue;
  },
  {
    sandbox: 'plugin',
  },
);
