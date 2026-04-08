const DEFAULT_DAILY_MINUTES = 35;

const concernMap = {
  speaking: ['口语差', '开口难', '不敢说', '哑巴英语'],
  listening: ['听力不好', '听不懂', '跟不上语速'],
  vocabulary: ['词汇量少', '词少'],
  pronunciation: ['中式口音重', '发音不自然', '发音差'],
  mixed: ['各个方面都弱', '基础混乱', '都不好']
};

const sceneCatalog = {
  life: {
    name: '生活英语',
    themes: ['购物', '点餐', '租房', '出行', '问路', '医院与预约']
  },
  work: {
    name: '工作英语',
    themes: ['自我介绍', '开会表达', '问题排查', '邮件沟通', '客户支持', '任务同步']
  },
  social: {
    name: '社交表达',
    themes: ['寒暄', '表达意见', '请求帮助', '聚会交流', '建立关系', '礼貌回应']
  },
  general: {
    name: '综合提升',
    themes: ['高频日常表达', '听说反应', '阅读理解', '基础写作', '语音语调', '词汇扩展']
  }
};

const themeResourceCatalog = {
  '购物': {
    goal: '在超市询问商品位置、比较价格并顺利结账。',
    vocab: [
      { word: 'aisle', meaning: '货架通道', example: 'Which aisle is the milk in?' },
      { word: 'discount', meaning: '折扣', example: 'Is this item on discount today?' },
      { word: 'receipt', meaning: '小票', example: 'Could I have the receipt, please?' },
      { word: 'cashier', meaning: '收银员', example: 'The cashier is over there.' },
      { word: 'bag', meaning: '袋子', example: 'Do you need a bag?' },
      { word: 'fresh', meaning: '新鲜的', example: 'These vegetables look fresh.' }
    ],
    dialogue: [
      ['Customer', 'Excuse me, where can I find the eggs?'],
      ['Staff', 'They are in aisle five, next to the milk.'],
      ['Customer', 'Great, and are these apples on sale?'],
      ['Staff', 'Yes, they are two dollars cheaper today.'],
      ['Customer', 'Thanks. I will take a bag of them.'],
      ['Staff', 'No problem. You can pay at the front counter.']
    ],
    listening: {
      script: 'Hi, welcome. The bread is on the left, the milk is in aisle three, and apples are on special today for four dollars a bag.',
      questions: [
        {
          question: 'Where is the milk?',
          options: ['At the front counter', 'In aisle three', 'Near the bread on the left'],
          answer: 'In aisle three'
        },
        {
          question: 'What is on special today?',
          options: ['Bread', 'Apples', 'Milk'],
          answer: 'Apples'
        }
      ]
    },
    reading: {
      title: 'Store Notice',
      passage: 'Fresh Mart will close at 9:30 p.m. today. Customers who spend over 30 dollars can get a free reusable bag at the cashier. The fruit section is now beside the bakery.',
      questions: [
        {
          question: 'What can customers get for free?',
          options: ['A loaf of bread', 'A reusable bag', 'A fruit box'],
          answer: 'A reusable bag'
        },
        {
          question: 'Where is the fruit section now?',
          options: ['Beside the bakery', 'Near the exit', 'Behind the cashier'],
          answer: 'Beside the bakery'
        }
      ]
    },
    writing: {
      prompt: '给室友发一条英文消息，告诉他你买了什么、花了多少钱，还缺什么没买。',
      frame: ['I bought ...', 'It cost ...', 'I still need to get ...'],
      sample: 'I bought milk, eggs, and some apples. It cost 18 dollars in total. I still need to get bread tomorrow.'
    },
    pronunciation: ['aisle', 'receipt', 'today', 'Could I have the receipt, please?']
  },
  '点餐': {
    goal: '在咖啡店或餐厅点餐，并听懂店员的追问。',
    vocab: [
      { word: 'menu', meaning: '菜单', example: 'Could I see the menu?' },
      { word: 'recommend', meaning: '推荐', example: 'What do you recommend?' },
      { word: 'regular', meaning: '常规份量', example: 'A regular size is fine.' },
      { word: 'takeaway', meaning: '打包带走', example: 'Is this for here or takeaway?' },
      { word: 'extra', meaning: '额外的', example: 'Can I get extra ice?' },
      { word: 'bill', meaning: '账单', example: 'Could we have the bill, please?' }
    ],
    dialogue: [
      ['Customer', 'Hi, could I get a chicken sandwich and a latte?'],
      ['Staff', 'Sure. What size would you like for the latte?'],
      ['Customer', 'A regular, please, and can I have less sugar?'],
      ['Staff', 'Of course. Is this for here or takeaway?'],
      ['Customer', 'Takeaway, please.'],
      ['Staff', 'Great. Your total is twelve dollars.']
    ],
    listening: {
      script: 'Hello. Today we have a lunch special: pasta with a small salad for ten dollars. Drinks are not included, but coffee is half price after two o clock.',
      questions: [
        {
          question: 'What is included in the lunch special?',
          options: ['Pasta and coffee', 'Pasta and a salad', 'Pasta and soup'],
          answer: 'Pasta and a salad'
        },
        {
          question: 'When is coffee half price?',
          options: ['Before lunch', 'After two o clock', 'All day'],
          answer: 'After two o clock'
        }
      ]
    },
    reading: {
      title: 'Cafe Menu Note',
      passage: 'Customers can swap fries for salad for an extra two dollars. Soy milk is available for drinks. Orders over 25 dollars receive a free cookie.',
      questions: [
        {
          question: 'How much extra is the salad swap?',
          options: ['One dollar', 'Two dollars', 'Three dollars'],
          answer: 'Two dollars'
        },
        {
          question: 'When do customers get a free cookie?',
          options: ['When they order coffee', 'When they spend over 25 dollars', 'When they choose soy milk'],
          answer: 'When they spend over 25 dollars'
        }
      ]
    },
    writing: {
      prompt: '写一句英文点餐备注，说明你想要什么、不要什么、是否打包。',
      frame: ['I would like ...', 'Please do not add ...', 'It is for takeaway.'],
      sample: 'I would like one beef burger and a small coffee. Please do not add onions. It is for takeaway.'
    },
    pronunciation: ['regular', 'takeaway', 'less sugar', 'Could I get a latte?']
  },
  '租房': {
    goal: '看房时询问价格、设施和入住时间。',
    vocab: [
      { word: 'deposit', meaning: '押金', example: 'How much is the deposit?' },
      { word: 'furnished', meaning: '带家具的', example: 'Is the room furnished?' },
      { word: 'utilities', meaning: '水电网等杂费', example: 'Are utilities included?' },
      { word: 'lease', meaning: '租约', example: 'How long is the lease?' },
      { word: 'available', meaning: '可入住的', example: 'When will it be available?' },
      { word: 'inspection', meaning: '看房', example: 'Can I book an inspection?' }
    ],
    dialogue: [
      ['Tenant', 'Hi, I am calling about the room on King Street.'],
      ['Agent', 'Sure. It is available from next Monday.'],
      ['Tenant', 'Great. Are utilities included in the rent?'],
      ['Agent', 'Water is included, but electricity is separate.'],
      ['Tenant', 'Is the room furnished?'],
      ['Agent', 'Yes, it comes with a bed and a desk.']
    ],
    listening: {
      script: 'The apartment is close to the station and costs four hundred dollars a week. The bond is two weeks rent, and internet is included, but electricity is not.',
      questions: [
        {
          question: 'How much is the apartment each week?',
          options: ['Two hundred dollars', 'Four hundred dollars', 'Six hundred dollars'],
          answer: 'Four hundred dollars'
        },
        {
          question: 'What is included?',
          options: ['Electricity', 'Internet', 'Parking'],
          answer: 'Internet'
        }
      ]
    },
    reading: {
      title: 'Rental Listing',
      passage: 'Sunny room in a shared apartment. Five minutes from the station. Rent is 380 dollars per week. Bills are split monthly. Available from 18 May. No pets allowed.',
      questions: [
        {
          question: 'How are the bills paid?',
          options: ['Included in rent', 'Paid monthly and shared', 'Paid every week'],
          answer: 'Paid monthly and shared'
        },
        {
          question: 'Are pets allowed?',
          options: ['Yes', 'No', 'Only cats'],
          answer: 'No'
        }
      ]
    },
    writing: {
      prompt: '给房东写一条简短英文消息，表达你想预约看房，并询问水电是否包含。',
      frame: ['I am interested in ...', 'Could I arrange ...?', 'Are bills included?'],
      sample: 'I am interested in the room on King Street. Could I arrange an inspection this weekend? Also, are the bills included in the rent?'
    },
    pronunciation: ['deposit', 'utilities', 'available', 'Are utilities included?']
  },
  '出行': {
    goal: '买票、问路线、确认时间和站点。',
    vocab: [
      { word: 'platform', meaning: '站台', example: 'Which platform does the train leave from?' },
      { word: 'single', meaning: '单程票', example: 'A single ticket, please.' },
      { word: 'return', meaning: '往返票', example: 'Do you need a single or return ticket?' },
      { word: 'delay', meaning: '延误', example: 'The train is delayed by ten minutes.' },
      { word: 'transfer', meaning: '换乘', example: 'You need to transfer at Central.' },
      { word: 'stop', meaning: '站点', example: 'How many stops are there?' }
    ],
    dialogue: [
      ['Passenger', 'Excuse me, does this bus go to the city center?'],
      ['Driver', 'Yes, but you need to get off at Queen Street.'],
      ['Passenger', 'How long does it take?'],
      ['Driver', 'About twenty minutes if the traffic is light.'],
      ['Passenger', 'Thank you. I will pay by card.'],
      ['Driver', 'That is fine.']
    ],
    listening: {
      script: 'Attention please. The 6:15 train to North Point will depart from platform four instead of platform two. Please allow extra time for boarding.',
      questions: [
        {
          question: 'What time is the train?',
          options: ['6:05', '6:15', '6:45'],
          answer: '6:15'
        },
        {
          question: 'Which platform should passengers go to?',
          options: ['Platform two', 'Platform three', 'Platform four'],
          answer: 'Platform four'
        }
      ]
    },
    reading: {
      title: 'Bus Notice',
      passage: 'Route 18 will not stop at River Road this weekend because of roadworks. Passengers should use the temporary stop outside the library.',
      questions: [
        {
          question: 'Why is the stop changed?',
          options: ['Because of roadworks', 'Because of rain', 'Because of a holiday'],
          answer: 'Because of roadworks'
        },
        {
          question: 'Where is the temporary stop?',
          options: ['Outside the station', 'Outside the library', 'Near the hospital'],
          answer: 'Outside the library'
        }
      ]
    },
    writing: {
      prompt: '写一条英文消息给朋友，说明你会晚到，因为你坐的车延误了。',
      frame: ['I might be late because ...', 'The bus/train is delayed by ...', 'I should arrive at ...'],
      sample: 'I might be late because my train is delayed by fifteen minutes. I should arrive around 7:20.'
    },
    pronunciation: ['platform', 'return ticket', 'delayed', 'Which platform does it leave from?']
  },
  '问路': {
    goal: '主动问路、确认方向和步行时间。',
    vocab: [
      { word: 'intersection', meaning: '十字路口', example: 'Turn left at the intersection.' },
      { word: 'straight', meaning: '直走', example: 'Go straight for two blocks.' },
      { word: 'opposite', meaning: '在对面', example: 'The bank is opposite the post office.' },
      { word: 'corner', meaning: '拐角', example: 'There is a cafe on the corner.' },
      { word: 'block', meaning: '街区', example: 'It is only one block away.' },
      { word: 'nearby', meaning: '附近', example: 'Is there a pharmacy nearby?' }
    ],
    dialogue: [
      ['Visitor', 'Excuse me, could you tell me how to get to the museum?'],
      ['Local', 'Sure. Go straight for two blocks and turn right at the traffic lights.'],
      ['Visitor', 'Is it far from here?'],
      ['Local', 'No, it is about a five minute walk.'],
      ['Visitor', 'Thanks a lot.'],
      ['Local', 'You are welcome.']
    ],
    listening: {
      script: 'Walk straight past the post office, then turn left at the second corner. The clinic will be on your right, next to a small cafe.',
      questions: [
        {
          question: 'Where should you turn?',
          options: ['At the first corner', 'At the second corner', 'At the traffic lights'],
          answer: 'At the second corner'
        },
        {
          question: 'What is next to the clinic?',
          options: ['A bank', 'A station', 'A small cafe'],
          answer: 'A small cafe'
        }
      ]
    },
    reading: {
      title: 'Campus Map Tip',
      passage: 'The language center is behind the library and across from the sports hall. Visitors should enter through the east gate after 6 p.m.',
      questions: [
        {
          question: 'Where is the language center?',
          options: ['Behind the library', 'Beside the east gate', 'Inside the sports hall'],
          answer: 'Behind the library'
        },
        {
          question: 'Which gate should visitors use after 6 p.m.?',
          options: ['North gate', 'South gate', 'East gate'],
          answer: 'East gate'
        }
      ]
    },
    writing: {
      prompt: '给新来的朋友写一条简单路线说明，告诉他怎么从地铁站走到你家。',
      frame: ['Go straight ...', 'Turn left/right ...', 'You will see ...'],
      sample: 'Go straight from the station for about three minutes. Turn left at the first traffic light, and you will see my building next to the pharmacy.'
    },
    pronunciation: ['straight', 'intersection', 'traffic lights', 'Could you tell me how to get to ...?']
  },
  '医院与预约': {
    goal: '预约时间、描述症状并确认就诊安排。',
    vocab: [
      { word: 'appointment', meaning: '预约', example: 'I would like to make an appointment.' },
      { word: 'symptom', meaning: '症状', example: 'My symptoms started yesterday.' },
      { word: 'fever', meaning: '发烧', example: 'I have a slight fever.' },
      { word: 'insurance', meaning: '保险', example: 'Do you accept this insurance?' },
      { word: 'available', meaning: '有空的', example: 'Is the doctor available this afternoon?' },
      { word: 'prescription', meaning: '处方', example: 'Do I need a prescription?' }
    ],
    dialogue: [
      ['Patient', 'Hi, I would like to make an appointment with a doctor.'],
      ['Receptionist', 'Sure. What seems to be the problem?'],
      ['Patient', 'I have had a sore throat and a fever since last night.'],
      ['Receptionist', 'We have an opening at three thirty.'],
      ['Patient', 'That works for me. Thank you.'],
      ['Receptionist', 'Please bring your ID and insurance card.']
    ],
    listening: {
      script: 'Your appointment is confirmed for Thursday at 10:20 a.m. Please arrive ten minutes early and bring any current medication with you.',
      questions: [
        {
          question: 'When is the appointment?',
          options: ['Thursday at 10:20 a.m.', 'Friday at 10:20 a.m.', 'Thursday at 11:20 a.m.'],
          answer: 'Thursday at 10:20 a.m.'
        },
        {
          question: 'What should the patient bring?',
          options: ['A water bottle', 'Current medication', 'A family member'],
          answer: 'Current medication'
        }
      ]
    },
    reading: {
      title: 'Clinic Instructions',
      passage: 'Patients who arrive more than 15 minutes late may need to book a new appointment. Masks are recommended if you have cough or fever symptoms.',
      questions: [
        {
          question: 'What may happen if a patient is more than 15 minutes late?',
          options: ['They will pay more', 'They may need to rebook', 'They must wait outside'],
          answer: 'They may need to rebook'
        },
        {
          question: 'When are masks recommended?',
          options: ['At all times', 'Only after payment', 'If you have cough or fever symptoms'],
          answer: 'If you have cough or fever symptoms'
        }
      ]
    },
    writing: {
      prompt: '写一条英文预约消息，说明你想看医生、主要症状是什么、希望什么时间去。',
      frame: ['I would like to book ...', 'I have been experiencing ...', 'Is ... available?'],
      sample: 'I would like to book a doctor appointment. I have been experiencing a sore throat and fever since yesterday. Is tomorrow morning available?'
    },
    pronunciation: ['appointment', 'symptoms', 'available', 'I would like to make an appointment.']
  },
  '自我介绍': {
    goal: '用自然清晰的方式做简短自我介绍。',
    vocab: [
      { word: 'background', meaning: '背景', example: 'I come from a data analysis background.' },
      { word: 'currently', meaning: '目前', example: 'I am currently working in operations support.' },
      { word: 'experience', meaning: '经验', example: 'I have three years of experience.' },
      { word: 'strength', meaning: '优势', example: 'My strength is structured problem solving.' },
      { word: 'goal', meaning: '目标', example: 'My goal is to work in an English speaking environment.' },
      { word: 'improve', meaning: '提升', example: 'I want to improve my spoken English.' }
    ],
    dialogue: [
      ['Speaker', 'Hi, my name is Lin. I work in data operations and analytics.'],
      ['Listener', 'Nice to meet you. What are you working on now?'],
      ['Speaker', 'I am preparing to move into a customer support and automation role.'],
      ['Listener', 'That sounds interesting. What are your main strengths?'],
      ['Speaker', 'I am good at problem solving and cross team communication.'],
      ['Listener', 'Thanks for sharing.']
    ],
    listening: {
      script: 'Hello, I am Amy. I have worked in online customer support for four years, and recently I started leading process improvement projects for my team.',
      questions: [
        {
          question: 'How long has Amy worked in customer support?',
          options: ['Two years', 'Three years', 'Four years'],
          answer: 'Four years'
        },
        {
          question: 'What did she recently start doing?',
          options: ['Learning design', 'Leading process improvement projects', 'Working part time'],
          answer: 'Leading process improvement projects'
        }
      ]
    },
    reading: {
      title: 'LinkedIn Summary',
      passage: 'I am an operations analyst with experience in reporting, process design, and cross functional collaboration. I enjoy turning messy problems into clear action plans.',
      questions: [
        {
          question: 'What does the writer enjoy?',
          options: ['Designing logos', 'Turning messy problems into clear action plans', 'Working alone'],
          answer: 'Turning messy problems into clear action plans'
        },
        {
          question: 'Which area is NOT mentioned?',
          options: ['Reporting', 'Cross functional collaboration', 'Accounting'],
          answer: 'Accounting'
        }
      ]
    },
    writing: {
      prompt: '写一个 3 句英文自我介绍，包含你现在做什么、优势是什么、未来目标是什么。',
      frame: ['I currently ...', 'My strength is ...', 'I am working toward ...'],
      sample: 'I currently work in data analysis for an online business. My strength is breaking problems into clear steps. I am working toward a support role in an English speaking environment.'
    },
    pronunciation: ['currently', 'experience', 'strength', 'I am currently working in ...']
  },
  '开会表达': {
    goal: '在会议中表达观点、确认任务和礼貌打断。',
    vocab: [
      { word: 'agenda', meaning: '议程', example: 'Can we go back to the agenda?' },
      { word: 'update', meaning: '进展更新', example: 'Let me give a quick update.' },
      { word: 'priority', meaning: '优先级', example: 'This should be our top priority.' },
      { word: 'clarify', meaning: '澄清', example: 'Could you clarify that point?' },
      { word: 'deadline', meaning: '截止时间', example: 'What is the deadline for this task?' },
      { word: 'action item', meaning: '待办事项', example: 'Let us confirm the action items.' }
    ],
    dialogue: [
      ['Manager', 'Before we finish, let us confirm the action items.'],
      ['Member', 'I will update the training document by Friday.'],
      ['Manager', 'Great. Could you also share the latest numbers?'],
      ['Member', 'Yes, I will send them after this meeting.'],
      ['Manager', 'Perfect. Any questions before we wrap up?'],
      ['Member', 'Just one question about the deadline.']
    ],
    listening: {
      script: 'Here is a quick update. The product draft is ready, but the testing plan still needs input from the support team. We will review both items again on Thursday morning.',
      questions: [
        {
          question: 'What is already ready?',
          options: ['The testing plan', 'The product draft', 'The support notes'],
          answer: 'The product draft'
        },
        {
          question: 'When will they review the items again?',
          options: ['Thursday morning', 'Thursday afternoon', 'Friday morning'],
          answer: 'Thursday morning'
        }
      ]
    },
    reading: {
      title: 'Meeting Summary',
      passage: 'The team agreed to launch the pilot next week if the support scripts are approved by Wednesday. Alex will own the dashboard, and Mia will coordinate training.',
      questions: [
        {
          question: 'What must happen by Wednesday?',
          options: ['The launch must finish', 'The support scripts must be approved', 'The dashboard must be shared'],
          answer: 'The support scripts must be approved'
        },
        {
          question: 'Who will coordinate training?',
          options: ['Alex', 'Mia', 'The support team'],
          answer: 'Mia'
        }
      ]
    },
    writing: {
      prompt: '写 2 句英文会议跟进：一句说明你负责什么，一句说明你会在什么时候完成。',
      frame: ['I will take care of ...', 'I will finish it by ...'],
      sample: 'I will take care of the updated support script. I will finish it by Thursday afternoon.'
    },
    pronunciation: ['agenda', 'clarify', 'deadline', 'Could you clarify that point?']
  },
  '问题排查': {
    goal: '描述问题、说明影响并提出下一步。',
    vocab: [
      { word: 'issue', meaning: '问题', example: 'We found an issue in the latest build.' },
      { word: 'error', meaning: '错误', example: 'The user saw an error message.' },
      { word: 'reproduce', meaning: '复现', example: 'I can reproduce the bug on my laptop.' },
      { word: 'impact', meaning: '影响', example: 'The impact is limited to new users.' },
      { word: 'temporary', meaning: '临时的', example: 'We have a temporary workaround.' },
      { word: 'fix', meaning: '修复', example: 'The team is working on a fix now.' }
    ],
    dialogue: [
      ['Support', 'We found an issue affecting new accounts after sign up.'],
      ['Engineer', 'Can you reproduce it consistently?'],
      ['Support', 'Yes. It happens when the user submits the form twice.'],
      ['Engineer', 'Understood. What is the user impact?'],
      ['Support', 'They cannot move to the next step.'],
      ['Engineer', 'We will work on a fix and share an update soon.']
    ],
    listening: {
      script: 'The issue only affects users on mobile, and the team has already identified a temporary workaround. A full fix should be ready by tomorrow morning.',
      questions: [
        {
          question: 'Which users are affected?',
          options: ['Desktop users', 'Mobile users', 'All users'],
          answer: 'Mobile users'
        },
        {
          question: 'When should the full fix be ready?',
          options: ['Tonight', 'Tomorrow morning', 'Next week'],
          answer: 'Tomorrow morning'
        }
      ]
    },
    reading: {
      title: 'Support Update',
      passage: 'The team confirmed that the payment delay was caused by a third party service timeout. Users can refresh the page and try again while the provider is restoring service.',
      questions: [
        {
          question: 'What caused the delay?',
          options: ['A missing password', 'A timeout from a third party service', 'A local hardware issue'],
          answer: 'A timeout from a third party service'
        },
        {
          question: 'What can users do for now?',
          options: ['Refresh and try again', 'Delete the app', 'Call the bank'],
          answer: 'Refresh and try again'
        }
      ]
    },
    writing: {
      prompt: '写 2 句英文问题同步：一句说明问题，一句说明下一步动作。',
      frame: ['We found an issue ...', 'The next step is ...'],
      sample: 'We found an issue affecting new users on mobile. The next step is to apply the temporary workaround and verify the full fix tomorrow morning.'
    },
    pronunciation: ['issue', 'reproduce', 'temporary', 'We found an issue affecting ...']
  },
  '邮件沟通': {
    goal: '写清楚请求、背景和下一步。',
    vocab: [
      { word: 'follow up', meaning: '跟进', example: 'I am writing to follow up on ...' },
      { word: 'confirm', meaning: '确认', example: 'Could you confirm the timeline?' },
      { word: 'attach', meaning: '附上', example: 'I have attached the file below.' },
      { word: 'available', meaning: '可用的', example: 'Are you available this afternoon?' },
      { word: 'appreciate', meaning: '感激', example: 'I would appreciate your help.' },
      { word: 'regards', meaning: '问候语', example: 'Best regards,' }
    ],
    dialogue: [
      ['Colleague', 'Can you send the updated version by today?'],
      ['You', 'Yes. I will attach the latest file in my email this afternoon.'],
      ['Colleague', 'Thanks. Could you also confirm the timeline?'],
      ['You', 'Sure. I will include that in the same email.'],
      ['Colleague', 'Perfect.'],
      ['You', 'No problem.']
    ],
    listening: {
      script: 'Please send the revised draft by 3 p.m. and include the latest numbers in the attachment. If anything changes, let me know before lunch.',
      questions: [
        {
          question: 'What time should the revised draft be sent?',
          options: ['Before lunch', 'By 3 p.m.', 'By 5 p.m.'],
          answer: 'By 3 p.m.'
        },
        {
          question: 'What should be included?',
          options: ['The meeting link', 'The latest numbers', 'A new logo'],
          answer: 'The latest numbers'
        }
      ]
    },
    reading: {
      title: 'Email Example',
      passage: 'Hi team, I am following up on yesterday’s discussion. Please review the attached draft and share any comments by Thursday noon so we can finalize it in time.',
      questions: [
        {
          question: 'Why is the email sent?',
          options: ['To invite the team to lunch', 'To follow up on yesterday’s discussion', 'To cancel the draft'],
          answer: 'To follow up on yesterday’s discussion'
        },
        {
          question: 'When are comments needed?',
          options: ['By Thursday noon', 'By Friday noon', 'By tomorrow morning'],
          answer: 'By Thursday noon'
        }
      ]
    },
    writing: {
      prompt: '写一封 3 句英文简短邮件：跟进一件事、说明已附上文件、请对方在某个时间前回复。',
      frame: ['I am writing to follow up on ...', 'I have attached ...', 'Please let me know by ...'],
      sample: 'I am writing to follow up on the training update. I have attached the latest draft for your review. Please let me know your feedback by Thursday noon.'
    },
    pronunciation: ['follow up', 'attached', 'appreciate', 'I am writing to follow up on ...']
  },
  '客户支持': {
    goal: '礼貌回应用户问题，并给出清楚的下一步。',
    vocab: [
      { word: 'account', meaning: '账号', example: 'I can check your account for you.' },
      { word: 'verify', meaning: '验证', example: 'We need to verify your details first.' },
      { word: 'refund', meaning: '退款', example: 'I understand you are asking for a refund.' },
      { word: 'resolve', meaning: '解决', example: 'We will do our best to resolve this quickly.' },
      { word: 'delay', meaning: '延迟', example: 'I am sorry for the delay.' },
      { word: 'update', meaning: '更新', example: 'I will send you an update soon.' }
    ],
    dialogue: [
      ['Customer', 'Hi, I still have not received my order.'],
      ['Support', 'I am sorry about the delay. Let me check your order details.'],
      ['Customer', 'Thank you. I placed it three days ago.'],
      ['Support', 'I can see it is delayed in transit.'],
      ['Customer', 'What should I do now?'],
      ['Support', 'I will send you an update within two hours.']
    ],
    listening: {
      script: 'I understand your concern. We have escalated the case to our payments team, and you should receive an update by the end of today.',
      questions: [
        {
          question: 'Which team is handling the case now?',
          options: ['The design team', 'The payments team', 'The shipping team'],
          answer: 'The payments team'
        },
        {
          question: 'When should the customer receive an update?',
          options: ['By the end of today', 'Tomorrow morning', 'Next week'],
          answer: 'By the end of today'
        }
      ]
    },
    reading: {
      title: 'Support Policy',
      passage: 'Refund requests are usually reviewed within three business days. Customers should provide the order number and a short description of the issue.',
      questions: [
        {
          question: 'How long do refund reviews usually take?',
          options: ['One business day', 'Three business days', 'Seven business days'],
          answer: 'Three business days'
        },
        {
          question: 'What should customers provide?',
          options: ['Their bank card', 'The order number and a short description', 'A video call'],
          answer: 'The order number and a short description'
        }
      ]
    },
    writing: {
      prompt: '写 2 句英文客服回复：一句表示理解和抱歉，一句说明你会怎么处理。',
      frame: ['I am sorry for ...', 'I will ...'],
      sample: 'I am sorry for the delay with your order. I will check the case and send you an update by the end of today.'
    },
    pronunciation: ['verify', 'resolve', 'delay', 'I understand your concern.']
  },
  '任务同步': {
    goal: '同步进展、风险和下一步安排。',
    vocab: [
      { word: 'progress', meaning: '进展', example: 'Here is a quick progress update.' },
      { word: 'risk', meaning: '风险', example: 'The main risk is limited testing time.' },
      { word: 'pending', meaning: '待处理的', example: 'Two items are still pending.' },
      { word: 'align', meaning: '对齐', example: 'Let us align on the next step.' },
      { word: 'owner', meaning: '负责人', example: 'Who is the owner of this task?' },
      { word: 'timeline', meaning: '时间线', example: 'The timeline is still on track.' }
    ],
    dialogue: [
      ['Manager', 'Could you give us a quick update?'],
      ['You', 'Sure. The dashboard is ready, and the draft script is under review.'],
      ['Manager', 'Any risks we should know about?'],
      ['You', 'The main risk is delayed feedback from one team.'],
      ['Manager', 'What is the next step?'],
      ['You', 'We will align on the final version tomorrow morning.']
    ],
    listening: {
      script: 'The project is mostly on track. The dashboard has been completed, but the training guide is still pending final review from operations. We expect to close that by Friday.',
      questions: [
        {
          question: 'What has been completed?',
          options: ['The training guide', 'The dashboard', 'The operations review'],
          answer: 'The dashboard'
        },
        {
          question: 'What is still pending?',
          options: ['Final review of the training guide', 'A new budget', 'Customer interviews'],
          answer: 'Final review of the training guide'
        }
      ]
    },
    reading: {
      title: 'Status Note',
      passage: 'The launch timeline remains unchanged, but the team needs one more round of script review. If feedback arrives by Thursday, training can start on Monday.',
      questions: [
        {
          question: 'What does the team still need?',
          options: ['One more round of script review', 'A new launch date', 'Another dashboard'],
          answer: 'One more round of script review'
        },
        {
          question: 'When can training start if feedback arrives on time?',
          options: ['Friday', 'Monday', 'Tuesday'],
          answer: 'Monday'
        }
      ]
    },
    writing: {
      prompt: '写 3 句英文同步：一句说进展，一句说风险，一句说下一步。',
      frame: ['Progress: ...', 'Risk: ...', 'Next step: ...'],
      sample: 'Progress: the dashboard is complete. Risk: final review is still pending from one team. Next step: we will align on the final script tomorrow morning.'
    },
    pronunciation: ['progress', 'pending', 'timeline', 'The project is mostly on track.']
  },
  '寒暄': {
    goal: '自然开启对话、接话并礼貌回应。',
    vocab: [
      { word: 'busy', meaning: '忙的', example: 'Have you been busy lately?' },
      { word: 'weekend', meaning: '周末', example: 'How was your weekend?' },
      { word: 'actually', meaning: '其实', example: 'Actually, I stayed home and rested.' },
      { word: 'sounds good', meaning: '听起来不错', example: 'That sounds good.' },
      { word: 'catch up', meaning: '叙旧 / 了解近况', example: 'It is nice to catch up with you.' },
      { word: 'pretty', meaning: '相当', example: 'I am pretty tired today.' }
    ],
    dialogue: [
      ['A', 'Hi, how have you been lately?'],
      ['B', 'Pretty good, just a bit busy with work.'],
      ['A', 'Same here. Did you do anything fun over the weekend?'],
      ['B', 'Actually, I just stayed home and watched a movie.'],
      ['A', 'That sounds relaxing.'],
      ['B', 'Yes, I really needed it.']
    ],
    listening: {
      script: 'Hey, it is nice to see you again. Work has been quite busy, but I finally had a quiet weekend and caught up on some rest.',
      questions: [
        {
          question: 'How has work been?',
          options: ['Quite busy', 'Very easy', 'Not mentioned'],
          answer: 'Quite busy'
        },
        {
          question: 'What did the speaker do on the weekend?',
          options: ['Went on a trip', 'Caught up on rest', 'Worked overtime'],
          answer: 'Caught up on rest'
        }
      ]
    },
    reading: {
      title: 'Chat Message',
      passage: 'Hey! Long time no see. I hope everything is going well on your side. Let us grab coffee next week if you are free.',
      questions: [
        {
          question: 'What does the writer suggest?',
          options: ['A phone call', 'Coffee next week', 'A work meeting'],
          answer: 'Coffee next week'
        },
        {
          question: 'What tone does the message have?',
          options: ['Formal and cold', 'Friendly and casual', 'Angry and direct'],
          answer: 'Friendly and casual'
        }
      ]
    },
    writing: {
      prompt: '写 2 句英文寒暄：一句问近况，一句回应对方。',
      frame: ['How have you been ...?', 'That sounds ...'],
      sample: 'How have you been lately? That sounds like a busy week.'
    },
    pronunciation: ['pretty good', 'actually', 'How have you been lately?']
  },
  '高频日常表达': {
    goal: '掌握最常用的生活表达，让开口更快。',
    vocab: [
      { word: 'usually', meaning: '通常', example: 'I usually start work at nine.' },
      { word: 'need', meaning: '需要', example: 'I need some help with this.' },
      { word: 'should', meaning: '应该', example: 'You should try this app.' },
      { word: 'right now', meaning: '现在', example: 'I am busy right now.' },
      { word: 'later', meaning: '之后', example: 'Let us talk later.' },
      { word: 'sure', meaning: '当然', example: 'Sure, no problem.' }
    ],
    dialogue: [
      ['A', 'Do you have a minute right now?'],
      ['B', 'I am a bit busy right now, but I can help later.'],
      ['A', 'Sure, that works for me.'],
      ['B', 'Great. Just send me the details first.'],
      ['A', 'Will do. Thanks.'],
      ['B', 'No problem.']
    ],
    listening: {
      script: 'I usually finish work around six, so I can call you later tonight if that works for you.',
      questions: [
        {
          question: 'When does the speaker usually finish work?',
          options: ['Around five', 'Around six', 'Around seven'],
          answer: 'Around six'
        },
        {
          question: 'What does the speaker suggest?',
          options: ['Meeting in person', 'Calling later tonight', 'Sending an email'],
          answer: 'Calling later tonight'
        }
      ]
    },
    reading: {
      title: 'Quick Note',
      passage: 'If you need anything from the store, text me before 5 p.m. I am going there after work and can pick it up for you.',
      questions: [
        {
          question: 'What should the reader do before 5 p.m.?',
          options: ['Call the writer', 'Text what they need', 'Go to the store'],
          answer: 'Text what they need'
        },
        {
          question: 'When will the writer go to the store?',
          options: ['Before work', 'At lunch', 'After work'],
          answer: 'After work'
        }
      ]
    },
    writing: {
      prompt: '写两句最常用的英文日常表达：一句说你现在忙，一句说你之后可以做。',
      frame: ['I am ... right now.', 'I can ... later.'],
      sample: 'I am a bit busy right now. I can help you later tonight.'
    },
    pronunciation: ['usually', 'right now', 'Sure, no problem.']
  }
};

