import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';

class DicomPlayerCom extends React.Component<{}, {}> {
    private canvasRef = React.createRef<HTMLCanvasElement>();
    constructor(props: any) {
        super(props);
    }
    componentDidMount () {
        if (this.canvasRef.current) {
            let ctx = this.canvasRef.current.getContext('2d');
            ctx!.fillStyle="#ff0000";
            ctx!.fillRect(0, 0, 150, 75);     
        }
    }
    render() {
        return (
            <div style={{ width: '100%', height: 'auto'}} id={'scrollBOx'}>
                DicomPlayer
                <canvas ref={this.canvasRef} width="1024" height="768"></canvas>
            </div>
        )
    }
}

export default DicomPlayerCom;