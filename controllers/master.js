const BrandModel = require("../models/brand");
const SmartphoneModel = require("../models/smartphone");

exports.getBrand = (req, res, next) => {

  const BrandQuery = BrandModel.find();



  BrandQuery

  .exec()
    .then(data => {

      res.status(200).json({
       // message: "BrandQuery successfully!",
        brandList: data
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed !"
      });
    });
},

exports.getSmartphones = (req, res, next) => {




  //var query = {$or:[{brandId: "5ccd47df8f664839a84e1928"},{brandId: "5ccd47ea8f664839a84e1929"}] }

  const  SmartphoneQuery = SmartphoneModel.find();






   SmartphoneQuery
   .populate('brandId')
   .sort({created_at: -1})
  .exec()
    .then(data => {
console.log(data)
      res.status(200).json({
       // message: "BrandQuery successfully!",
       modelList: data
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed !"
      });
    });



},




exports.getSmartphone = (req, res, next) => {

  var brandIdSelected = [];

/*
for (var key in req.body) {

  brandIdSelected[key] = req.body[key].id;


}
*/



for (let index = 0; index < req.body.dropdownBrand.length; index++) {
  brandIdSelected.push(req.body.dropdownBrand[index].id);
  }



  //var query = {$or:[{brandId: "5ccd47df8f664839a84e1928"},{brandId: "5ccd47ea8f664839a84e1929"}] }

  const  SmartphoneQuery = SmartphoneModel.find({'brandId': brandIdSelected});


   SmartphoneQuery
   .populate('brandId')
   .sort(req.body.dropdownSortSelected)
  .exec()
    .then(data => {
      console.log(data)
      res.status(200).json({
       // message: "BrandQuery successfully!",
       modelList: data
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed !"
      });
    });


};


