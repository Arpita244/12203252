export const generateShortCode = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const isValidUrl = (string) => {
  try {
    new URL(string.startsWith('http') ? string : `https://${string}`);
    return true;
  } catch (_) {
    return false;
  }
};

export const getAnalytics = (urls) => {
  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const avgClicks = totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : 0;

  const today = new Date().toDateString();
  const todayClicks = urls.reduce((sum, url) => {
    const todayUrlClicks = url.clickHistory.filter(
      (click) => new Date(click.timestamp).toDateString() === today
    ).length;
    return sum + todayUrlClicks;
  }, 0);

  return { totalUrls, totalClicks, avgClicks, todayClicks };
};
