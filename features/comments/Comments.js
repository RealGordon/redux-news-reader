import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCommentsThunkCreator,
  selectComments,
  isLoadingComments,
} from '../comments/commentsSlice';
import { selectCurrentArticle } from '../currentArticle/currentArticleSlice';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';
const emptyArray=[];


const Comments = () => {
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);
  // Declare additional selected data here.
  
  const comments = useSelector(selectComments);
  const commentsAreLoading = useSelector(isLoadingComments);
 console.log("COMMENTS: " )
console.log( comments)
  const commentsForArticleId=article && comments?comments[article.id]:emptyArray;

  // Dispatch loadCommentsForArticleId with useEffect here.
  useEffect(()=>{
    if(article !== undefined){
      dispatch(loadCommentsThunkCreator(article.id))
    }

  },[article])

  if (commentsAreLoading==="loading") return <div>Loading Comments</div>;
  if (!article) return null;

  return (
    <div className='comments-container'>
      <h3 className='comments-title'>Comments</h3>
      <CommentList comments={commentsForArticleId} />
      <CommentForm articleId={article.id} />
    </div>
  );
};

export default Comments;
