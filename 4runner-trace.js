// Render the fixed 47 x 21 pixel vehicle grid.
(function () {
  var sprite = document.querySelector("[data-pixel-sprite]");
  var cells;
  var palette;
  function fill(rows, row, start, length, color) {
    var index;
    for (index = start; index < start + length; index += 1) rows[row][index] = color;
  }
  function pixel(rows, row, column, color) { rows[row][column] = color; }
  if (!sprite) return;
  cells = Array.from({ length: 21 }, function () { return Array(47).fill("."); });
  palette = { O: "outline", B: "body", S: "shade", W: "glass", K: "tent", T: "tire", H: "hub", Y: "light", R: "tail", M: "metal", ".": "empty" };

  fill(cells, 0, 25, 7, "O");
  fill(cells, 1, 22, 15, "O");
  fill(cells, 2, 20, 20, "O");
  fill(cells, 3, 20, 20, "K");
  fill(cells, 4, 19, 22, "O");
  fill(cells, 5, 18, 23, "K");
  fill(cells, 6, 17, 24, "O");
  fill(cells, 7, 15, 27, "O");
  fill(cells, 8, 13, 4, "O"); fill(cells, 8, 17, 22, "B"); fill(cells, 8, 39, 4, "O");
  fill(cells, 9, 8, 6, "O"); fill(cells, 9, 14, 27, "B"); fill(cells, 9, 41, 4, "O");
  fill(cells, 10, 4, 4, "O"); fill(cells, 10, 8, 34, "B"); fill(cells, 10, 42, 4, "O");
  fill(cells, 11, 3, 43, "B"); fill(cells, 12, 2, 44, "B"); fill(cells, 13, 2, 44, "S"); fill(cells, 14, 2, 44, "B"); fill(cells, 15, 3, 42, "B");
  fill(cells, 16, 4, 40, "O"); fill(cells, 17, 7, 4, "M"); fill(cells, 17, 18, 8, "M"); fill(cells, 17, 30, 6, "M"); fill(cells, 18, 19, 4, "O"); fill(cells, 19, 20, 3, "M");
  fill(cells, 7, 19, 6, "W"); fill(cells, 7, 26, 7, "W"); fill(cells, 7, 34, 5, "W");
  fill(cells, 8, 18, 7, "W"); fill(cells, 8, 26, 7, "W"); fill(cells, 8, 34, 6, "W");
  fill(cells, 9, 17, 8, "W"); fill(cells, 9, 26, 7, "W"); fill(cells, 9, 34, 6, "W");
  fill(cells, 10, 17, 8, "W"); fill(cells, 10, 26, 7, "W"); fill(cells, 10, 34, 6, "W");
  pixel(cells, 10, 4, "Y"); pixel(cells, 11, 4, "Y"); pixel(cells, 11, 45, "R"); pixel(cells, 12, 45, "R");
  fill(cells, 11, 26, 1, "O"); fill(cells, 11, 34, 1, "O"); fill(cells, 12, 26, 1, "O"); fill(cells, 12, 34, 1, "O");
  [[4, 13], [33, 13]].forEach(function (wheel) {
    var x = wheel[0]; var y = wheel[1];
    fill(cells, y, x + 2, 4, "T"); fill(cells, y + 1, x + 1, 6, "T"); fill(cells, y + 2, x, 8, "T"); fill(cells, y + 3, x, 8, "T"); fill(cells, y + 4, x, 8, "T"); fill(cells, y + 5, x + 1, 6, "T"); fill(cells, y + 6, x + 2, 4, "T");
    pixel(cells, y + 3, x + 3, "H"); pixel(cells, y + 3, x + 4, "H");
  });
  sprite.innerHTML = cells.map(function (row) {
    return row.map(function (color) { return '<i class="px-' + palette[color] + '"></i>'; }).join("");
  }).join("");
})();