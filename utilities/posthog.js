import posthog from 'posthog-js';
import { ANALYTICS_ENABLED } from './env';

export const phCapture = (event, properties) => {
  if (!ANALYTICS_ENABLED) return;
  if (typeof window === 'undefined') return;
  if (!posthog.__loaded) return;

  posthog.capture(event, properties);
};
