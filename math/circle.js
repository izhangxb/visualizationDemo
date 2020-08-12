import {Vector2D} from "../common/Vector2D.js";

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

let dots = regularShape(120, 128, 128, 6);

ctx.beginPath();
ctx.strokeStyle = '#c72c35';
ctx.moveTo(...dots[0]);
for (let i = 0; i < dots.length; i++) {
    ctx.lineTo(...dots[i]);
}
ctx.stroke();
ctx.closePath();

function regularShape(edges = 3, x, y, step) {
    const ret = [];
    const delta = Math.PI * (1 - (edges - 2) / edges);
    let p = new Vector2D(x, y);
    const dir = new Vector2D(step, 0);
    ret.push(p);
    for(let i = 0; i < edges; i++) {
        p = p.copy().add(dir.rotate(delta));
        ret.push(p);
    }
    return ret;
}
