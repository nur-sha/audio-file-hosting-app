export function safeParse(value: string, fallback?: any) {
  try {
    const parseData = JSON.parse(value);
    return parseData;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return fallback || null;
  }
}
