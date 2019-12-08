import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

declare interface IImageToShow {
    imageStack: Array<HTMLImageElement>;    // 图像列表
    loaded: number;     // 已加载完成图片数量
    index: number;      // 当前播放图片序号
    playerState: boolean;   // 播放状态
    delay: number;  // 播放帧间隔
}
const DicomPlayer = () => {
    let canvasRef = React.createRef<HTMLCanvasElement>();
    let context:CanvasRenderingContext2D | null = null;
    let imageToShow: IImageToShow = {
        imageStack: [],
        loaded: 0,
        index: 0,
        playerState: true,
        delay: 1000 / 60,
    };
    function getRequestAnimationFrame (interval: number=60) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
            function (callback: any, element: any) {
                setTimeout(callback, 1e3 / interval);
            }
    }
    // 单次动作
    function drawFrame(): void {
        if (canvasRef.current) {
            let context = canvasRef.current.getContext('2d');
            if (imageToShow.playerState) {
                // console.log(imageToShow.imageStack[imageToShow.index].src);
                context!.drawImage(imageToShow.imageStack[imageToShow.index], 0, 0);
                imageToShow.index++;
                if (imageToShow.index >= imageToShow.imageStack.length) {
                    imageToShow.index = 0;
                }
            } else {
                // console.log('player paused');
            }
        } else {
            // console.log('context is null');
        }
    }
    function rafLoop(fn: any, delay: number): number {
        // 当浏览器不支持requestAnimationFrame时使用window.setInterval实现
        if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame) {
            console.log('not supported');
            return window.setInterval(fn, delay);
        }
        // 否则使用requestAnimationFrame
        let start: number = new Date().getTime();
        let lastTime: number = 0;
        let count: number = 0;
        let rafHandle = -1;
        function playLoop () {
            let current = new Date().getTime();
            let delta = current - start;
            if (delta >= delay && imageToShow.loaded > 10) {
                fn.call();
                // console.log(delta);
                start = new Date().getTime();
                count++;
            }
            // console.log("" + count + " timestamp = " + current);
            rafHandle = getRequestAnimationFrame()(playLoop);
        }
        rafHandle = getRequestAnimationFrame()(playLoop);
        return rafHandle;
    }
    function clearRaf (handle: number) {
        if (handle) {
            setTimeout(function () {
                window.cancelAnimationFrame ? window.cancelAnimationFrame(handle) : window.webkitCancelAnimationFrame ?
                    window.webkitCancelAnimationFrame(handle) : clearInterval(handle)
            }, 0)
        }
    }
    React.useEffect(() => {
        for (let i = 1; i <= 99; i++) {
            let img = new Image();
            // let img = new HTMLImageElement();
            img.onload = function () {
                let dt = new Date();
                imageToShow.loaded = imageToShow.loaded + 1;
                // console.log(img.src + 'loaded at: ' + dt.valueOf());
            }
            img.src = 'https://dicom-pic.oss-cn-beijing.aliyuncs.com/' + i + '.jpg'
            imageToShow.imageStack.push(img);
        }
        let handle = rafLoop(drawFrame, 100);
    })
    function handleClick ():void {
        imageToShow.playerState = !imageToShow.playerState;
        // if (imageToShow.playerState) {
        //     imageToShow.playerState = false;
        // } else {
        //     imageToShow.playerState = true;
        // }
    }
    return (
        <div style={{ width: '100%', height: 'auto' }} id={'scrollBOx'}>
            <canvas ref={canvasRef} width="1024" height="768"></canvas>
            <Button type="primary" onClick={handleClick}></Button>
        </div>
    );
}

export default DicomPlayer;
