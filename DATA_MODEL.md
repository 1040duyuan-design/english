# 多用户数据模型（v4）

## 设计目标

从第一版开始按 user_id 隔离数据，避免后续再推翻重构。

## 核心对象

### user
用户身份与权限。

核心字段：
- id
- displayName
- role
- authMode
- createdAt
- lastActiveAt

### profile
用户当前学习画像。

核心字段：
- goal
- currentStage
- scores
- tags
- resourceStrategy

### assessment
每次测评记录。

核心字段：
- id
- type
- scores
- tags
- raw
- submittedAt

### study_plan
阶段计划与每日路径。

### study_session
学习表现与二次校准信号。

### resource_assignment
每个用户当前拿到的资源版本。

## 权限预留

当前默认角色：
- learner

建议后续继续扩展：
- admin
- coach
