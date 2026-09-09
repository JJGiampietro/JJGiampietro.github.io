// Make the traced sprite read as a taller, upright SUV while preserving the wheel sprite.
(function () {
  var sprite = document.querySelector("[data-pixel-sprite]");
  function paint(row, start, length, color) {
    var column;
    for (column = start; column < start + length; column += 1) {
      sprite.children[row * 47 + column].className = "px-" + color;
    }
  }
  if (!sprite || sprite.children.length !== 987) return;
  paint(11, 17, 8, "glass"); paint(11, 26, 7, "glass"); paint(11, 34, 6, "glass");
  paint(12, 18, 7, "glass"); paint(12, 26, 7, "glass"); paint(12, 34, 6, "glass");
  paint(11, 40, 4, "body"); paint(12, 40, 5, "body"); paint(13, 40, 5, "shade");
  paint(14, 17, 23, "body"); paint(15, 17, 23, "body");
  paint(16, 17, 23, "outline");
})();