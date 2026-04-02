const plans = {
  life: {
    label: "Life English",
    mainSkill: "Listening",
    supportSkill: "Pronunciation",
    rationale:
      "Reading and writing are stable, so today moves your time into natural-speed listening and clearer spoken output for everyday situations.",
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
    mainSkill: "Speaking",
    supportSkill: "Listening",
    rationale:
      "Business writing is already usable, so today focuses on faster spoken response and clearer pickup during meetings and updates.",
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
    mainSkill: "Speaking",
    supportSkill: "Pronunciation",
    rationale:
      "You already understand the data concepts, so today’s gain comes from saying them faster and following spoken explanations in real time.",
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
  return `${duration}${duration === 30 ? "+" : ""}-minute plan`;
}

function doneMeans(plan) {
  const finalTask = plan.tasks[state.duration][2];
  return `Done means ${finalTask.check}`;
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
  document.querySelector("#entry-context").textContent = plan.label;
  document.querySelector("#entry-support-skill").textContent = `${plan.supportSkill} support`;
  document.querySelector("#entry-rationale").textContent = plan.rationale;

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
  document.querySelector("#training-header-goal").textContent = plan.goal[state.duration];
  document.querySelector("#training-why").textContent = plan.rationale;
  document.querySelector("#training-main-skill").textContent = plan.mainSkill;
  document.querySelector("#training-support-skill").textContent = plan.supportSkill;
  document.querySelector("#training-duration").textContent = `${state.duration}${state.duration === 30 ? "+" : ""} min`;
  document.querySelector("#training-goal").textContent = plan.goal[state.duration];
  document.querySelector("#training-rationale").textContent = plan.rationale;
  document.querySelector("#training-done-means").textContent = doneMeans(plan);
  renderTaskItems(plan.tasks[state.duration], document.querySelector("#training-task-list"));
  renderResources(plan.resources, document.querySelector("#resource-list"));

  document.querySelector("#complete-link").href = buildHref("/completion.html");
}

function renderCompletionPage() {
  const plan = getPlan();
  const nextBucket = state.duration === 10 ? "20-minute plan" : state.duration === 20 ? "20-minute plan again" : "20-minute reset plan";
  document.querySelector("#completion-trained").textContent = `${plan.mainSkill} with ${plan.supportSkill.toLowerCase()} support`;
  document.querySelector("#completion-goal").textContent = plan.goal[state.duration];
  document.querySelector("#completion-next-time").textContent = nextBucket;
  document.querySelector("#completion-reflection").textContent =
    state.duration === 10
      ? "If today felt too small, move up to 20 minutes tomorrow. If it felt right, repeat the same bucket."
      : state.duration === 20
        ? "Keep the same bucket tomorrow unless your schedule is tighter. The goal is another easy completion."
        : "Drop back to 20 minutes tomorrow if you want an easier repeatable loop.";
  document.querySelector("#completion-streak").textContent =
    "Session complete. Streak, calendar, and badges stay secondary to showing up again tomorrow.";
}

function init() {
  writeState();
  const page = document.body.dataset.page;
  if (page === "entry") renderEntryPage();
  if (page === "training") renderTrainingPage();
  if (page === "completion") renderCompletionPage();
}

init();
