const plans = {
  life: {
    label: "Life English",
    shellLabel: "生活英语",
    mainSkill: "Listening",
    supportSkill: "Pronunciation",
    supportChip: "发音辅助",
    rationale:
      "Reading and writing are stable, so today moves your time into natural-speed listening and clearer spoken output for everyday situations.",
    rationaleCn:
      "阅读和写作先维持，今天把时间集中给听力理解和发音输出，让训练更贴近真实生活场景。",
    goal: {
      10: "Catch the key purpose of one short real-life exchange.",
      20: "Catch key meaning before translating in your head.",
      30: "Follow a full short exchange and respond without planning in Chinese first.",
    },
    tasks: {
      10: [
        { title: "Shadow one short clip", detail: "Repeat one real-life clip until the rhythm feels familiar.", duration: "4 min", check: "One clear repeat is recorded." },
        { title: "Fix two pronunciation points", detail: "Clean up the sounds that still feel too Chinese.", duration: "3 min", check: "Both target sounds are cleaner." },
        { title: "Say one everyday response", detail: "Answer the clip in one natural sentence.", duration: "3 min", check: "You can say it once without reading." },
      ],
      20: [
        { title: "Shadow one real-life clip", detail: "Repeat the same clip until the pacing feels natural.", duration: "8 min", check: "One clean output is produced." },
        { title: "Repeat and record", detail: "Use six lines. Speak, hear, adjust, repeat.", duration: "6 min", check: "One clear output is produced." },
        { title: "Pronunciation spot-check", detail: "Fix three sounds that still feel too Chinese.", duration: "6 min", check: "Target sounds feel less stiff." },
      ],
      30: [
        { title: "Shadow two connected clips", detail: "Work through one short exchange with natural pauses and linking.", duration: "10 min", check: "Both parts flow without stopping." },
        { title: "Record and compare", detail: "Record twice and compare rhythm plus stress.", duration: "10 min", check: "The second take is measurably cleaner." },
        { title: "Real-life reply drill", detail: "Answer the exchange in two short sentences you could use in Australia.", duration: "10 min", check: "Both responses sound natural." },
      ],
    },
    resources: [
      { label: "Today’s listening clip", detail: "Rental inspection small talk: one short Australian exchange." },
      { label: "Today’s shadow lines", detail: "Six follow-and-repeat lines for booking, timing, and confirmation." },
      { label: "Today’s output prompt", detail: "Answer: ‘Can you come by this afternoon to look at the place?’" },
    ],
  },
  business: {
    label: "Business",
    shellLabel: "商务英语",
    mainSkill: "Speaking",
    supportSkill: "Listening",
    supportChip: "听力辅助",
    rationale:
      "Business writing is already usable, so today focuses on faster spoken response and clearer pickup during meetings and updates.",
    rationaleCn:
      "书面表达先不扩，今天优先收口会议听取重点和即时口语回应，让工作场景更能直接用起来。",
    goal: {
      10: "Pick out one meeting decision quickly and reply with one useful sentence.",
      20: "Catch key meeting intent and answer with clearer spoken English.",
      30: "Track a short work discussion and respond with confident, natural phrasing.",
    },
    tasks: {
      10: [
        { title: "Listen for one decision point", detail: "Find the main action item in one short business clip.", duration: "4 min", check: "You can say the action item clearly." },
        { title: "Repeat one meeting response", detail: "Practice one natural reply line aloud.", duration: "3 min", check: "It sounds steady once through." },
        { title: "Pronunciation tune-up", detail: "Clean up stress in one work phrase.", duration: "3 min", check: "The phrase is no longer flat." },
      ],
      20: [
        { title: "Shadow one work clip", detail: "Repeat a short meeting segment until the pacing feels controlled.", duration: "8 min", check: "One full pass sounds stable." },
        { title: "Repeat and record", detail: "Use four practical response lines for updates and meetings.", duration: "6 min", check: "One version is clear and usable." },
        { title: "Pronunciation clean-up", detail: "Fix stress and linking in work-heavy vocabulary.", duration: "6 min", check: "Target terms feel more natural." },
      ],
      30: [
        { title: "Shadow two work exchanges", detail: "Work through one update and one follow-up question.", duration: "10 min", check: "Both clips are repeatable without hesitation." },
        { title: "Record your update twice", detail: "Compare tone, pace, and stress placement.", duration: "10 min", check: "The second take is tighter." },
        { title: "Meeting reply drill", detail: "Give a short answer, clarification, and next-step line.", duration: "10 min", check: "All three lines feel work-ready." },
      ],
    },
    resources: [
      { label: "Today’s listening clip", detail: "Short stand-up update with one deadline change." },
      { label: "Today’s shadow lines", detail: "Six phrases for updates, clarification, and follow-up." },
      { label: "Today’s output prompt", detail: "Answer: ‘Can you give us a quick status update on this?’" },
    ],
  },
  data: {
    label: "Data English",
    shellLabel: "数据岗位英语",
    mainSkill: "Speaking",
    supportSkill: "Pronunciation",
    supportChip: "发音辅助",
    rationale:
      "You already understand the data concepts, so today’s gain comes from saying them faster and following spoken explanations in real time.",
    rationaleCn:
      "数据概念你已经懂，今天把训练放在更快说出来和更稳地跟住实时说明上，而不是再做概念理解。",
    goal: {
      10: "Recognize the key trend in one spoken data update.",
      20: "Explain one chart insight aloud with less hesitation.",
      30: "Track and respond to a short data discussion in clearer spoken English.",
    },
    tasks: {
      10: [
        { title: "Listen for the key metric", detail: "Catch the one metric driving the spoken update.", duration: "4 min", check: "You can name the metric and trend." },
        { title: "Say one insight line", detail: "Explain the trend in one short sentence.", duration: "3 min", check: "It is said once without reading." },
        { title: "Pronunciation tune-up", detail: "Clean up one data term and one number pattern.", duration: "3 min", check: "Both sound more natural." },
      ],
      20: [
        { title: "Shadow one data update", detail: "Repeat a spoken chart summary until pacing feels natural.", duration: "8 min", check: "One full run is smooth." },
        { title: "Repeat and record insight lines", detail: "Use four chart or metric explanation lines.", duration: "6 min", check: "One take is clean enough to keep." },
        { title: "Pronunciation repair", detail: "Fix stress in data vocabulary and number phrasing.", duration: "6 min", check: "Target terms feel less rigid." },
      ],
      30: [
        { title: "Shadow two spoken data summaries", detail: "Practice one update and one recommendation segment.", duration: "10 min", check: "Both clips are repeatable." },
        { title: "Record your own summary twice", detail: "Compare clarity, flow, and stress on numbers.", duration: "10 min", check: "The second version is tighter." },
        { title: "Response drill", detail: "Give one recommendation and one risk note based on the data.", duration: "10 min", check: "Both points are spoken clearly." },
      ],
    },
    resources: [
      { label: "Today’s listening clip", detail: "Short spoken dashboard update with one trend change." },
      { label: "Today’s shadow lines", detail: "Six phrases for chart trends, drivers, and recommendations." },
      { label: "Today’s output prompt", detail: "Answer: ‘What is the main takeaway from this week’s numbers?’" },
    ],
  },
};

