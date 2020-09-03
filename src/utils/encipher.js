
import AES from "crypto-js/aes"
import ENC from 'crypto-js/enc-utf8'
import PAD from 'crypto-js/pad-pkcs7'
// import MODE from 'crypto-js/mode'

//  加密
function encryptFactory(plaintext, key, iv) {
  const _key =ENC.parse(key);
  const _iv = ENC.parse(iv);
  const source =ENC.parse(JSON.stringify(plaintext));
  const encrypted = AES.encrypt(source, _key, {
    iv: _iv,
    // mode: MODE.CBC,
    padding: PAD
  });
  return encrypted.toString();
}
//解密
function decryptFactory(ciphertext, key, iv) {
  const _key = ENC.parse(key);
  const _iv =ENC.parse(iv);
  const decrypt = AES.decrypt(ciphertext, _key, {
    iv: _iv,
    // mode:MODE.CBC,
    padding: PAD
  });
  const decryptedStr = decrypt.toString(ENC);
  return decryptedStr.toString();
}
export { encryptFactory, decryptFactory };
