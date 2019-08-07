var VSHADER_SOURCE =
  'attribute vec4 a_Position;' +
  'uniform mat4 uniformMatrix;' +
  'void main(){' +
  'gl_Position = a_Position * uniformMatrix ;' +
  'gl_PointSize = 10.0;' +
  '}'
var FSHADER_SOURCE =
  'void main(){' +
  'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' +
  '}'

// 旋转角度 B x = x1cosB - y1sinB  y = x1sinB + y1cosB z=z1
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
  var angle = 90.0
  var radian = Math.PI * angle / 180.0
  var cos = Math.cos(radian)
  var sin = Math.sin(radian)
  var uniformMatrix = new Float32Array([
    cos, sin, 0.0, 0.5,
    -sin, cos, 0.0, 0.5,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ])
  var u_uniformMatrix = gl.getUniformLocation(gl.program, 'uniformMatrix')
  gl.uniformMatrix4fv(u_uniformMatrix, false, uniformMatrix)
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, n)
}

function initVertexBuffers(gl) {
  // 原始点的位置
  var vertics = new Float32Array([0.0, 0.8, -0.5, -0.5, 0.5, -0.5])
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