// 顶点着色器
var VSHADER_SOURCE =
  'void main() {\n' +
  ' gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' +
  ' gl_PointSize = 10.0;\n' +
  '}\n'
// 片元着色器
var FSHADER_SOURCE =
  'void main() {\n' +
  ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n'

function main() {
  var canvas = document.getElementById('webgl')
  var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
  if (!gl) {
    console.log('不支持webgl')
    return
  }
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('初始化失败')
    return
  }
  // 设置背景色
  gl.clearColor(0.0, 0.0, 0.0, 0.5)
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT)
  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1)
}