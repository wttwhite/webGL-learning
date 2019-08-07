var VSHADER_SOURCE =
  'attribute vec4 a_Position;' +
  'uniform float u_CosB, u_SinB;' +
  'void main(){' +
  'gl_Position.x = a_Position.x*u_CosB - a_Position.y*u_SinB;' +
  'gl_Position.y = a_Position.x*u_SinB + a_Position.y*u_CosB;' +
  'gl_Position.z = gl_Position.z;' +
  'gl_Position.w = 1.0;' +
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
  var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
  gl.uniform1f(u_CosB, cos)
  var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')
  gl.uniform1f(u_SinB, sin)
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, n)
}

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