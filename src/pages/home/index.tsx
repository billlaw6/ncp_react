import React, { ReactElement } from "react";
import DicomCard from "_components/DicomCard/DicomCard";

export default function Home(): ReactElement {
  return <DicomCard id="123" patientName="hhh" studyDate="2019-01-13"></DicomCard>;
}
