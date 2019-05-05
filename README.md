# segmentation-visualize
此项目目前只能用于展示图片分割效果，视频分割待后续改进和添加
### 前端说明
- 采用了```React```，```Redux```，```antd```等实现，后续如果想增加视频支持请修改```UploadBox.js```部分以及接口调用部分```unitedInterface.js```
- 依赖部分位于```package.json```，安装依赖请运行```npm install```
- 详细文档请阅读frondEnd部分的[ReadMe](https://github.com/caijh23/segmentation-visualize/tree/master/frontEnd)

### 服务端说明
- 采用了```Django```来实现程序，数据库部分使用了```sqlite```
- 使用时请在模型文件夹下提供一个```predict.py```文件，在该文件下定义一个```Ｐredict```的类，在该类的构造函数中将训练好的模型读入内存，并另外在该类中定义一个```runModel```的接口，该接口接受一个```list```，表示输入的几个图片的地址，用来将图片读入内存，返回值有两个，一个```list```用于输出给服务端程序表示输出图像，该列表的每一个元素为一个矩阵，该矩阵`必须`为python的Pillow库可接受的矩阵类型，用于```Ｉmage.fromarray```接口将其读取，服务端程序会将其读取成字节流并存储于数据库
- 目前对于路径的支持暂时只支持绝对路径，相对路径留待后续改进（其实是暂时肝不动了....）
- 详细文档请参见backEnd部分的[ReadMe](https://github.com/caijh23/segmentation-visualize/tree/master/backEnd)

### mock-server部分
- 采用```koa2```实现，可用于定义新接口的时候供前端测试使用
- 依赖安装请使用```npm install```命令