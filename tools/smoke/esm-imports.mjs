import assert from "node:assert/strict";

const root = await import("@atomazing-org/design-system");
const presets = await import("@atomazing-org/design-system/presets");

assert.equal(typeof root.ThemeProviderWrapper, "function");
assert.ok(Array.isArray(root.darkModeOptions));
assert.deepEqual(
  root.darkModeOptions.map((option) => option.value),
  ["system", "light", "dark"],
);
assert.equal("displayGreeting" in root, false);
assert.equal("DialogBtn" in root, false);
assert.equal("editorialClassic" in root, false);
assert.equal("installAppAnimation" in root, false);

assert.ok(Array.isArray(presets.defaultThemes));
assert.ok(presets.defaultThemes.length > 0);
assert.equal("editorialClassic" in presets, true);

console.log("esm smoke ok");
