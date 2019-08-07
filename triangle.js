var VSHADER_SOURCE =
  'attribute vec4 a_Position;' +
  'void main(){' +
  'gl_Position = a_Position;' +
  'gl_PointSize = 10.0;' +
  '}'
var FSHADER_SOURCE =
  'void main(){' +
  'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' +
  '}'

function main() {
  var canvas = document.getElementById('webgl')
  var gl = canvas.getContext('webgl')
  if (!gl) {
    alert('gl初始化失败')
  }
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    alert('初始化失败')
  }
  // 设置顶点位置
  var n = initVertexBuffers(gl)
  if (n < 0) {
    alert('设置顶点位置失败')
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.LINE_STRIP, 0, n)
}

// POINTS 点
// LINES 单独的线段，（v0, v1） (v2, v3) 奇数忽略最后一个值
// LINE_STRIP 连接的线段 （v0, v1） (v1, v2)
// LINE_LOOP 回环
// TRIANGLES 三角形
// TRIANGLE_STRIP 三角带， 2个三角形组成一个矩形
// TRIANGLE_FAN 三角扇 v0点发散出去的三角形

function initVertexBuffers(gl) {
  var vertics = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
  // 点的个数
  var n = 3
  // 创建缓冲区对象
  var vertexBuffer = gl.createBuffer()
  if (!vertexBuffer) {
    alert('创建失败')
  }
  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  // 向缓冲区对象写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertics, gl.STATIC_DRAW)
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if (a_Position < 0) {
    alert('获取位置信息失败')
  }
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
  // 连接a_position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)
  return n
}