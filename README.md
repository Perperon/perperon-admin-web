# perperon-admin-web

> perperon电商后台管理系统

## 项目简介
perperon-admin-web是一个基于Vue.js的电商后台管理系统，提供了完整的电商运营管理功能，包括用户管理、权限管理、商品管理、订单管理、字典管理等模块。

## 技术栈

### 前端框架
- Vue.js 2.5.2
- Vue Router 3.0.1
- Vuex 3.6.2

### UI组件库
- Element UI 2.15.14

### 开发工具
- Webpack 3.6.0
- Babel
- ESLint

### 依赖库
- Axios 0.28.1 (HTTP请求)
- ECharts 4.3.0 (图表)
- Vue Quill Editor 3.0.6 (富文本编辑器)
- Vue Cropper 0.5.8 (图片裁剪)
- Vue Table With Tree Grid 0.2.4 (树形表格)
- China Location 2.1.0 (中国地址数据)
- JS Cookie 3.0.5 (Cookie管理)
- NProgress 0.2.0 (进度条)
- QS 6.12.1 (参数序列化)

## 项目结构

```
perperon-admin-web/
├── build/                    # Webpack构建配置
├── config/                   # 项目配置文件
├── src/                      # 源代码
│   ├── api/                  # API接口定义
│   ├── assets/               # 静态资源
│   ├── components/           # 公共组件
│   ├── icons/                # SVG图标
│   ├── router/               # 路由配置
│   ├── store/                # Vuex状态管理
│   ├── utils/                # 工具函数
│   ├── views/                # 页面组件
│   ├── App.vue               # 根组件
│   ├── main.js               # 入口文件
│   └── permission.js         # 权限控制
├── static/                   # 静态资源
├── index.html                # HTML模板
└── package.json              # 项目依赖
```

### 核心目录说明

#### src/api/
包含所有API接口定义，按功能模块划分：
- category.js：商品分类接口
- categoryParam.js：商品分类参数接口
- dictionary.js：字典数据接口
- dictionarytype.js：字典类型接口
- login.js：登录相关接口
- logistics.js：物流接口
- menu.js：菜单接口
- order.js：订单接口
- product.js：商品接口
- productParam.js：商品参数接口
- roleMenu.js：角色菜单接口
- roles.js：角色接口

#### src/components/
公共组件：
- Breadcrumb：面包屑组件
- Pagination：分页组件
- SvgIcon：SVG图标组件
- TabsPage：标签页组件
- Upload：文件上传组件

#### src/views/
页面组件，按功能模块划分：
- account/：用户账户管理
- auth/：权限管理（菜单、角色）
- dictionary/：字典管理（类型、数据）
- home/：首页
- login/：登录页
- order/：订单管理
- product/：商品管理（分类、参数、商品）

## 功能模块

### 1. 用户管理
- 用户信息管理
- 密码修改
- 头像上传
- 角色分配
- 登录日志

### 2. 权限管理
- 菜单管理（树形结构）
- 角色管理
- 角色菜单分配

### 3. 商品管理
- 商品分类（树形结构）
- 商品分类参数
- 商品信息管理
- 商品参数管理

### 4. 订单管理
- 订单列表
- 订单详情
- 订单状态跟踪

### 5. 字典管理
- 字典类型管理
- 字典数据管理

### 6. 首页
- 数据统计
- 图表展示

## 开发环境

- Node.js 18.16.0+
- npm 9.5.1+

## 安装和运行

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
npm run dev
```
项目将在 http://localhost:8080 启动

### 构建生产版本
```bash
npm run build
```
构建产物将输出到 `dist/` 目录

### 构建并查看打包分析
```bash
npm run build --report
```

## 开发规范

### 代码规范
- 使用ES6+语法
- 遵循Vue.js官方风格指南
- 组件命名使用大驼峰命名法
- 文件命名使用小写字母加连字符

### 接口规范
- API接口统一在 `src/api/` 目录下管理
- 使用Axios进行HTTP请求
- 接口返回数据格式统一处理

### 提交规范
- 提交信息清晰明了
- 遵循Angular提交规范

## 注意事项

1. 确保Node.js版本符合要求
2. 安装依赖时可能需要使用淘宝镜像：`npm install --registry=https://registry.npm.taobao.org`
3. 开发前请先了解项目的权限控制逻辑
4. 新增页面时需要在路由配置中添加对应路由
5. 新增API接口时需要在对应模块的API文件中定义

## 许可证
MIT
