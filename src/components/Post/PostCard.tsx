import { useState } from "react";
import type { Post } from "../../types/type";
import { deletePost, updatePost } from "../../services/api";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";

type Props = {
  post: Post;
  reloadPosts: () => void | Promise<void>;
};

function formatPostTime(value: string): string {
  const postDate = new Date(value);
  const now = new Date();
  const diffMs = now.getTime() - postDate.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

export default function PostCard({ post, reloadPosts }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);

  const loggedUsername = (localStorage.getItem("username") ?? "")
    .trim()
    .toLowerCase();
  const canDelete = loggedUsername === post.username.trim().toLowerCase();
  const canSave =
    editTitle.trim() !== "" && editContent.trim() !== "" && !editing;

  function handleOpenEdit() {
    setEditTitle(post.title);
    setEditContent(post.content);
    setIsEditModalOpen(true);
  }

  async function handleConfirmEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) return;

    try {
      setEditing(true);
      await updatePost(post.id, {
        title: editTitle.trim(),
        content: editContent.trim(),
      });
      setIsEditModalOpen(false);
      await Promise.resolve(reloadPosts());
    } catch (error) {
      console.error(error);
      alert("Could not update post.");
    } finally {
      setEditing(false);
    }
  }

  async function handleConfirmDelete() {
    if (!canDelete) {
      setIsDeleteModalOpen(false);
      return;
    }

    try {
      setDeleting(true);
      await deletePost(post.id);
      setIsDeleteModalOpen(false);
      await Promise.resolve(reloadPosts());
    } catch (error) {
      console.error(error);
      alert("Could not delete post.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <article className="PostCard">
        <header className="PostCardHeader">
          <h3>{post.title}</h3>

          <div className="PostActions">
            {canDelete && (
              <button
                type="button"
                className="IconButton"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <img src={deleteIcon} alt="Delete post" />
              </button>
            )}

            <button
              type="button"
              className="IconButton"
              onClick={handleOpenEdit}
            >
              <img src={editIcon} alt="Edit post" />
            </button>
          </div>
        </header>

        <div className="PostMeta">
          <span>@{post.username}</span>
          <span>{formatPostTime(post.created_datetime)}</span>
        </div>

        <p>{post.content}</p>
      </article>

      {isDeleteModalOpen && canDelete && (
        <div className="ModalOverlay" role="dialog" aria-modal="true">
          <div className="DeleteModal">
            <h4>Are you sure you want to delete this item?</h4>

            <div className="DeleteModalActions">
              <button
                type="button"
                className="ModalCancelButton"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="ModalDeleteButton"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="ModalOverlay" role="dialog" aria-modal="true">
          <form className="EditModal" onSubmit={handleConfirmEdit}>
            <h4>Edit item</h4>

            <label htmlFor={`edit-title-${post.id}`}>Title</label>
            <input
              id={`edit-title-${post.id}`}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              maxLength={120}
            />

            <label htmlFor={`edit-content-${post.id}`}>Content</label>
            <textarea
              id={`edit-content-${post.id}`}
              rows={4}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              maxLength={2000}
            />

            <div className="EditModalActions">
              <button
                type="button"
                className="ModalCancelButton"
                onClick={() => setIsEditModalOpen(false)}
                disabled={editing}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="ModalSaveButton"
                disabled={!canSave}
              >
                {editing ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
