import assert from "assert";
import { formatDate } from "../utils/formatDate.mjs";

describe("formatDate helper", () => {
  it("returns empty string when date is falsy", () => {
    assert.strictEqual(formatDate(null), "");
    assert.strictEqual(formatDate(undefined), "");
  });

  it("formats a date into readable month/day/year and time", () => {
    const value = new Date("2024-01-15T13:45:00Z");
    const formatted = formatDate(value);

    assert.ok(formatted.includes("Jan"));
    assert.ok(formatted.includes("15"));
    assert.ok(formatted.includes("2024"));
  });
});
