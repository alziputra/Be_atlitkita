/**
 * Fungsi untuk menangani response sukses
 * @param {Object} res - Response object
 * @param {Object} data - Data yang akan dikembalikan (opsional)
 * @param {String} message - Pesan sukses
 */
const handleSuccessResponse = (res, data = null, message = "Operasi berhasil.") => {
  // Log response sukses
  console.log(`[${res.req.method}] ${res.req.originalUrl} - Sukses: ${message}`);

  // Kirim response sukses
  res.status(200).json({
    status: "success",
    message,
    data,
  });
};

/**
 * Fungsi untuk menangani response error
 * @param {Object} res - Response object
 * @param {Number} statusCode - HTTP status code (e.g. 404, 500)
 * @param {String} message - Pesan error
 */
const handleErrorResponse = (res, statusCode = 500, message = "Terjadi kesalahan.") => {
  // Log response error
  console.error(`[${res.req.method}] ${res.req.originalUrl} - Error ${statusCode}: ${message}`);

  // Kirim response error
  res.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = {
  handleSuccessResponse,
  handleErrorResponse,
};
