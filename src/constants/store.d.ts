// Store相关接口
declare type ICountState = number;

declare interface ITokenState {
    token: string;
}

declare interface IUserState {
    id: number;
    username: string;
    email: string;
    cell_phone: string;
    openid: string;
    unionid: string;
    groups: number[];
    first_name?: string;
    last_name?: string;
    pinyin?: string;
    py?: string;
    sex: number;
    user_permissions: Array<number>;
}

declare type IUserList = IUserState[];

// 创建store时要遵循的rootState接口，不能使用rootReducers的类型
// 作为组件创建时props类型！！！必须用store.d里定义的！三天的教训！
declare interface IStoreState {
    // router: any;
    router: { location: Location; };
    user: IUserState;
    userList: IUserList;
    count: ICountState;
    draft: IDraftState;
    todoList: IToDoList;
    canvas: ICanvasState;
    token: ITokenState;
}

export {
    ITokenState,
    IUserState,
    IUserList,
    ICountState,
    IDraftState,
    IToDoList,
    ICanvasState,
    IStoreState,
};
