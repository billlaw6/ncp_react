// Store相关接口
declare type ICountState = number;

declare interface ILoginState {
    username: string;
    password: string;
}

declare interface IUserState {
    token: string;
    id: number;
    username: string;
    email: string;
    cell_phone: string;
    openid: string;
    unionid: string;
    groups: [number];
    first_name: string;
    last_name: string;
    pinyin: string;
    py: string;
    sex: number;
    user_permissions: [number];
}

declare type IUserList = IUserState[];

declare interface IDraftState {
    isChecked: boolean;
    content: string;
}

declare type IToDoList = IDraftState[];

declare interface ICanvasState {
    label: string;
}

// 创建store时要遵循的rootState接口，不能使用rootReducers的类型
// 作为组件创建时props类型！！！必须用store.d里定义的！三天的教训！
declare interface IStoreState {
    route: {
        location: Location;
    };
    user: IUserState;
    userList: IUserList;
    count: ICountState;
    draft: IDraftState;
    todoList: IToDoList;
    canvas: ICanvasState;
}

export {
    IUserState,
    IUserList,
    ILoginState,
    ICountState,
    IDraftState,
    IToDoList,
    ICanvasState,
    IStoreState,
};
