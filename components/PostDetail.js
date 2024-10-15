// src/components/PostDetail.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await db.collection("posts").doc(id).delete();
        alert("게시글이 삭제되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("삭제 오류:", error);
        alert(error.message);
      }
    }
  };

  if (!post) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>작성자: {post.userId}</p>
      <p>작성일: {post.createdAt.toDate().toLocaleString()}</p>
      <p>{post.content}</p>
      {currentUser && currentUser.uid === post.userId && (
        <div>
          <Link to={`/edit-post/${post.id}`}>수정</Link>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;