export async function generateInsecureKeyFromString(crypto, str) {
  return crypto.subtle.importKey(
    "raw",
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder("utf8").encode(str))
    ).slice(0, 16),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptStringWithKey(crypto, str, iv, key) {
  return crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    new TextEncoder("utf8").encode(str)
  );
}

export async function decryptStringWithKey(crypto, data, iv, key) {
  return new TextDecoder("utf8").decode(
    await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data)
  );
}
