import { useSelector } from "react-redux";
import classnames from "classnames";
import { useState, useEffect, useRef } from "react";


function Home() {
  const { userInfo } = useSelector((state: any) => state.user);
  const [count, setCount] = useState(0);
  
  function handleAlertClick() {}
  const [list,setList] = useState<number[]>([1,2,3]);
  
  return (
    <div className={classnames({ aa: true })}>
      欢迎回来{userInfo.username}
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>

      <button>开始计时</button>
      <button>结束计时</button>

    </div>
  );
}

export default Home;
