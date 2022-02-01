// Import createAsyncThunk and createSlice here.
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
// Create loadCommentsForArticleId here.(payload creator)
async function loadCommentsForArticleId(articleId){
  try{
   const response= await fetch(`api/articles/${articleId}/comments`);
   const json=await response.json()
   console.log("loadcomments:")
   console.log(json)
   return json
   
  }catch(e){
   return  Promise.reject(e.message)
  }

}
// Create postCommentForArticleId here.(payload creator)
async function postCommentForArticleId({articleId,comment}){
  try{
 const  body=JSON.stringify({comment});
 const response= await fetch(`api/articles/${articleId}/comments`,{method:"POST",body});
 const json=await response.json()

 return json 
 /*
 sample
 {
  "id": 4,
  "articleId": 1,
  "text": "boy o boy"
}*/
  }catch(e){
    return Promise.reject(e.message)
  }
}
export const loadCommentsThunkCreator=createAsyncThunk(
  'comments/loadComments',loadCommentsForArticleId);

/*this is how it will be called
postCommentsThunkCreator({
  articleId: 1,
  comment: "This article is great!"
}}
*/
export const postCommentsThunkCreator=createAsyncThunk(
  'comments/postComment',postCommentForArticleId);
//an enum to track progress of loading comments
//progress can be viewed as a state machine with the following stages
//isLoadingComments: idle||loading||failed||succeeeded
export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
      // Add initial state properties here.
      createCommentIsPending:'idle',
      isLoadingComments:'idle',
      byArticleId:{},
      comments:[]
    },
    // Add extraReducers here.
    extraReducers:{
     [loadCommentsThunkCreator.pending]:(state)=>{
       state.isLoadingComments='loading';
     },
     [loadCommentsThunkCreator.fulfilled]:(state,action)=>{
       state.isLoadingComments="succeeded";
       state.byArticleId[action.payload.articleId]=action.payload.comments;

     },
     [loadCommentsThunkCreator.rejected]:(state,action)=>{
       state.isLoadingComments='failed';
     },
     [postCommentsThunkCreator.pending]:(state)=>{
       state.createCommentIsPending="loading";
     },
     [postCommentsThunkCreator.fulfilled]:(state,action)=>{
      state.createCommentIsPending="succeeded";
      state.byArticleId[action.payload.articleId].push(action.payload)
      
     },
     [postCommentsThunkCreator.rejected]:(state)=>{
      state.createCommentIsPending="failed";
     } 
    }
  });
  
 
  
  export const selectComments=(state) =>state.comments.byArticleId;
  export const isLoadingComments = (state) => state.comments.isLoadingComments;
  export const createCommentIsPending = (state) => state.comments.createCommentIsPending;
  
  export default commentsSlice.reducer;
  