var fs = require('fs');

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const UploadSchema = require('../models/upload');
const { send } = require('process');

exports.download = asyncHandler(async (req, res, next) => {
    const uploadInfo = await UploadSchema.findById(req.params.id);

    if (!uploadInfo) {
      return next(
        new ErrorResponse(`Link is not correct`, 404)
      );
    }
    const content = JSON.stringify(uploadInfo.infoList, null, 4);
    fs.writeFileSync('data.json', content);
    res.download('data.json');
  });