// Rebuild the body as a compact, upright 4Runner-style pixel silhouette.
(function () {
  var sprite = document.querySelector("[data-pixel-sprite]");
  var row;
  var column;
  function paint(targetRow, start, length, color) {
    for (column = start; column < start + length; column += 1) {
      sprite.children[targetRow * 47 + column].className = "px-" + color;
    }
  }
  if (!sprite || sprite.children.length !== 987) return;

  // Clear the old traced shape. The separate, approved wheel overlays remain untouched.
  for (row = 0; row < 21; row += 1) paint(row, 0, 47, "empty");

  // Flat hard-shell rooftop tent.
  paint(2, 20, 18, "outline");
  paint(3, 20, 18, "tent");
  paint(4, 20, 18, "tent");
  paint(5, 20, 18, "outline");

  // Taller, squared cabin and upright rear hatch.
  paint(6, 20, 17, "outline");
  paint(7, 18, 21, "outline");
  paint(8, 16, 24, "outline");
  paint(9, 14, 27, "outline");
  paint(10, 10, 34, "body");
  paint(11, 5, 40, "body");
  paint(12, 3, 43, "body");
  paint(13, 3, 43, "shade");
  paint(14, 4, 41, "body");
  paint(15, 5, 39, "body");
  paint(16, 7, 35, "outline");

  // Two short rows of windows keep the glass proportional to the SUV body.
  paint(8, 21, 6, "glass"); paint(8, 28, 7, "glass"); paint(8, 36, 3, "glass");
  paint(9, 18, 9, "glass"); paint(9, 28, 7, "glass"); paint(9, 36, 4, "glass");

  // Pixel door seams, lighting, and a clean lower edge.
  paint(11, 27, 1, "outline"); paint(11, 35, 1, "outline");
  paint(12, 27, 1, "outline"); paint(12, 35, 1, "outline");
  paint(13, 27, 1, "outline"); paint(13, 35, 1, "outline");
  paint(14, 27, 1, "outline"); paint(14, 35, 1, "outline");
  paint(11, 4, 2, "light"); paint(12, 4, 1, "light");
  paint(11, 44, 1, "tail"); paint(12, 44, 1, "tail");
})();