import assert from "node:assert/strict";
import test from "node:test";
import { getLeadHubOrigin } from "../src/lib/leadhub-origin.mjs";

test("accepts HTTPS origins and drops configured paths", () => {
  assert.equal(getLeadHubOrigin("https://leadhub.example/path"), "https://leadhub.example");
});

test("rejects insecure and credential-bearing URLs", () => {
  assert.equal(getLeadHubOrigin("http://leadhub.example"), "");
  assert.equal(getLeadHubOrigin("https://user:pass@leadhub.example"), "");
  assert.equal(getLeadHubOrigin("not a URL"), "");
});
