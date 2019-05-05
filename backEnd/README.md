# backEnd

### 路径部分的说明
- 在predict.py中读入训练好的模型权重请使用绝对路径，因为服务端运行时sys.path是位于服务端程序的路径，目前的做法是为了解决局部import问题会把predict.py所在路进加入sys.path来解决局部improt的时候Python解释器寻找使用者自己写的模块问题，而读入权重问题如果是从文件系统读入的话暂时还未花时间解决请使用绝对路径
- 在predict.py的Predict类中请在构造函数中读入模型，在runModel函数中接受一个```list```参数读取图片并输出一个矩阵组成的```list```表示输出的图像和一个```str```表示输出图片的类型
- 模型的配置问题，在前端网页请输入模型所在的文件夹的绝对路径并在该目录下提供predict.py，示例如下:
```
-- exampleNet
    -- predict.py
    -- utlis
    -- others
若exampleNet文件夹位于/home/exampleUser/exampleNet下,则填入前端的path为/home/exampleUser/exampleNet，并且predict.py应位于该目录下
```