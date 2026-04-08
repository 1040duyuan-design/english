export const assessmentFramework = {
  productPositioning: '学习产品',
  outputStructure: ['分数', '问题标签', '资源建议'],
  layers: [
    {
      key: 'knowledge',
      name: '知识层',
      description: '测用户认不认识、看不看得懂、是否掌握基础规则。'
    },
    {
      key: 'application',
      name: '应用层',
      description: '测用户能否把知道的内容放到场景里使用。'
    },
    {
      key: 'reaction',
      name: '反应层',
      description: '测用户是否能在有限时间下快速理解并做出回应。'
    }
  ],
  adaptationRule: {
    mode: '半自适应',
    summary: '先用中等题试探，再根据表现向上或向下分流。',
    branches: [
      '知识层正确率高：进入更真实或更复杂的应用题。',
      '知识层错误较多：切换到基础支撑题，降低挫败感。',
      '输出任务完成度低：先推荐句型支架和半开放任务。'
    ]
  },
  skills: [
    {
      key: 'listening',
      name: '听力',
      checks: ['辨音与熟词识别', '句子理解', '场景关键信息抓取']
    },
    {
      key: 'speaking',
      name: '口语',
      checks: ['朗读准确度', '自由表达', '反应速度与自然度']
    },
    {
      key: 'reading',
      name: '阅读',
      checks: ['词句理解', '信息提取', '真实文本处理']
    },
    {
      key: 'writing',
      name: '写作',
      checks: ['语法与句式基础', '场景写作', '在限制下快速输出']
    }
  ]
};

export const problemTagDictionary = [
  {
    code: 'VOCAB_GAP',
    category: '能力短板',
    label: '词汇识别弱',
    trigger: '高频词识别错得多，读写输出依赖非常基础词。'
  },
  {
    code: 'LISTENING_INPUT_WEAK',
    category: '能力短板',
    label: '听力输入薄弱',
    trigger: '听力分显著低于阅读，或场景信息抓取差。'
  },
  {
    code: 'PRONUNCIATION_NATURALNESS_LOW',
    category: '表现特征',
    label: '发音自然度偏弱',
    trigger: '朗读能完成，但重音、节奏、语调自然度偏弱。'
  },
  {
    code: 'READING_STRONGER_THAN_OUTPUT',
    category: '表现特征',
    label: '阅读强于输出',
    trigger: '阅读明显高于口语或写作。'
  },
  {
    code: 'SPEAKING_RESPONSE_SLOW',
    category: '学习风险',
    label: '开口反应慢',
    trigger: '自由表达过短、依赖中文组织、反应层完成度低。'
  },
  {
    code: 'SCENE_LIFE_WEAK',
    category: '场景适配',
    label: '生活场景基础薄弱',
    trigger: '生活场景题表现低，且目标场景包含生活。'
  },
  {
    code: 'SCENE_WORK_WEAK',
    category: '场景适配',
    label: '工作沟通表达不足',
    trigger: '工作场景题表现低，且目标场景包含工作。'
  }
];

export const resourceMappingPrinciples = {
  formula: '技能 × 问题类型 × 目标场景',
  notes: [
    '同样都是口语弱，词汇不足、发音不自然、反应慢，对应资源不能相同。',
    '资源不只分难度，还要分训练方式。',
    '系统先给第一周计划，再结合学习表现和阶段复测做二次校准。'
  ],
  difficultyBands: [
    { key: 'support', name: '基础支撑版', focus: '高频词、句型骨架、慢速输入、强引导' },
    { key: 'bridge', name: '过渡训练版', focus: '标准场景材料、半开放输出、正常语速输入' },
    { key: 'challenge', name: '挑战提升版', focus: '更真实的材料、更少支架、更强调快速反应' }
  ]
};

export const multiUserDataModel = {
  entities: [
    { name: 'user', purpose: '用户身份与权限', coreFields: ['id', 'displayName', 'role', 'authMode'] },
    { name: 'profile', purpose: '用户当前学习画像', coreFields: ['goal', 'currentStage', 'scores', 'tags'] },
    { name: 'assessment', purpose: '保留每次测评记录', coreFields: ['type', 'scores', 'tags', 'submittedAt'] },
    { name: 'study_plan', purpose: '阶段与每日学习计划', coreFields: ['stagePlan', 'dailyMinutes', 'resourceStrategy'] },
    { name: 'study_session', purpose: '学习表现与二次校准', coreFields: ['completionRate', 'skippedTasks', 'feedback'] },
    { name: 'resource_assignment', purpose: '每位用户拿到的资源版本', coreFields: ['skill', 'difficulty', 'scene', 'trainingMode'] }
  ],
  permissionReminder: '第一版即按 user_id 隔离数据，后续可继续扩展 admin / coach 等角色。'
};
