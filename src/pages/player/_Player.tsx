/* eslint-disable @typescript-eslint/camelcase */
import React, {
  Component,
  ReactElement,
  createRef,
  RefObject,
  FunctionComponent,
  useState,
} from "react";
import LinkButton from "_components/LinkButton/LinkButton";
import { Scrollbars } from "react-custom-scrollbars";

import { PlayerStateI, SeriesI, ImageI } from "./type";
import "./Player.less";
import { Icon, Slider } from "antd";
import { isIE } from "_helper";
import { CustomHTMLDivElement } from "_constants/interface";
import { SliderValue } from "antd/lib/slider";
import { RouteComponentProps } from "react-router-dom";

import axios from "axios";

const req = axios.create({
  baseURL: "http://115.29.148.227:8083/rest-api",
  timeout: 1000,
});
req.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

/* 获取series列表 */
const getSeriesList = async (id: string): Promise<SeriesI[]> => {
  const result = await req.get(`/dicom/dicom-series/`, { data: { id } });
  return result.data as SeriesI[];
};

/* 获取序列的图像列表 */
const getImgList = async (id: string): Promise<ImageI[]> => {
  const result = await req.get(`/dicom/dicom-series/${id}/`);
  return result.data as ImageI[];
};

class Player extends Component<RouteComponentProps, PlayerStateI> {
  private $player: RefObject<CustomHTMLDivElement>;
  private isIE: boolean;

  private playTimer?: number; // 播放时setTimeout的id
  private showPanelsTimer?: number; // 全屏时显示控制 信息展示的timeout的id

  constructor(props: RouteComponentProps) {
    super(props);

    this.$player = createRef();

    this.isIE = isIE();
    this.state = {
      seriesIndex: 0,
      imgIndex: [0],
      play: false,
      fullscreen: false,
      $wrapper: null,
      wrapperClassName: "",
      showInfo: true,
      showPanels: false,

      seriesCacheList: [],
      seriesList: [],
      imageList: [],
    };
  }
  componentDidMount(): void {
    const { state } = this.props.location;
    const $wrapper = document.getElementById("defaultLayout");
    if ($wrapper) {
      this.setState({ wrapperClassName: $wrapper.className, $wrapper });
      $wrapper.className = `${$wrapper.className} theme-dark`;
    }

    getSeriesList(state.id)
      .then(result => {
        this.setState({
          seriesList: result,
          imgIndex: new Array<number>(result.length).fill(0),
        });
      })
      .catch(err => console.error(err));

    this._listener();
  }

  componentWillUnmount(): void {
    const { $wrapper, wrapperClassName } = this.state;
    $wrapper && $wrapper.setAttribute("class", wrapperClassName);
  }

  /**
   * 监听事件
   *
   * @private
   * @memberof Player
   */
  private _listener = (): void => {
    if (this.$player && this.$player.current) {
      this.$player.current.addEventListener("fullscreenchange", () => {
        const { fullscreen } = this.state;
        this.setState({ fullscreen: !fullscreen });
      });
      this.$player.current.addEventListener("fullscreenerror", () => {
        alert("您的浏览器不支持全屏显示");
      });
    }
  };

  getListItem = (info: {}): ReactElement => {
    return <span></span>;
  };

  /**
   * 获取序列列表面板
   *
   * @memberof Player
   */
  getList = (): ReactElement => {
    // ==============  后面要改为props内获取store上的seriesList =========== //
    const { seriesList, seriesIndex } = this.state;
    // ==============  后面要改为props内获取store上的seriesList =========== //
    const renderList: SeriesI[] = [];
    seriesList.forEach(item => {
      renderList[item.series_number - 1] = item;
    });

    console.log("render list", renderList);

    return (
      <div className="player-list">
        <span className="player-list-count">{`${seriesIndex + 1} / ${seriesList.length}`}</span>
        <Scrollbars
          autoHide
          className="player-list-scrollbar"
          renderThumbVertical={(props): ReactElement => (
            <div {...props} className="player-list-vertical-thumb"></div>
          )}
          renderView={(props): ReactElement => <ul {...props} className="player-list-inner"></ul>}
        >
          {renderList.map(item => {
            const { id, thumbnail, series_number } = item;

            return (
              <li
                key={id}
                className={`player-list-item ${series_number === seriesIndex + 1 ? "active" : ""}`}
                onClick={(): void => this.changeSeries(id)}
              >
                <img src={thumbnail} alt={id} />
              </li>
            );
          })}
        </Scrollbars>
      </div>
    );
  };

