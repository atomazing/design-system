export const canUseDom = (): boolean =>
  globalThis.window !== undefined && globalThis.document !== undefined;
