export async function getCurrentTimeInEpoch() {
  return Date.parse(new Date()) / 1000;
}
