/** Access requests go by email. The address is assembled at runtime so it never appears in the prerendered HTML. */
const parts = ["benedict", "donkor", "599", "gmail", "com"];

export function accessMailto(subject: string, body: string) {
  const address = `${parts[0]}${parts[1]}${parts[2]}@${parts[3]}.${parts[4]}`;
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
