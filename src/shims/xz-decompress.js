// Shim to allow named imports from the CommonJS xz-decompress module
// Import directly from the dist file to avoid alias recursion
import pkg from 'xz-decompress/dist/package/xz-decompress.js';
export const XzReadableStream = pkg.XzReadableStream;
export default pkg; 