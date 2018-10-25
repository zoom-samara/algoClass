function calcFontMaxSize(container, text, min, max) {
  const clone = container.cloneNode();
  let fontSize,
    minFS = 0,
    maxFS = max;

  clone.innerHTML = text;
  clone.removeAttribute("style");
  clone.style.minHeight = container.style.height;
  clone.style.minWidth = container.style.width;
  clone.style.float = "left";

  document.body.appendChild(clone);

  let iteration = 0;
  while (minFS <= maxFS && iteration < 100) {
    fontSize = Math.floor((minFS + maxFS) / 2);

    clone.style.fontSize = `${fontSize}px`;

    if (clone.offsetWidth > container.offsetWidth) {
      maxFS = fontSize - 1;
    } else {
      minFS = fontSize + 1;
    }

    iteration++;
  }

  clone.remove();

  return fontSize < min ? null : fontSize;
}
