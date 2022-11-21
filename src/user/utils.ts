import * as crypto from 'crypto';

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

  export function Decrypt(str:string, encryptkey:string)
  {
      if (!str)
      {
        return '';
      }
      if (!encryptkey)
      {
        encryptkey = "VGY&%TYUIsJJG**&^%^%%589~asdas-=";
      }
      str = str.replace(' ', '+');

      try {
        const iv = '0';
        encryptkey = encryptkey
        const buffer = Buffer.from(str).slice(16, 32)
        console.log('iv',buffer);
        
        // let iv = '0';
        const algorithm = 'aes-256-cbc';
        const decipher = crypto.createDecipheriv(algorithm, encryptkey, buffer);
        const decrpyted = Buffer.concat([decipher.update(str, 'base64'), decipher.final()]);
        return decrpyted.toString();

        // let key = encryptkey;
        // let iv = '1012132405963708';
        // var cipherChunks = [];
        // var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        // decipher.setAutoPadding(true);
        // cipherChunks.push(decipher.update(str, 'base64', 'utf8'));
        // cipherChunks.push(decipher.final('utf8'));
        // return cipherChunks.join('');
      } catch (error) {
        console.log(error);
        throw error;
      }
  }