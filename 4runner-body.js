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
  // Remove the stepped roof layers from the first draft and use one flat tent case.
  paint(0, 13, 31, "empty"); paint(1, 13, 31, "empty"); paint(2, 13, 31, "empty");
  paint(3, 13, 31, "empty"); paint(4, 13, 31, "empty"); paint(5, 13, 31, "empty");
  paint(6, 13, 31, "empty");
  paint(3, 21, 15, "outline");
  paint(4, 20, 17, "outline");
  paint(5, 20, 17, "tent");
  paint(6, 20, 17, "outline");

  // Keep the glazing short and proportional instead of filling the full cabin height.
  paint(7, 17, 24, "body"); paint(8, 17, 24, "body");
  paint(9, 17, 24, "body"); paint(10, 17, 24, "body");
  paint(9, 19, 6, "glass"); paint(9, 27, 6, "glass"); paint(9, 35, 5, "glass");
  paint(10, 19, 6, "glass"); paint(10, 27, 6, "glass"); paint(10, 35, 5, "glass");
  paint(11, 17, 23, "body"); paint(12, 17, 23, "body");
  paint(11, 40, 4, "body"); paint(12, 40, 5, "body"); paint(13, 40, 5, "shade");
  paint(14, 17, 23, "body"); paint(15, 17, 23, "body");
  paint(16, 17, 23, "outline");

  // Remove the below-body pixel cluster so the chassis has a clean underside.
  paint(17, 18, 8, "empty"); paint(17, 30, 6, "empty");
  paint(18, 19, 4, "empty"); paint(19, 20, 3, "empty");})();