!function(e){var n={};function t(a){if(n[a])return n[a].exports;var s=n[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:a})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(a,s,function(n){return e[n]}.bind(null,s));return a},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/apple-clone/static/",t(t.s=0)}([function(module,exports,__webpack_require__){eval("module.exports = __webpack_require__(1);\n\n\n//# sourceURL=webpack:///multi_./study/js/main?")},function(module,__webpack_exports__,__webpack_require__){"use strict";eval('// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// CONCATENATED MODULE: ./study/public/css/main.css\n// extracted by mini-css-extract-plugin\n\n// CONCATENATED MODULE: ./config/config.js\nvar rootPath =  true ? \'/apple-clone/static\' : undefined;\n// CONCATENATED MODULE: ./study/js/main.js\n\n\n\n(function () {\n  var yOffset = 0; // window.pageYOffset 변수\n\n  var prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합\n\n  var currentScene = 0; // 현재 활성화된 씬(scroll-section)\n\n  var enterNewScene = false; // 새로운 scene이 시작된 순간 true\n\n  var acc = 0.1; // 감속도\n\n  var delayedYOffset = 0; // 감속도 적용된 yOffset\n\n  var rafId; // requestAnimationFrame State\n\n  var rafState; // requestAnimationFrame Id\n\n  var sceneInfo = [{\n    // 0\n    type: \'sticky\',\n    heightNum: 5,\n    // 브라우저 높이의 5배로 scrollHeight 세팅\n    scrollHeight: 0,\n    objs: {\n      container: document.querySelector(\'#scroll-section-0\'),\n      messageA: document.querySelector(\'#scroll-section-0 .main-message.a\'),\n      messageB: document.querySelector(\'#scroll-section-0 .main-message.b\'),\n      messageC: document.querySelector(\'#scroll-section-0 .main-message.c\'),\n      messageD: document.querySelector(\'#scroll-section-0 .main-message.d\'),\n      canvas: document.querySelector(\'#video-canvas-0\'),\n      context: document.querySelector(\'#video-canvas-0\').getContext(\'2d\'),\n      videoImages: []\n    },\n    values: {\n      videoImageCount: 300,\n      imageSequence: [0, 299],\n      canvas_opacity_out: [1, 0, {\n        start: 0.90,\n        end: 1\n      }],\n      messageA_opacity_in: [0, 1, {\n        start: 0.1,\n        end: 0.2\n      }],\n      messageB_opacity_in: [0, 1, {\n        start: 0.3,\n        end: 0.4\n      }],\n      messageC_opacity_in: [0, 1, {\n        start: 0.5,\n        end: 0.6\n      }],\n      messageD_opacity_in: [0, 1, {\n        start: 0.7,\n        end: 0.8\n      }],\n      messageA_translateY_in: [20, 0, {\n        start: 0.1,\n        end: 0.2\n      }],\n      messageB_translateY_in: [20, 0, {\n        start: 0.3,\n        end: 0.4\n      }],\n      messageC_translateY_in: [20, 0, {\n        start: 0.5,\n        end: 0.6\n      }],\n      messageD_translateY_in: [20, 0, {\n        start: 0.7,\n        end: 0.8\n      }],\n      messageA_opacity_out: [1, 0, {\n        start: 0.25,\n        end: 0.3\n      }],\n      messageB_opacity_out: [1, 0, {\n        start: 0.45,\n        end: 0.5\n      }],\n      messageC_opacity_out: [1, 0, {\n        start: 0.65,\n        end: 0.7\n      }],\n      messageD_opacity_out: [1, 0, {\n        start: 0.85,\n        end: 0.9\n      }],\n      messageA_translateY_out: [0, -20, {\n        start: 0.25,\n        end: 0.3\n      }],\n      messageB_translateY_out: [0, -20, {\n        start: 0.45,\n        end: 0.5\n      }],\n      messageC_translateY_out: [0, -20, {\n        start: 0.65,\n        end: 0.7\n      }],\n      messageD_translateY_out: [0, -20, {\n        start: 0.85,\n        end: 0.9\n      }]\n    }\n  }, {\n    // 1\n    type: \'normal\',\n    // heightNum: 5, // type normal에서는 필요 없음\n    scrollHeight: 0,\n    objs: {\n      container: document.querySelector(\'#scroll-section-1\')\n    }\n  }, {\n    // 2\n    type: \'sticky\',\n    heightNum: 5,\n    scrollHeight: 0,\n    objs: {\n      container: document.querySelector(\'#scroll-section-2\'),\n      messageA: document.querySelector(\'#scroll-section-2 .a\'),\n      messageB: document.querySelector(\'#scroll-section-2 .b\'),\n      messageC: document.querySelector(\'#scroll-section-2 .c\'),\n      pinB: document.querySelector(\'#scroll-section-2 .b .pin\'),\n      pinC: document.querySelector(\'#scroll-section-2 .c .pin\'),\n      canvas: document.querySelector(\'#video-canvas-1\'),\n      context: document.querySelector(\'#video-canvas-1\').getContext(\'2d\'),\n      videoImages: []\n    },\n    values: {\n      videoImageCount: 960,\n      imageSequence: [0, 959],\n      canvas_opacity_in: [0, 1, {\n        start: 0,\n        end: 0.1\n      }],\n      canvas_opacity_out: [1, 0, {\n        start: 0.95,\n        end: 1\n      }],\n      messageA_translateY_in: [20, 0, {\n        start: 0.15,\n        end: 0.2\n      }],\n      messageB_translateY_in: [30, 0, {\n        start: 0.6,\n        end: 0.65\n      }],\n      messageC_translateY_in: [30, 0, {\n        start: 0.87,\n        end: 0.92\n      }],\n      messageA_opacity_in: [0, 1, {\n        start: 0.25,\n        end: 0.3\n      }],\n      messageB_opacity_in: [0, 1, {\n        start: 0.6,\n        end: 0.65\n      }],\n      messageC_opacity_in: [0, 1, {\n        start: 0.87,\n        end: 0.92\n      }],\n      messageA_translateY_out: [0, -20, {\n        start: 0.4,\n        end: 0.45\n      }],\n      messageB_translateY_out: [0, -20, {\n        start: 0.68,\n        end: 0.73\n      }],\n      messageC_translateY_out: [0, -20, {\n        start: 0.95,\n        end: 1\n      }],\n      messageA_opacity_out: [1, 0, {\n        start: 0.4,\n        end: 0.45\n      }],\n      messageB_opacity_out: [1, 0, {\n        start: 0.68,\n        end: 0.73\n      }],\n      messageC_opacity_out: [1, 0, {\n        start: 0.95,\n        end: 1\n      }],\n      pinB_scaleY: [0.5, 1, {\n        start: 0.6,\n        end: 0.65\n      }],\n      pinC_scaleY: [0.5, 1, {\n        start: 0.87,\n        end: 0.92\n      }]\n    }\n  }, {\n    // 3\n    type: \'sticky\',\n    heightNum: 5,\n    scrollHeight: 0,\n    objs: {\n      container: document.querySelector(\'#scroll-section-3\'),\n      canvasCaption: document.querySelector(\'.canvas-caption\'),\n      canvas: document.querySelector(\'.image-blend-canvas\'),\n      context: document.querySelector(\'.image-blend-canvas\').getContext(\'2d\'),\n      imagesPath: ["".concat(rootPath, "/images/blend-image-1.jpg"), "".concat(rootPath, "/images/blend-image-2.jpg")],\n      images: []\n    },\n    values: {\n      rect1X: [0, 0, {\n        start: 0,\n        end: 0\n      }],\n      rect2X: [0, 0, {\n        start: 0,\n        end: 0\n      }],\n      imageBlendHeight: [0, 0, {\n        start: 0,\n        end: 0\n      }],\n      canvas_scale: [0, 0, {\n        start: 0,\n        end: 0\n      }],\n      canvasCaption_opacity: [0, 1, {\n        start: 0,\n        end: 0\n      }],\n      canvasCaption_translateY: [20, 0, {\n        start: 0,\n        end: 0\n      }],\n      rectStartY: 0\n    }\n  }];\n\n  function setCanvasImages() {\n    var imgElem;\n\n    for (var i = 0; i < sceneInfo[0].values.videoImageCount; i++) {\n      imgElem = new Image();\n      imgElem.src = "".concat(rootPath, "/video/001/IMG_").concat(6726 + i, ".JPG");\n      sceneInfo[0].objs.videoImages.push(imgElem);\n    }\n\n    var imgElem2;\n\n    for (var _i = 0; _i < sceneInfo[2].values.videoImageCount; _i++) {\n      imgElem2 = new Image();\n      imgElem2.src = "".concat(rootPath, "/video/002/IMG_").concat(7027 + _i, ".JPG");\n      sceneInfo[2].objs.videoImages.push(imgElem2);\n    }\n\n    var imgElem3;\n\n    for (var _i2 = 0; _i2 < sceneInfo[3].objs.imagesPath.length; _i2++) {\n      imgElem3 = new Image();\n      imgElem3.src = sceneInfo[3].objs.imagesPath[_i2];\n      sceneInfo[3].objs.images.push(imgElem3);\n    }\n  }\n\n  function checkMenu() {\n    if (yOffset >= 44) {\n      document.body.classList.add(\'local-nav-sticky\');\n    } else {\n      document.body.classList.remove(\'local-nav-sticky\');\n    }\n  }\n\n  function setLayout() {\n    // 각 스크롤 섹션의 높이 세팅\n    for (var i = 0; i < sceneInfo.length; i++) {\n      if (sceneInfo[i].type === \'sticky\') {\n        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;\n      } else if (sceneInfo[i].type === \'normal\') {\n        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;\n      }\n\n      sceneInfo[i].objs.container.style.height = "".concat(sceneInfo[i].scrollHeight, "px");\n    }\n\n    yOffset = window.pageYOffset;\n    var totalScrollHeight = 0;\n\n    for (var _i3 = 0; _i3 < sceneInfo.length; _i3++) {\n      totalScrollHeight += sceneInfo[_i3].scrollHeight;\n\n      if (totalScrollHeight >= yOffset) {\n        currentScene = _i3;\n        break;\n      }\n    }\n\n    document.body.setAttribute(\'id\', "show-scene-".concat(currentScene));\n    var heightRatio = window.innerHeight / 1080;\n    sceneInfo[0].objs.canvas.style.transform = "translate3d(-50%, -50%, 0) scale(".concat(heightRatio, ")");\n    sceneInfo[2].objs.canvas.style.transform = "translate3d(-50%, -50%, 0) scale(".concat(heightRatio, ")");\n  }\n\n  function calcValues(values, currentYOffset) {\n    var rv;\n    var scrollHeight = sceneInfo[currentScene].scrollHeight;\n    var scrollRatio = currentYOffset / scrollHeight;\n\n    if (values.length === 3) {\n      // start ~ end 사이의 애니메이션 실행\n      var partScrollStart = values[2].start * scrollHeight;\n      var partScrollEnd = values[2].end * scrollHeight;\n      var partScrollHeight = partScrollEnd - partScrollStart;\n\n      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {\n        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];\n      } else if (currentYOffset < partScrollStart) {\n        rv = values[0];\n      } else if (currentYOffset > partScrollEnd) {\n        rv = values[1];\n      }\n    } else {\n      rv = scrollRatio * (values[1] - values[0] + values[0]);\n    }\n\n    return rv;\n  }\n\n  function playAnimation() {\n    var _sceneInfo$currentSce = sceneInfo[currentScene],\n        objs = _sceneInfo$currentSce.objs,\n        values = _sceneInfo$currentSce.values;\n    var currentYOffset = yOffset - prevScrollHeight; // 현재 씬의 YOffset\n\n    var scrollHeight = sceneInfo[currentScene].scrollHeight;\n    var scrollRatio = currentYOffset / scrollHeight; // 현재 씬의 scrollHeight 100분율;\n    // console.log(currentScene);\n    // console.log(currentYOffset);\n    // console.log(scrollRatio);\n\n    switch (currentScene) {\n      case 0:\n        // console.log(\'0 play\');\n        // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));\n        // objs.context.drawImage(objs.videoImages[sequence], 0, 0);\n        if (scrollRatio <= 0.22) {\n          // in\n          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);\n          objs.messageA.style.transform = "translate3d(0, ".concat(calcValues(values.messageA_translateY_in, currentYOffset), "%, 0)");\n        } else {\n          // out\n          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);\n          objs.messageA.style.transform = "translate3d(0, ".concat(calcValues(values.messageA_translateY_out, currentYOffset), "%, 0)");\n        }\n\n        if (scrollRatio <= 0.42) {\n          // in\n          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);\n          objs.messageB.style.transform = "translate3d(0, ".concat(calcValues(values.messageB_translateY_in, currentYOffset), "%, 0)");\n        } else {\n          // out\n          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);\n          objs.messageB.style.transform = "translate3d(0, ".concat(calcValues(values.messageB_translateY_out, currentYOffset), "%, 0)");\n        }\n\n        if (scrollRatio <= 0.62) {\n          // in\n          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);\n          objs.messageC.style.transform = "translate3d(0, ".concat(calcValues(values.messageC_translateY_in, currentYOffset), "%, 0)");\n        } else {\n          // out\n          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);\n          objs.messageC.style.transform = "translate3d(0, ".concat(calcValues(values.messageC_translateY_out, currentYOffset), "%, 0)");\n        }\n\n        if (scrollRatio <= 0.82) {\n          // in\n          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);\n          objs.messageD.style.transform = "translate3d(0, ".concat(calcValues(values.messageD_translateY_in, currentYOffset), "%, 0)");\n        } else {\n          // out\n          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);\n          objs.messageD.style.transform = "translate3d(0, ".concat(calcValues(values.messageD_translateY_out, currentYOffset), "%, 0)");\n        } // 스크롤을 빠르게 올릴 경우 인식을 못해서 조건 추가 scrollRatio 가 0.9 보다 작은데 opacity 가 0인 경우도 실행\n\n\n        if (scrollRatio >= 0.9 || scrollRatio <= 0.9 && parseInt(objs.canvas.style.opacity) === 0) {\n          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);\n        }\n\n        break;\n\n      case 2:\n        // console.log(\'2 play\');\n        // let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));\n        // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);\n        if (scrollRatio <= 0.5) {\n          // in\n          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);\n        } else {\n          // out\n          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);\n        }\n\n        if (scrollRatio <= 0.32) {\n          // in\n          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);\n          objs.messageA.style.transform = "translate3d(0, ".concat(calcValues(values.messageA_translateY_in, currentYOffset), "%, 0)");\n        } else {\n          // out\n          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);\n          objs.messageA.style.transform = "translate3d(0, ".concat(calcValues(values.messageA_translateY_out, currentYOffset), "%, 0)");\n        }\n\n        if (scrollRatio <= 0.67) {\n          // in\n          objs.messageB.style.transform = "translate3d(0, ".concat(calcValues(values.messageB_translateY_in, currentYOffset), "%, 0)");\n          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);\n          objs.pinB.style.transform = "scaleY(".concat(calcValues(values.pinB_scaleY, currentYOffset), ")");\n        } else {\n          // out\n          objs.messageB.style.transform = "translate3d(0, ".concat(calcValues(values.messageB_translateY_out, currentYOffset), "%, 0)");\n          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);\n          objs.pinB.style.transform = "scaleY(".concat(calcValues(values.pinB_scaleY, currentYOffset), ")");\n        }\n\n        if (scrollRatio <= 0.93) {\n          // in\n          objs.messageC.style.transform = "translate3d(0, ".concat(calcValues(values.messageC_translateY_in, currentYOffset), "%, 0)");\n          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);\n          objs.pinC.style.transform = "scaleY(".concat(calcValues(values.pinC_scaleY, currentYOffset), ")");\n        } else {\n          // out\n          objs.messageC.style.transform = "translate3d(0, ".concat(calcValues(values.messageC_translateY_out, currentYOffset), "%, 0)");\n          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);\n          objs.pinC.style.transform = "scaleY(".concat(calcValues(values.pinC_scaleY, currentYOffset), ")");\n        } // currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작\n\n\n        if (scrollRatio > 0.9) {\n          var _objs = sceneInfo[3].objs;\n          var _values = sceneInfo[3].values;\n\n          var _widthRatio = window.innerWidth / _objs.canvas.width;\n\n          var _heightRatio = window.innerHeight / _objs.canvas.height;\n\n          var _canvasScaleRatio;\n\n          if (_widthRatio <= _heightRatio) {\n            // 캔버스보다 브라우저 창이 홀쭉한 경우\n            _canvasScaleRatio = _heightRatio;\n          } else {\n            // 캔버스보다 브라우저 창이 납작한 경우\n            _canvasScaleRatio = _widthRatio;\n          }\n\n          _objs.canvas.style.transform = "scale(".concat(_canvasScaleRatio, ")");\n          _objs.context.fillStyle = \'white\';\n\n          _objs.context.drawImage(_objs.images[0], 0, 0); // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight\n\n\n          var _recalculatedInnerWidth = document.body.offsetWidth / _canvasScaleRatio;\n\n          var recalculatedInnerHeight = window.innerHeight / _canvasScaleRatio;\n\n          var _whiteRectWidth = _recalculatedInnerWidth * 0.15;\n\n          _values.rect1X[0] = (_objs.canvas.width - _recalculatedInnerWidth) / 2;\n          _values.rect1X[1] = _values.rect1X[0] - _whiteRectWidth;\n          _values.rect2X[0] = _values.rect1X[0] + _recalculatedInnerWidth - _whiteRectWidth;\n          _values.rect2X[1] = _values.rect2X[0] + _whiteRectWidth; // 좌우 흰색 박스 그리기\n\n          _objs.context.fillRect(parseInt(_values.rect1X[0]), 0, parseInt(_whiteRectWidth), _objs.canvas.height);\n\n          _objs.context.fillRect(parseInt(_values.rect2X[0]), 0, parseInt(_whiteRectWidth), _objs.canvas.height);\n        }\n\n        break;\n\n      case 3:\n        // console.log(\'3 play\');\n        var step; // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)\n\n        var widthRatio = window.innerWidth / objs.canvas.width;\n        var heightRatio = window.innerHeight / objs.canvas.height;\n        var canvasScaleRatio;\n\n        if (widthRatio <= heightRatio) {\n          // 캔버스보다 브라우저 창이 홀쭉한 경우\n          // console.log(\'height 결정\');\n          canvasScaleRatio = heightRatio;\n        } else {\n          // 캔버스보다 브라우저 창이 납작한 경우\n          // console.log(\'width 결정\');\n          canvasScaleRatio = widthRatio;\n        }\n\n        objs.canvas.style.transform = "scale(".concat(canvasScaleRatio, ")");\n        objs.context.fillStyle = \'white\';\n        objs.context.drawImage(objs.images[0], 0, 0); // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight\n\n        var recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;\n\n        if (!values.rectStartY) {\n          // values.rectStartY = objs.canvas.getBoundingClientRect().top;\n          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;\n          values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;\n          values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;\n          values.rect1X[2].end = values.rectStartY / scrollHeight;\n          values.rect2X[2].end = values.rectStartY / scrollHeight;\n        }\n\n        var whiteRectWidth = recalculatedInnerWidth * 0.15;\n        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;\n        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;\n        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;\n        values.rect2X[1] = values.rect2X[0] + whiteRectWidth; // 좌우 흰색 박스 그리기\n        // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);\n        // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);\n\n        objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);\n        objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);\n\n        if (scrollRatio < values.rect1X[2].end) {\n          step = 1; // console.log(\'캔버스 닿기 전\');\n\n          objs.canvas.classList.remove(\'sticky\');\n        } else {\n          step = 2; // console.log(\'캔버스 닿은 후\');\n          // 이미지 블렌드;\n\n          values.imageBlendHeight[0] = 0;\n          values.imageBlendHeight[1] = objs.canvas.height;\n          values.imageBlendHeight[2].start = values.rect1X[2].end;\n          values.imageBlendHeight[2].end = values.imageBlendHeight[2].start + 0.2;\n          var blendHeight = calcValues(values.imageBlendHeight, currentYOffset);\n          objs.context.drawImage(objs.images[1], 0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight, 0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight);\n          objs.canvas.classList.add(\'sticky\');\n          objs.canvas.style.top = "".concat(-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2, "px");\n\n          if (scrollRatio > values.imageBlendHeight[2].end) {\n            values.canvas_scale[0] = canvasScaleRatio;\n            values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);\n            values.canvas_scale[2].start = values.imageBlendHeight[2].end;\n            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;\n            objs.canvas.style.transform = "scale(".concat(calcValues(values.canvas_scale, currentYOffset), ")");\n            objs.canvas.style.marginTop = 0;\n          }\n\n          if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {\n            objs.canvas.classList.remove(\'sticky\');\n            objs.canvas.style.marginTop = "".concat(scrollHeight * 0.4, "px");\n            values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;\n            values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;\n            values.canvasCaption_translateY[2].start = values.canvas_scale[2].end;\n            values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].start + 0.1;\n            objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);\n            objs.canvasCaption.style.transform = "translate3d(0, ".concat(calcValues(values.canvasCaption_translateY, currentYOffset), "%, 0)");\n          }\n        }\n\n        break;\n\n      default:\n        break;\n    }\n  }\n\n  function scrollLoop() {\n    enterNewScene = false;\n    prevScrollHeight = 0;\n\n    for (var i = 0; i < currentScene; i++) {\n      prevScrollHeight += sceneInfo[i].scrollHeight;\n    }\n\n    if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {\n      enterNewScene = true;\n      currentScene++;\n      document.body.setAttribute(\'id\', "show-scene-".concat(currentScene));\n    }\n\n    if (delayedYOffset < prevScrollHeight) {\n      enterNewScene = true;\n      if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)\n\n      currentScene--;\n      document.body.setAttribute(\'id\', "show-scene-".concat(currentScene));\n    }\n\n    if (enterNewScene) return;\n    playAnimation();\n  }\n\n  function loop() {\n    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;\n\n    if (!enterNewScene) {\n      if (currentScene === 0 || currentScene === 2) {\n        var currentYOffset = delayedYOffset - prevScrollHeight;\n        var _sceneInfo$currentSce2 = sceneInfo[currentScene],\n            objs = _sceneInfo$currentSce2.objs,\n            values = _sceneInfo$currentSce2.values;\n        var sequence = Math.round(calcValues(values.imageSequence, currentYOffset));\n\n        if (objs.videoImages[sequence]) {\n          objs.context.drawImage(objs.videoImages[sequence], 0, 0);\n        }\n      }\n    }\n\n    rafId = requestAnimationFrame(loop);\n\n    if (Math.abs(yOffset - delayedYOffset) < 1) {\n      cancelAnimationFrame(rafId);\n      rafState = false;\n    }\n  } // window.addEventListener(\'DOMContentLoaded\', setLayout);\n\n\n  window.addEventListener(\'load\', function () {\n    document.body.classList.remove(\'before-load\');\n    setLayout();\n    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);\n    var tempYOffset = yOffset;\n    var tempScrollCount = 0;\n\n    if (tempYOffset > 0) {\n      var siId = setInterval(function () {\n        scrollTo(0, tempYOffset);\n        tempYOffset += 5;\n\n        if (tempScrollCount > 20) {\n          clearInterval(siId);\n        }\n\n        tempScrollCount++;\n      }, 20);\n    }\n\n    window.addEventListener(\'scroll\', function () {\n      yOffset = window.pageYOffset;\n      scrollLoop();\n      checkMenu();\n\n      if (!rafState) {\n        rafId = requestAnimationFrame(loop);\n        rafState = true;\n      }\n    });\n    window.addEventListener(\'resize\', function () {\n      if (window.innerWidth > 900) {\n        window.location.reload();\n      }\n    });\n    window.addEventListener(\'orientationchange\', function () {\n      scrollTo(0, 0);\n      setTimeout(function () {\n        window.location.reload();\n      }, 500);\n    });\n    document.querySelector(\'.loading\').addEventListener(\'transitionend\', function (e) {\n      document.body.removeChild(e.currentTarget);\n    });\n\n    if (navigator.userAgent.indexOf(\'rv:11.0\') > -1) {\n      document.body.classList.add(\'browser-ie11\');\n    }\n  });\n  setCanvasImages();\n})();\n\n//# sourceURL=webpack:///./study/js/main.js_+_2_modules?')}]);