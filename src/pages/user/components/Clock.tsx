import React from "react";

declare interface IProp {
  time?: string;
}
declare interface IState {
  time: string;
}
class Clock extends React.Component<IProp, IState> {
  constructor(props: IProp) {
    super(props);
    this.state = {
      time: new Date().toLocaleString(),
    };
  }

  componentDidMount() {
    setInterval(() => {
      // 此写法不管用
      // this.state.time = new Date().toLocaleString();
      // 使用此方法修改state才会触发视图更新。
      this.setState({
        time: new Date().toLocaleString(),
      });
    }, 1000);
  }

  render() {
    return (
      <section className="clock-wrapper" style={{ display: "block" }}>
        <div className="clock">{this.state.time}</div>
      </section>
    );
  }
}

export default Clock;
