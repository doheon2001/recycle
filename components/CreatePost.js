// src/components/CreatePost.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      alert("게시글이 작성되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("게시글 작성 오류:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
          ></textarea>
        </div>
        <button type="submit">작성</button>
      </form>
    </div>
  );
};

export default CreatePost;