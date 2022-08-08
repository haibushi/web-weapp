import About1 from "./about1";
import { useState, useMemo } from "react";
function About() {
  const [num, setNum] = useState(0);
  const about1 = useMemo(() => <About1 num={num} />, [num]);
  const handle = () => {
    setNum(num + 1);
  };
  return (
    <div>
      About
      <button onClick={handle}>{num}</button>
      {about1}
    </div>
  );
}

export default About;
