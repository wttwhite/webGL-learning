// 创建着色器对象 createShader
// shader容器与着色器绑定 shaderSource
// 将GLSE语言编译成浏览器可用代码 compileShader
// 创建程序对象 createProgram
// 为程序对象分配着色器对象 attachShader
// 链接程序 linkProgram
// 加载并使用链接好的程序 useProgram

function initShaders(gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log('Failed to create program');
    return false;
  }
  // 使用程序对象
  gl.useProgram(program);
  // 将此时的程序对象赋值给
  gl.program = program;
  return true;
}

function createProgram(gl, vshader, fshader) {
  // 创建着色器对象
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // 创建程序对象
  // 着色器代码需要载入到一个程序中， webgl使用此程序才能调用着色器。
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // 为程序对象分配着色器对象
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // 连接程序对象
  gl.linkProgram(program);

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

function loadShader(gl, type, source) {
  // 创建着色器对象
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// function getWebGLContext(canvas, opt_debug) {
//   // Get the rendering context for WebGL
//   var gl = WebGLUtils.setupWebGL(canvas);
//   if (!gl) return null;

//   // if opt_debug is explicitly false, create the context for debugging
//   if (arguments.length < 2 || opt_debug) {
//     gl = WebGLDebugUtils.makeDebugContext(gl);
//   }

//   return gl;
// }