  /**
   * 获取展示病人信息面板
   *
   * @memberof Player
   */
  getInfo = (): ReactElement => {
    const { state } = this.props.location;
    const { showInfo, seriesIndex, imgIndex } = this.state;
    const {
      patient_name = "匿名",
      patient_id = "未知",
      birthday = "未知",
      sex,
      study_date,
      institution_name = "未知",
      modality = "未知",
    } = state;

    const gender = sex === 1 ? "M" : sex === 2 ? "F" : "未知";

    return (
      <div className={`player-info ${showInfo ? "" : this.isIE ? "player-nosee" : "filter-blur"}`}>
        <span title="姓名">{patient_name}</span>
        <span title="编号">{patient_id}</span>
        <span>
          <span title="生日">{birthday}</span>
          <span title="性别">{gender}</span>
        </span>
        <span title="医院">{institution_name}</span>
        <span title="日期">{study_date}</span>
        <span title="图片索引">Frame: {imgIndex[seriesIndex] + 1} / 100</span>
        <span title="序列">Series: {seriesIndex + 1}</span>
        <span>
          <span title="窗宽">WL: 400</span>
          <span title="窗位">WL: 800</span>
        </span>
        <span title="类型">{modality}</span>
      </div>
    );
  };

  /**
   * 获取滑动条组件
   *
   * @memberof Player
   */
  getSlider = (): ReactElement => {
    const { imgIndex, seriesIndex } = this.state;

    return (
      <Slider
        value={imgIndex[seriesIndex]}
        step={1}
        className="player-ctl-slider"
        getTooltipPopupContainer={(): HTMLElement => this.$player.current || document.body}
        onChange={this.updateViewport}
      ></Slider>
    );
  };

  /**
   * 获取控制面板
   *
   * @memberof Player
   */
  getCtlbtns = (): ReactElement => {
    const { showInfo } = this.state;
    return (
      <div className="player-ctl-btns">
        <Icon
          className={`iconfont ${showInfo ? "" : "active"}`}
          type={`${this.state.showInfo ? "eye" : "eye-invisible"}`}
          onClick={(): void => this.setState({ showInfo: !this.state.showInfo })}
        />
        <Icon className="iconfont" type="snippets" />
        <Icon className="iconfont" type="fullscreen" onClick={this._changeFullscreen} />
      </div>
    );
  };

  /**
   * 切换全屏状态
   *
   * @private
   * @memberof Player
   */
  private _changeFullscreen = (): void => {
    if (this.$player && this.$player.current) {
      const { fullscreen } = this.state;

      if (fullscreen) document.exitFullscreen();
      else this.$player.current.requestFullscreen();
    }
  };

  /**
   * 全屏状态下显示信息和控制面板
   *
   * @private
   * @memberof Player
   */
  private _showPanels = (): void => {
    const { fullscreen, showPanels } = this.state;

    if (fullscreen) {
      if (!showPanels) {
        this.setState({ showPanels: true });
      } else {
        window.clearTimeout(this.showPanelsTimer);

        this.showPanelsTimer = window.setTimeout(() => {
          this.setState({ showPanels: false }, () => {
            window.clearTimeout(this.showPanelsTimer);
          });
        }, 1000);
      }
    }
  };

  /* 播放控制动作 */

  play = (): void => {
    this.setState({ play: true }, () => {
      this.playTimer = window.setInterval(() => {
        this.next();
      }, 350);
    });
  };

