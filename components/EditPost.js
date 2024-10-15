// src/components/EditPost.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.userId !== currentUser.uid) {
          alert("수정 권한이 없습니다.");
          navigate("/");
        } else {
          setTitle(data.title);
          setContent(data.content);
        }
      } else {
        console.log("No such document!");
      }
    };
    fetchPost();
  }, [id, currentUser, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
        title,
        content,
      });
      alert("게시글이 수정되었습니다.");
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("게시글 수정 오류:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>게시글 수정</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">수정</button>
      </form>
    </div>
  );
};

export default EditPost;