import assert from "node:assert/strict";
import test from "node:test";
import { getRelatedProducts } from "../src/lib/related-products.mjs";

test("related-product lookup waits for consent and filters unsafe destinations", async () => {
  let requested = "";
  const fetcher = async (url) => {
    requested = url;
    return { ok: true, json: async () => ({ items: [
      { id: "draftloom", name: "Clear Writing", url: "https://writing.example.test/", reason: "Clear team updates" },
      { id: "unsafe", name: "Bad", url: "javascript:alert(1)", reason: "Bad" },
    ] }) };
  };
  assert.deepEqual(await getRelatedProducts("https://leads.example.test", "yashrajsharma-portfolio", false, fetcher), []);
  assert.equal(requested, "");
  const items = await getRelatedProducts("https://leads.example.test", "yashrajsharma-portfolio", true, fetcher);
  assert.equal(requested, "https://leads.example.test/api/recommendations?project=yashrajsharma-portfolio&consent=true");
  assert.deepEqual(items.map(({ id }) => id), ["draftloom"]);
});