  pause = (): void => {
    if (this.playTimer !== undefined) {
      window.clearInterval(this.playTimer);
    }
    this.setState({ play: false });
  };

  next = (): void => {
    const { seriesIndex, imgIndex } = this.state;
    const next = [...imgIndex];
    const nextNum = Math.min(100, next[seriesIndex] + 1); // 这里应为当前序列的图像数量 - 1
    next[seriesIndex] = nextNum;

    this.setState({ imgIndex: next }, () => {
      this.updateViewport(nextNum);
    });
  };

  prev = (): void => {
    console.log("prev");
    const { seriesIndex, imgIndex } = this.state;
    const next = [...imgIndex];
    const nextNum = Math.max(1, next[seriesIndex] - 1);
    next[seriesIndex] = nextNum;

    this.setState({ imgIndex: next }, () => {
      this.updateViewport(nextNum);
    });
  };

  first = (): void => {
    console.log("first");
    const { seriesIndex, imgIndex } = this.state;
    const next = [...imgIndex];
    next[seriesIndex] = 1;

    this.setState({ imgIndex: next }, () => {
      this.updateViewport(next[seriesIndex]);
    });
  };

  last = (): void => {
    console.log("last");
    const { seriesIndex, imgIndex } = this.state;
    const next = [...imgIndex];
    next[seriesIndex] = 100; // 这里应为当前序列的图像数量 - 1

    this.setState({ imgIndex: next }, () => {
      this.updateViewport(next[seriesIndex]);
    });
  };

  wheelChange = (event: React.WheelEvent<HTMLCanvasElement>): void => {
    const { deltaY } = event;
    if (deltaY > 0) this.next();
    else this.prev();
  };

  changeSeries = (id: string): void => {
    console.log("chage Series id: ", id);
    const originList = [...this.state.seriesList];
    // ==============  后面要改为props内获取store上的seriesList =========== //
    const selectSeries = originList.find(item => item.id === id);
    // ==============  后面要改为props内获取store上的seriesList =========== //

    if (selectSeries) {
      console.log("series id", selectSeries.series_number);
      this.setState({ seriesIndex: selectSeries.series_number - 1 });
    }
  };

  /**
   * 更新视图渲染的图像
   *
   * @param {number} index 当前选择的图像索引
   * @memberof Player
   */
  updateViewport = (index: SliderValue): void => {
    const { seriesIndex, imgIndex } = this.state;
    const nextImgIndex = [...imgIndex];
    nextImgIndex[seriesIndex] = index as number;

    this.setState({
      imgIndex: nextImgIndex,
    });
  };

  render(): ReactElement {
    const { fullscreen, showPanels, play } = this.state;

    let className = "player";
    if (fullscreen) className += " player-fullscreen";
    if (showPanels) className += " player-show-panels";

    return (
      <section className={className}>
        <div className="player-header">
          <h1>影像播放器</h1>
          <LinkButton to="/" icon="arrow-left" type="light">
            返回
          </LinkButton>
        </div>
        <div className="player-content" ref={this.$player}>
          <div className="player-view">
            {this.getList()}
            <canvas
              className="player-viewport"
              onMouseOut={(): void => window.clearTimeout(this.showPanelsTimer)}
              onMouseOver={this._showPanels}
              onMouseMove={this._showPanels}
              onWheel={this.wheelChange}
            ></canvas>
            {this.getInfo()}
          </div>
          <div className="player-ctl">
            <div className="player-ctl-playbtns">
              <Icon className="iconfont" type="step-backward" onClick={this.first} />
              <Icon className="iconfont" type="left" onClick={this.prev} />
              <Icon
                className="iconfont iconfont-play"
                type={`${play ? "pause" : "caret-right"}`}
                onClick={play ? this.pause : this.play}
              />
              {this.getSlider()}
              <Icon className="iconfont" type="right" onClick={this.next} />
              <Icon className="iconfont" type="step-forward" onClick={this.last} />
            </div>
            {this.getCtlbtns()}
          </div>
        </div>
      </section>
    );
  }
}
