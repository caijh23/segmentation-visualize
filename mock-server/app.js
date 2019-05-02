const Koa = require('koa');

const app = new Koa();

const formidable = require('koa2-formidable');

const bodyParser = require('koa-bodyparser');

const router = require('koa-router')();

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next()
});
app.use(formidable());
app.use(bodyParser());

var mock_db = {
  template_lists: [
    {
      text: '假装有模型',
      templateId: 1,
      input_lists : ['前景图像', '背景图像'],
      output_lists: ['mask1', 'mask2']
    },
    {
      text: '测试模型二',
      templateId: 2,
      input_lists : ['输入图像'],
      output_lists: ['分割图像']
    }
  ],

}

router.post('/inputs', async (ctx, next) => {
  console.log(ctx)
  const json = {
    imgId: 1
  };
  ctx.set("Content-Type", "application/json");
  console.log(json)
  ctx.response.body = JSON.stringify(json);
});

router.get('/templates', async (ctx, next) => {
  const json = {
    template_lists: mock_db.template_lists.map((item) => ({
      text: item.text, templateId: item.templateId
    }))
  }
  ctx.set("Content-Type", "application/json");
  console.log(json)
  ctx.response.body = JSON.stringify(json);
})

router.get('/templates/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const json = {
    input_lists: mock_db.template_lists[id - 1].input_lists,
    output_lists: mock_db.template_lists[id - 1].output_lists,
  };
  ctx.set("Content-Type", "application/json");
  console.log(json);
  ctx.response.body = JSON.stringify(json);
})

router.post('/templates', async (ctx, next) => {
  let {body} = ctx.request;
  console.log(body);
  const length = mock_db.template_lists.length;
  const template_to_add = {
    ...body,
    templateId: length + 1
  }
  mock_db.template_lists.push(template_to_add);
  ctx.set("Content-Type", "application/json");
  const json = {
    text: mock_db.template_lists[length].text,
    templateId: mock_db.template_lists[length].templateId
  }
  console.log(json);
  ctx.response.body = JSON.stringify(json);
})

router.post('/outputs', async (ctx, next) => {
  let {body} = ctx.request;
  console.log(body)
  const length = body.image_id_lists.length
  console.log('input length : ',length)
  const retArr = new Array(length).fill('https://img.hookbase.com/img2017/5/5/2017050558561345.jpg');
  const json = {
    imgUrl: retArr
  };
  ctx.set("Content-Type", "application/json");
  console.log(json);
  ctx.response.body = JSON.stringify(json);
})

app.use(router.routes());

app.listen(8000);
console.log('🌎\t\b\b\b\b\bListening : app started at port 8000...')