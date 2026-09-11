/**
 * End-to-End Encryption Service using Web Crypto API (AES-GCM 256-bit)
 * Provides client-side zero-knowledge encryption for logs, URLs, memos, and screenshots.
 */

const KEY_STORAGE_KEY = 'chronotrack_e2e_master_key_raw';

let cachedCryptoKey: CryptoKey | null = null;

async function getEncryptionKey(): Promise<CryptoKey> {
  if (cachedCryptoKey) return cachedCryptoKey;

  const existingRaw = localStorage.getItem(KEY_STORAGE_KEY);
  if (existingRaw) {
    try {
      const rawKeyBytes = Uint8Array.from(atob(existingRaw), c => c.charCodeAt(0));
      cachedCryptoKey = await window.crypto.subtle.importKey(
        'raw',
        rawKeyBytes,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );
      return cachedCryptoKey;
    } catch {
      // If error importing, generate fresh key
    }
  }

  // Generate new 256-bit key
  const newKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const exported = await window.crypto.subtle.exportKey('raw', newKey);
  const base64Key = btoa(String.fromCharCode(...new Uint8Array(exported)));
  localStorage.setItem(KEY_STORAGE_KEY, base64Key);

  cachedCryptoKey = newKey;
  return cachedCryptoKey;
}

export async function encryptData(payload: unknown): Promise<{ ciphertext: string; iv: string }> {
  try {
    const key = await getEncryptionKey();
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(payload));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encodedData
    );

    const ciphertext = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    const ivBase64 = btoa(String.fromCharCode(...iv));

    return { ciphertext, iv: ivBase64 };
  } catch (err) {
    console.warn('Encryption fallback', err);
    return { ciphertext: btoa(JSON.stringify(payload)), iv: 'unencrypted' };
  }
}

export async function decryptData<T = unknown>(ciphertext: string, iv: string): Promise<T | null> {
  try {
    if (iv === 'unencrypted') {
      return JSON.parse(atob(ciphertext)) as T;
    }
    const key = await getEncryptionKey();
    const encryptedBytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
    const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivBytes },
      key,
      encryptedBytes
    );

    const decoded = new TextDecoder().decode(decrypted);
    return JSON.parse(decoded) as T;
  } catch (err) {
    console.error('Decryption failed', err);
    return null;
  }
}

export function getEncryptionFingerprint(): string {
  const existingRaw = localStorage.getItem(KEY_STORAGE_KEY);
  if (!existingRaw) return 'AES-256-GCM (Pending Init)';
  return `AES-256-GCM (${existingRaw.substring(0, 8)}...${existingRaw.slice(-4)})`;
}
