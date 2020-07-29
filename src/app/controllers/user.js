const url = require('url');

//app
const asyncHandler = require('../middleware/async');
const UserSchema = require('../models/user');
const UploadSchema = require('../models/upload');

const { DOWNLOAD_PATH } = require('../../constants');


const downloadPath = function (req) {
    const path = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: DOWNLOAD_PATH
    });
    return path;
}


exports.getUploads = asyncHandler(async (req, res, next) => {
    const path = downloadPath(req);
    const uploads = await UploadSchema.find({ username: req.user.username });
    const result = uploads.map(item => {
        return `${path}/${item._id}`;
    })
    res.status(200).json({
        success: true,
        data: result
    });
});


exports.uploadUsers = asyncHandler(async (req, res, next) => {
    let users = await UserSchema.insertMany(req.body);
    console.log(users);
    const upload = await UploadSchema
        .create({
            username: req.user.username,
            infoList: users.map(user => {
                return {
                    username: user.username,
                    isActive: user.isActive
                }
            })
        });

    const path = downloadPath(req);
    res.status(200).json({
        success: true,
        data: `${path}/${upload._id}`
    });
});


exports.getDetails = asyncHandler(async (req, res, next) => {
    // Check for user
    const user = await UserSchema.findOne({ username: req.user.username }).select('-_id');
    if (!user) {
        return next(new ErrorResponse('Details not found', 401));
    }
    res.status(200).json({
        success: true,
        data: user
    });
});