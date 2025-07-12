/**
 * A list of supported operating systems.
 */
export type OperatingSystem =
  | "Windows"
  | "macOS"
  | "Linux"
  | "iOS"
  | "Android"
  | "Unknown";

/**
 * A list of supported browsers.
 */
export type Browser = "Chrome" | "Firefox" | "Safari" | "Edge" | "Unknown";

const { userAgent } = globalThis.navigator;

/**
 * Detects the user's operating system based on the user agent string.
 *
 * @returns {OperatingSystem} The name of the detected operating system.
 */
export const getOperatingSystem = (): OperatingSystem => {
  const ua = userAgent.toLowerCase();

  if (ua.includes("windows nt")) return "Windows";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod"))
    return "iOS";
  if (ua.includes("mac")) return "macOS";
  if (ua.includes("android")) return "Android";
  if (ua.includes("linux")) return "Linux";

  return "Unknown";
};

/**
 * Detects the user's browser based on the user agent string.
 *
 * @returns {Browser} The name of the detected browser.
 */
export const getBrowser = (): Browser => {
  const ua = userAgent.toLowerCase();

  // Order matters: Edge must come before Chrome
  if (ua.includes("edg")) return "Edge";
  if (ua.includes("chrome")) return "Chrome";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("safari")) return "Safari";

  return "Unknown";
};

/**
 * Basic information about the user's system (OS and browser).
 */
export const systemInfo = {
  os: getOperatingSystem(),
  browser: getBrowser(),
};
