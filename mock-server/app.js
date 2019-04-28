const Koa = require('koa');

const app = new Koa();

const bodyParser = require('koa-bodyparser');

const router = require('koa-router')();

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next()
});

app.use(bodyParser());

router.post('/inputs', async (ctx, next) => {
  const json = {
    imgId: 1
  };
  ctx.set("Content-Type", "application/json");
  ctx.response.body = JSON.stringify(json);
});

router.get('/templates', async (ctx, next) => {
  const json = {
    template_lists: [
      {text: '假装有模型', templateId: 1},
      {text: '测试模型二', templateId: 2}
    ]
  };
  ctx.set("Content-Type", "application/json");
  ctx.response.body = JSON.stringify(json);
})

app.use(router.routes());

app.listen(8000);
console.log('🌎\t\b\b\b\b\bListening : app started at port 8000...')