const CONTACT_EMAIL = "yashrajsharma786jmd@gmail.com";

export function serviceEnquiryLabel(service) {
  return `Discuss ${service}`;
}

export function buildEnquiryHref(service = "") {
  const subject = service ? `${service} enquiry` : "Product engineering enquiry";
  const serviceLine = service ? `Service of interest: ${service}\n` : "";
  const body = `Hi Yash,\n\n${serviceLine}What problem are you trying to solve?\nWhat outcome would help?\nTarget timing:\nCurrent tools or constraints:\n\n`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
