// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert(error.message);
    }
  };

  return (
    <nav>
      <h1>쓰레기 분리배출 안내</h1>
      <ul>
        <li><Link to="/">홈</Link></li>
        {!currentUser ? (
          <>
            <li><Link to="/signup">회원가입</Link></li>
            <li><Link to="/login">로그인</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/create-post">게시글 작성</Link></li>
            <li><button onClick={handleLogout}>로그아웃</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;