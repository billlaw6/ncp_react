import React from 'react';
import './dialog.less';

const Dialog = (props: any) => {
    let { type, content } = props;
    let typeValue = type || '系统提示';
    if (typeof typeValue === 'number') {
        switch (type) {
            case 0:
                typeValue = '系统提示';
                break;
            case 1:
                typeValue = '系统警告';
                break;
            case 2:
                typeValue = '系统错误';
                break;
        }
    }
    return (
        <section>
            <div className="header">
                <h2>{ typeValue }</h2>
            </div>
            <div className="content">
                {content}
            </div>
        </section>
    )
}

export default Dialog;