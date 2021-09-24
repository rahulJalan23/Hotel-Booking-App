import React from "react";
import { useSelector } from "react-redux";
function Home() {
  const state = useSelector((state) => state);
  return <div>{JSON.stringify(state)}</div>;
}

export default Home;
