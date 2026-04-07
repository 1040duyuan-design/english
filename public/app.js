const plans = {
  life: {
    label: "Life English",
    shellLabel: "生活英语",
    mainSkill: "Listening",
    supportSkill: "Pronunciation",
    supportChip: "发音辅助",
    sceneCn: "澳洲租房：打电话预约看房",
    sceneEn: "Calling a landlord to book a rental inspection",
    whyCn: "今天不做泛听力。只练一个你去澳洲独立生活时真的会遇到的电话场景：预约看房。",
    goal: {
      10: "听懂并说出一次预约看房电话里的关键信息。",
      20: "听懂并说出一次预约看房电话里的关键信息。",
      30: "完整跟住一次预约看房电话，并给出自己的英文回应。",
    },
    doneMeans: {
      10: "你能说出这通电话在安排什么，并完整说出 1 句预约请求。",
      20: "你能说出这通电话在安排什么，并完整说出 1 句预约请求。",
      30: "你能听懂时间地点，并完成 1 次不照读的英文回应。",
    },
    resources: [
      {
        id: "audio",
        type: "Audio",
        content: "Hi, it's Alex from Harbour Rentals. We have an inspection on Saturday at 10:30 on King Street.",
        why: "先把真实电话里的时间、地点和下一步听出来。",
        cta: "开始听这段音频",
        helper: "先完整听 1 遍，再听第 2 遍并抓 `time / place / next step`。",
        speechText: "Hi, it's Alex from Harbour Rentals. We have an inspection on Saturday at ten thirty on King Street.",
      },
      {
        id: "sentence",
        type: "Key sentence",
        content: "I'd like to book an inspection for Saturday morning.",
        why: "这是今天最该说出口的一句关键请求。",
        cta: "开始跟读这句话",
        helper: "先跟读 3 次，第 4 次不看文本直接说。",
        speechText: "I'd like to book an inspection for Saturday morning.",
      },
      {
        id: "task",
        type: "Quick response task",
        content: "Can you make it on Saturday morning?",
        why: "把模仿推进成一次最小真实回应，而不是只重复材料。",
        cta: "开始回答这个问题",
        helper: "请直接用 1 句英文回应，不需要长答案。",
        prompt: "Yes, Saturday morning works for me.",
      },
    ],
    actions: {
      10: [
        {
          id: "action-1",
          resourceId: "audio",
          name: "听懂一段看房电话",
          why: "先抓住这通电话到底在安排什么，不先纠结每个词。",
          steps: [
            "点击下面的 Audio 资源。",
            "完整听 1 遍，不暂停。",
            "第 2 遍只记 `time / place / next step`。",
          ],
          duration: "4 分钟",
          done: "你能用 1 句中文或英文说出这通电话在安排什么。",
        },
        {
          id: "action-2",
          resourceId: "sentence",
          name: "跟说今天最关键的一句",
          why: "把“听懂”推进到“自己能开口说出来”。",
          steps: [
            "点击下面的 Key sentence 资源。",
            "先跟读 2 次。",
            "最后 1 次不看文本直接说。",
          ],
          duration: "3 分钟",
          done: "你能完整说出这句预约请求。",
        },
        {
          id: "action-3",
          resourceId: "task",
          name: "做一次最小回应",
          why: "避免停在照读，收成 1 次真实输出。",
          steps: [
            "点击下面的 Quick response task。",
            "读题 1 次。",
            "立刻用 1 句英文回应。",
          ],
          duration: "3 分钟",
          done: "你已经完成 1 次不照读的英文回应。",
        },
      ],
      20: [
        {
          id: "action-1",
          resourceId: "audio",
          name: "听懂一段看房电话",
          why: "先把真实电话里的时间、地点和安排抓清楚，避免一上来就翻译。",
          steps: [
            "点击下面的 Audio 资源。",
            "完整听 1 遍，不暂停。",
            "第 2 遍只记 `time / place / next step`。",
          ],
          duration: "6 分钟",
          done: "你能用 1 句中文或英文说出这通电话在安排什么。",
        },
        {
          id: "action-2",
          resourceId: "sentence",
          name: "跟说今天最关键的一句",
          why: "把“听懂”推进到“自己能开口”，收住今天最该说出口的一句话。",
          steps: [
            "点击下面的 Key sentence 资源。",
            "先跟读 3 次。",
            "第 4 次不看文本直接说。",
          ],
          duration: "5 分钟",
          done: "你能完整说出这句关键请求。",
        },
        {
          id: "action-3",
          resourceId: "task",
          name: "做一次最小真实回应",
          why: "从模仿变成真实输出，确认今天这轮真的练到了可用表达。",
          steps: [
            "点击下面的 Quick response task。",
            "读题 1 次。",
            "只用 1 句自己的英文回应。",
          ],
          duration: "7 分钟",
          done: "你已经完成 1 次不照读的真实回应。",
        },
      ],
      30: [
        {
          id: "action-1",
          resourceId: "audio",
          name: "听懂并复述看房电话",
          why: "先稳住这类真实电话里的关键信息，再进入后续开口。",
          steps: [
            "点击下面的 Audio 资源。",
            "完整听 2 遍。",
            "第 3 遍后用 1 句英文复述这通电话在安排什么。",
          ],
          duration: "10 分钟",
          done: "你能用 1 句英文复述时间、地点和安排。",
        },
        {
          id: "action-2",
          resourceId: "sentence",
          name: "跟说并稳定关键请求",
          why: "把这句请求说稳，减少临场时卡住的概率。",
          steps: [
            "点击下面的 Key sentence 资源。",
            "跟读 4 次。",
            "最后 2 次不看文本直接说。",
          ],
          duration: "8 分钟",
          done: "你能稳定说出这句关键请求，不需要看文本。",
        },
        {
          id: "action-3",
          resourceId: "task",
          name: "做一次完整口头回应",
          why: "让今天的训练真正落到你自己的英文输出上。",
          steps: [
            "点击下面的 Quick response task。",
            "先口头回答 1 次。",
            "再重说 1 次，让语气更自然。",
          ],
          duration: "12 分钟",
          done: "你已经完成 1 次自己的口头回应，并能重说得更顺。",
        },
      ],
    },
    completion: {
      keySentence: "I'd like to book an inspection for Saturday morning.",
      tomorrow: "明天继续生活线，但换成“确认交通路线”或“超市现场沟通”。",
    },
  },
  business: {
    label: "Business",
    shellLabel: "商务英语",
    mainSkill: "Speaking",
    supportSkill: "Listening",
    supportChip: "听力辅助",
    sceneCn: "澳洲职场：和同事确认 meeting 更新时间",
    sceneEn: "Clarifying a meeting update with a colleague",
    whyCn: "今天不做泛商务英语，只练一个澳洲职场里最常见的沟通动作：听懂更新并给出简短回应。",
    goal: {
      10: "听懂一次简短会议更新，并给出 1 句工作回应。",
      20: "听懂一次简短会议更新，并给出 1 句工作回应。",
      30: "跟住一次会议更新，并完成 1 次自己的口头回应。",
    },
    doneMeans: {
      10: "你能说出这次更新的核心变化，并给出 1 句工作回应。",
      20: "你能说出这次更新的核心变化，并给出 1 句工作回应。",
      30: "你能复述更新重点，并完成 1 次自己的会议回应。",
    },
    resources: [
      {
        id: "audio",
        type: "Audio",
        content: "We moved the client review to Thursday afternoon, so I need the updated deck by noon.",
        why: "先听懂会议更新里的时间变化和下一步动作。",
        cta: "开始听这段更新",
        helper: "先完整听 1 遍，再听第 2 遍并抓 `time / task / owner`。",
        speechText: "We moved the client review to Thursday afternoon, so I need the updated deck by noon.",
      },
      {
        id: "sentence",
        type: "Key sentence",
        content: "Got it. I'll send the updated deck before noon.",
        why: "这是今天最该说出口的一句确认回应。",
        cta: "开始跟读这句话",
        helper: "先跟读 3 次，第 4 次不看文本直接说。",
        speechText: "Got it. I'll send the updated deck before noon.",
      },
      {
        id: "task",
        type: "Quick response task",
        content: "Can you also add the new churn slide before the review?",
        why: "把理解推进成一次最小工作回应。",
        cta: "开始回答这个问题",
        helper: "请直接用 1 句英文确认你会怎么做。",
        prompt: "Yes, I'll add it before I send the deck.",
      },
    ],
    actions: {
      10: [
        {
          id: "action-1",
          resourceId: "audio",
          name: "听懂一段会议更新",
          why: "先抓住时间变化和下一步动作，不纠结每个细节。",
          steps: ["点击 Audio 资源。", "完整听 1 遍。", "第 2 遍只抓 `time / task / owner`。"],
          duration: "4 分钟",
          done: "你能说出更新里发生了什么变化。",
        },
        {
          id: "action-2",
          resourceId: "sentence",
          name: "跟说一句确认回应",
          why: "把理解收成一句你能直接在会议里说的回应。",
          steps: ["点击 Key sentence。", "跟读 2 次。", "最后 1 次不看文本说。"],
          duration: "3 分钟",
          done: "你能完整说出这句确认回应。",
        },
        {
          id: "action-3",
          resourceId: "task",
          name: "完成一次最小工作回应",
          why: "从照读推进到自己的口头回应。",
          steps: ["点击 Quick response task。", "读题 1 次。", "用 1 句英文回答。"],
          duration: "3 分钟",
          done: "你完成了 1 次自己的工作回应。",
        },
      ],
      20: [
        {
          id: "action-1",
          resourceId: "audio",
          name: "听懂一段会议更新",
          why: "先抓住时间变化、任务和责任人，避免只听到碎片词。",
          steps: ["点击 Audio 资源。", "完整听 1 遍。", "第 2 遍只抓 `time / task / owner`。"],
          duration: "6 分钟",
          done: "你能说出这段更新的核心变化。",
        },
        {
          id: "action-2",
          resourceId: "sentence",
          name: "跟说一句确认回应",
          why: "把理解推进到一条能直接在 meeting 里说出口的回应。",
          steps: ["点击 Key sentence。", "跟读 3 次。", "第 4 次不看文本说。"],
          duration: "5 分钟",
          done: "你能自然说出这句确认回应。",
        },
        {
          id: "action-3",
          resourceId: "task",
          name: "完成一次最小工作回应",
          why: "确认你不只是复述，而是能给出自己的下一步回应。",
          steps: ["点击 Quick response task。", "读题 1 次。", "只用 1 句英文回应。"],
          duration: "7 分钟",
          done: "你已经完成 1 次自己的工作回应。",
        },
      ],
      30: [
        {
          id: "action-1",
          resourceId: "audio",
          name: "听懂并复述会议更新",
          why: "把会议信息听清，再收成 1 句英文复述。",
          steps: ["点击 Audio 资源。", "完整听 2 遍。", "第 3 遍后用 1 句英文复述变化。"],
          duration: "10 分钟",
          done: "你能用 1 句英文复述更新重点。",
        },
        {
          id: "action-2",
          resourceId: "sentence",
          name: "稳定说出确认回应",
          why: "把今天最关键的一句回应说顺。",
          steps: ["点击 Key sentence。", "跟读 4 次。", "最后 2 次不看文本说。"],
          duration: "8 分钟",
          done: "你能稳定说出这句会议回应。",
        },
        {
          id: "action-3",
          resourceId: "task",
          name: "完成一次完整回应",
          why: "从理解推进到你自己的简短工作表达。",
          steps: ["点击 Quick response task。", "先回答 1 次。", "再重说 1 次让语气更自然。"],
          duration: "12 分钟",
          done: "你已经完成 1 次自己的会议回应，并能再说得更顺。",
        },
      ],
    },
    completion: {
      keySentence: "Got it. I'll send the updated deck before noon.",
      tomorrow: "明天继续职场线，但换成 `small talk` 或 `meeting clarification` 场景。",
    },
  },
  data: {
    label: "Data English",
    shellLabel: "数据岗位英语",
    mainSkill: "Speaking",
    supportSkill: "Pronunciation",
    supportChip: "发音辅助",
    sceneCn: "数据岗位：向同事说明一项关键指标变化",
    sceneEn: "Explaining a key metric change to a colleague",
    whyCn: "今天不做抽象数据英语，只练一个工作里真实会说的场景：解释一个指标变化和接下来怎么判断。",
    goal: {
      10: "听懂并说出 1 个指标变化的核心意思。",
      20: "听懂并说出 1 个指标变化的核心意思。",
      30: "跟住一次数据更新，并完成 1 次自己的英文说明。",
    },
    doneMeans: {
      10: "你能说出指标变化的意思，并给出 1 句英文解释。",
      20: "你能说出指标变化的意思，并给出 1 句英文解释。",
      30: "你能复述更新重点，并完成 1 次自己的英文说明。",
    },
    resources: [
      {
        id: "audio",
        type: "Audio",
        content: "Weekly retention dropped by three percent after the pricing change, but trial sign-ups stayed flat.",
        why: "先听懂这次数据更新的关键趋势和变化原因。",
        cta: "开始听这段更新",
        helper: "先完整听 1 遍，再听第 2 遍并抓 `metric / change / cause`。",
        speechText: "Weekly retention dropped by three percent after the pricing change, but trial sign-ups stayed flat.",
      },
      {
        id: "sentence",
        type: "Key sentence",
        content: "Weekly retention dropped after the pricing change.",
        why: "这是今天最该说出口的一句核心解释。",
        cta: "开始跟读这句话",
        helper: "先跟读 3 次，第 4 次不看文本直接说。",
        speechText: "Weekly retention dropped after the pricing change.",
      },
      {
        id: "task",
        type: "Quick response task",
        content: "What is the main takeaway from this week's numbers?",
        why: "把理解推进成一次最小工作说明。",
        cta: "开始回答这个问题",
        helper: "请直接用 1 句英文说出你的 takeaway。",
        prompt: "Retention dropped after the pricing change, so we should check user feedback first.",
      },
    ],
    actions: {
      10: [
        {
          id: "action-1",
          resourceId: "audio",
          name: "听懂一段数据更新",
          why: "先抓住指标、变化和原因，不先堆术语。",
          steps: ["点击 Audio 资源。", "完整听 1 遍。", "第 2 遍只抓 `metric / change / cause`。"],
          duration: "4 分钟",
          done: "你能说出哪项指标变了、怎么变的。",
        },
        {
          id: "action-2",
          resourceId: "sentence",
          name: "跟说一句核心解释",
          why: "把理解推进到一句能直接在工作里说的说明。",
          steps: ["点击 Key sentence。", "跟读 2 次。", "最后 1 次不看文本说。"],
          duration: "3 分钟",
          done: "你能完整说出这句核心解释。",
        },
        {
          id: "action-3",
          resourceId: "task",
          name: "完成一次最小说明",
          why: "确认你能给出自己的英文 takeaway。",
          steps: ["点击 Quick response task。", "读题 1 次。", "用 1 句英文回答。"],
          duration: "3 分钟",
          done: "你完成了 1 次自己的英文说明。",
        },
      ],
      20: [
        {
          id: "action-1",
          resourceId: "audio",
          name: "听懂一段数据更新",
          why: "先抓住指标变化和原因，避免听到词但说不出重点。",
          steps: ["点击 Audio 资源。", "完整听 1 遍。", "第 2 遍只抓 `metric / change / cause`。"],
          duration: "6 分钟",
          done: "你能说出这段更新的核心变化。",
        },
        {
          id: "action-2",
          resourceId: "sentence",
          name: "跟说一句核心解释",
          why: "把理解推进到一句能直接在工作里说出来的解释。",
          steps: ["点击 Key sentence。", "跟读 3 次。", "第 4 次不看文本说。"],
          duration: "5 分钟",
          done: "你能自然说出这句核心解释。",
        },
        {
          id: "action-3",
          resourceId: "task",
          name: "完成一次最小工作说明",
          why: "确认你已经能用自己的英文说出一个 takeaway。",
          steps: ["点击 Quick response task。", "读题 1 次。", "只用 1 句英文回应。"],
          duration: "7 分钟",
          done: "你已经完成 1 次自己的英文说明。",
        },
      ],
      30: [
        {
          id: "action-1",
          resourceId: "audio",
          name: "听懂并复述数据更新",
          why: "把听到的趋势和原因收成 1 句清楚的英文复述。",
          steps: ["点击 Audio 资源。", "完整听 2 遍。", "第 3 遍后用 1 句英文复述重点。"],
          duration: "10 分钟",
          done: "你能用 1 句英文复述这段数据更新。",
        },
        {
          id: "action-2",
          resourceId: "sentence",
          name: "稳定说出核心解释",
          why: "把今天最该说的一句解释说顺。",
          steps: ["点击 Key sentence。", "跟读 4 次。", "最后 2 次不看文本说。"],
          duration: "8 分钟",
          done: "你能稳定说出这句核心解释。",
        },
        {
          id: "action-3",
          resourceId: "task",
          name: "完成一次完整说明",
          why: "从理解推进到你自己的工作表达。",
          steps: ["点击 Quick response task。", "先回答 1 次。", "再重说 1 次让逻辑更顺。"],
          duration: "12 分钟",
          done: "你已经完成 1 次自己的英文说明，并能重说得更顺。",
        },
      ],
    },
    completion: {
      keySentence: "Weekly retention dropped after the pricing change.",
      tomorrow: "明天继续数据岗位线，但换成 `chart explanation` 或 `recommendation` 场景。",
    },
  },
};

