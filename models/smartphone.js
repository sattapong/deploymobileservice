const mongoose = require("mongoose");


const smartphoneSchema = mongoose.Schema({

brandId: { type: String, ref: "Brand"},
modelname: { type: String },
created_at: { type: String },
rating: { type: Number }



});



module.exports = mongoose.model("Smartphones",smartphoneSchema)
