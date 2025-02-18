/**
 * A custom React hook to determine if the current device is a smaller device
 * based on the screen width.
 * @param [breakpoint=768] - The breakpoint in pixels at which a device is considered "smaller".
 * @returns {boolean} - A boolean value indicating whether the current device is a smaller device.
 */
export declare const useResponsiveDisplay: (breakpoint?: number) => boolean;
