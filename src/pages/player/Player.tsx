/* eslint-disable @typescript-eslint/camelcase */
/* 
!=========== 所有列表的index从1开始算，与series保持一致 ============!
!=========== 从Array里写入、读取时记得当前的index - 1 才是array内的index =========!
*/
import React, {
  ReactElement,
  FunctionComponent,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import LinkButton from "_components/LinkButton/LinkButton";
import { Scrollbars } from "react-custom-scrollbars";

import { PatientI } from "./type";
import "./Player.less";
import { Icon, Slider } from "antd";
import { isIE as isIEFunc } from "_helper";
import { CustomHTMLDivElement, ImageI, SeriesListI, SeriesI } from "_constants/interface";
import { RouteComponentProps } from "react-router-dom";

import axios from "axios";

const VIEWPORT_WIDTH_DEFAULT = 890; // 视图默认宽
const VIEWPORT_HEIGHT_DEFAULT = 508; // 视图默认高

const req = axios.create({
  baseURL: "http://115.29.148.227:8083/rest-api",
  // baseURL: "https://mi.mediclouds.cn/rest-api",
  timeout: 60 * 1000,
});
req.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

/* 获取series列表 */
const getSeriesList = async (id: string): Promise<SeriesListI> => {
  const result = await req.get(`/dicom/dicom-series/`, { data: { id } });
  console.log("get SeriesList: ", result);
  return result.data;
};

/* 获取序列的图像列表 */
const getImgList = async (id: string): Promise<ImageI[]> => {
  const result = await req.get(`/dicom/dicom-series/${id}/`);
  return result.data as ImageI[];
};

const isIE = isIEFunc();

let playTimer: number | undefined = undefined;
let showPanelsTimer: number | undefined = undefined;
let ctx: CanvasRenderingContext2D | null = null;

const Player: FunctionComponent<RouteComponentProps> = props => {
  const { state } = props.location;
  /* =============== use ref =============== */
  const $player = useRef<CustomHTMLDivElement>(null);
  const $viewport = useRef<HTMLCanvasElement>(null);
  /* =============== use state =============== */
  const [patient, setPatient] = useState<PatientI>({
    patient_name: "匿名",
    patient_id: "未知",
    birthday: "未知",
    sex: "",
    study_date: "",
    institution_name: "未知",
    modality: "未知",
  });
  const [imgs, setImgs] = useState<any[][]>([]);
  const [cacheDone, setCacheDone] = useState(false); // 是否缓存图片完毕
  const [seriesIndex, setSeriesIndex] = useState(1); // 初始序列索引
  const [imgIndexs, setImgIndexs] = useState([1]); // 初始序列图像索引列表
  const [isPlay, setPlay] = useState(false); // 是否播放
  const [isShowInfo, setShowInfo] = useState(true); // 是否显示病人信息
  const [isFullscreen, setFullscreen] = useState(false); // 是否全屏
  const [isShowPanels, setShowPanels] = useState(false); // 全屏时是否显示信息和控制面板
  const [viewportSize, setViewportSize] = useState([
    VIEWPORT_WIDTH_DEFAULT,
    VIEWPORT_HEIGHT_DEFAULT,
  ]);
  const [seriesList, setSeriesList] = useState<SeriesListI>(); // 序列列表

  /* =============== methods =============== */
  /**
   * 更改选中的序列
   * @param {string} id 序列id
   */
  // const changeSeries = (id: string): void => {
  //   // ===>  后面要改为props内获取store上的seriesList <=== //
  //   const originList = [...seriesList];
  //   const selectSeries = originList.find(item => item.id === id);

  //   if (selectSeries) {
  //     setSeriesIndex(selectSeries.series_number);
  //   }
  // };

  /**
   * 切换全屏状态
   * @param {boolean} isFullscreen 当前全屏状态
   */
  const changeFullscreen = (isFullscreen: boolean): void => {
    if ($player && $player.current) {
      if (isFullscreen) {
        const document: any = window.document; // magic
        if (document.exitFullscreen) return document.exitFullscreen();
        if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
      } else {
        if ($player.current.requestFullscreen) {
          $player.current.requestFullscreen();
        } else if ($player.current.webkitRequestFullscreen) {
          $player.current.webkitRequestFullscreen();
        } else if ($player.current.mozRequestFullScreen) {
          $player.current.mozRequestFullScreen();
        } else if ($player.current.msRequestFullscreen) {
          $player.current.msRequestFullscreen();
        }
      }
    }
  };

  const next = useCallback((): void => {
    const next = [...imgIndexs];
    const seriesIndexInArray = seriesIndex - 1;
    const nextNum = Math.min(100, next[seriesIndexInArray] + 1); // 这里应为当前序列的图像数量 - 1
    next[seriesIndexInArray] = nextNum;

    setImgIndexs(next);
  }, [seriesIndex, imgIndexs]);

  const prev = (): void => {
    const next = [...imgIndexs];
    const seriesIndexInArray = seriesIndex - 1;
    const nextNum = Math.max(1, next[seriesIndexInArray] - 1);
    next[seriesIndexInArray] = nextNum;

    setImgIndexs(next);
  };
  const first = (): void => {
    const next = [...imgIndexs];
    next[seriesIndex - 1] = 1;

    setImgIndexs(next);
  };
  const last = (): void => {
    const next = [...imgIndexs];
    next[seriesIndex - 1] = 100; // 这里应为当前序列的图像数量 - 1

    setImgIndexs(next);
  };
  const play = (): void => {
    setPlay(true);
  };
  const pause = (): void => {
    setPlay(false);
  };
  const wheelChange = (event: React.WheelEvent<HTMLCanvasElement>): void => {
    const { deltaY } = event;
    if (deltaY > 0) next();
    if (deltaY < 0) prev();
  };

  const showPanels = (isFullscreen: boolean, isShowPanels: boolean): void => {
    if (isFullscreen) {
      if (!isShowPanels) {
        setShowPanels(true);
      } else {
        window.clearTimeout(showPanelsTimer);
        showPanelsTimer = window.setTimeout(() => {
          setShowPanels(false);
          window.clearTimeout(showPanelsTimer);
        }, 1000);
      }
    }
  };

  const updateViewport = useCallback(() => {
    if (ctx) {
      console.log(imgIndexs);
    }
  }, [imgIndexs]);

  /* =============== use effect =============== */
  useEffect(() => {
    // 修改root的背景色
    const $wrapper = document.getElementById("defaultLayout");
    if ($wrapper) {
      const classNameCache = $wrapper.className;
      $wrapper.className = `${$wrapper.className} theme-dark`;

      return (): void => {
        $wrapper.className = classNameCache;
      };
    }
  }, []);
  useEffect(() => {
    // 临时effect 获取series列表 执行一次
    if (state && state.id) {
      getSeriesList(state.id).then((result: any) => {
        const { children, ...args } = result;
        setPatient({ ...args });
        // setSeriesList(children as SeriesI[]);
        setImgIndexs(new Array<number>(result.length).fill(1));
      });
    }
  }, [state]);
  // useEffect(() => {
  //   // 临时effect 获取所有series列表的图像 执行一次
  //   const _imgs: any[][] = [];
  //   let count = 0;

  //   seriesList.forEach(series => {
  //     const { id } = series;
  //     getImgList(id)
  //       .then(result => {
  //         // console.log("img: ", result);
  //         _imgs.push(result);
  //         count += 1;
  //         if (count === seriesList.length) {
  //           setImgs(_imgs);
  //         }
  //       })
  //       .catch(error => console.error(error));
  //   });
  // }, [seriesList]);
  useEffect(() => {
    // 监听fullscreen event
    if ($player && $player.current) {
      const { current } = $player;
      const fullscreenChange = (): void => {
        setFullscreen(!isFullscreen);
      };
      const fullscreenError = (): void => {
        alert("您的浏览器不支持全屏显示");
      };

      current.addEventListener("fullscreenchange", fullscreenChange);
      current.addEventListener("webkitfullscreenchange", fullscreenChange);
      current.addEventListener("fullscreenerror", fullscreenError);

      return (): void => {
        if (current) {
          current.removeEventListener("fullscreenchange", fullscreenChange);
          current.removeEventListener("webkitfullscreenchange", fullscreenChange);
          current.removeEventListener("fullscreenerror", fullscreenError);
        }
      };
    }
  }, [isFullscreen]);

  useEffect(() => {
    // 更新 canvas 视图
    playTimer !== undefined && window.clearTimeout(playTimer);
    if (isPlay) {
      playTimer = window.setTimeout(() => {
        next();
      }, 500);
    }

    updateViewport();
  }, [imgIndexs, seriesIndex, isPlay, next, viewportSize, updateViewport]);
  useEffect(() => {
    // 重新计算canvas的width height
    const { outerWidth, outerHeight, devicePixelRatio = 1 } = window;
    let width = VIEWPORT_WIDTH_DEFAULT,
      height = VIEWPORT_HEIGHT_DEFAULT;

    if (isFullscreen) {
      width = outerWidth;
      height = outerHeight;
    }

    width *= devicePixelRatio;
    height *= devicePixelRatio;

    setViewportSize([width, height]);
  }, [isFullscreen]);
  useEffect(() => {
    if ($viewport && $viewport.current && !ctx) {
      ctx = $viewport.current.getContext("2d");
    }
  }, []);

  /* =============== components =============== */
  const seriesListCmp = (list?: SeriesListI): ReactNode => {
    if (!list)
      return (
        <div className="player-list">
          <span className="player-list-count">no series</span>
        </div>
      );

    const renderList: SeriesI[] = [];
    const { children } = list;
    children.forEach(item => {
      renderList[item.series_number - 1] = item;
    });

    return (
      <div className="player-list">
        <span className="player-list-count">{`${seriesIndex} / ${children.length}`}</span>
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
                className={`player-list-item ${series_number === seriesIndex ? "active" : ""}`}
                // onClick={(): void => changeSeries(id)}
              >
                <img src={thumbnail} alt={id} />
              </li>
            );
          })}
        </Scrollbars>
      </div>
    );
  };
  const info = (imgIndexs: number[], seriesIndex: number, isShowInfo: boolean): ReactElement => {
    const {
      patient_name = "匿名",
      patient_id = "未知",
      birthday = "未知",
      sex,
      study_date,
      institution_name = "未知",
      modality = "未知",
    } = patient;

    return (
      <div className={`player-info ${isShowInfo ? "" : isIE ? "player-nosee" : "filter-blur"}`}>
        <span title="姓名">{patient_name}</span>
        <span title="编号">{patient_id}</span>
        <span>
          <span title="生日">{birthday}</span>
          <span title="性别">{sex}</span>
        </span>
        <span title="医院">{institution_name}</span>
        <span title="日期">{study_date}</span>
        <span title="图片索引">Frame: {imgIndexs[seriesIndex]} / 100</span>
        <span title="序列">Series: {seriesIndex}</span>
        <span>
          <span title="窗宽">WL: 400</span>
          <span title="窗位">WL: 800</span>
        </span>
        <span title="类型">{modality}</span>
      </div>
    );
  };

  const slider = (imgIndexs: number[], seriesIndex: number): ReactElement => {
    return (
      <Slider
        value={imgIndexs[seriesIndex]}
        step={1}
        className="player-ctl-slider"
        getTooltipPopupContainer={(): HTMLElement => $player.current || document.body}
        onChange={(value): void => {
          const next = [...imgIndexs];
          next[seriesIndex] = value as number;
          setImgIndexs(next);
        }}
      ></Slider>
    );
  };
  const ctlbtns = (isShowInfo: boolean): ReactElement => {
    return (
      <div className="player-ctl-btns">
        <Icon
          className={`iconfont ${isShowInfo ? "" : "active"}`}
          type={`${isShowInfo ? "eye" : "eye-invisible"}`}
          onClick={(): void => setShowInfo(!isShowInfo)}
        />
        <Icon className="iconfont" type="snippets" />
        <Icon
          className="iconfont"
          type="fullscreen"
          onClick={(): void => changeFullscreen(isFullscreen)}
        />
      </div>
    );
  };
  /* =============== render element =============== */
  let className = "player";
  if (isFullscreen) className += " player-fullscreen";
  if (isShowPanels) className += " player-show-panels";

  console.log("isFullscreen: ", isFullscreen);

  return (
    <section className={className}>
      <div className="player-header">
        <h1>影像播放器</h1>
        <LinkButton to="/" icon="arrow-left" type="light">
          返回
        </LinkButton>
      </div>
      <div className="player-content" ref={$player}>
        <div className="player-view">
          {seriesListCmp(seriesList)}
          <canvas
            className="player-viewport"
            ref={$viewport}
            onWheel={wheelChange}
            onMouseOut={(): void => window.clearTimeout(showPanelsTimer)}
            onMouseOver={(): void => showPanels(isFullscreen, isShowPanels)}
            onMouseMove={(): void => showPanels(isFullscreen, isShowPanels)}
            width={viewportSize[0]}
            height={viewportSize[1]}
          ></canvas>
          {info(imgIndexs, seriesIndex, isShowInfo)}
        </div>
        <div className="player-ctl">
          <div className="player-ctl-playbtns">
            <Icon className="iconfont" type="step-backward" onClick={first} />
            <Icon className="iconfont" type="left" onClick={prev} />
            <Icon
              className="iconfont iconfont-isPlay"
              type={`${isPlay ? "pause" : "caret-right"}`}
              onClick={isPlay ? pause : play}
            />
            {slider(imgIndexs, seriesIndex)}
            <Icon className="iconfont" type="right" onClick={next} />
            <Icon className="iconfont" type="step-forward" onClick={last} />
          </div>
          {ctlbtns(isShowInfo)}
        </div>
      </div>
    </section>
  );
};

export default Player;
