export default class WebGL {

    constructor(canvas, {size = 512, color = '#000000FF', bgColor = "#FFFFFFFF"} = {}) {
        this.gl = canvas.getContext('webgl');
        this.bgColor = [1, 3, 5, 7].map(x => parseInt(bgColor.slice(x, x + 2), 16) / 255)
        this.color = [1, 3, 5, 7].map(x => parseInt(color.slice(x, x + 2), 16) / 255)
        this.init(color);
    }

    init = (color)=>{
        const colorArray = Array.isArray(color) ? color : (hex2rgba(color) || this.color)

        let vertex = `
            attribute vec2 position;
            void main(){
                gl_PointSize = 1.0;
                gl_Position = vec4(position, 1.0, 1.0);
            }
        `;

        let fragment = `
            precision mediump float;
            void main(){
                gl_FragColor = vec4(${colorArray.map(x => x.toFixed(1)).join(',')});
            }
        `;
        this.createShaderAndProgram(vertex, fragment);
    }


    createShaderAndProgram = (vertex, fragment)=>{
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertex);
        this.gl.compileShader(vertexShader);

        let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragment);
        this.gl.compileShader(fragmentShader);

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
    }

    draw = (originPoints, triangles)=>{
        let gl = this.gl;

        let points = new Float32Array(originPoints);

        const pointBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

        const vPosition = gl.getAttribLocation(this.program, "position");
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        let cells ;
        if(triangles && triangles.length > 0){
            cells = new Uint16Array(triangles);
            const cellBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW);

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawElements(gl.TRIANGLES, cells.length, gl.UNSIGNED_SHORT, 0)
        } else {
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, points.length /2);
        }
    }

}

function hex2rgba (hex) {
    if (!hex.match(/#[0-9A-F]{8}/)) return null
    return [1, 3, 5, 7].map(x => parseInt(hex.slice(x, x + 2), 16) / 255)
}
