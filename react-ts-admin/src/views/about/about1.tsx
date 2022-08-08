import About2 from "./about2";
import { useState, useMemo } from "react";
interface propsType {
  num: number;
}
function About1(props: propsType) {
  const info = {
    num: props.num,
  };
  const about2 = useMemo(() => <About2 />, []);
  const [numInfo, setNumInfo] = useState(info);

  console.log("About1", numInfo.num);

  const handle = () => {
    setNumInfo({
      ...numInfo,
      num: numInfo.num + 1,
    });
  };
  return (
    <div>
      <button onClick={handle}>
        {numInfo.num}|{props.num}
      </button>
      {about2}
    </div>
  );
}

export default About1;
