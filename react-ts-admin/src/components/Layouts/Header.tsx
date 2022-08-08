import classNames from "classnames";
import Style from "./index.module.css";
import { useSelector } from "react-redux";
import { flowRight } from "lodash";
import type { initialStateType } from "../../store/userSlice";
function Header() {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const reverse = (arr: string[]) => arr.reverse(); // 倒叙
  const first = (arr: string[]) => arr[0]; // 选取第一个
  const toUpper = (s: string) => s.toUpperCase(); // 转化为大写字母
  const f = flowRight(toUpper, first, reverse);
  f(["one", "second", "three"]);
  return (
    <div className={classNames(Style.headerBox)}>
      <div className="left">
        <h4 className={Style.col}>SHOP系统</h4>
      </div>
      <div className="right">
        <h4>
          欢迎回来<span>{userInfo.username}</span>
        </h4>
      </div>
    </div>
  );
}

export default Header;
