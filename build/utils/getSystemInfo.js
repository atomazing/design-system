const { userAgent } = window.navigator;
const getOperatingSystem = () => {
    if (/windows nt/i.test(userAgent))
        return "Windows";
    if (/iphone|ipad|ipod/i.test(userAgent))
        return "iOS";
    if (/mac/i.test(userAgent))
        return "macOS";
    if (/linux/i.test(userAgent))
        return "Linux";
    if (/android/i.test(userAgent))
        return "Android";
    return "Unknown";
};
const getBrowser = () => {
    if (/chrome/i.test(userAgent) && !/edge/i.test(userAgent))
        return "Chrome";
    if (/firefox/i.test(userAgent))
        return "Firefox";
    if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent))
        return "Safari";
    if (/edg/i.test(userAgent))
        return "Edge";
    return "Unknown";
};
export const systemInfo = { os: getOperatingSystem(), browser: getBrowser() };
