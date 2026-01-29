import { ANALYTICS_ENABLED } from './env';

export const gaEvent = ({ action, category, label, value, ...rest }) => {
  if (!ANALYTICS_ENABLED) return;
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  });
};
