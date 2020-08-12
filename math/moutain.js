import {Vector2D} from "../common/Vector2D.js";

let drawSun = () => {
    const rc = rough.canvas(document.getElementById('sun'));
    const hillOpts = {roughness: 2.8, strokeWidth: 2, fill: 'blue'};
    rc.path('M76 256L176 156L276 256', hillOpts);
    rc.path('M236 256L336 156L436 256', hillOpts);
    rc.circle(256, 106, 105, {
        stroke: 'red',
        strokeWidth: 4,
        fill: 'rgba(255, 255, 0, 0.4)',
        fillStyle: 'solid',
    });
}
drawSun();

let drawTree = () => {
    const canvas = document.getElementById('tree');
    const ctx = canvas.getContext('2d');
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.lineCap = 'round';
    const v0 = new Vector2D(256, 0);
    drawBranch(ctx, v0, 50, 10, 1, 3);
}

let drawBranch = (context, v0, length, thickness, dir, bias) => {
    const v = new Vector2D(1, 0).rotate(dir).scale(length);
    const v1 = v0.copy().add(v);

    context.lineWidth = thickness;
    context.beginPath();
    context.moveTo(...v0);
    context.lineTo(...v1);
    context.stroke();

    if (thickness > 2) {
        const left = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
        drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
        const right = Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
        drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
    }

    if(thickness < 5 && Math.random() < 0.3) {
        context.save();
        context.strokeStyle = '#c72c35';
        const th = Math.random() * 6 + 3;
        context.lineWidth = th;
        context.beginPath();
        context.moveTo(...v1);
        context.lineTo(v1.x, v1.y - 2);
        context.stroke();
        context.restore();
    }
}

drawTree();

