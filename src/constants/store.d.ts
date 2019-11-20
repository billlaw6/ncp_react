// Store相关接口
// 本地变量遵循js规范使用驼峰式全名，需要与后台数据库字段对应的变量使用下划线风格。

declare type ICountState = number;

declare interface ILoginState {
    username: string;
    password: string;
    token: string;
    messages: Array<string>;
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

declare type IUserList = {
    dtRange: Array<Date>;
    keyword: string;
    status: string;
    count: number;
    results: Array<IUserState>;
}

declare interface IDicomInfo {
    id: string;
    study_uid: string;
    size: number;
    content_type: string;
    patient_name: string;
    patient_id: string;
    birthday: Date;
    sex: string;
    study_date: Date;
    institution_name: string;
    window_width: number;
    window_center: number;
    modality: string;
    display_frame_rate: number;
    series_id: string;
    instance_id: string;
    created_at: Date;
    owner: string;
    dicom_file: string;
}

declare interface IDicomSearchState {
    dtRange: Array<Date>;
    keyword: string;
    status: string;
    count: number;
    results: Array<IDicomInfo>;
}

// 创建store时要遵循的rootState接口，不能使用rootReducers的类型
// 作为组件创建时props类型！！！必须用store.d里定义的！三天的教训！
declare interface IStoreState {
    router: { location: Location; };
    token: ILoginState;
    user: IUserState;
    userList: IUserSearchList;
    dicom: IDicomState;
    dicomList: IDicomSearchState;
    count: ICountState;
    draft: IDraftState;
    todoList: IToDoList;
    canvas: ICanvasState;
}

export {
    ILoginState,
    IUserState,
    IUserList,
    IDicomState,
    IDicomSearchState,
    ICountState,
    IDraftState,
    IToDoList,
    ICanvasState,
    IStoreState,
};
