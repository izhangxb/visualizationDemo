import {draw} from '../common/canvas.js';
import {Vector2D} from "../common/Vector2D.js";

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
const {width, height} = canvas;
ctx.translate(0.5 * width, 0.5 * height);
ctx.scale(1, -1);

const vertices = [[-0.7, 0.5], [-0.4, 0.3], [-0.25, 0.71], [-0.1, 0.56], [-0.1, 0.13], [0.4, 0.21], [0, -0.6], [-0.3, -0.3], [-0.6, -0.3], [-0.45, 0.0],];
const poitions = vertices.map(([x, y]) => [x * 256, y * 256]);

draw(ctx, poitions, 'transparent', 'red');

const {left, top} = canvas.getBoundingClientRect();

canvas.addEventListener('mousemove', (evt) => {
    const {x, y} = evt; // 坐标转换
    const offsetX = x - left;
    const offsetY = y - top;
    ctx.clearRect(-256, -256, 512, 512);
    if (isPointInPath()) {
        draw(ctx, poitions, 'transparent', 'green');
    } else {
        draw(ctx, poitions, 'transparent', 'red');
    }
});

function inTriangle(p1, p2, p3, point) {
    const a = p2.copy().sub(p1);
    const b = p3.copy().sub(p2);
    const c = p1.copy().sub(p3);
    const u1 = point.copy().sub(p1);
    const u2 = point.copy().sub(p2);
    const u3 = point.copy().sub(p3);
    const s1 = Math.sign(a.cross(u1));
    let p = a.dot(u1) / a.length ** 2;

    if (s1 === 0 && p >= 0 && p <= 1) return true;
    const s2 = Math.sign(b.cross(u2));
    p = b.dot(u1) / b.length ** 2;

    if (s2 === 0 && p >= 0 && p <= 1) return true;
    const s3 = Math.sign(c.cross(u3));

    p = c.dot(u1) / c.length ** 2;
    if (s3 === 0 && p >= 0 && p <= 1) return true;
    return s1 === s2 && s2 === s3;
}

function isPointInPath({vertices, cells}, point) {
    let ret = false;
    for (let i = 0; i < cells.length; i += 3) {
        const p1 = new Vector2D(...vertices[cells[i]]);
        const p2 = new Vector2D(...vertices[cells[i + 1]]);
        const p3 = new Vector2D(...vertices[cells[i + 2]]);
        if (inTriangle(p1, p2, p3, point)) {
            ret = true;
            break;
        }
    }
    return ret;
}
