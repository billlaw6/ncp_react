import React from 'react';
import ReactDOM from 'react-dom';
import { isExtraneousPopstateEvent } from 'history/DOMUtils';

// 父组件传入和属性定义
declare interface IProps {
    type: number | string;
    content: string;
}
class DialogCom extends React.Component<IProps, {}> {
    // 默认自带属性，设置默认值。
    static defaultProps = {
        type: 0,
        content: 'default content',
    };
    // 不用Typescript时可以用facebook提供的prop-types插件限制prop类型。
    // static propTypes = {
    //     type: propTypes.string.isRequired,
    // }
    constructor (props: IProps) {
        // super({ ...props, type: 2 })
        super(props)
        /*
         * 继承了三个属性： props, refs, context
         */
    }

    render () {
        let { type, content } = this.props;
        return <section>
            <h3>{type}</h3>
            <div className="content">
                {content}
            </div>
        </section>
    }
}

export default DialogCom;