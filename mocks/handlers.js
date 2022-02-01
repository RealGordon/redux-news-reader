import { rest } from 'msw';
import articlesData from './articles.json';
import commentsData from './comments.json';

const userComments = {};

function mockDelay(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export const handlers = [
  rest.get('/api/articles', (req, res, ctx) => {
    mockDelay(500);
    return res(
      ctx.status(200),
      ctx.json(
        articlesData.map((article) => ({
          id: article.id,
          title: article.title,
          preview: article.preview,
          image: article.image,
        }))
      )
    );
  }),
  rest.get('/api/articles/:articleId', (req, res, ctx) => {
    mockDelay(500);
    const { articleId } = req.params;
    return res(
      ctx.status(200),
      ctx.json(
        articlesData.find((article) => article.id === parseInt(articleId))
      )
    );
  }),
  rest.get('/api/articles/:articleId/comments', (req, res, ctx) => {
    mockDelay(500);
    const { articleId } = req.params;
    const userCommentsForArticle = userComments[articleId] || [];
    return res(
      ctx.status(200),
      ctx.json({
        articleId: parseInt(articleId),
        comments: commentsData
          .filter((comment) => comment.articleId === parseInt(articleId))
          .concat(userCommentsForArticle),
      })
    );
  }),
  rest.post('/api/articles/:articleId/comments', (req, res, ctx) => {
    mockDelay(500);
    const  articleId  = parseInt(req.params);
    let id=0;
    id=commentsData.reduce((a,b)=>{
        if (articleId===b.articleId)id=(Math.max(a,b.id));
        return id
    },id);
    const commentResponse = {
      id:id+1,
      articleId: parseInt(articleId),
      text: JSON.parse(req.body).comment,
    };
    commentsData.push(commentResponse);
    if (userComments[articleId]) {
      userComments[articleId].push(commentResponse);
    } else {
      userComments[articleId] = [commentResponse];
    }

    return res(ctx.status(200), ctx.json(commentResponse));
  }),
];