const state = readState();

function readState() {
  const params = new URLSearchParams(window.location.search);
  const saved = JSON.parse(window.localStorage.getItem("englishDailyPlan") || "{}");
  const context = params.get("context") || saved.context || "life";
  const duration = Number(params.get("duration") || saved.duration || 20);
  const blocker = params.get("skill") || saved.skill || "listening";
  return { context, duration, blocker };
}

function writeState() {
  window.localStorage.setItem("englishDailyPlan", JSON.stringify(state));
}

function getPlan() {
  return plans[state.context] || plans.life;
}

function durationLabel(duration) {
  return `${duration}${duration === 30 ? "+" : ""} 分钟可完成训练`;
}

function doneMeans(plan) {
  const finalTask = plan.tasks[state.duration][2];
  return `完成标准：${finalTask.check}`;
}

function buildHref(path) {
  const params = new URLSearchParams({
    context: state.context,
    duration: String(state.duration),
    skill: state.blocker,
  });
  return `${path}?${params.toString()}`;
}

function renderEntryPage() {
  const plan = getPlan();
  document.querySelector("#entry-time-bucket").textContent = durationLabel(state.duration);
  document.querySelector("#entry-goal").textContent = plan.goal[state.duration];
  document.querySelector("#entry-goal-strong").textContent = plan.goal[state.duration];
  document.querySelector("#entry-context").textContent = plan.shellLabel;
  document.querySelector("#entry-support-skill").textContent = plan.supportChip;
  document.querySelector("#entry-rationale").textContent = plan.rationaleCn;

  const startLink = document.querySelector("#start-plan-link");
  startLink.href = buildHref("/training.html");

  const contextSelect = document.querySelector("#qc-context");
  const durationSelect = document.querySelector("#qc-duration");
  const skillSelect = document.querySelector("#qc-skill");
  const quickCheckButton = document.querySelector("#quick-check-button");

  contextSelect.value = state.context;
  durationSelect.value = String(state.duration);
  skillSelect.value = state.blocker;

  quickCheckButton.addEventListener("click", () => {
    state.context = contextSelect.value;
    state.duration = Number(durationSelect.value);
    state.blocker = skillSelect.value;
    writeState();
    window.location.href = buildHref("/training.html");
  });
}

