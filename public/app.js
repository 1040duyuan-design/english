const plans = {
  life: {
    label: "Life English",
    rationale: "Reading and writing are stable, so today shifts your time into natural-speed listening and pronunciation for daily situations.",
    contextCopy: "This scopes today's examples only. It is not site navigation.",
    goal: {
      10: "Catch the key purpose of one short real-life exchange.",
      20: "Catch key meaning before translating in your head.",
      30: "Follow a full short exchange and respond without reverting to Chinese planning.",
    },
    tasks: {
      10: [
        { title: "Shadow one short clip", detail: "Repeat one real-life clip until you can track the rhythm.", duration: "4 min", check: "Done when one clear repeat is recorded." },
        { title: "Quick pronunciation spot-check", detail: "Fix two sounds that still feel too Chinese.", duration: "3 min", check: "Done when both target sounds are cleaner." },
        { title: "Say one everyday response", detail: "Answer the clip in one natural sentence.", duration: "3 min", check: "Done when you can say it once without reading." },
      ],
      20: [
        { title: "Shadow one real-life clip", detail: "Repeat the same clip until the rhythm feels natural.", duration: "8 min", check: "Done when one clean output is produced." },
        { title: "Repeat and record", detail: "Use six lines. Speak, hear, adjust, repeat.", duration: "6 min", check: "Done when one clear output is produced." },
        { title: "Pronunciation spot-check", detail: "Fix three sounds that still feel too Chinese.", duration: "4 min", check: "Done when target sounds feel less stiff." },
        { title: "Two-line reflection", detail: "Summarize the situation in your own words.", duration: "2 min", check: "Done when the meaning is spoken without translation." },
      ],
      30: [
        { title: "Shadow two connected clips", detail: "Work through a short exchange with natural pauses and linking.", duration: "10 min", check: "Done when both parts flow without stopping." },
        { title: "Repeat, record, compare", detail: "Record twice and compare rhythm plus stress.", duration: "8 min", check: "Done when the second take is measurably cleaner." },
        { title: "Pronunciation repair round", detail: "Focus on three sounds and one sentence melody pattern.", duration: "6 min", check: "Done when all four items are retried." },
        { title: "Real-life reply drill", detail: "Answer the exchange in two short sentences you could use in Australia.", duration: "6 min", check: "Done when both responses are spoken naturally." },
      ],
    },
  },
  business: {
    label: "Business",
    rationale: "Business writing is already usable, so today focuses on faster spoken response and clearer meeting-listening pickup.",
    contextCopy: "This scopes today's work examples. It is not a platform-level track selector.",
    goal: {
      10: "Pick out one meeting decision quickly and reply with one useful sentence.",
      20: "Catch key meeting intent and answer with clearer spoken English.",
      30: "Track a short work discussion and respond with confident, natural phrasing.",
    },
    tasks: {
      10: [
        { title: "Listen for one decision point", detail: "Find the main action item in one short business clip.", duration: "4 min", check: "Done when you can say the action item clearly." },
        { title: "Repeat one meeting response", detail: "Practice one natural reply line aloud.", duration: "3 min", check: "Done when it sounds steady once through." },
        { title: "Pronunciation tune-up", detail: "Clean up stress in one work phrase.", duration: "3 min", check: "Done when the phrase is no longer flat." },
      ],
      20: [
        { title: "Shadow one work clip", detail: "Repeat a short meeting segment until the pacing feels controlled.", duration: "8 min", check: "Done when one full pass sounds stable." },
        { title: "Repeat and record", detail: "Use four practical response lines for meetings or updates.", duration: "6 min", check: "Done when one version is clear and usable." },
        { title: "Pronunciation clean-up", detail: "Fix stress and linking in work-heavy vocabulary.", duration: "4 min", check: "Done when target terms feel more natural." },
        { title: "One-line recap", detail: "State the meeting outcome in one plain-English sentence.", duration: "2 min", check: "Done when the sentence is concise and clear." },
      ],
      30: [
        { title: "Shadow two work exchanges", detail: "Work through one update and one follow-up question.", duration: "10 min", check: "Done when both clips are repeatable without hesitation." },
        { title: "Record your update twice", detail: "Compare tone, pace, and stress placement.", duration: "8 min", check: "Done when the second take is tighter." },
        { title: "Pronunciation repair", detail: "Fix awkward work phrases and sentence stress.", duration: "6 min", check: "Done when three target phrases improve." },
        { title: "Meeting reply drill", detail: "Give a short answer, clarification, and next-step line.", duration: "6 min", check: "Done when all three lines feel work-ready." },
      ],
    },
  },
  data: {
    label: "Data English",
    rationale: "You already understand data concepts, so today's gain comes from saying them faster and following spoken explanations in real time.",
    contextCopy: "This only frames today's examples in data-analysis work. It is not a site-wide navigation section.",
    goal: {
      10: "Recognize the key trend in one spoken data update.",
      20: "Explain one chart insight aloud with less hesitation.",
      30: "Track and respond to a short data discussion in clearer spoken English.",
    },
    tasks: {
      10: [
        { title: "Listen for the key metric", detail: "Catch the one metric that drives the spoken update.", duration: "4 min", check: "Done when you can name the metric and trend." },
        { title: "Say one insight line", detail: "Explain the trend in one short sentence.", duration: "3 min", check: "Done when it is said once without reading." },
        { title: "Pronunciation tune-up", detail: "Clean up one data term and one number pattern.", duration: "3 min", check: "Done when both sound more natural." },
      ],
      20: [
        { title: "Shadow one data update", detail: "Repeat a spoken chart summary until the pacing feels natural.", duration: "8 min", check: "Done when one full run is smooth." },
        { title: "Repeat and record insight lines", detail: "Use four chart or metric explanation lines.", duration: "6 min", check: "Done when one take is clean enough to keep." },
        { title: "Pronunciation repair", detail: "Fix stress in multi-syllable data vocabulary and number phrasing.", duration: "4 min", check: "Done when target terms feel less rigid." },
        { title: "Explain the takeaway", detail: "Give one plain-English takeaway from the data point.", duration: "2 min", check: "Done when the insight is clear in one pass." },
      ],
      30: [
        { title: "Shadow two spoken data summaries", detail: "Practice one update and one recommendation segment.", duration: "10 min", check: "Done when both clips are repeatable." },
        { title: "Record your own summary twice", detail: "Compare clarity, flow, and stress on numbers.", duration: "8 min", check: "Done when the second version is tighter." },
        { title: "Pronunciation repair set", detail: "Fix data terms, percentage phrasing, and one sentence melody issue.", duration: "6 min", check: "Done when all target items are retried." },
        { title: "Response drill", detail: "Give one recommendation and one risk note based on the data.", duration: "6 min", check: "Done when both points are spoken clearly." },
      ],
    },
  },
};

