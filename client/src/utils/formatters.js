/**
 * Converts minutes into a readable string e.g. 90 → "1 hr 30 min"
 */
export const formatTime = (minutes) => {
  if (!minutes || minutes <= 0) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
};

/**
 * Returns initials from a username e.g. "jamie_doe" → "JD"
 */
export const getInitials = (username = '') =>
  username
    .split(/[\s_-]/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

/**
 * Truncates text to a max length and appends "..."
 */
export const truncate = (text = '', maxLength = 100) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
