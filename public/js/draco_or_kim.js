// draco-or-kim.com
var draco_or_kim_dict = {};
draco_or_kim_dict["draco_or_kim1.jpg"] = "Draco";
draco_or_kim_dict["draco_or_kim2.jpg"] = "Kim";
draco_or_kim_dict["draco_or_kim3.jpg"] = "";
draco_or_kim_dict["draco_or_kim4.jpg"] = "";
draco_or_kim_dict["draco_or_kim5.jpg"] = "";
draco_or_kim_dict["draco_or_kim6.jpg"] = "";
draco_or_kim_dict["draco_or_kim7.jpg"] = "";
draco_or_kim_dict["draco_or_kim8.jpg"] = "";
draco_or_kim_dict["draco_or_kim9.jpg"] = "";
draco_or_kim_dict["draco_or_kim10.jpg"] = "";

module.exports = {

  getDracoOrKim: function() {
    var index = Math.floor((Math.random() * 2) + 1);
    console.log(index);
    var image = "/images/draco_or_kim"+index+".jpg";
    console.log(image);
    return JSON.stringify({
      "image" : image,
      "answer" : draco_or_kim_dict["draco_or_kim"+index+".jpg"]
    });
  }
};
