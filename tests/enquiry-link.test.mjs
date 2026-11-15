import assert from "node:assert/strict";
import test from "node:test";
import { buildEnquiryHref, serviceEnquiryLabel } from "../src/lib/enquiry-link.mjs";

test("service enquiries have distinct accessible names", () => {
  assert.equal(serviceEnquiryLabel("Workflow automation"), "Discuss Workflow automation");
});

test("service enquiry preselects the service and asks for useful scope", () => {
  const link = new URL(buildEnquiryHref("Workflow automation"));
  assert.equal(link.protocol, "mailto:");
  assert.equal(link.pathname, "yashrajsharma786jmd@gmail.com");
  assert.equal(link.searchParams.get("subject"), "Workflow automation enquiry");
  assert.match(link.searchParams.get("body"), /Service of interest: Workflow automation/);
  assert.match(link.searchParams.get("body"), /Target timing/);
});

test("general enquiry still works without choosing a service", () => {
  const link = new URL(buildEnquiryHref());
  assert.equal(link.searchParams.get("subject"), "Product engineering enquiry");
  assert.doesNotMatch(link.searchParams.get("body"), /Service of interest/);
});

test("service names with URL punctuation stay intact in the email draft", () => {
  const service = "Research & strategy #1";
  const link = new URL(buildEnquiryHref(service));
  assert.equal(link.searchParams.get("subject"), `${service} enquiry`);
  assert.ok(link.searchParams.get("body").includes(`Service of interest: ${service}`));
});
