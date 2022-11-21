import * as crypto from 'crypto';
let fs = require("fs");


export function UrlDecode(zipStr){ 
    var uzipStr = ''; 
    for (var i = 0; i < zipStr.length; i += 1) {
      var chr = zipStr.charAt(i); 
      if (chr === '+') { 
        uzipStr += ' ';
      } else if (chr === '%') { 
        var asc = zipStr.substring(i + 1, i + 3); 
        if (parseInt('0x' + asc) > 0x7f) {
          uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i+3, i+9).toString()); 
          i += 8;
        }else{ 
          uzipStr += AsciiToString(parseInt('0x' + asc)); 
          i += 2;
        } 
      }else{ 
        uzipStr += chr; 
      } 
    } 
  
    return uzipStr; 
  } 

  function StringToAscii(str){ 
    return str.charCodeAt(0).toString(16); 
  }
  
  function AsciiToString(asccode){ 
    return String.fromCharCode(asccode); 
  }

  export function Decrypt(decodeStr:string, encryptkey:string)
  {
      const strBuf = Buffer.from(decodeStr, 'base64');//base64 

      const salt = strBuf.slice(0,8);
      //var auth = strBuf.slice(8,16);
      console.log('salt',salt);
      const iv = strBuf.slice(16,32);
      console.log('iv',iv);

      const nodeCrypto = crypto.pbkdf2Sync(Buffer.from(encryptkey), Buffer.from(salt), 10000, 32, 'sha1');
      //var authKey = crypto.pbkdf2Sync(Buffer.from(password), Buffer.from(auth), 10000, 32, 'sha1');
      console.log(nodeCrypto,'nodeCrypto');
      //console.log(authKey.length);
      
      const decBuf = strBuf.slice(32, strBuf.length -32);
      const decipher = crypto.createDecipheriv('aes-256-cbc', nodeCrypto, iv);
      
      const decrypted = decipher.update(decBuf);
      //decrypted += decipher.final('hex');
      console.log(decrypted,'decrypted');
      console.log(decrypted.toString("utf8"));
      return decrypted.toString("utf8")
  }