const Koa = require('koa');

const app = new Koa();

const formidable = require('koa2-formidable')

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
      input_lists : [
        {description: '前景图像', imgId: -1},
        {description: '背景图像', imgId: -1}
      ],
      output_lists: [
        {description: 'mask1' ,imgUrl: ''},
        {description: 'mask2', imgUrl: ''}
      ]
    },
    {
      text: '测试模型二',
      templateId: 2,
      input_lists : [
        {description: '输入图像', imgId: -1},
      ],
      output_lists: [
        {description: 'mask' ,imgUrl: ''}
      ]
    }
  ],

}

router.post('/inputs', async (ctx, next) => {
  const json = {
    imgId: 1
  };
  ctx.set("Content-Type", "application/json");
  ctx.response.body = JSON.stringify(json);
});

router.get('/templates', async (ctx, next) => {
  const json = {
    template_lists: mock_db.template_lists.map((item) => ({
      text: item.text, templateId: item.templateId
    }))
  }
  ctx.set("Content-Type", "application/json");
  ctx.response.body = JSON.stringify(json);
})

router.get('/templates/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const json = {
    input_lists: mock_db.template_lists[id - 1].input_lists,
    output_lists: mock_db.template_lists[id - 1].output_lists
  };
  console.log(json)
  ctx.set("Content-Type", "application/json");
  ctx.response.body = JSON.stringify(json);
})

router.post('/templates', async (ctx, next) => {
  let {body} = ctx.request
  const length = mock_db.template_lists.length;
  const input_lists = body.input_lists.map((item) => ({
    description: item,
    imgId: -1
  }))
  const output_lists = body.output_lists.map((item) => ({
    description: item,
    imgUrl: ''
  }))
  const template_to_add = {
    input_lists,
    output_lists,
    text: '测试创建模型',
    templateId: length + 1
  }
  mock_db.template_lists.push(template_to_add);
  ctx.set("Content-Type", "application/json");
  const json = {
    text: mock_db.template_lists[length].text,
    templateId: mock_db.template_lists[length].templateId
  }
  ctx.response.body = JSON.stringify(json);
  console.log(mock_db)
})

app.use(router.routes());

app.listen(8000);
console.log('🌎\t\b\b\b\b\bListening : app started at port 8000...')