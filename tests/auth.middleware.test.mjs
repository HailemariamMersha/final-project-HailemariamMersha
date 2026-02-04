import assert from "assert";
import { requireAuth } from "../routers/index.mjs";

describe("requireAuth middleware", () => {
  it("redirects to login when userId is missing", () => {
    const req = { session: {} };
    let redirectedTo = null;
    const res = {
      redirect: (path) => {
        redirectedTo = path;
      },
    };
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
    };

    requireAuth(req, res, next);

    assert.strictEqual(redirectedTo, "/auth/login");
    assert.strictEqual(nextCalled, false);
  });

  it("calls next when userId exists", () => {
    const req = { session: { userId: "123" } };
    const res = {
      redirect: () => {
        throw new Error("redirect should not be called");
      },
    };
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
    };

    requireAuth(req, res, next);

    assert.strictEqual(nextCalled, true);
  });
});
