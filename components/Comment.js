import React from 'react';

//export default function Comment({ comment }) {
export default function Comment({ text }) {
  //const { id, text } = comment;
  
/*  return (
    <li key={id} className='comment-container'>
      <span>{text}</span>
    </li>
  );
  */
  return (
    <li  className='comment-container'>
      <span>{text}</span>
    </li>
  );
}
