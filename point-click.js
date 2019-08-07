var VSHADER_SOURCE =
  'attribute vec4 a_Position;' +
  'attribute float a_PointSize;' +
  'void main() {' +
  'gl_Position = a_Position;' +
  'gl_PointSize = a_PointSize;' +
  '}'
var FSHADER_SOURCE =
  'precision mediump float;' +
  'uniform vec4 a_FragColor;' +
  'void main() {' +
  'gl_FragColor = a_FragColor;' +
  '}'

function main() {
  var canvas = document.getElementById('webgl')
  var gl = canvas.getContext('webgl')
  if (!gl) {
    alert('不支持webgl')
  }
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    alert('初始化失败')
  }

  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  // 将顶点信息传输给attribute变量
  gl.vertexAttrib1f(a_PointSize, 10.0)

  var a_FragColor = gl.getUniformLocation(gl.program, 'a_FragColor')
  // gl.uniform4f(a_FragColor, 1.0, 1.0, 1.0, 1.0)

  // 获取attribute变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if (a_Position < 0) {
    alert('位置信息获取失败')
  }

  var points = []
  var colors = []
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  canvas.onmousedown = function (e) {
    var x = e.clientX
    var y = e.clientY
    var rect = e.target.getBoundingClientRect()
    x = (x - rect.left - canvas.width / 2) / (canvas.width / 2)
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2)
    // 第一象限
    if (x >= 0 && y >= 0) {
      colors.push([1.0, 0.0, 0.0, 1.0])
    }
    // 第二象限
    if (x > 0 && y < 0) {
      colors.push([0.0, 1.0, 0.0, 1.0])
    }
    // 第三象限
    if (x < 0 && y < 0) {
      colors.push([0.0, 0.0, 1.0, 1.0])
    }
    // 第四象限
    if (x < 0 && y > 0) {
      colors.push([0.0, 1.0, 1.0, 1.0])
    }
    points.push({
      x: x,
      y: y
    })
    gl.clear(gl.COLOR_BUFFER_BIT)
    for (var i = 0; i < points.length; i++) {
      gl.vertexAttrib2f(a_Position, points[i].x, points[i].y)
      gl.uniform4f(a_FragColor, colors[i][0], colors[i][1], colors[i][2], colors[i][3])
      gl.drawArrays(gl.POINTS, 0, 1)
    }
  }

}