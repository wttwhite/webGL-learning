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
  gl.drawArrays(gl.POINTS, 0, n)

}

// 创建缓冲区对象
// 绑定缓冲区对象
// 将数据写入缓冲区对象
// 将缓冲区对象分配给一个attribute变量
// 开启attribute变量
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
  // gl.vertexAttrib2f(a_Position, 0.0, 0.0)
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
  // 连接a_position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position)
  return n
}