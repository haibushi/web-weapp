import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../views/login";
import { Navigate } from "react-router-dom";
import Layouts from "../components/Layouts";
interface UserType {
  name: string;
}

export default () => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    if ((user as UserType).name) {
      setUser(user);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Navigate to={user?.name ? "/home" : "/login"}></Navigate>}
        ></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layouts />} />
      </Routes>
    </BrowserRouter>
  );
};
