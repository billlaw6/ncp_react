// Store相关接口

declare interface IDraftState {
    isChecked: boolean;
    content: string;
}

declare interface ICanvasState {
    label: string;
}

// 创建store时要遵循的rootState接口
declare interface IStoreState {
    route: {
        location: Location;
    };
    draft: IDraftState;
    canvas: ICanvasState;
}

export { IDraftState, ICanvasState, IStoreState };
