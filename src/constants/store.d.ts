// Store相关接口

declare type ICountState = number

declare interface IDraftState {
    isChecked: boolean;
    content: string;
}

declare interface ICanvasState {
    label: string;
}

// 创建store时要遵循的rootState接口，不能使用rootReducers的类型
// 作为组件创建时props类型！！！必须用store.d里定义的！三天的教训！
declare interface IStoreState {
    route: {
        location: Location;
    };
    count: ICountState;
    draft: IDraftState;
    canvas: ICanvasState;
}

export { ICountState, IDraftState, ICanvasState, IStoreState };