const state = readState();
const runState = readRunState();

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

function runStateKey() {
  return `englishTrainingRun:${state.context}:${state.duration}`;
}

function readRunState() {
  const saved = JSON.parse(window.localStorage.getItem(runStateKey()) || "{}");
  return {
    activeActionId: saved.activeActionId || null,
    activeResourceId: saved.activeResourceId || null,
    completedActionIds: Array.isArray(saved.completedActionIds) ? saved.completedActionIds : [],
  };
}

function writeRunState() {
  window.localStorage.setItem(runStateKey(), JSON.stringify(runState));
}

function resetRunState() {
  runState.activeActionId = null;
  runState.activeResourceId = null;
  runState.completedActionIds = [];
  writeRunState();
}

function getPlan() {
  return plans[state.context] || plans.life;
}

function durationMinutesLabel(duration) {
  return `${duration}${duration === 30 ? "+" : ""} 分钟`;
}

function durationEntryLabel(duration) {
  return `${duration}${duration === 30 ? "+" : ""} 分钟可完成训练`;
}

function buildHref(path) {
  const params = new URLSearchParams({
    context: state.context,
    duration: String(state.duration),
    skill: state.blocker,
  });
  return `${path}?${params.toString()}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-AU";
  utterance.rate = 0.92;
  window.speechSynthesis.speak(utterance);
}

function renderEntryPage() {
  const plan = getPlan();
  document.querySelector("#entry-time-bucket").textContent = durationEntryLabel(state.duration);
  document.querySelector("#entry-goal").textContent = plan.goal[state.duration];
  document.querySelector("#entry-goal-strong").textContent = plan.goal[state.duration];
  document.querySelector("#entry-context").textContent = plan.shellLabel;
  document.querySelector("#entry-support-skill").textContent = plan.supportChip;
  document.querySelector("#entry-rationale").textContent = plan.whyCn;

  const startLink = document.querySelector("#start-plan-link");
  startLink.href = buildHref("/training.html");
  startLink.addEventListener("click", resetRunState);

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
    resetRunState();
    window.location.href = buildHref("/training.html");
  });
}

function actionCardHtml(action, index) {
  const isActive = runState.activeActionId === action.id;
  const isDone = runState.completedActionIds.includes(action.id);
  return `
    <li class="action-card${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}" id="${action.id}">
      <div class="action-card__head">
        <div>
          <p class="mini-label">Action ${index + 1}</p>
          <strong>${escapeHtml(action.name)}</strong>
        </div>
        <span class="task-duration">${escapeHtml(action.duration)}</span>
      </div>
      <div class="action-card__body">
        <div class="card-copy">
          <span class="card-copy__label">为什么做</span>
          <p>${escapeHtml(action.why)}</p>
        </div>
        <div class="card-copy">
          <span class="card-copy__label">怎么做</span>
          <ol class="step-list">
            ${action.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
          </ol>
        </div>
        <div class="card-copy">
          <span class="card-copy__label">完成算什么</span>
          <p>${escapeHtml(action.done)}</p>
        </div>
      </div>
      <div class="card-actions">
        <button class="secondary-action card-button" type="button" data-action-start="${action.id}" data-resource="${action.resourceId}">
          开始这个动作
        </button>
        <button class="card-check${isDone ? " is-done" : ""}" type="button" data-action-complete="${action.id}">
          ${isDone ? "已完成这一步" : "标记这一步完成"}
        </button>
      </div>
    </li>
  `;
}

function resourceCardHtml(resource, index) {
  const isActive = runState.activeResourceId === resource.id;
  return `
    <li class="resource-card${isActive ? " is-active" : ""}" id="resource-${resource.id}">
      <div class="resource-card__head">
        <div>
          <p class="mini-label">Resource ${index + 1}</p>
          <strong>${escapeHtml(resource.type)}</strong>
        </div>
        <span class="resource-badge">${escapeHtml(resource.type.toLowerCase())}</span>
      </div>
      <div class="card-copy">
        <span class="card-copy__label">资源内容</span>
        <p class="resource-content">${escapeHtml(resource.content)}</p>
      </div>
      <div class="card-copy">
        <span class="card-copy__label">为什么用它</span>
        <p>${escapeHtml(resource.why)}</p>
      </div>
      <div class="card-copy card-copy--helper">
        <span class="card-copy__label">开始后怎么做</span>
        <p>${escapeHtml(resource.helper)}</p>
      </div>
      <button class="secondary-action card-button" type="button" data-resource-start="${resource.id}">
        ${escapeHtml(resource.cta)}
      </button>
    </li>
  `;
}

function renderTrainingPage() {
  const plan = getPlan();
  const actions = plan.actions[state.duration];
  const resources = plan.resources;
  const allDone = actions.every((action) => runState.completedActionIds.includes(action.id));
  const completeLink = document.querySelector("#complete-link");

  document.querySelector("#training-header-goal").textContent = plan.sceneCn;
  document.querySelector("#training-why").textContent = plan.whyCn;
  document.querySelector("#training-goal").textContent = plan.goal[state.duration];
  document.querySelector("#training-main-skill-pill").textContent = plan.mainSkill;
  document.querySelector("#training-support-skill-pill").textContent = plan.supportSkill;
  document.querySelector("#training-main-skill").textContent = plan.mainSkill;
  document.querySelector("#training-support-skill").textContent = plan.supportSkill;
  document.querySelector("#training-duration").textContent = durationMinutesLabel(state.duration);
  document.querySelector("#training-duration-brief").textContent = durationMinutesLabel(state.duration);
  document.querySelector("#training-done-means").textContent = plan.doneMeans[state.duration];
  document.querySelector("#training-scene").textContent = `${plan.sceneCn} · ${plan.sceneEn}`;

  document.querySelector("#training-task-list").innerHTML = actions.map(actionCardHtml).join("");
  document.querySelector("#resource-list").innerHTML = resources.map(resourceCardHtml).join("");

  document.querySelector("#training-finish-copy").textContent =
    allDone
      ? "上面 3 个动作已经做完。现在直接结束今天这一轮。"
      : "做完上面 3 个动作后，今天这轮就可以结束。";

  completeLink.href = buildHref("/completion.html");
  completeLink.classList.toggle("is-disabled", !allDone);
  completeLink.setAttribute("aria-disabled", String(!allDone));
  completeLink.textContent = allDone ? "结束今天这轮训练" : `先完成 3 个动作（已完成 ${runState.completedActionIds.length}/3）`;

  completeLink.onclick = (event) => {
    if (!allDone) {
      event.preventDefault();
      document.querySelector("#training-finish-copy").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    writeState();
  };

  document.querySelectorAll("[data-action-start]").forEach((button) => {
    button.addEventListener("click", () => {
      const actionId = button.dataset.actionStart;
      const resourceId = button.dataset.resource;
      runState.activeActionId = actionId;
      runState.activeResourceId = resourceId;
      writeRunState();
      renderTrainingPage();
      document.querySelector(`#resource-${resourceId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-action-complete]").forEach((button) => {
    button.addEventListener("click", () => {
      const actionId = button.dataset.actionComplete;
      if (runState.completedActionIds.includes(actionId)) {
        runState.completedActionIds = runState.completedActionIds.filter((id) => id !== actionId);
      } else {
        runState.completedActionIds = [...runState.completedActionIds, actionId];
      }
      writeRunState();
      renderTrainingPage();
    });
  });

  document.querySelectorAll("[data-resource-start]").forEach((button) => {
    button.addEventListener("click", () => {
      const resourceId = button.dataset.resourceStart;
      const resource = resources.find((item) => item.id === resourceId);
      runState.activeResourceId = resourceId;
      if (!runState.activeActionId) {
        runState.activeActionId = actions.find((action) => action.resourceId === resourceId)?.id || null;
      }
      writeRunState();
      renderTrainingPage();
      if (resource?.speechText) speakText(resource.speechText);
      if (resource?.prompt) {
        document.querySelector(`#resource-${resourceId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
}

function renderCompletionPage() {
  const plan = getPlan();
  const actions = plan.actions[state.duration];
  document.querySelector("#completion-scene").textContent = `${plan.sceneCn} · ${plan.sceneEn}`;
  document.querySelector("#completion-key-line").textContent = plan.completion.keySentence;
  document.querySelector("#completion-next-time").textContent = durationEntryLabel(state.duration === 10 ? 20 : state.duration);
  document.querySelector("#completion-reflection").textContent = plan.completion.tomorrow;
  document.querySelector("#completion-steps").innerHTML = actions
    .map((action) => `<li>${escapeHtml(action.name)}</li>`)
    .join("");
}

function init() {
  writeState();
  const page = document.body.dataset.page;
  if (page === "entry") renderEntryPage();
  if (page === "training") renderTrainingPage();
  if (page === "completion") renderCompletionPage();
}

init();
