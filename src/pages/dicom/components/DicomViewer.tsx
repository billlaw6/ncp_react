import React, { useState, useEffect, RefObject } from "react";
import { Button } from "antd";

declare interface IProps {
  imageStack: Array<HTMLImageElement>; // 图像列表
  loaded: number; // 已加载完成图片数量
  index: number; // 当前播放图片序号
  playerState: boolean; // 播放状态
  delay: number; // 播放帧间隔
}

declare interface IState {
  canvasRef: RefObject<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | null;
  imageStack: Array<HTMLImageElement>; // 图像列表
  loaded: number; // 已加载完成图片数量
  index: number; // 当前播放图片序号
  playerState: boolean; // 播放状态
  delay: number; // 播放帧间隔
}

class DicomPlayer extends React.Component<IProps, IState, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...props,
      canvasRef: React.createRef<HTMLCanvasElement>(),
      context: null,
    };
  }
  private getRequestAnimationFrame = (interval: number = 60) => {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function(callback: any, element: any) {
        setTimeout(callback, 1e3 / interval);
      }
    );
  };
  // 单次动作
  private drawFrame = (): void => {
    if (this.state.canvasRef.current) {
      let context = this.state.canvasRef.current.getContext("2d");
      if (this.state.playerState) {
        // console.log(imageToShow.imageStack[imageToShow.index].src);
        context!.drawImage(this.state.imageStack[this.state.index], 0, 0);
        this.setState({
          index: this.state.index + 1,
        });
        if (this.state.index >= this.state.imageStack.length) {
          this.setState({
            index: 0,
          });
        }
      } else {
        // console.log('player paused');
      }
    } else {
      // console.log('context is null');
    }
  };
  private rafLoop = (fn: any, delay: number): number => {
    let _self = this;
    // 当浏览器不支持requestAnimationFrame时使用window.setInterval实现
    if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame) {
      console.error("not supported");
      return window.setInterval(fn, delay);
    }
    // 否则使用requestAnimationFrame
    let start: number = new Date().getTime();
    let lastTime: number = 0;
    let count: number = 0;
    let rafHandle = -1;
    function playLoop() {
      let current = new Date().getTime();
      let delta = current - start;
      if (delta >= delay && _self.state.loaded > 10) {
        fn.call();
        // console.log(delta);
        start = new Date().getTime();
        count++;
      }
      // console.log("" + count + " timestamp = " + current);
      rafHandle = _self.getRequestAnimationFrame()(playLoop);
    }
    rafHandle = _self.getRequestAnimationFrame()(playLoop);
    return rafHandle;
  };
  private clearRaf = (handle: number) => {
    if (handle) {
      setTimeout(function() {
        window.cancelAnimationFrame
          ? window.cancelAnimationFrame(handle)
          : window.webkitCancelAnimationFrame
          ? window.webkitCancelAnimationFrame(handle)
          : clearInterval(handle);
      }, 0);
    }
  };
  // React.useEffect(() => {
  //     for (let i = 1; i <= 99; i++) {
  //         let img = new Image();
  //         // let img = new HTMLImageElement();
  //         img.onload = function () {
  //             let dt = new Date();
  //             imageToShow.loaded = imageToShow.loaded + 1;
  //             // console.log(img.src + 'loaded at: ' + dt.valueOf());
  //         }
  //         img.src = 'https://dicom-pic.oss-cn-beijing.aliyuncs.com/' + i + '.jpg'
  //         imageToShow.imageStack.push(img);
  //     }
  //     let handle = rafLoop(drawFrame, 100);
  // })
  private handleClick = (): void => {
    this.setState({
      playerState: !this.state.playerState,
    });
  };

  render() {
    return (
      <>
        <h3>Viewer</h3>
        <div style={{ width: "100%", height: "auto" }} id={"scrollBOx"}>
          <canvas ref={this.state.canvasRef} width="1024" height="768"></canvas>
          <Button type="primary" onClick={this.handleClick}>
            Button Here
          </Button>
        </div>
      </>
    );
  }
}

export default DicomPlayer;
