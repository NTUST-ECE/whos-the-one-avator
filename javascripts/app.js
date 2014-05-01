(function() {
  var root;

  console.log("Hello, this is avatorGen.");

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.avatorGen = {};

  avatorGen.canvas = $('#canvas');

  avatorGen.img = $('#avatorGen-img');

  avatorGen.imgAnchor = $('#avatorGen-imgAnchor');

  avatorGen.downloadBtn = $('#download');

  avatorGen.readImg = function(e) {
    var img, imgID, reader;
    imgID = e.target.getAttribute("data-id");
    img = e.target.files[0];
    if (!img.type.match('image.*')) {
      return;
    }
    reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        return $("#avatorGen-img-" + imgID).val(e.target.result);
      };
    })(img);
    reader.readAsDataURL(img);
    setTimeout(avatorGen.update, 500);
    setTimeout(avatorGen.update, 1000);
    return setTimeout(avatorGen.update, 1500);
  };

  avatorGen.refreshImage = function() {
    return html2canvas(canvas, {
      onrendered: function(canvas) {
        var data;
        data = canvas.toDataURL("image/png");
        avatorGen.img.attr("src", data);
        avatorGen.imgAnchor.attr("href", data);
        return avatorGen.downloadBtn.attr("href", data);
      }
    });
  };

  avatorGen.scaleImg = function() {
    return $("#canvas .maintain-aspect-ratio img").each(function(intIndex) {
      var height, scaletoHeight, scaletoWidth, width, wrapperHeight, wrapperWidth;
      width = $(this).width();
      height = $(this).height();
      wrapperWidth = $(this).parent().width();
      wrapperHeight = $(this).parent().height();
      scaletoWidth = wrapperWidth;
      scaletoHeight = height * wrapperWidth / width;
      $(this).css('top', (wrapperHeight - scaletoHeight) / 2);
      $(this).css('left', 0);
      if (scaletoHeight < wrapperHeight) {
        scaletoHeight = wrapperHeight;
        scaletoWidth = width * wrapperHeight / height;
        $(this).css('top', 0);
        $(this).css('left', (wrapperWidth - scaletoWidth) / 2);
      }
      $(this).width(scaletoWidth);
      return $(this).height(scaletoHeight);
    });
  };

  avatorGen.update = function() {
    var html;
    avatorGen.templateID = $(".form .tabs-content .active").attr("id");
    html = [];
    $("#" + avatorGen.templateID + " input").each(function(intIndex) {
      var after, before, maintainAspectRatio, style, value, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      switch ($(this).attr("name")) {
        case "background-color":
          return avatorGen.canvas.css('background-color', $(this).attr("value"));
        case "image":
          if ($(this).attr("value") != null) {
            return html.push('<img src="images/' + $(this).attr("value") + '" style="z-index: 10;">');
          }
          break;
        default:
          switch ($(this).attr("data-type")) {
            case "image":
              if ($(this).val() !== '') {
                value = $(this).val();
              }
              before = (_ref = $(this).attr("data-before")) != null ? _ref : '';
              after = (_ref1 = $(this).attr("data-after")) != null ? _ref1 : '';
              style = (_ref2 = $(this).attr("data-style")) != null ? _ref2 : '';
              maintainAspectRatio = $(this).attr("data-maintain-aspect-ratio") === 'true' ? 'maintain-aspect-ratio' : '';
              return html.push(before + '<div class="img ' + maintainAspectRatio + '" style="z-index: 1; ' + style + '"><img src="' + value + '"></div>' + after);
            case "text":
              if ($(this).val() !== void 0) {
                value = (_ref3 = $(this).attr("placeholder")) != null ? _ref3 : '';
                if ($(this).val() !== '') {
                  value = $(this).val();
                }
                before = (_ref4 = $(this).attr("data-before")) != null ? _ref4 : '';
                after = (_ref5 = $(this).attr("data-after")) != null ? _ref5 : '';
                style = (_ref6 = $(this).attr("data-style")) != null ? _ref6 : '';
                return html.push('<div style="' + style + '">' + before + value + after + '</div>');
              }
          }
      }
    });
    avatorGen.canvas.html(html.join(''));
    avatorGen.scaleImg();
    return avatorGen.refreshImage();
  };

  avatorGen.update();

  $("input").bind("keyup input paste", function() {
    return avatorGen.update();
  });

  $("a").bind("keyup click", function() {
    setTimeout(avatorGen.update, 500);
    setTimeout(avatorGen.update, 1000);
    return setTimeout(avatorGen.update, 1500);
  });

  $(".input-img").on("change", avatorGen.readImg);

  avatorGen.showCanvas = function() {
    avatorGen.canvas.css('position', 'fixed');
    avatorGen.canvas.css('top', '0');
    avatorGen.canvas.css('left', '0');
    return avatorGen.canvas.css('z-index', '1000');
  };

}).call(this);
