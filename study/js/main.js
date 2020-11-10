import '../public/css/main.css';
import { rootPath } from '../../config/config.js';

(() => {

    let yOffset = 0; // window.pageYOffset 변수
    let prevScrollHeight = 0 // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 씬(scroll-section)
    let enterNewScene = false; // 새로운 scene이 시작된 순간 true
    let acc = 0.1; // 감속도
    let delayedYOffset = 0; // 감속도 적용된 yOffset
    let rafId; // requestAnimationFrame State
    let rafState; // requestAnimationFrame Id
    
    const sceneInfo = [
      {
        // 0
        type: 'sticky',
        heightNum :5, // 브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-0'),
          messageA: document.querySelector('#scroll-section-0 .main-message.a'),
          messageB: document.querySelector('#scroll-section-0 .main-message.b'),
          messageC: document.querySelector('#scroll-section-0 .main-message.c'),
          messageD: document.querySelector('#scroll-section-0 .main-message.d'),
          canvas: document.querySelector('#video-canvas-0'),
          context: document.querySelector('#video-canvas-0').getContext('2d'),
          videoImages: []
        },
        values: {
          videoImageCount: 300,
          imageSequence: [0, 299],
          canvas_opacity_out:[1, 0, { start: 0.90, end: 1 }],
          messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
          messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
          messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
          messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
          messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
          messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
          messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
          messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
          messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
          messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
          messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
          messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
          messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
          messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
          messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
          messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        }
      },
      {
        // 1
        type: 'normal',
        // heightNum: 5, // type normal에서는 필요 없음
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-1')
        }
      },
      {
        // 2
        type: 'sticky',
        heightNum :5,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-2'),
          messageA: document.querySelector('#scroll-section-2 .a'),
          messageB: document.querySelector('#scroll-section-2 .b'),
          messageC: document.querySelector('#scroll-section-2 .c'),
          pinB: document.querySelector('#scroll-section-2 .b .pin'),
          pinC: document.querySelector('#scroll-section-2 .c .pin'),
          canvas: document.querySelector('#video-canvas-1'),
          context: document.querySelector('#video-canvas-1').getContext('2d'),
          videoImages: []
        },
        values: {
          videoImageCount: 960,
          imageSequence: [0, 959],
          canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
          canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
          messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
          messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
          messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
          messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
          messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
          messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
          messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
          messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
          messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
          messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
          messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
          messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
          pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
          pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
			  }
      },
      {
        // 3
        type: 'sticky',
        heightNum :5,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-3'),
          canvasCaption: document.querySelector('.canvas-caption'),
          canvas: document.querySelector('.image-blend-canvas'),
          context: document.querySelector('.image-blend-canvas').getContext('2d'),
          imagesPath: [
            `${rootPath}/images/blend-image-1.jpg`,
            `${rootPath}/images/blend-image-2.jpg`,
          ],
          images: []
        },
        values: {
          rect1X: [0, 0, { start: 0, end: 0 }],
          rect2X: [0, 0, { start: 0, end: 0 }],
          imageBlendHeight: [0, 0, { start: 0, end: 0 }],
          canvas_scale: [0, 0, { start: 0, end: 0 }],
          canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
          canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
          rectStartY: 0,
        }
      }, {
        // 4
        type: 'sticky',
        heightNum: 4,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-4'),
          messageA: document.querySelector('#scroll-section-4 .main-message.a'),
          messageB: document.querySelector('#scroll-section-4 .main-message.b'),
          pencilLogo: document.querySelector('#scroll-section-4 .pencil-logo'),
          pencil: document.querySelector('#scroll-section-4 .pencil'),
          ribbonPath: document.querySelector('.ribbon-path path'),
        },
        values: {
          messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
          messageB_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
          messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
          messageA_opacity_out: [1, 0, { start: 0.3, end: 0.4 }],
          messageB_opacity_out: [1, 0, { start: 0.6, end: 0.7 }],
          messageA_translateY_out: [0, -20, { start: 0.3, end: 0.4 }],
          pencilLogo_width_in: [1000, 200, { start: 0.1, end: 0.4 }],
          pencilLogo_width_out: [200, 50, { start: 0.4, end: 0.8 }],
          pencilLogo_translateX_in: [-10, -20, { start: 0.2, end: 0.4 }],
          pencilLogo_translateX_out: [-20, -50, { start: 0.4, end: 0.8 }],
          pencilLogo_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],
          pencil_right: [-10, 100, { start: 0.3, end: 0.8 }],
          pencil_bottom: [-80, 100, { start: 0.3, end: 0.8 }],
          pencil_rotate: [-120, -240, { start: 0.3, end: 0.8 }],
          path_dashoffset_in: [1401, 0, { start: 0.2, end: 0.4 }],
          path_dashoffset_out: [0, -1401, { start: 0.6, end: 0.8 }]
        }
      }, {
        // 5
        type: 'normal',
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-5')
        }
      }
    ];

    function setCanvasImages() {
        let imgElem;
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image();
            imgElem.src = `${rootPath}/video/001/IMG_${6726 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }

        let imgElem2;
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image();
            imgElem2.src = `${rootPath}/video/002/IMG_${7027 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }

        let imgElem3;
        for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagesPath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }
    }

    function checkMenu() {
      if (yOffset >= 44) {
        document.body.classList.add('local-nav-sticky');
      } else {
        document.body.classList.remove('local-nav-sticky');
      }
    }

    function setLayout() {
      // 각 스크롤 섹션의 높이 세팅
      for (let i = 0; i < sceneInfo.length; i++) {
        if (sceneInfo[i].type === 'sticky') {
          sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        } else if (sceneInfo[i].type === 'normal') {
          sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
        }

        sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
      }

      yOffset = window.pageYOffset;
      
      let totalScrollHeight = 0;
      for (let i = 0; i < sceneInfo.length; i++) {
        totalScrollHeight += sceneInfo[i].scrollHeight;
        if (totalScrollHeight >= yOffset) {
          currentScene = i;
          break;
        }
      }
      document.body.setAttribute('id', `show-scene-${currentScene}`);

      const heightRatio = window.innerHeight / 1080;
      sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
      sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    function calcValues(values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {
            // start ~ end 사이의 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];

            } else if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
            
        } else {
            rv = scrollRatio * ((values[1] - values[0]) + values[0]);
        }

        return rv;
    }

    function playAnimation() {
      if (!sceneInfo[currentScene]) return;
        const { objs, values } = sceneInfo[currentScene];
        const currentYOffset = yOffset - prevScrollHeight; // 현재 씬의 YOffset
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight // 현재 씬의 scrollHeight 100분율;

        // console.log(currentScene);
        // console.log(currentYOffset);
        // console.log(scrollRatio);

        switch (currentScene) {
            case 0:
                // console.log('0 play');
                // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImages[sequence], 0, 0);

               if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }

                // 스크롤을 빠르게 올릴 경우 인식을 못해서 조건 추가 scrollRatio 가 0.9 보다 작은데 opacity 가 0인 경우도 실행
                if (scrollRatio >= 0.9 || (scrollRatio <= 0.9 && parseInt(objs.canvas.style.opacity) === 0)) {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
                }
                
                break;

            case 2:
				// console.log('2 play');
				// let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
				// objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

				if (scrollRatio <= 0.5) {
					// in
					objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
				} else {
					// out
					objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
				}

				if (scrollRatio <= 0.32) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.67) {
					// in
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				}

				if (scrollRatio <= 0.93) {
					// in
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				}

				// currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
				if (scrollRatio > 0.9) {
					const objs = sceneInfo[3].objs;
					const values = sceneInfo[3].values;
					const widthRatio = window.innerWidth / objs.canvas.width;
					const heightRatio = window.innerHeight / objs.canvas.height;
					let canvasScaleRatio;

					if (widthRatio <= heightRatio) {
						// 캔버스보다 브라우저 창이 홀쭉한 경우
						canvasScaleRatio = heightRatio;
					} else {
						// 캔버스보다 브라우저 창이 납작한 경우
						canvasScaleRatio = widthRatio;
					}

					objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
					objs.context.fillStyle = 'white';
					objs.context.drawImage(objs.images[0], 0, 0);

					// 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
					const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
					const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

					const whiteRectWidth = recalculatedInnerWidth * 0.15;
					values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
					values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
					values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
					values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

					// 좌우 흰색 박스 그리기
					objs.context.fillRect(
						parseInt(values.rect1X[0]),
						0,
						parseInt(whiteRectWidth),
						objs.canvas.height
					);
					objs.context.fillRect(
						parseInt(values.rect2X[0]),
						0,
						parseInt(whiteRectWidth),
						objs.canvas.height
					);
				}

				break;

            case 3:
                // console.log('3 play');
                let step;
                // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;

                if (widthRatio <= heightRatio) {
                    // 캔버스보다 브라우저 창이 홀쭉한 경우
                    // console.log('height 결정');
                    canvasScaleRatio = heightRatio;
                } else {
                    // 캔버스보다 브라우저 창이 납작한 경우
                    // console.log('width 결정');
                    canvasScaleRatio = widthRatio;
                }

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = 'white';
                objs.context.drawImage(objs.images[0], 0, 0);

                // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
                const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;

                if (!values.rectStartY) {
                  // values.rectStartY = objs.canvas.getBoundingClientRect().top;
                  values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
                  values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
                  values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
                  values.rect1X[2].end = values.rectStartY / scrollHeight;
                  values.rect2X[2].end = values.rectStartY / scrollHeight;
                }
                
                const whiteRectWidth = recalculatedInnerWidth * 0.15;
                values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth;
                
                // 좌우 흰색 박스 그리기
                // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                objs.context.fillRect(
                  parseInt(calcValues(values.rect1X, currentYOffset)),
                  0,
                  parseInt(whiteRectWidth),
                  objs.canvas.height
                );
                objs.context.fillRect(
                  parseInt(calcValues(values.rect2X, currentYOffset)),
                  0,
                  parseInt(whiteRectWidth),
                  objs.canvas.height
                );

                if (scrollRatio < values.rect1X[2].end) {
                  step = 1;
                  // console.log('캔버스 닿기 전');
                  objs.canvas.classList.remove('sticky');
                } else {
                  step = 2;
                  // console.log('캔버스 닿은 후');
                  // 이미지 블렌드;
                  values.imageBlendHeight[0] = 0;
                  values.imageBlendHeight[1] = objs.canvas.height;
                  values.imageBlendHeight[2].start = values.rect1X[2].end;
                  values.imageBlendHeight[2].end = values.imageBlendHeight[2].start + 0.2;
                  const blendHeight = calcValues(values.imageBlendHeight, currentYOffset);

                  objs.context.drawImage(objs.images[1],
                    0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
                    0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
                  );

                  objs.canvas.classList.add('sticky');
                  objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

                  if (scrollRatio > values.imageBlendHeight[2].end) {
                    values.canvas_scale[0] = canvasScaleRatio;
                    values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                    values.canvas_scale[2].start = values.imageBlendHeight[2].end;
                    values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                    objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                    objs.canvas.style.marginTop = 0;
                  }

                  if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
                    objs.canvas.classList.remove('sticky');
                    objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

                    values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
                    values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
                    values.canvasCaption_translateY[2].start = values.canvas_scale[2].end;
                    values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].start + 0.1;

                    objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
                    objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;

                  }

                }

                break;
            case 4:

              if (scrollRatio >= 0 && scrollRatio <= 0.37) {
                document.querySelector('.local-nav').classList.add('black');
              } else {
                document.querySelector('.local-nav').classList.remove('black');
              }

              if (scrollRatio >= 0.15) {
                objs.container.style.background = 'transparent';
              } else {
                objs.container.style.background = '#000';
              }

              console.log(scrollRatio);

              if (scrollRatio <= 0.25) {
                // in
                objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
              } else {
                // out
                objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
              }
      
              if (scrollRatio <= 0.55) {
                // in
                objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
              } else {
                // out
                objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
              }
      
              // 크기가 커져도 깨지지 않는 SVG의 장점을 살리기 위해 transform scale 대신 width를 조정
              if (scrollRatio <= 0.4) {
                objs.pencilLogo.style.width = `${calcValues(values.pencilLogo_width_in, currentYOffset)}vw`;
                objs.pencilLogo.style.transform = `translate(${calcValues(values.pencilLogo_translateX_in, currentYOffset)}%, -50%)`;
              } else {
                objs.pencilLogo.style.width = `${calcValues(values.pencilLogo_width_out, currentYOffset)}vw`;
                objs.pencilLogo.style.transform = `translate(${calcValues(values.pencilLogo_translateX_out, currentYOffset)}%, -50%)`;
              }
      
              // 빨간 리본 패스(줄 긋기)
              if (scrollRatio <= 0.5) {
                objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_in, currentYOffset);
              } else {
                objs.ribbonPath.style.strokeDashoffset = calcValues(values.path_dashoffset_out, currentYOffset);
              }

              objs.pencilLogo.style.opacity = calcValues(values.pencilLogo_opacity_out, currentYOffset);
              objs.pencil.style.right = `${calcValues(values.pencil_right, currentYOffset)}%`;
              objs.pencil.style.bottom = `${calcValues(values.pencil_bottom, currentYOffset)}%`;
              objs.pencil.style.transform = `rotate(${calcValues(values.pencil_rotate, currentYOffset)}deg)`;
            
              break;

            default:
                break;
        }
    }

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;

        if (!sceneInfo[currentScene]) { // sceneInfo[currentScene] 없을때 만 실행
          document.body.classList.add('scroll-effect-end');
          document.body.setAttribute('id', '');
        } else {
          document.body.classList.remove('scroll-effect-end');
        }

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (sceneInfo[currentScene]?.scrollHeight && delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { // sceneInfo[currentScene] 있을때 만 실행
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (delayedYOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (enterNewScene) return;

        playAnimation();
    }

    function loop() {
      delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

      if (!enterNewScene) {
        if (currentScene === 0 || currentScene === 2) {
          const currentYOffset = delayedYOffset - prevScrollHeight;
          const { objs, values } = sceneInfo[currentScene];
          let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
          if (objs.videoImages[sequence]) {
            objs.context.drawImage(objs.videoImages[sequence], 0, 0);
          }
        }
      }

      rafId = requestAnimationFrame(loop);

      if (Math.abs(yOffset - delayedYOffset) < 1) {
        cancelAnimationFrame(rafId);
        rafState = false;
      }
    }

    // window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', () => {
      
      document.body.classList.remove('before-load');
      setLayout();
      sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

      let tempYOffset = yOffset;
      let tempScrollCount = 0;
      if (tempYOffset > 0) {
        let siId = setInterval(() => {
          scrollTo(0, tempYOffset);
          tempYOffset += 5;
          if (tempScrollCount > 20) {
            clearInterval(siId);
          }
          tempScrollCount++;
        }, 20);
      }
 
      window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
        checkMenu();

        if (!rafState) {
          rafId = requestAnimationFrame(loop);
          rafState = true;
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
          window.location.reload();
        }
      });
      window.addEventListener('orientationchange', () => {
        scrollTo(0, 0);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
      document.querySelector('.loading').addEventListener('transitionend', (e) => {
        document.body.removeChild(e.currentTarget);
      });

      if (navigator.userAgent.indexOf('rv:11.0') > -1) {
        document.body.classList.add('browser-ie11');
      }
    });

    setCanvasImages();

})();