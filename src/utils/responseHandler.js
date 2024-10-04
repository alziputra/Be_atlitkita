// utils/responseHandler.js

/**
 * Fungsi untuk menangani response sukses
 * @param {Object} res - Response object
 * @param {Object} data - Data yang akan dikembalikan (opsional)
 * @param {String} message - Pesan sukses
 */
const handleSuccessResponse = (res, data = null, message = "Operasi berhasil.") => {
  console.log({
    status: "success",
    message,
    data: data ? `Jumlah data: ${Array.isArray(data) ? data.length : 1}` : "Tidak ada data",
  });

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
  console.error({
    status: "error",
    statusCode,
    message,
  });

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = {
  handleSuccessResponse,
  handleErrorResponse,
};