function hasConcern(input, keys) {
  const text = JSON.stringify(input || '');
  return keys.some((item) => text.includes(item));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function round(value) {
  return Math.round(value);
}

function detectProfile(form) {
  const tags = [];
  if (hasConcern(form.concerns, concernMap.speaking)) tags.push('哑巴英语倾向');
  if (hasConcern(form.concerns, concernMap.listening)) tags.push('听力输入薄弱');
  if (hasConcern(form.concerns, concernMap.vocabulary)) tags.push('词汇储备不足');
  if (hasConcern(form.concerns, concernMap.pronunciation)) tags.push('发音自然度偏弱');
  if (hasConcern(form.concerns, concernMap.mixed)) tags.push('基础能力不均衡');
  if (!tags.length) tags.push('综合提升型');
  return tags;
}

function deriveScores(form) {
  const baseLevel = form.currentLevel || '基础薄弱';
  let base = 44;
  if (baseLevel.includes('中级')) base = 58;
  if (baseLevel.includes('基础')) base = 42;
  if (baseLevel.includes('高中')) base = 48;
  if (baseLevel.includes('较好')) base = 64;

  let listening = base;
  let speaking = base;
  let reading = base + 8;
  let writing = base + 4;
  let pronunciation = base - 2;
  let vocabulary = base - 4;

  if (hasConcern(form.concerns, concernMap.listening)) listening -= 14;
  if (hasConcern(form.concerns, concernMap.speaking)) speaking -= 12;
  if (hasConcern(form.concerns, concernMap.pronunciation)) pronunciation -= 14;
  if (hasConcern(form.concerns, concernMap.vocabulary)) {
    vocabulary -= 16;
    listening -= 4;
    reading -= 4;
  }
  if (hasConcern(form.concerns, concernMap.mixed)) {
    listening -= 5;
    speaking -= 5;
    reading -= 6;
    writing -= 6;
    vocabulary -= 4;
  }

  const assessmentInput = form.assessmentInput || {};
  if (assessmentInput.vocabScore != null) {
    vocabulary = round(vocabulary * 0.45 + assessmentInput.vocabScore * 0.55);
  }
  if (assessmentInput.listeningScore != null) {
    listening = round(listening * 0.4 + assessmentInput.listeningScore * 0.6);
  }
  if (assessmentInput.readingScore != null) {
    reading = round(reading * 0.4 + assessmentInput.readingScore * 0.6);
  }
  if (assessmentInput.speakingScore != null) {
    speaking = round(speaking * 0.45 + assessmentInput.speakingScore * 0.55);
  }
  if (assessmentInput.pronunciationScore != null) {
    pronunciation = round(pronunciation * 0.35 + assessmentInput.pronunciationScore * 0.65);
  }
  if (assessmentInput.writingScore != null) {
    writing = round(writing * 0.4 + assessmentInput.writingScore * 0.6);
  }

  return {
    listening: clamp(listening),
    speaking: clamp(speaking),
    reading: clamp(reading),
    writing: clamp(writing),
    pronunciation: clamp(pronunciation),
    vocabulary: clamp(vocabulary)
  };
}

function getPrimaryTrack(form) {
  if (form.goalType && sceneCatalog[form.goalType]) return sceneCatalog[form.goalType];
  const goalText = `${form.goal || ''} ${form.goalDetail || ''}`;
  if (/工作|面试|support|客户|job/i.test(goalText)) return sceneCatalog.work;
  if (/生活|澳大利亚|澳洲|出国|移民|租房|超市/i.test(goalText)) return sceneCatalog.life;
  if (/社交|朋友|聊天/i.test(goalText)) return sceneCatalog.social;
  return sceneCatalog.general;
}

function buildStagePlan(form, scores, track) {
  const totalWeeks = Number(form.timelineWeeks) || 12;
  const stage1 = Math.max(2, Math.round(totalWeeks * 0.34));
  const stage2 = Math.max(2, Math.round(totalWeeks * 0.33));
  const stage3 = Math.max(2, totalWeeks - stage1 - stage2);

  const weakest = Object.entries(scores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([key]) => key);

  return [
    {
      id: 'stage-1',
      name: '打基础',
      weeks: stage1,
      focus: [
        '高频场景词汇',
        '可理解输入',
        weakest.includes('pronunciation') ? '重音与节奏' : '基础口语反应'
      ],
      outcome: `先把 ${track.name} 中最常见的表达听懂、读懂、说出来。`
    },
    {
      id: 'stage-2',
      name: '练场景',
      weeks: stage2,
      focus: [
        `${track.name} 核心场景`,
        weakest.includes('speaking') ? '开口速度与句型调用' : '听说联动',
        weakest.includes('listening') ? '正常语速理解' : '阅读与写作巩固'
      ],
      outcome: '把输入变成可复用表达，减少中文翻译依赖。'
    },
    {
      id: 'stage-3',
      name: '真应用',
      weeks: stage3,
      focus: ['真实材料迁移', '任务型表达', '按目标场景完成输出'],
      outcome: `围绕“${form.goal || '真实使用英语'}”做完整表达与反馈修正。`
    }
  ];
}

function getThemeKit(track, theme) {
  return themeResourceCatalog[theme] || {
    goal: `围绕“${track.name} / ${theme}”进行听说读写整合训练。`,
    vocab: [
      { word: 'context', meaning: '语境', example: `Learn the phrase in the ${theme} context.` },
      { word: 'response', meaning: '回应', example: 'Prepare a short response.' },
      { word: 'detail', meaning: '细节', example: 'Listen for the key detail.' },
      { word: 'confirm', meaning: '确认', example: 'Confirm the main point clearly.' }
    ],
    dialogue: [
      ['A', `Let us talk about ${theme} today.`],
      ['B', 'Sure. I want to understand the key phrases first.'],
      ['A', 'Great. Then we can move to listening and speaking practice.'],
      ['B', 'That sounds manageable.']
    ],
    listening: {
      script: `In today’s lesson, we focus on ${theme}. First listen for the key information, then say one clear sentence in response.`,
      questions: [
        {
          question: 'What is the lesson about?',
          options: [theme, 'Travel plans', 'A job interview'],
          answer: theme
        }
      ]
    },
    reading: {
      title: `${theme} Note`,
      passage: `This short passage is designed to help the learner notice common words and sentence patterns used in ${theme}.`,
      questions: [
        {
          question: 'What is the purpose of the passage?',
          options: ['To teach sentence patterns', 'To sell a product', 'To explain grammar rules'],
          answer: 'To teach sentence patterns'
        }
      ]
    },
    writing: {
      prompt: `用 2 句英文写出你在 ${theme} 场景里会怎么说。`,
      frame: ['I would like to ...', 'Could you ...?'],
      sample: 'I would like to ask a simple question. Could you help me with the next step?'
    },
    pronunciation: ['response', 'confirm', `Today we focus on ${theme}.`]
  };
}

function getDifficultyBand(score) {
  if (score < 45) return 'support';
  if (score < 70) return 'bridge';
  return 'stretch';
}

function buildAdaptiveSkillPlan(skill, score, themeKit, tags, theme) {
  const band = getDifficultyBand(score);
  const levelMeta = {
    support: {
      label: '基础支撑版',
      description: '先降低门槛，先学进去，再逐步提速。'
    },
    bridge: {
      label: '过渡训练版',
      description: '保持真实场景，同时控制难度和任务量。'
    },
    stretch: {
      label: '挑战提升版',
      description: '在接近真实使用的条件下练输出和反应。'
    }
  }[band];

  const plans = {
    listening: {
      support: {
        focus: '关键词识别 + 慢速理解',
        materials: [
          '先听慢速音频 2 遍，再对照文本抓关键词。',
          `把听力文本拆成 2 句一组，先听懂 ${theme} 场景关键信息。`,
          '完成 2 道基础选择题，再复听一次。'
        ]
      },
      bridge: {
        focus: '正常语速理解 + 信息提取',
        materials: [
          '先听正常语速，再回听重点句。',
          '记录时间、地点、需求这类核心信息。',
          '完成题目后，用 1 句英文复述听到的主旨。'
        ]
      },
      stretch: {
        focus: '真实语速反应 + 二次复述',
        materials: [
          '先盲听，再做题，不先看文本。',
          '用 2 句英文总结主要信息和你的回应。',
          '再听一遍，校正漏掉的细节。'
        ]
      }
    },
    speaking: {
      support: {
        focus: tags.includes('发音自然度偏弱') ? '重音节奏模仿' : '短句开口',
        materials: [
          '先跟读 4 句短句，重点模仿停顿和重音。',
          '先看句型卡，再做 1 轮替换说。',
          '允许先慢一点，先把句子完整说出来。'
        ]
      },
      bridge: {
        focus: '角色扮演 + 句型调用',
        materials: [
          '用情景对话做 2 轮角色扮演。',
          '第 2 轮减少中文提示，只保留关键词。',
          '录一遍自己的版本，和示范对比。'
        ]
      },
      stretch: {
        focus: '自由表达 + 自然度提升',
        materials: [
          '不看全文脚本，只看任务要求开口。',
          '说完后，再补一个更自然、更礼貌的版本。',
          '重点优化语调、连读和回应速度。'
        ]
      }
    },
    reading: {
      support: {
        focus: '句子拆解 + 关键信息定位',
        materials: [
          '先圈出时间、地点、动作这类关键词。',
          '每次只读一小段，再做题。',
          '把不认识的词控制在少量高频词。'
        ]
      },
      bridge: {
        focus: '信息整合 + 场景阅读',
        materials: [
          '先通读，再回看细节题。',
          '练习从通知、邮件、菜单中抓主旨。',
          '做完题后，用中文或英文说出核心信息。'
        ]
      },
      stretch: {
        focus: '快速理解 + 任务迁移',
        materials: [
          '限定时间完成阅读，再回答问题。',
          '阅读后马上做一个口头或书面回应。',
          '关注语气、隐含要求和礼貌表达。'
        ]
      }
    },
    writing: {
      support: {
        focus: '句型支架 + 短句输出',
        materials: [
          '直接套用句型框架写 2 句。',
          '优先写完整句，不追求复杂。',
          '写完后检查主语、动词和时间是否清楚。'
        ]
      },
      bridge: {
        focus: '场景写作 + 表达连贯',
        materials: [
          '用今天的话题写 3 句信息完整的话。',
          '练习连接词，让表达更自然。',
          '写完后替换 1 个更地道的表达。'
        ]
      },
      stretch: {
        focus: '真实输出 + 风格优化',
        materials: [
          '不看范文，独立完成一段短回复。',
          '根据对象调整语气，比如礼貌、清楚、简洁。',
          '完成后再对照参考表达升级用词。'
        ]
      }
    }
  };

  return {
    skill,
    score,
    band,
    levelLabel: levelMeta.label,
    description: levelMeta.description,
    ...plans[skill][band]
  };
}

function buildResourceStack(trackName, theme, tags) {
  const resources = [
    `情景对话：${trackName} / ${theme}`,
    `${theme} 高频表达卡片`,
    '输入-模仿-输出闭环练习单'
  ];
  if (tags.includes('听力输入薄弱')) resources.push('慢速 + 正常语速双版本听力');
  if (tags.includes('发音自然度偏弱')) resources.push('重音 / 连读 / 语调对比示范');
  if (tags.includes('词汇储备不足')) resources.push('场景最小词包');
  return resources;
}

function buildTask({ id, title, minutes, skill, why, action, resource, completed = false }) {
  return { id, title, minutes, skill, why, action, resource, completed };
}

function generateDailyPlan(form, scores, tags, track, dayIndex = 1) {
  const dailyMinutes = Number(form.dailyMinutes) || DEFAULT_DAILY_MINUTES;
  const theme = track.themes[(dayIndex - 1) % track.themes.length];
  const weakest = Object.entries(scores).sort((a, b) => a[1] - b[1]).map(([key]) => key);
  const minutes = {
    warmup: Math.max(4, Math.round(dailyMinutes * 0.14)),
    input: Math.max(7, Math.round(dailyMinutes * 0.24)),
    output: Math.max(8, Math.round(dailyMinutes * 0.26)),
    integration: Math.max(6, Math.round(dailyMinutes * 0.2)),
    review: Math.max(
      5,
      dailyMinutes -
        Math.round(dailyMinutes * 0.14) -
        Math.round(dailyMinutes * 0.24) -
        Math.round(dailyMinutes * 0.26) -
        Math.round(dailyMinutes * 0.2)
    )
  };

  const resources = buildResourceStack(track.name, theme, tags);
  const themeKit = getThemeKit(track, theme);

  const speakingTitle = weakest[0] === 'pronunciation' ? '语音模仿训练' : '场景开口训练';

  return {
    dayIndex,
    title: `Day ${dayIndex} · ${theme}`,
    theme,
    goal: themeKit.goal,
    estimatedMinutes: dailyMinutes,
    resources,
    resourceKit: {
      situation: `${track.name} · ${theme}`,
      vocab: themeKit.vocab,
      dialogue: themeKit.dialogue,
      listening: themeKit.listening,
      reading: themeKit.reading,
      writing: themeKit.writing,
      pronunciation: themeKit.pronunciation,
      adaptiveTracks: {
        listening: buildAdaptiveSkillPlan('listening', scores.listening, themeKit, tags, theme),
        speaking: buildAdaptiveSkillPlan('speaking', scores.speaking, themeKit, tags, theme),
        reading: buildAdaptiveSkillPlan('reading', scores.reading, themeKit, tags, theme),
        writing: buildAdaptiveSkillPlan('writing', scores.writing, themeKit, tags, theme)
      },
      tips: [
        tags.includes('词汇储备不足') ? '先学小词包，再进听力，能明显降低听不懂的感觉。' : '先看关键词，再去听和说，会更容易开口。',
        tags.includes('听力输入薄弱') ? '同一段内容先听慢速，再听正常语速，重点抓关键词。' : '注意把听到的表达直接复用到开口里。',
        tags.includes('发音自然度偏弱') ? '重点听重音、停顿和句尾语调，不要一个词一个词地蹦。' : '开口时先求完整表达，再逐步提升自然度。'
      ]
    },
    tasks: [
      buildTask({
        id: `d${dayIndex}-t1`,
        title: '热身与词汇激活',
        minutes: minutes.warmup,
        skill: '词汇 / 阅读',
        why: '先降低今天听力和开口难度，避免一上来就卡住。',
        action: `学习 ${theme} 场景中的高频词和 2 个核心句型。`,
        resource: resources[1]
      }),
      buildTask({
        id: `d${dayIndex}-t2`,
        title: '可理解输入训练',
        minutes: minutes.input,
        skill: '听力',
        why: weakest.includes('listening') ? '先用可理解输入补齐听力短板。' : '先把场景表达放进耳朵里。',
        action: '先听慢速版，再听正常版，抓关键词和主旨。',
        resource: resources[0]
      }),
      buildTask({
        id: `d${dayIndex}-t3`,
        title: speakingTitle,
        minutes: minutes.output,
        skill: '口语 / 发音',
        why: tags.includes('发音自然度偏弱') ? '这一步重点不是只读对，而是说得更自然。' : '把输入变成能立即调用的口语表达。',
        action: tags.includes('发音自然度偏弱')
          ? '跟读 6 句，重点练重音、停顿、语调，再完成 2 次情景复述。'
          : '完成 3 轮角色扮演，逐轮减少中文依赖。',
        resource: tags.includes('发音自然度偏弱') ? '语音节奏示范 + 跟读脚本' : '情景角色扮演卡'
      }),
      buildTask({
        id: `d${dayIndex}-t4`,
        title: '听说读写整合练习',
        minutes: minutes.integration,
        skill: '综合',
        why: '防止学成单项能力，把今天材料真正用出来。',
        action: '完成 1 个小任务：读提示、听信息、说回应、写 1-2 句总结。',
        resource: resources[2]
      }),
      buildTask({
        id: `d${dayIndex}-t5`,
        title: '当日小测与复盘',
        minutes: minutes.review,
        skill: '复盘',
        why: '让用户清楚知道今天哪里进步，哪里还需补。',
        action: '完成 3 题小测，写下 1 个卡点和 1 个明天要继续练的点。',
        resource: 'AI 复盘反馈卡'
      })
    ]
  };
}

function buildAssessmentNarrative(scores, tags, form) {
  const weakest = Object.entries(scores).sort((a, b) => a[1] - b[1]);
  const strongest = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const labelMap = {
    listening: '听力理解',
    speaking: '口语表达',
    reading: '阅读理解',
    writing: '写作表达',
    pronunciation: '发音自然度',
    vocabulary: '词汇储备'
  };

  const assessmentInput = form.assessmentInput || {};
  const detailNotes = [];
  if (assessmentInput.vocabCorrect != null) detailNotes.push(`词汇测评答对 ${assessmentInput.vocabCorrect} / ${assessmentInput.vocabTotal || 0}`);
  if (assessmentInput.listeningCorrect != null) detailNotes.push(`听力测评答对 ${assessmentInput.listeningCorrect} / ${assessmentInput.listeningTotal || 0}`);
  if (assessmentInput.readingCorrect != null) detailNotes.push(`阅读测评答对 ${assessmentInput.readingCorrect} / ${assessmentInput.readingTotal || 0}`);
  if (assessmentInput.speakingSimilarity != null) detailNotes.push(`口语读句匹配度 ${assessmentInput.speakingSimilarity}%`);

  return {
    headline: `你当前更适合从“${labelMap[weakest[0][0]]} + ${labelMap[weakest[1][0]]}”切入，同时保持听说读写全面覆盖。`,
    summary: `围绕“${form.goal || '英语综合提升'}”，系统判断你的优势更偏向 ${labelMap[strongest[0][0]]}，短板更集中在 ${labelMap[weakest[0][0]]}。`,
    tags,
    feedback: [
      tags.includes('发音自然度偏弱')
        ? '你可能存在“能读对，但重音、节奏、语调不够自然”的情况。'
        : '你的发音准确度有基础，接下来要进一步提升自然表达感。',
      tags.includes('听力输入薄弱')
        ? '你更需要先建立“可理解输入”，再逐步过渡到真实语速。'
        : '你的听力训练要继续和真实场景绑定，避免只会做题。',
      tags.includes('词汇储备不足')
        ? '词汇学习不建议孤立背诵，而应跟场景和输出任务绑定。'
        : '词汇建议继续通过高频场景反复复现，提升调用速度。'
    ],
    detailNotes
  };
}

export function buildInitialProfile(form, profileId) {
  const tags = detectProfile(form);
  const scores = deriveScores(form);
  const track = getPrimaryTrack(form);
  const stages = buildStagePlan(form, scores, track);
  const todayPlan = generateDailyPlan(form, scores, tags, track, 1);
  const overallProgress = 4;

  return {
    id: profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    form,
    assessment: {
      raw: form.assessmentInput || null,
      scores,
      ...buildAssessmentNarrative(scores, tags, form)
    },
    plan: {
      track: track.name,
      stages,
      totalWeeks: Number(form.timelineWeeks) || 12,
      currentStageId: 'stage-1'
    },
    progress: {
      totalPercent: overallProgress,
      currentDay: 1,
      streakDays: 0,
      completedDays: 0,
      weeklyCompletionRate: 0,
      skillProgress: {
        listening: Math.max(0, scores.listening - 25),
        speaking: Math.max(0, scores.speaking - 25),
        reading: Math.max(0, scores.reading - 25),
        writing: Math.max(0, scores.writing - 25)
      },
      stageProgress: {
        'stage-1': 8,
        'stage-2': 0,
        'stage-3': 0
      }
    },
    todayPlan,
    history: []
  };
}

export function completeTask(profile, taskId) {
  const updatedTasks = profile.todayPlan.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: true } : task
  );

  const completedCount = updatedTasks.filter((task) => task.completed).length;
  const completionRatio = completedCount / updatedTasks.length;

  return {
    ...profile,
    updatedAt: new Date().toISOString(),
    todayPlan: {
      ...profile.todayPlan,
      tasks: updatedTasks
    },
    progress: {
      ...profile.progress,
      totalPercent: Math.min(98, Math.round(profile.progress.totalPercent * 0.6 + completionRatio * 30)),
      weeklyCompletionRate: Math.round(completionRatio * 100)
    }
  };
}

