import moment from "moment";

export function format(time, format = "YYYY-MM-DD HH:mm:ss") {
  return moment(time).format(format);
}

// 获取元素已旋转的角度
export function getAngle(el) {
  const style = window.getComputedStyle(el, null);
  var matrix =
    style.getPropertyValue("-webkit-transform") ||
    style.getPropertyValue("-moz-transform") ||
    style.getPropertyValue("-ms-transform") ||
    style.getPropertyValue("-o-transform") ||
    style.getPropertyValue("transform") ||
    "fail...";

  // With rotate(30deg)...
  // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)

  // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

  const ret = matrix.match(/matrix.*\((.+)\)/) || [];
  const values = ret[1] && ret[1].split(", ");
  const a = (values && values[0]) || 0;
  const b = (values && values[1]) || 0;
  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
}
