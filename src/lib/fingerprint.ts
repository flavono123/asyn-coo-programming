export function getFingerprint(): string {
  if (typeof window === "undefined") return "";
  let fp = localStorage.getItem("pigeon-fp");
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem("pigeon-fp", fp);
  }
  return fp;
}
