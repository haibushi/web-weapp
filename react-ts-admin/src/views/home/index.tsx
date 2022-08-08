import { useSelector } from "react-redux";
import classnames from "classnames";
import { useState, useEffect, useRef } from "react";
function Home() {
  const { userInfo } = useSelector((state: any) => state.user);
  const [count, setCount] = useState(0);

  function handleAlertClick() {}
  let timeId:any = useRef();
  useEffect(()=>{
    if(timeId.current){
      clearInterval(timeId.current);
    }
    timeId.current = setInterval(()=>{
      console.log('执行中----',timeId.current);
      setCount(count=>count+1);
    },2000)

    return ()=>{
      console.log('-----end',timeId.current);
      clearInterval(timeId.current);
    }
  })

  useEffect(()=>{
    if(count>10){
      clearInterval(timeId.current)
    }
  })

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