export function completeDay(profile) {
  const allTasksDone = profile.todayPlan.tasks.every((task) => task.completed);
  const completedToday = profile.todayPlan.tasks.filter((task) => task.completed).length;
  const ratio = completedToday / profile.todayPlan.tasks.length;

  const nextDay = profile.progress.currentDay + 1;
  const track = getPrimaryTrack(profile.form);
  const tags = profile.assessment.tags;
  const nextPlan = generateDailyPlan(profile.form, profile.assessment.scores, tags, track, nextDay);

  const stage1Weeks = profile.plan.stages[0].weeks;
  const stage2Weeks = profile.plan.stages[1].weeks;
  const currentWeek = Math.ceil(nextDay / 5);
  let currentStageId = 'stage-1';
  if (currentWeek > stage1Weeks) currentStageId = 'stage-2';
  if (currentWeek > stage1Weeks + stage2Weeks) currentStageId = 'stage-3';

  const totalPercent = Math.min(100, profile.progress.totalPercent + Math.max(4, Math.round(ratio * 8)));
  const stageProgress = { ...profile.progress.stageProgress };
  stageProgress[currentStageId] = Math.min(100, (stageProgress[currentStageId] || 0) + Math.max(6, Math.round(ratio * 10)));

  return {
    ...profile,
    updatedAt: new Date().toISOString(),
    plan: {
      ...profile.plan,
      currentStageId
    },
    progress: {
      ...profile.progress,
      currentDay: nextDay,
      completedDays: profile.progress.completedDays + (ratio >= 0.6 ? 1 : 0),
      streakDays: allTasksDone ? profile.progress.streakDays + 1 : profile.progress.streakDays,
      weeklyCompletionRate: Math.round(ratio * 100),
      totalPercent,
      skillProgress: {
        listening: Math.min(100, profile.progress.skillProgress.listening + 2),
        speaking: Math.min(100, profile.progress.skillProgress.speaking + 2),
        reading: Math.min(100, profile.progress.skillProgress.reading + 1),
        writing: Math.min(100, profile.progress.skillProgress.writing + 1)
      },
      stageProgress
    },
    history: [
      ...profile.history,
      {
        dayIndex: profile.progress.currentDay,
        completedAt: new Date().toISOString(),
        completionRate: Math.round(ratio * 100),
        theme: profile.todayPlan.title
      }
    ],
    todayPlan: nextPlan
  };
}


export function buildWeeklyPlan(profile) {
  const currentDay = profile?.progress?.currentDay || 1;
  const currentWeek = Math.ceil(currentDay / 5);
  const weekStart = (currentWeek - 1) * 5 + 1;
  const track = getPrimaryTrack(profile.form);
  const tags = profile.assessment.tags || [];
  const scores = profile.assessment.scores || {};
  const completedDays = new Set((profile.history || []).map((item) => item.dayIndex));

  return Array.from({ length: 5 }, (_, index) => {
    const dayIndex = weekStart + index;
    const dayPlan = dayIndex === currentDay
      ? profile.todayPlan
      : generateDailyPlan(profile.form, scores, tags, track, dayIndex);
    const status = dayIndex < currentDay
      ? (completedDays.has(dayIndex) ? 'done' : 'missed')
      : dayIndex === currentDay
        ? 'today'
        : 'upcoming';

    return {
      dayIndex,
      title: dayPlan.title,
      theme: dayPlan.theme,
      goal: dayPlan.goal,
      estimatedMinutes: dayPlan.estimatedMinutes,
      status
    };
  });
}
