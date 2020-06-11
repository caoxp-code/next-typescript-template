# next-typescript-template

包含 next、typescript、eslint、prette、antd 脚手架模板

# 安装

使用一下命令，下载项目

```
npx create-next-app -e https://github.com/caoxp-code/next-typescript-template
```

可以用来生成项目

# 目录说明

1. public，此文件中资源为静态资源，对外访问可以直接通过'/'，如下

   ```
   function MyImage() {
      return <img src="/my-image.png" alt="my image" />
    }

    export default MyImage
   ```

   其中 my-image.png 在 public 文件夹下。

2. src，具体的业务代码在此进行编写

- api: 编写后台 api 路由，请求路径为/api/\*\*
- components: 公用组件
- pages: 路由页面
