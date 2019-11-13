import React from "react";
import { Link } from "react-router-dom";

// export default class Home extends React.Component {
export default function Home() {
  return (
    <div>
      <Link to="/login">GO LOGIN</Link>
      <Link to="/canvas">GO CANVAS</Link>
      {/* <a href="/login">GO LOGIN</a> */}
      {/* <a href="/canvas">GO CANVAS</a> */}
    </div>
  );
}
