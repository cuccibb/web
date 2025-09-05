(() => {
  const APP_ID = "Slither.io - Free Cheat";
  const EXISTING = document.getElementById(APP_ID);
  if (EXISTING) {
    EXISTING.remove();
    document.getElementById(APP_ID + "_style")?.remove();
  }
  const storage = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
    }
  };
  const createEl = (tag, opts = {}) => {
    const el = document.createElement(tag);
    Object.assign(el, opts);
    return el;
  };
  const now = () => new Date().toLocaleTimeString();
  function showToast(msg) {
    const t = createEl("div");
    t.className = "sfh-toast";
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 1400);
  }
  function logLine(text) {
    const line = createEl("div");
    line.className = "sfh-log-line";
    line.textContent = `[${now()}] ${text}`;
    logWrap.appendChild(line);
    logWrap.scrollTop = logWrap.scrollHeight;
    console.log("%c[SlitherFakeHack]", "color:#8b5cf6", text);
  }
  const style = document.createElement("style");
  style.id = APP_ID + "_style";
  style.textContent = `
  @keyframes sfh-pop { from { transform: scale(.98); opacity: .8; } to { transform: scale(1); opacity: 1; } }
  #${APP_ID} {
    position: fixed; top: 24px; left: 24px; z-index: 999999;
    width: 340px; max-width: calc(100vw - 32px);
    color: #e5e7eb; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial;
    user-select: none; backdrop-filter: blur(12px);
    background: rgba(17, 17, 22, .72);
    border: 1px solid rgba(148,163,184,.18);
    border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,.45);
    overflow: hidden; animation: sfh-pop .15s ease-out;
  }
  #${APP_ID}.hidden { display: none !important; }
  .sfh-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 14px; background: linear-gradient(180deg, rgba(31,31,38,.9), rgba(17,17,22,.85));
    border-bottom: 1px solid rgba(148,163,184,.18); cursor: move;
  }
  .sfh-title { font-weight: 700; letter-spacing: .3px; font-size: 14px; color: #fafafa; }
  .sfh-badge { font-size: 11px; padding: 2px 8px; border-radius: 999px; background: rgba(139,92,246,.2); color: #c4b5fd; margin-left: 8px; }
  .sfh-actions { display: flex; gap: 6px; }
  .sfh-btn {
    appearance: none; border: 1px solid rgba(148,163,184,.18);
    background: rgba(255,255,255,.04); color: #e5e7eb;
    border-radius: 10px; padding: 6px 10px; font-size: 12px; cursor: pointer;
  }
  .sfh-btn:hover { background: rgba(255,255,255,.07); }
  .sfh-btn.danger { border-color: rgba(239,68,68,.35); color: #fecaca; }
  .sfh-body { padding: 12px; display: grid; gap: 12px; }
  .sfh-section { border: 1px dashed rgba(148,163,184,.18); border-radius: 12px; padding: 10px; }
  .sfh-section h4 { margin: 0 0 8px 0; font-size: 12px; letter-spacing: .3px; color: #cbd5e1; font-weight: 700; }
  .sfh-row { display: flex; align-items: center; justify-content: space-between; padding: 8px; border-radius: 10px; }
  .sfh-row:hover { background: rgba(255,255,255,.04); }
  .sfh-row label { font-size: 13px; color: #e5e7eb; }
  .sfh-toggle {
    width: 44px; height: 24px; border-radius: 999px; position: relative; background: #1f2937; border: 1px solid rgba(148,163,184,.25); cursor: pointer; flex-shrink: 0;
  }
  .sfh-toggle input { display: none; }
  .sfh-toggle .knob {
    position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%;
    background: #9ca3af; transition: all .18s ease; box-shadow: 0 2px 6px rgba(0,0,0,.25);
  }
  .sfh-toggle input:checked + .knob { left: 24px; background: #a78bfa; box-shadow: 0 0 0 2px rgba(167,139,250,.35); }
  .sfh-kbd { font: 600 10px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; color: #cbd5e1; opacity: .9; }
  .sfh-slider { width: 130px; accent-color: #a78bfa; }
  .sfh-mini { font-size: 11px; color: #94a3b8; margin-top: 6px; }
  .sfh-log {
    height: 100px; overflow: auto; background: rgba(2,6,23,.35);
    border: 1px solid rgba(148,163,184,.18); border-radius: 10px; padding: 8px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Courier New", monospace; font-size: 11px; color: #d1d5db;
  }
  .sfh-log-line { padding: 2px 0; white-space: pre-wrap; }
  .sfh-footer { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px 12px; }
  .sfh-note { font-size: 10px; color: #94a3b8; opacity: .9; }
  .sfh-toast {
    position: fixed; left: 50%; top: 60px; transform: translateX(-50%) translateY(-8px);
    background: rgba(31,41,55,.95); color: #e5e7eb; font-weight: 700;
    border: 1px solid rgba(148,163,184,.25); border-radius: 999px; padding: 10px 16px;
    z-index: 1000000; opacity: 0; transition: transform .15s ease, opacity .15s ease;
    pointer-events: none; letter-spacing: .3px;
  }
  .sfh-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  .sfh-chip {
    display:inline-flex; align-items:center; gap:6px; padding:4px 8px; border-radius:999px;
    background: rgba(99,102,241,.18); color:#c7d2fe; border:1px solid rgba(99,102,241,.25); font-size:11px;
  }
  `;
  document.head.appendChild(style);
  const root = createEl("div", { id: APP_ID });
  document.body.appendChild(root);
  const saved = storage.get("sfh_pos", { x: 24, y: 24 });
  root.style.left = (saved.x ?? 24) + "px";
  root.style.top = (saved.y ?? 24) + "px";
  const header = createEl("div", { className: "sfh-header" });
  const leftHead = createEl("div", { style: "display:flex;align-items:center;gap:8px;" });
  const title = createEl("div", { className: "sfh-title", textContent: "Slither.io Hack Menu" });
  const badge = createEl("span", { className: "sfh-badge", textContent: "FAKE / PARODY" });
  leftHead.appendChild(title); leftHead.appendChild(badge);
  const headActions = createEl("div", { className: "sfh-actions" });
  const minimizeBtn = createEl("button", { className: "sfh-btn", title: "Minimize (Shift+H)", textContent: "–" });
  const closeBtn = createEl("button", { className: "sfh-btn danger", title: "Remove UI", textContent: "×" });
  headActions.append(minimizeBtn, closeBtn);
  header.append(leftHead, headActions);
  root.appendChild(header);
  let dragging = false, offsetX = 0, offsetY = 0;
  header.addEventListener("mousedown", (e) => {
    dragging = true;
    const rect = root.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.body.style.userSelect = "none";
  });
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const x = Math.max(8, Math.min(window.innerWidth - root.offsetWidth - 8, e.clientX - offsetX));
    const y = Math.max(8, Math.min(window.innerHeight - 48, e.clientY - offsetY));
    root.style.left = x + "px";
    root.style.top = y + "px";
  });
  window.addEventListener("mouseup", () => {
    if (dragging) {
      dragging = false;
      storage.set("sfh_pos", { x: parseInt(root.style.left), y: parseInt(root.style.top) });
      document.body.style.userSelect = "";
    }
  });
  minimizeBtn.addEventListener("click", () => {
    body.style.display = body.style.display === "none" ? "grid" : "none";
  });
  closeBtn.addEventListener("click", () => {
    root.remove(); style.remove();
    showToast("Fake Hack UI removed");
  });
  const body = createEl("div", { className: "sfh-body" });
  root.appendChild(body);
  const sectionToggles = createEl("div", { className: "sfh-section" });
  sectionToggles.appendChild(createEl("h4", { textContent: "Quick Toggles" }));
  const makeToggle = (labelText, key) => {
    const row = createEl("div", { className: "sfh-row" });
    const label = createEl("label", { textContent: labelText });
    const toggle = createEl("label", { className: "sfh-toggle" });
    const input = createEl("input", { type: "checkbox" });
    const knob = createEl("span", { className: "knob" });
    toggle.append(input, knob);
    row.append(label, toggle);
    input.addEventListener("change", () => {
      if (input.checked) {
        showToast(`${labelText}: ACTIVATED`);
        logLine(`${labelText} enabled (fake)`);
      } else {
        showToast(`${labelText}: DISABLED`);
        logLine(`${labelText} disabled (fake)`);
      }
      storage.set(`sfh_toggle_${key}`, input.checked);
    });
    const saved = storage.get(`sfh_toggle_${key}`, false);
    input.checked = saved;
    if (saved) setTimeout(() => logLine(`${labelText} restored ON (fake)`), 10);
    return row;
  };
  const toggles = [
    ["Infinite Mass", "mass"],
    ["Teleport", "tp"],
    ["Zoom Hack", "zoom"],
    ["Skin Unlocker", "skin"],
    ["Radar ESP", "esp"],
    ["Godmode (No Death)", "god"],
    ["Leaderboard Spoofer", "lb"]
  ];
  toggles.forEach(([name, key]) => sectionToggles.appendChild(makeToggle(name, key)));
  body.appendChild(sectionToggles);
  const sectionSliders = createEl("div", { className: "sfh-section" });
  sectionSliders.appendChild(createEl("h4", { textContent: "Tunables" }));
  const makeSlider = (labelText, key, min, max, step, def, suffix = "x") => {
    const row = createEl("div", { className: "sfh-row" });
    const left = createEl("div", { style: "display:flex;flex-direction:column;" });
    const label = createEl("label", { textContent: labelText });
    const hint = createEl("div", { className: "sfh-mini", textContent: "Fake value (visual only)" });
    left.append(label, hint);
    const right = createEl("div", { style: "display:flex; align-items:center; gap:10px;" });
    const val = storage.get(`sfh_slider_${key}`, def);
    const slider = createEl("input", { type: "range", min, max, step, value: val, className: "sfh-slider" });
    const out = createEl("div", { className: "sfh-chip", textContent: `${val}${suffix}` });
    slider.addEventListener("input", () => {
      out.textContent = `${slider.value}${suffix}`;
    });
    slider.addEventListener("change", () => {
      storage.set(`sfh_slider_${key}`, slider.value);
      logLine(`${labelText} set to ${slider.value}${suffix} (fake)`);
    });
    right.append(slider, out);
    row.append(left, right);
    return row;
  };
  sectionSliders.append(
    makeSlider("Speed Multiplier", "speed", 1, 5, 0.5, 1, "x"),
    makeSlider("Snake Size", "size", 1, 10, 1, 3, "x"),
    makeSlider("Zoom Level", "zoomlvl", 1, 8, 0.5, 2, "x")
  );
  body.appendChild(sectionSliders);
  const sectionActions = createEl("div", { className: "sfh-section" });
  sectionActions.appendChild(createEl("h4", { textContent: "Actions" }));
  const actionsRow = createEl("div", { style: "display:flex; gap:8px; flex-wrap:wrap;" });
  const mkAction = (text, cb, cls = "") => {
    const b = createEl("button", { className: `sfh-btn ${cls}`, textContent: text });
    b.addEventListener("click", cb);
    return b;
  };
  const activateAll = mkAction("Activate All", () => {
    [...root.querySelectorAll(".sfh-toggle input")].forEach(inp => { if (!inp.checked) inp.click(); });
    showToast("All hacks activated (fake)");
    logLine("All toggles ON (fake)");
  });
  const deactivateAll = mkAction("Deactivate All", () => {
    [...root.querySelectorAll(".sfh-toggle input")].forEach(inp => { if (inp.checked) inp.click(); });
    showToast("All hacks disabled (fake)");
    logLine("All toggles OFF (fake)");
  });
  const spawnFood = mkAction("Spawn Food", () => {
    showToast("Spawning 1,000 food… (jk)");
    logLine("Spawn Food requested → denied by anti-cheat (fake)");
  });
  const randomSkin = mkAction("Randomize Skin", () => {
    showToast("Skin randomized (visual only)");
    logLine("Skin randomized (fake)");
  });
  const panic = mkAction("Panic (Hide UI)", () => {
    root.classList.add("hidden");
    showToast("UI hidden (Shift+H to show)");
  }, "danger");
  actionsRow.append(activateAll, deactivateAll, spawnFood, randomSkin, panic);
  sectionActions.appendChild(actionsRow);
  body.appendChild(sectionActions);
  const logBox = createEl("div", { className: "sfh-section" });
  logBox.appendChild(createEl("h4", { textContent: "Event Log" }));
  const logWrap = createEl("div", { className: "sfh-log" });
  logBox.appendChild(logWrap);
  body.appendChild(logBox);
  const footer = createEl("div", { className: "sfh-footer" });
  const note = createEl("div", { className: "sfh-note", innerHTML: "This UI is a <b>mock/parody</b>. It does not alter gameplay." });
  const hotkey = createEl("div", { className: "sfh-kbd", textContent: "Hotkey: Shift + H" });
  footer.append(note, hotkey);
  root.appendChild(footer);
  logLine("UI injected successfully.");
  logLine("Remember: This is a fake hack menu for fun.");
  showToast("Slither Fake Hack loaded");
  window.addEventListener("keydown", (e) => {
    if (e.shiftKey && (e.key === "H" || e.key === "h")) {
      root.classList.toggle("hidden");
      if (!root.classList.contains("hidden")) showToast("UI shown");
    }
  });
})();
