// Pixel-art profile of Jared's lifted 4Runner, drawn around the approved moving wheels.
(function () {
  var sprite = document.querySelector("[data-pixel-sprite]");
  var row;
  var column;
  function paint(targetRow, start, length, color) {
    for (column = start; column < start + length; column += 1) {
      sprite.children[targetRow * 47 + column].className = "px-" + color;
    }
  }
  function pixel(targetRow, targetColumn, color) {
    sprite.children[targetRow * 47 + targetColumn].className = "px-" + color;
  }
  if (!sprite || sprite.children.length !== 987) return;

  for (row = 0; row < 21; row += 1) paint(row, 0, 47, "empty");

  // The rooftop tent is drawn by the companion CSS as one clean, flat hard-shell rectangle.

  // Boxy 4Runner roofline, sloped windshield, long hood, and upright rear hatch.
  paint(6, 21, 18, "outline");
  paint(7, 19, 21, "outline");
  paint(8, 17, 24, "outline");
  paint(9, 15, 27, "outline");
  paint(10, 11, 33, "body");
  paint(11, 7, 38, "body");
  paint(12, 3, 43, "body");
  paint(13, 2, 44, "shade");
  paint(14, 3, 43, "body");
  paint(15, 4, 41, "body");
  paint(16, 5, 39, "shade");
  paint(17, 6, 37, "outline");

  // Three smaller side-window sections, with the windshield stepped forward at the hood.
  paint(7, 23, 6, "glass"); paint(7, 30, 7, "glass"); paint(7, 38, 2, "glass");
  paint(8, 20, 9, "glass"); paint(8, 30, 7, "glass"); paint(8, 38, 3, "glass");
  paint(9, 18, 11, "glass"); paint(9, 30, 7, "glass"); paint(9, 38, 4, "glass");
  paint(10, 18, 11, "glass"); paint(10, 30, 7, "glass"); paint(10, 38, 4, "glass");

  // Dark door pillars, short door seams, front lamp and square rear tail lamp.
  paint(8, 29, 1, "outline"); paint(8, 37, 1, "outline");
  paint(9, 29, 1, "outline"); paint(9, 37, 1, "outline");
  paint(10, 29, 1, "outline"); paint(10, 37, 1, "outline");
  paint(11, 29, 1, "outline"); paint(11, 37, 1, "outline");
  paint(12, 29, 1, "outline"); paint(12, 37, 1, "outline");
  paint(13, 29, 1, "outline"); paint(13, 37, 1, "outline");
  paint(14, 29, 1, "outline"); paint(14, 37, 1, "outline");
  pixel(12, 3, "light"); pixel(13, 3, "light");
  pixel(12, 45, "tail"); pixel(13, 45, "tail");
})();