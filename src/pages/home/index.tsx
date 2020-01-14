import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import DicomCard from "../../components/DicomCard/DicomCard";

// export default class Home extends React.Component {
export default function Home(): ReactElement {
  // return (
  //   <div>
  //     <Link to="/login">GO LOGIN</Link>
  //     <Link to="/canvas">GO CANVAS</Link>
  //     {/* <a href="/login">GO LOGIN</a> */}
  //     {/* <a href="/canvas">GO CANVAS</a> */}
  //   </div>
  // );

  return <DicomCard id="123" patientName="hhh" studyDate="2019-01-13"></DicomCard>;
}