function renderTaskItems(items, target) {
  target.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="task-line">
        <div>
          <strong>${index + 1}. ${item.title}</strong>
          <span>${item.detail}</span>
        </div>
        <span class="task-duration">${item.duration}</span>
      </div>
      <div class="task-meta">
        <span class="task-check">${item.check}</span>
      </div>
    `;
    target.append(li);
  });
}

function renderResources(items, target) {
  target.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${index + 1}. ${item.label}</strong>
      <span>${item.detail}</span>
    `;
    target.append(li);
  });
}

function renderTrainingPage() {
  const plan = getPlan();
  document.querySelector("#training-header-goal").textContent = "今天的训练";
  document.querySelector("#training-why").textContent = plan.rationaleCn;
  document.querySelector("#training-main-skill").textContent = plan.mainSkill;
  document.querySelector("#training-support-skill").textContent = plan.supportSkill;
  document.querySelector("#training-duration").textContent = `${state.duration}${state.duration === 30 ? "+" : ""} 分钟`;
  document.querySelector("#training-goal").textContent = plan.goal[state.duration];
  document.querySelector("#training-rationale").textContent = plan.rationaleCn;
  document.querySelector("#training-done-means").textContent = doneMeans(plan);
  renderTaskItems(plan.tasks[state.duration], document.querySelector("#training-task-list"));
  renderResources(plan.resources, document.querySelector("#resource-list"));

  document.querySelector("#complete-link").href = buildHref("/completion.html");
}

function renderCompletionPage() {
  const plan = getPlan();
  const nextBucket = state.duration === 10 ? "20 分钟训练" : state.duration === 20 ? "继续 20 分钟训练" : "回到 20 分钟训练";
  document.querySelector("#completion-trained").textContent = `${plan.mainSkill} with ${plan.supportSkill.toLowerCase()} support`;
  document.querySelector("#completion-goal").textContent = plan.goal[state.duration];
  document.querySelector("#completion-next-time").textContent = nextBucket;
  document.querySelector("#completion-reflection").textContent =
    state.duration === 10
      ? "如果今天偏短，明天可以上调到 20 分钟；如果刚刚好，就继续保持同样的节奏。"
      : state.duration === 20
        ? "除非明天时间更紧，不然继续同样的时间桶。目标不是做更多，而是继续稳定完成。"
        : "如果明天想更容易完成一次，就回到 20 分钟时间桶。";
  document.querySelector("#completion-streak").textContent =
    "这一轮已完成。连续天数、日历和徽章都放在次级层，明天继续出现才是主线。";
}

function init() {
  writeState();
  const page = document.body.dataset.page;
  if (page === "entry") renderEntryPage();
  if (page === "training") renderTrainingPage();
  if (page === "completion") renderCompletionPage();
}

init();
