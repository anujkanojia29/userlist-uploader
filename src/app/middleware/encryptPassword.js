const asyncHandler = require('./async');
const bcrypt = require('bcryptjs');

exports.encryptPassword = asyncHandler(async (req, res, next) => {
    const userList = [];
    for (const item of req.body) {
        if(item.password) {
            const salt = await bcrypt.genSalt(10);
            item.password = await bcrypt.hash(item.password, salt);
        }
        userList.push(item);
      }
    req.body = userList;
    next();
});
