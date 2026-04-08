# Memory English v4

这一版重点不是继续堆页面，而是把下面四件事先落到代码里：

- 完整测评框架
- 问题标签与资源映射规则
- 多用户数据模型
- 学习产品方向的首版前后端结构

## 本版已实现

### 前端
- 目标输入页：不预设目标，只提供推荐写法
- 半自适应测评页：词汇 / 听力 / 阅读中档试探后分流，写作与口语按支架强度分层
- 结果页：输出分数、问题标签、资源建议、阶段计划
- 访客用户本地保存 user_id，用于多用户隔离演示

### 后端
- 访客用户创建接口
- 用户独立 dashboard 接口
- bootstrap 接口：提交目标 + 测评，生成首版画像与计划
- study session 接口：预留学习表现回写
- framework 接口：返回测评、资源映射、多用户数据模型说明

## 项目结构

- `frontend/` React + Vite
- `backend/` Express
- `ASSESSMENT_FRAMEWORK.md`
- `RESOURCE_MAPPING.md`
- `DATA_MODEL.md`

## 本地运行

### backend
```bash
cd backend
npm install
npm run dev
```

### frontend
```bash
cd frontend
npm install
npm run dev
```

## Render

仓库已保留 `render.yaml`，可按前端一个 Web Service、后端一个 Web Service 部署。
