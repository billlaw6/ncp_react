/* eslint-disable @typescript-eslint/camelcase */
/* 
!=========== 所有列表的index从1开始算，与series保持一致 ============!
!=========== 从Array里写入、读取时记得当前的index - 1 才是array内的index =========!

1. 进入后首先获取seriesList 渲染左边的序列缩略图
2. 然后获取当前序列的信息
3. 对当前序列的image进行缓存，并显示进度条。同时下方控制器不可用的状态
4. 加载完毕后，启用下方控制器，canvas中渲染当前序列的当前图像
5. 切换序列时，重复步骤3-4


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

import { PatientI, SeriesImgCacheListT } from "./type";
import "./Player.less";
import { Icon, Slider, Progress } from "antd";
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
  return result.data;
};

/* 获取序列 */
const getSeries = async (id: string): Promise<SeriesI> => {
  const result = await req.get(`/dicom/dicom-series/${id}/`);
  return result.data;
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
  const [progress, setProgress] = useState(0); // 加载进度
  const [patient, setPatient] = useState<PatientI>({
    patient_name: "匿名",
    patient_id: "未知",
    birthday: "未知",
    sex: "",
    study_date: "",
    institution_name: "未知",
    modality: "未知",
  });
  const [cacheDone, setCacheDone] = useState(false); // 是否缓存图片完毕
  const [seriesIndex, setSeriesIndex] = useState(1); // 序列索引
  const [imgIndexs, setImgIndexs] = useState([1]); // 序列当前图像索引列表
  const [isPlay, setPlay] = useState(false); // 是否播放
  const [isShowInfo, setShowInfo] = useState(true); // 是否显示病人信息
  const [isFullscreen, setFullscreen] = useState(false); // 是否全屏
  const [isShowPanels, setShowPanels] = useState(false); // 全屏时是否显示信息和控制面板
  const [viewportSize, setViewportSize] = useState([
    VIEWPORT_WIDTH_DEFAULT,
    VIEWPORT_HEIGHT_DEFAULT,
  ]); // 视图区域width&height
  const [seriesList, setSeriesList] = useState<SeriesListI>(); // seriesList信息
  const [seriesMap, setSeriesMap] = useState<Map<string, SeriesI>>(new Map()); // series信息集合
  const [cache, setCache] = useState<SeriesImgCacheListT>([]); // 缓存列表
  /* =============== methods =============== */

  // 获取当前series信息
  const getCurrentSerie = useCallback((): SeriesI | undefined => {
    if (!seriesList) return undefined;
    const { id } = seriesList.children[seriesIndex - 1];
    return seriesMap.get(id);
  }, [seriesIndex, seriesList, seriesMap]);

  /**
   * 更改选中的序列
   * @param {string} id 序列id
   */
  const changeSeries = (id: string): void => {
    if (!seriesList) return;

    const originList = [...seriesList.children];
    let num = 1; // temp
    const selectSeries = originList.find((item, index) => {
      if (item.id === id) {
        num = index + 1;
        return true;
      }
    });

    if (selectSeries) {
      // setSeriesIndex(selectSeries.series_number);
      setSeriesIndex(num);
      if (!cache[num - 1]) {
        setCacheDone(false);
        setProgress(0);
      }
    }
  };

  /**
   * 切换全屏状态
   * @param {boolean} isFullscreen 当前全屏状态
   */
  const changeFullscreen = (isFullscreen: boolean): void => {
    if (!cacheDone) return;
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

  // 下一个序列
  const nextSeries = useCallback((): void => {
    if (!seriesList) return;
    const nextSeriesIndex = seriesIndex + 1;
    setSeriesIndex(Math.min(nextSeriesIndex, seriesList.children.length));
    if (!cache[nextSeriesIndex - 1]) {
      setCacheDone(false);
      setProgress(0);
    }
  }, [cache, seriesIndex, seriesList]);

  // 上一个序列
  const prevSeries = useCallback((): void => {
    if (!seriesList) return;
    const nextSeriesIndex = seriesIndex - 1;
    setSeriesIndex(Math.max(nextSeriesIndex, 1));
    if (!cache[nextSeriesIndex - 1]) {
      setCacheDone(false);
      setProgress(0);
    }
  }, [cache, seriesIndex, seriesList]);

  const next = useCallback((): void => {
    if (!cacheDone) return;
    const currentSeries = getCurrentSerie();
    if (!currentSeries || !currentSeries.pictures) return;

    const next = [...imgIndexs];
    const seriesIndexInArray = seriesIndex - 1;
    const nextNum = Math.min(currentSeries.pictures.length, next[seriesIndexInArray] + 1); // 这里应为当前序列的图像数量 - 1
    next[seriesIndexInArray] = nextNum;

    setImgIndexs(next);
    if (nextNum === currentSeries.pictures.length && isPlay) setPlay(false);
  }, [cacheDone, getCurrentSerie, imgIndexs, isPlay, seriesIndex]);

  const prev = useCallback((): void => {
    if (!cacheDone) return;
    const next = [...imgIndexs];
    const seriesIndexInArray = seriesIndex - 1;
    const nextNum = Math.max(1, next[seriesIndexInArray] - 1);
    next[seriesIndexInArray] = nextNum;

    setImgIndexs(next);
  }, [cacheDone, imgIndexs, seriesIndex]);
  const first = (): void => {
    if (!cacheDone) return;
    const next = [...imgIndexs];
    next[seriesIndex - 1] = 1;

    setImgIndexs(next);
  };
  const last = (): void => {
    if (!cacheDone) return;
    const currentSeries = getCurrentSerie();
    if (!currentSeries || !currentSeries.pictures) return;

    const next = [...imgIndexs];
    next[seriesIndex - 1] = currentSeries.pictures.length; // 这里应为当前序列的图像数量 - 1

    setImgIndexs(next);
  };
  const play = (): void => {
    cacheDone && setPlay(true);
  };
  const pause = (): void => {
    cacheDone && setPlay(false);
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

  // 获取渲染坐标
  const getDrawInfo = useCallback(
    (
      width: number,
      height: number,
    ): {
      width: number;
      height: number;
      x: number;
      y: number;
    } => {
      const [canvasWidth, canvasHeight] = viewportSize;
      let drawW = 512,
        drawH = 512,
        drawX = 0,
        drawY = 0;

      if (canvasWidth / width < canvasHeight / height) {
        drawW = canvasWidth;
        drawH = (drawW * height) / width;
        drawY = (canvasHeight - drawH) / 2;
      } else {
        drawH = canvasHeight;
        drawW = (drawH * width) / height;
        drawX = (canvasWidth - drawW) / 2;
      }

      return {
        x: drawX,
        y: drawY,
        width: drawW,
        height: drawH,
      };
    },
    [viewportSize],
  );

  const updateViewport = useCallback(() => {
    if (!ctx) return;
    if (!cache) return;

    const currentCache = cache[seriesIndex - 1];
    if (!currentCache) return;
    const currentImg = currentCache[imgIndexs[seriesIndex - 1] - 1];
    if (!currentImg) return;

    const { width, height } = currentImg;
    const drawInfo = getDrawInfo(width, height);

    ctx.drawImage(
      currentImg,
      0,
      0,
      width,
      height,
      drawInfo.x,
      drawInfo.y,
      drawInfo.width,
      drawInfo.height,
    );
  }, [cache, getDrawInfo, imgIndexs, seriesIndex]);

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
    // 获取seriesList 执行一次
    if (state && state.id) {
      getSeriesList(state.id).then(result => {
        const { children, ...args } = result;

        setPatient({ ...args });
        setSeriesList(result);
        setImgIndexs(new Array<number>(children.length).fill(1));
      });
    }
  }, [state]);
  useEffect(() => {
    // 获取所有series  执行一次
    if (!seriesList) return;
    const { children } = seriesList;
    const _seriesMap = new Map<string, SeriesI>();
    let count = 0;

    children.forEach(series => {
      const { id } = series;
      getSeries(id)
        .then(series => {
          _seriesMap.set(id, series);
          count += 1;
          if (count === children.length) {
            setSeriesMap(_seriesMap);
          }
        })
        .catch(error => console.error(error));
    });
  }, [seriesList]);
  useEffect(() => {
    // 更新当前序列的图片缓存
    const currentSeries = getCurrentSerie();
    if (!currentSeries || !currentSeries.pictures) return;
    const currentCache = cache[seriesIndex - 1];
    if (currentCache && currentCache.length === currentSeries.pictures.length) {
      setCacheDone(true);
      return;
    }

    const pics = currentSeries.pictures as ImageI[];
    const _imgs: HTMLImageElement[] = [];
    let count = 0;
    pics.forEach(pic => {
      const $img = new Image();
      $img.src = pic.url;
      $img.onload = (): void => {
        _imgs[pic.frame_order] = $img;
        count += 1;
        setProgress((count / pics.length) * 100);
        if (count === pics.length) {
          const nextCache = [...cache];
          nextCache[seriesIndex - 1] = _imgs;
          setCache(nextCache);
          setCacheDone(true);
        }
      };
    });
  }, [seriesIndex, seriesList, seriesMap]);
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
    // 监听键盘事件
    const LEFT = 37,
      RIGHT = 39,
      UP = 38,
      DOWN = 40,
      PLAY_PAUSE = 32;

    const onKeydown = (e: KeyboardEvent): void => {
      // console.log(e.keyCode);
      switch (e.keyCode) {
        case LEFT:
          prev();
          break;
        case RIGHT:
          next();
          break;
        case UP:
          prevSeries();
          break;
        case DOWN:
          nextSeries();
          break;
        case PLAY_PAUSE:
          setPlay(!isPlay);
          break;
        default:
          return;
      }
    };
    document.addEventListener("keydown", onKeydown);

    return (): void => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [isPlay, next, nextSeries, prev, prevSeries]);
  useEffect(() => {
    // 更新 canvas 视图
    const currentSeries = getCurrentSerie();

    playTimer !== undefined && window.clearTimeout(playTimer);
    if (isPlay) {
      playTimer = window.setTimeout(
        () => {
          next();
        },
        currentSeries ? currentSeries.display_frame_rate : 300,
      );
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
    // children.forEach(item => {
    //   renderList[item.series_number - 1] = item;
    // });

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
          {children.map((item, index) => {
            const { id, thumbnail, series_number } = item;

            return (
              <li
                key={id}
                className={`player-list-item ${index + 1 === seriesIndex ? "active" : ""}`}
                onClick={(): void => changeSeries(id)}
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
    const currentSeries = getCurrentSerie();
    const {
      patient_name = "匿名",
      patient_id = "未知",
      birthday = "未知",
      sex,
      study_date,
      institution_name = "未知",
      modality = "未知",
    } = patient;

    let max = 1,
      windowWidth = "未知",
      windowCenter = "未知";

    if (currentSeries) {
      const { pictures, window_center, window_width } = currentSeries;
      if (pictures) max = pictures.length;
      if (window_width) windowWidth = `${window_width}`;
      if (window_center) windowCenter = `${window_center}`;
    }

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
        <span title="图片索引">
          Frame: {imgIndexs[seriesIndex - 1]} / {max}
        </span>
        <span title="序列">Series: {seriesIndex}</span>
        <span>
          <span title="窗宽">WL: {windowWidth}</span>
          <span title="窗位">WL: {windowCenter}</span>
        </span>
        <span title="类型">{modality}</span>
      </div>
    );
  };

  const slider = (imgIndexs: number[], seriesIndex: number): ReactElement => {
    const currentSeries = getCurrentSerie();
    let max = 1;
    if (currentSeries && currentSeries.pictures) max = currentSeries.pictures.length;

    return (
      <Slider
        value={imgIndexs[seriesIndex - 1]}
        min={1}
        step={1}
        max={max}
        disabled={!cacheDone}
        className="player-ctl-slider"
        getTooltipPopupContainer={(): HTMLElement => $player.current || document.body}
        onChange={(value): void => {
          const next = [...imgIndexs];
          next[seriesIndex - 1] = value as number;
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
          onClick={(): void => {
            cacheDone && setShowInfo(!isShowInfo);
          }}
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
  // console.log("cache: ", cache);

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
          <div className="player-view-inner">
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
            <div className="player-progress" style={{ display: cacheDone ? "none" : "flex" }}>
              <Progress percent={progress}></Progress>
            </div>
          </div>
          {info(imgIndexs, seriesIndex, isShowInfo)}
        </div>
        <div className={`player-ctl ${cacheDone ? "" : "player-disabled"}`}>
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
