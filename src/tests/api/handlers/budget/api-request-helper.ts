// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const budegtRequest: any = {
  resource: '/{proxy+}',
  path: '/budget',
  httpMethod: 'POST',
  headers: {
    accept: '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'cache-control': 'no-cache',
    'cloudfront-forwarded-proto': 'https',
    'cloudfront-is-desktop-viewer': 'true',
    'cloudfront-is-mobile-viewer': 'false',
    'cloudfront-is-smarttv-viewer': 'false',
    'cloudfront-is-tablet-viewer': 'false',
    'cloudfront-viewer-asn': '14618',
    'cloudfront-viewer-country': 'US',
    'content-type': 'application/json',
    host: 'bmxrugvl23.execute-api.us-east-1.amazonaws.com',
    'postman-token': 'be90d569-a546-45d3-91f4-e34615ab4bf0',
    'user-agent': 'PostmanRuntime/7.36.3',
    via: '1.1 91996b055df3611b680390c98760c3d4.cloudfront.net (CloudFront)',
    'x-amz-cf-id': 'p53R9skSbMr_JZOoRS7LBc_MYOUssQvukKHCQcb2BKba-PFS2FJikQ==',
    'x-amzn-trace-id': 'Root=1-65e0e3d1-471f388a7a2aa49c7e9c7b42',
    'x-forwarded-for': '54.86.50.139, 18.68.30.134',
    'x-forwarded-port': '443',
    'x-forwarded-proto': 'https',
  },
  multiValueHeaders: {
    accept: ['*/*'],
    'accept-encoding': ['gzip, deflate, br'],
    'cache-control': ['no-cache'],
    'cloudfront-forwarded-proto': ['https'],
    'cloudfront-is-desktop-viewer': ['true'],
    'cloudfront-is-mobile-viewer': ['false'],
    'cloudfront-is-smarttv-viewer': ['false'],
    'cloudfront-is-tablet-viewer': ['false'],
    'cloudfront-viewer-asn': ['14618'],
    'cloudfront-viewer-country': ['US'],
    'content-type': ['application/json'],
    host: ['bmxrugvl23.execute-api.us-east-1.amazonaws.com'],
    'postman-token': ['be90d569-a546-45d3-91f4-e34615ab4bf0'],
    'user-agent': ['PostmanRuntime/7.36.3'],
    via: ['1.1 91996b055df3611b680390c98760c3d4.cloudfront.net (CloudFront)'],
    'x-amz-cf-id': ['p53R9skSbMr_JZOoRS7LBc_MYOUssQvukKHCQcb2BKba-PFS2FJikQ=='],
    'x-amzn-trace-id': ['Root=1-65e0e3d1-471f388a7a2aa49c7e9c7b42'],
    'x-forwarded-for': ['54.86.50.139, 18.68.30.134'],
    'x-forwarded-port': ['443'],
    'x-forwarded-proto': ['https'],
  },
  queryStringParameters: {},
  multiValueQueryStringParameters: {},
  pathParameters: { proxy: 'budget' },
  stageVariables: null,
  requestContext: {
    resourceId: '9ha8f7',
    resourcePath: '/{proxy+}',
    httpMethod: 'POST',
    extendedRequestId: 'T6iIyG80oAMEcYg=',
    requestTime: '29/Feb/2024:20:06:41 +0000',
    path: '/dev/budget',
    accountId: '924245329070',
    protocol: 'HTTP/1.1',
    stage: 'dev',
    domainPrefix: 'bmxrugvl23',
    requestTimeEpoch: 1709237201573,
    requestId: '637fefc1-ccca-414b-9c16-6bad16a23ea4',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '54.86.50.139',
      principalOrgId: null,
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'PostmanRuntime/7.36.3',
      user: null,
    },
    domainName: 'bmxrugvl23.execute-api.us-east-1.amazonaws.com',
    deploymentId: 'zzj6b2',
    apiId: 'bmxrugvl23',
  },
  // body: '',
  isBase64Encoded: false,
  rawHeaders: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-ASN': '14618',
    'CloudFront-Viewer-Country': 'US',
    'Content-Type': 'application/json',
    Host: 'bmxrugvl23.execute-api.us-east-1.amazonaws.com',
    'Postman-Token': 'be90d569-a546-45d3-91f4-e34615ab4bf0',
    'User-Agent': 'PostmanRuntime/7.36.3',
    Via: '1.1 91996b055df3611b680390c98760c3d4.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'p53R9skSbMr_JZOoRS7LBc_MYOUssQvukKHCQcb2BKba-PFS2FJikQ==',
    'X-Amzn-Trace-Id': 'Root=1-65e0e3d1-471f388a7a2aa49c7e9c7b42',
    'X-Forwarded-For': '54.86.50.139, 18.68.30.134',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
  },
  rawMultiValueHeaders: {
    Accept: ['*/*'],
    'Accept-Encoding': ['gzip, deflate, br'],
    'Cache-Control': ['no-cache'],
    'CloudFront-Forwarded-Proto': ['https'],
    'CloudFront-Is-Desktop-Viewer': ['true'],
    'CloudFront-Is-Mobile-Viewer': ['false'],
    'CloudFront-Is-SmartTV-Viewer': ['false'],
    'CloudFront-Is-Tablet-Viewer': ['false'],
    'CloudFront-Viewer-ASN': ['14618'],
    'CloudFront-Viewer-Country': ['US'],
    'Content-Type': ['application/json'],
    Host: ['bmxrugvl23.execute-api.us-east-1.amazonaws.com'],
    'Postman-Token': ['be90d569-a546-45d3-91f4-e34615ab4bf0'],
    'User-Agent': ['PostmanRuntime/7.36.3'],
    Via: ['1.1 91996b055df3611b680390c98760c3d4.cloudfront.net (CloudFront)'],
    'X-Amz-Cf-Id': ['p53R9skSbMr_JZOoRS7LBc_MYOUssQvukKHCQcb2BKba-PFS2FJikQ=='],
    'X-Amzn-Trace-Id': ['Root=1-65e0e3d1-471f388a7a2aa49c7e9c7b42'],
    'X-Forwarded-For': ['54.86.50.139, 18.68.30.134'],
    'X-Forwarded-Port': ['443'],
    'X-Forwarded-Proto': ['https'],
  },
}
