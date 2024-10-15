// src/components/ResetPassword.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("비밀번호 재설정 이메일을 보냈습니다. 이메일을 확인해주세요.");
    } catch (error) {
      console.error("비밀번호 재설정 오류:", error);
      setMessage(error.message);
    }
  };
  
  return (
    <div>
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>이메일:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">비밀번호 재설정 이메일 보내기</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;