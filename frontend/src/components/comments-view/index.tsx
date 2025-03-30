import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CommentModel } from '../../interfaces/post';
import { CSSTransition } from 'react-transition-group';
import './index.scss'
import { CommentInput } from './comment-input';
import { CommentsList } from './comments-list';
import { addComment } from '../../services/commentService';
import { useUser } from '../../contexts/userContext';

interface IProp {
  onSubmitComments: () => void;
  comments: CommentModel[];
  isOpen: boolean;
  toggleIsOpen: () => void;
  postId: string;
}

export const CommentsView: React.FC<IProp> = ({ onSubmitComments, isOpen, comments, toggleIsOpen, postId }: IProp) => {
  const commentsRef = useRef<HTMLDivElement | null>(null);
  const {user} = useUser()

  const onSubmitComment = useCallback(async (newComment: string) => {
    await addComment(postId, newComment)
    onSubmitComments()
  }, [onSubmitComments])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (commentsRef.current && !commentsRef.current.contains(event.target as Node)) {
      toggleIsOpen()
    }
  }, [toggleIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return <CSSTransition
    in={isOpen}
    timeout={400}
    classNames="comments"
    unmountOnExit
  >
    <div className="view-wrapper" ref={commentsRef} >
      <div className="comments-wrapper">
        <CommentsList comments={comments} />
        <CommentInput userImage={user?.image} onSubmit={onSubmitComment} />
      </div>
    </div>

  </CSSTransition>
}