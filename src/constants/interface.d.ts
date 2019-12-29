// Store相关接口
// 本地变量遵循js规范使用驼峰式全名，需要与后台数据库字段对应的变量使用下划线风格。

declare interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
    messages: Array<string>;
}

declare interface ICurrentUser {
    id: number;
    token: string;
    username: string;
    cell_phone: string;
    first_name?: string;
    last_name?: string;
    gender: number;
    birthday?: Date;
    sign: string;
    address: string;
    unit: string;
    avatar: string;
    // user_permissions?: Array<number>;
}

declare interface IUserInfo {
    id: number;
    username: string;
    email: string;
    cell_phone: string;
    openid: string;
    unionid: string;
    // 数组定义方法一
    groups: number[];
    first_name?: string;
    last_name?: string;
    pinyin?: string;
    py?: string;
    gender: number;
    // 数组定义方法二
    user_permissions: Array<number>;
}

declare interface ISearchForm {
    dtRange: Date[];
    keyword: string;
    fields?: string[];
}

declare interface ICollection {
    id: string;
    type: string;
    data: any;
}

declare interface IDicomPictureList {
    id: string;
    mpr_order: number;
    frame_order: number;
    url: string;
}

declare interface IDicomPicture {
    id: string;
    mpr_order: number;
    frame_order: number;
    collections: ICollection[];
    url: string;
}

declare interface IDicomSeriesList {
    id: string;
    series_number: number;
    mpr_flag: number;
    thumbnail: string;
}

declare interface IDicomSeries {
    id: string;
    thumbnail: string;
    study_id: string;
    patient_name: string;
    patient_id: string;
    sex: string;
    birthday: string;
    institution_name: string;
    window_width: number;
    window_center: number;
    modality: string;
    display_frame_rate: number; 
    series_number: number;
    mpr_flag: number;
    pictures: IDicomPictureList[];
}

declare interface IExamIndexList {
    id: string;
    patient_name: string;
    patient_id: string;
    institution_name: string;
    study_date: string;
    thumbnail: string;
    series: IDicomSeriesList[];
}

declare interface IExamIndex {
    id: string;
    patient_name: string;
    patient_id: string;
    institution_name: string;
    study_date: string;
    thumbnail: string;
    modality: string;
    study_id: string;
    display_frame_rate: number;
    series: IDicomSeriesList[];
}

// 创建store时要遵循的rootState接口，不能使用rootReducers的类型
// 作为组件创建时props类型！！！必须用store.d里定义的！三天的教训！
declare interface IStoreState {
    router: { location: Location; };
    loginForm: ILoginForm;
    currentUser: ICurrentUser;
    userInfo: IUserInfo;
    userInfoList: IUserInfo[];
    examSearchForm: ISearchForm;
    examIndexList: IExamIndexList;
    dicomSeriesList: IDicomSeriesList;
    dicomPicture: IDicomPictureList;
}

export {
    ILoginForm,
    ICurrentUser,
    IUserInfo,
    ISearchForm,
    IExamIndex,
    IExamIndexList,
    IDicomSeries,
    IDicomSeriesList,
    IDicomPicture,
    IDicomPictureList,
    // 
    IStoreState,
};
