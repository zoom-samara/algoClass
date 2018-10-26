/***
 * @param container {Node} ссылка на DOM-node, в которую нужно вписать строку ‘str‘
 * @param str {string} строка, которую необходимо вписать. Максимальная длина равняется 100 символам
 * @param min {number} минимальный размер шрифта (целое число, min >= 1)
 * @param max {number} максимальный размер шрифта (целое число, max >= min >= 1)
 * @return {number | null} искомый размер шрифта (целое число) или null, если текст вписать нельзя
 */

function calcFontSize(container, str, min, max) {
  str = (str + "").substr(0, 100);
  min = parseInt(min);
  max = parseInt(max);

  if (min >= 1 && min <= max) {
    let fontSize,
      minFS = 0,
      maxFS = max;

    let clone = document.createElement("div");
    clone.style.width = "100%";
    clone.style.height = "100%";
    container.appendChild(clone);

    const height = clone.offsetHeight;
    const width = clone.offsetWidth;

    clone.style.display = "inline-block";
    clone.style.fontSize = `${min}px`;
    clone.style.width = "auto";
    clone.style.height = "auto";
    clone.innerHTML = str;

    while (minFS <= maxFS) {
      let mid = Math.floor((minFS + maxFS) / 2);
      clone.style.fontSize = `${mid}px`;

      if (height > 0) {
        if (
          clone.offsetWidth <= width &&
          clone.offsetHeight <= height
        ){
          minFS = mid + 1;
        } else {
          maxFS = mid - 1;
        }
      } else {
        if (clone.offsetWidth >= width) {
          maxFS = mid - 1;
        } else {
          minFS = mid + 1;
        }
      }

      if (minFS > maxFS) {
        fontSize = maxFS;
      }
    }

    clone.style.fontSize = `${fontSize}px`;
    clone.remove();

    return fontSize < min || fontSize > max ? null : fontSize;
  }
}
