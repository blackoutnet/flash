// Shim to allow named imports from the CommonJS crc-32 module
import pkg from 'crc-32/crc32.js';
export const buf = pkg.buf;
export const str = pkg.str;
export const table = pkg.table;
export default pkg; 