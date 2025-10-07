import { useState } from "react";

export const useComment = () => {
  const [loading, setLoading] = useState(false);

  const dummyComments = [
    {
      comment_id: 1,
      user_id: 1,
      topic_id: 1,
      content: "더미 댓글 내용1",
      created_at: "2025-01-01T12:00:00Z",
      username: "더미 유저 이름1",
      like_count: 4,
      has_liked: false,
      replies: [
        {
          reply_id: 1,
          comment_id: 1,
          user_id: 3,
          content: "첫 번째 댓글에 대한 첫 번째 답글",
          created_at: "2025-01-01T13:00:00Z",
          username: "답글 유저1",
          like_count: 2,
          has_liked: false,
        },
        {
          reply_id: 102,
          comment_id: 1,
          user_id: 4,
          content: "첫 번째 댓글에 대한 두 번째 답글",
          created_at: "2025-01-01T14:00:00Z",
          username: "답글 유저2",
          like_count: 1,
          has_liked: true,
        },
      ],
    },
    {
      comment_id: 2,
      user_id: 2,
      topic_id: 1,
      content: "더미 댓글 내용2",
      created_at: "2025-02-01T12:00:00Z",
      username: "더미 유저 이름2",
      like_count: 6,
      has_liked: true,
      replies: [
        {
          reply_id: 2,
          comment_id: 2,
          user_id: 5,
          content: "두 번째 댓글에 대한 답글",
          created_at: "2025-02-01T13:00:00Z",
          username: "답글 유저3",
          like_count: 0,
          has_liked: false,
        },
      ],
    },
  ];

  const createComment = async (topicId, content) => {
    return null;
  };

  const getComments = async (topicId) => {
    return dummyComments;
  };

  const deleteComment = async (commentId) => {
    return false;
  };

  const updateComment = async (commentId, content) => {
    return null;
  };

  return {
    loading,
    createComment,
    getComments,
    deleteComment,
    updateComment,
  };
};