const state = { context: "life", duration: 20 };

const elements = {
  heroCopy: document.querySelector("#hero-copy"),
  heroContextBadge: document.querySelector("#hero-context-badge"),
  heroTimeBadge: document.querySelector("#hero-time-badge"),
  summaryWeakness: document.querySelector("#summary-weakness"),
  summaryPriority: document.querySelector("#summary-priority"),
  summaryRationale: document.querySelector("#summary-rationale"),
  homeGoal: document.querySelector("#home-goal"),
  homeDuration: document.querySelector("#home-duration"),
  homeContext: document.querySelector("#home-context"),
  homeTaskList: document.querySelector("#home-task-list"),
  contextChoices: document.querySelector("#context-choices"),
  contextCopy: document.querySelector("#context-copy"),
  timeChoices: document.querySelector("#time-choices"),
  buildPlanButton: document.querySelector("#build-plan-button"),
  sheetGoal: document.querySelector("#sheet-goal"),
  sheetDuration: document.querySelector("#sheet-duration"),
  taskSheet: document.querySelector("#task-sheet"),
  sheetSubtitle: document.querySelector("#sheet-subtitle"),
  completionCopy: document.querySelector("#completion-copy"),
};

function weaknessForContext(contextKey) {
  const table = {
    life: {
      weakness: "Listening speed",
      priority: "Pronunciation is the support skill today.",
      hero: "Your fastest gain today is catching meaning from natural-speed listening and responding with cleaner pronunciation.",
    },
    business: {
      weakness: "Spoken response speed",
      priority: "Listening remains the support skill for meetings.",
      hero: "Today is about answering work conversations faster without losing clarity or sounding overly translated.",
    },
    data: {
      weakness: "Spoken explanation flow",
      priority: "Pronunciation supports clearer metric delivery today.",
      hero: "Your biggest gain today is turning data understanding into spoken English that lands cleanly in real time.",
    },
  };
  return table[contextKey];
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

function setActivePill(container, selector, value, key) {
  container.querySelectorAll(selector).forEach((button) => {
    button.classList.toggle("is-active", button.dataset[key] === String(value));
  });
}

function render() {
  const plan = plans[state.context];
  const weakness = weaknessForContext(state.context);
  const tasks = plan.tasks[state.duration];
  const goal = plan.goal[state.duration];

  elements.heroCopy.textContent = weakness.hero;
  elements.heroContextBadge.textContent = plan.label;
  elements.heroTimeBadge.textContent = `${state.duration}${state.duration === 30 ? "+" : ""} min plan`;
  elements.summaryWeakness.textContent = weakness.weakness;
  elements.summaryPriority.textContent = weakness.priority;
  elements.summaryRationale.textContent = plan.rationale;
  elements.homeGoal.textContent = goal;
  elements.homeDuration.textContent = `${state.duration}${state.duration === 30 ? "+" : ""} min`;
  elements.homeContext.textContent = plan.label;
  elements.contextCopy.textContent = plan.contextCopy;
  elements.sheetGoal.textContent = goal;
  elements.sheetDuration.textContent = `${state.duration}${state.duration === 30 ? "+" : ""} min`;
  elements.sheetSubtitle.textContent = `One finishable ${state.duration}${state.duration === 30 ? "+" : ""}-minute session, not a chapter list.`;
  elements.completionCopy.textContent = `Log today, keep the streak, and adjust tomorrow's ${state.duration}${state.duration === 30 ? "+" : ""}-minute bucket if needed. Badges remain secondary to the training signal.`;

  renderTaskItems(tasks, elements.homeTaskList);
  renderTaskItems(tasks, elements.taskSheet);
  setActivePill(elements.contextChoices, ".choice-pill", state.context, "context");
  setActivePill(elements.timeChoices, ".choice-pill", state.duration, "duration");
}

elements.contextChoices.addEventListener("click", (event) => {
  const button = event.target.closest("[data-context]");
  if (!button) return;
  state.context = button.dataset.context;
  render();
});

elements.timeChoices.addEventListener("click", (event) => {
  const button = event.target.closest("[data-duration]");
  if (!button) return;
  state.duration = Number(button.dataset.duration);
  render();
});

elements.buildPlanButton.addEventListener("click", () => {
  render();
  document.querySelector("#sheet-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

render();
