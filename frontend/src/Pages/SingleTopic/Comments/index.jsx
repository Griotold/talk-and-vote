import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import CommentItem from "./CommentItem";
import PaginationControls from "./PaginationControls";
import { useComment } from "../../../hooks/useComment";
import { useReply } from "../../../hooks/useReply";
import { useLike } from "../../../hooks/useLike";

const Comments = ({ topicId }) => {
  const { getComments, createComment, updateComment, deleteComment, loading } =
    useComment();
  const { createReply, updateReply, deleteReply } = useReply();
  const { toggleCommentLike, toggleReplyLike } = useLike();

  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState("");

  const itemsPerPage = 10;

  const fetchComments = useCallback(async () => {
    const result = await getComments(topicId);
    setComments(result || []);
    setCurrentPage(1);
  }, [getComments, topicId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCreateComment = async () => {
    const result = await createComment(topicId, newComment);
    if (result) {
      setNewComment("");
      fetchComments();
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirm = await Swal.fire({
      title: "삭제하시겠습니까?",
      text: "삭제된 댓글은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#9CA3AF",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (confirm.isConfirmed) {
      const success = await deleteComment(commentId);
      if (success) fetchComments();
    }
  };

  const handleCommentActions = {
    onEdit: updateComment,
    onDelete: handleDeleteComment,
    onLike: toggleCommentLike,
    onReply: createReply,
    onReplyEdit: updateReply,
    onReplyDelete: deleteReply,
    onReplyLike: toggleReplyLike,
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentComments = comments.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(comments.length / itemsPerPage);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        댓글 <span className="text-emerald-500">({comments.length})</span>
      </h2>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 작성해주세요..."
        className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-emerald-500"
        rows={3}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleCreateComment}
          disabled={!newComment.trim() || loading}
          className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
        >
          댓글 작성
        </button>
      </div>

      <div className="space-y-6 mt-6">
        {currentComments.map((comment) => (
          <CommentItem
            key={comment.comment_id}
            item={comment}
            actions={handleCommentActions}
            refresh={fetchComments}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Comments;
