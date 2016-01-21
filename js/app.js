$(document).ready(function() {
  //This reads the file from the guy's computer and displays it
  $(".file").change(function(e) {
    var cbReader = function() {
      img.src = reader.result;
    };
    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
      console.info('loaded image');
      var file = e.originalEvent.srcElement.files[i];
      var img = document.createElement("img");
      img.className = "original img-polaroid";
      var reader = new FileReader();
      var extension = e.originalEvent.srcElement.files[i].name.split('.').pop().toLowerCase();  //file extension from input file
      var fileTypes = ['jpg', 'jpeg', 'png', 'gif'];  //acceptable file types
      if (fileTypes.indexOf(extension) < 0) {
        console.error('chose an invalid image type', extension);
        return false;
      }
      reader.onloadend = cbReader;
      reader.readAsDataURL(file);
      $(".org").html(img);
      $(".pg").show('slow');
      $(".original").show();
    }
  });

  $(".depth li").click(function(){
    $(".gray").show();
    var destX   = 0;
    var destY   = 0;
    var canvas  = $(".gray");
    var context = canvas[0].getContext('2d');
    var img = $(".original");
    canvas[0].width = img[0].width;
    canvas[0].height = img[0].height;
    context.drawImage( img[0] , destX, destY, img[0].width, img[0].height);
    addLogo(context, img[0], $(this).data('image'), $(this).data('scale'));
  });
});

var addLogo = function addLogo (context, img, image, scale) {
  var padding = 10;
  image = "./images/" + image;
  base_image = new Image();
  base_image.src = image;
  base_image.onload = function(){
    var max_width, max_height, offset_x, offset_y, ratio, dx, dy, dWidth, dHeight;
    ratio = 1;
    max_width = img.width;
    max_height = img.height;
    // defaults, bottom left corner at max width of the logo, with a padding of 10
    dx = (max_width - base_image.width) - padding;
    dy = (max_height - base_image.height) - padding;
    dWidth = base_image.width;
    dHeight = base_image.height;
    if (max_width < (base_image.width + (padding * 2))) {
      dWidth = max_width - (padding * 2);
      ratio = (base_image.width / dWidth) > 0 ? (base_image.width / dWidth) : 100;
      dHeight = (base_image.height / ratio) > 0 ? (base_image.height / ratio) : 100;
      dx = (max_width - dWidth) - padding;
      dy = (max_height - dHeight) - padding;
    }
    if (scale) {
      dWidth = dWidth * scale;
      dHeight = dHeight * scale;
      dx = (max_width - dWidth) - padding;
      dy = (max_height - dHeight) - padding;
    }
    console.info('max widht', max_width, 'original width', base_image.width, 'new width', dWidth, 'original height', base_image.height);
    context.drawImage(base_image, dx, dy, dWidth, dHeight);
  };
};

