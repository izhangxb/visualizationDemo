import WebGL from "../common/WebGL.js";
import {earcut} from '../lib/earcut.js';
import {parametric} from "../common/parametric.js";

let canvas = document.querySelector("canvas");
const vertices = [ [-0.7, 0.5], [-0.4, 0.3], [-0.25, 0.71], [-0.1, 0.56], [-0.1, 0.13], [0.4, 0.21], [0, -0.6], [-0.3, -0.3], [-0.6, -0.3], [-0.45, 0.0],].flat();
const triangles = earcut(vertices);

new WebGL(canvas, {size: 512, color:'#87CEFAFF'}).
    draw(vertices, triangles);



//画椭圆
let canvas1 = document.getElementById("ellipse");

const ellipse = parametric(
    (t, a, b) => a * Math.cos(t),
    (t, a, b) => b * Math.sin(t),
);
let points1 = ellipse(0, Math.PI * 2, 50, 0.6, 0.3).points.flat();
const triangles1 = earcut(points1);

new WebGL(canvas1,{color:'#87CEFAFF'}).draw(points1, triangles1);


//画星星
let canvas2 = document.getElementById("star");

const star = parametric(
    (t, l) => l * Math.cos(t) ** 3,
    (t, l) => l * Math.sin(t) ** 3,
);
let points2 = star(0, Math.PI * 2, 50, 0.5).points.flat();
const triangles2 = earcut(points2);

new WebGL(canvas2,{color:'#87CEFAFF'}).draw(points2, triangles2);
