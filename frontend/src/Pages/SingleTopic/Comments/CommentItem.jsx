import React, { useState } from "react";
import EditableContent from "./EditableContent";
import CommentActions from "./CommentActions";
import ReplyForm from "./ReplyForm";

const CommentItem = ({ item, isReply = false, actions, refresh }) => {
  const id = isReply ? item.reply_id : item.comment_id;
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(item.content);
  const [replying, setReplying] = useState(false);

  const handleEdit = async () => {
    const success = isReply
      ? await actions.onReplyEdit(id, editContent)
      : await actions.onEdit(id, editContent);

    if (success) {
      setIsEditing(false);
      refresh();
    }
  };

  const handleLikeClick = async () => {
    const success = isReply
      ? await actions.onReplyLike(id)
      : await actions.onLike(id);

    if (success !== null) {
      refresh();
    }
  };

  const handleReplySubmit = async (content) => {
    const success = await actions.onReply(commentId, content);
    if (success) {
      setReplying(false);
      refresh();
    }
  };

  const handleDelete = async () => {
    const success = isReply
      ? await actions.onReplyDelete(id)
      : await actions.onDelete(id);

    if (success) {
      refresh();
    }
  };

  return (
    <div className={`${isReply ? "ml-6 mt-2" : "mb-6"}`}>
      <div className="flex justify-between bg-white p-4 rounded-lg border border-gray-300">
        <div className="flex items-start space-x-3 flex-grow">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-emerald-600 font-medium">
              {item.username.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-gray-800">{item.username}</p>
              <p className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <EditableContent
              isEditing={isEditing}
              content={item.content}
              editContent={editContent}
              setEditContent={setEditContent}
              handleEdit={handleEdit}
              setIsEditing={setIsEditing}
              isReply={isReply}
            />
          </div>

          <CommentActions
            hasLiked={item.has_liked}
            likeCount={item.like_count}
            onLikeClick={handleLikeClick}
            onReplyClick={() => setReplying(!replying)}
            onEditClick={() => setIsEditing(true)}
            onDeleteClick={handleDelete}
          />
        </div>
      </div>

      {replying && !isReply && (
        <div className="mt-2">
          <ReplyForm
            onSubmit={handleReplySubmit}
            onCancel={() => setReplying(false)}
          />
        </div>
      )}

      {item.replies?.map((reply) => (
        <CommentItem
          key={reply.reply_id}
          item={reply}
          isReply={true}
          actions={actions}
          refresh={refresh}
        />
      ))}
    </div>
  );
};

export default CommentItem;
