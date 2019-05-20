const mongoose = require("mongoose");


const brandSchema = mongoose.Schema({

brandName: { type: String }


});



module.exports = mongoose.model("Brand",brandSchema)
