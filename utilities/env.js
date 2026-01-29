export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? 'development';

export const IS_PROD = APP_ENV === 'production';
export const IS_STAGING = APP_ENV === 'staging';

export const ANALYTICS_ENABLED = IS_PROD || IS_STAGING;
