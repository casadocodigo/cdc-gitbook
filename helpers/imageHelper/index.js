var WIDTH_REGEX = /\{w=(\d+)%?\}$/;
var DESKTOP_WIDTH = 1000;

function adjustImageWidth(img, extension) {
  if (!img.length) {
    return;
  }
  //ajusta width da imagem
  var text = img.attr('alt').trim();
  var regexMatch = text.match(WIDTH_REGEX);
  if (regexMatch && regexMatch[1]) {
    text = text.replace(WIDTH_REGEX, '');
    var width = regexMatch[1];
    if (extension === 'pdf') {
      img.css('width', width + '%');
    } else {
      var maxWidth = parseInt(width, 10) / 100 * DESKTOP_WIDTH;
      img.css('max-width', maxWidth + 'px');
    }
    img.attr('alt', text);
  }
}

function insertImageCaption($, img, captionPrefix) {
  //insere div com caption
  var text = img.attr('alt').trim();
  var parent = img.parent();
  img.remove();
  var figure = $('<div class="figure">').append(img);
  parent.after(figure);
  if (text.length > 0) {
    var caption = $('<p class="figcaption">');
    caption.text(captionPrefix + ': ' + text);
    figure.append(caption);
  }
}

module.exports = {
  'adjustImageWidth': adjustImageWidth,
  'insertImageCaption': insertImageCaption
};