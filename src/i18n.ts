import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const messages = await import(`./base/messages/${locale}.json`);

  if (!messages) throw new Error(`Locale "${locale}" not found.`);

  return {
    messages: messages.default,
    timeZone: 'Africa/Casablanca',
  };
});
