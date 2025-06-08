// Shim to allow named imports from the CommonJS xz-decompress module
// Use dynamic import with top-level await to handle UMD module properly
const xzDecompress = await import('xz-decompress/dist/package/xz-decompress.js');

// The module is imported as an ES module with XzReadableStream as a named export
// Access it directly from the dynamic import result
const XzReadableStream = xzDecompress.XzReadableStream || xzDecompress.default?.XzReadableStream || xzDecompress.default;

export { XzReadableStream };
export default xzDecompress; 