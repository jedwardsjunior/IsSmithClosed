// draco-or-kim.com
var draco_or_kim_dict = {};
draco_or_kim_dict["draco_or_kim_1.jpg"] = "Draco";
draco_or_kim_dict["draco_or_kim_2.jpg"] = "";
draco_or_kim_dict["draco_or_kim_3.jpg"] = "";
draco_or_kim_dict["draco_or_kim_4.jpg"] = "";
draco_or_kim_dict["draco_or_kim_5.jpg"] = "";
draco_or_kim_dict["draco_or_kim_6.jpg"] = "";
draco_or_kim_dict["draco_or_kim_7.jpg"] = "";
draco_or_kim_dict["draco_or_kim_8.jpg"] = "";
draco_or_kim_dict["draco_or_kim_9.jpg"] = "";
draco_or_kim_dict["draco_or_kim_10.jpg"] = "";

module.exports = {

  getDracoOrKim: function() {
    var index = Math.floor((Math.random() * 50) + 1);
    var image = "../img/draco_or_kim_"+index+".jpg";
    return JSON.stringify({
      "image" : image,
      "answer" : draco_or_kim_dict[image]
    });
  }
};
