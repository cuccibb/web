(() => {
  const APP_ID = "Spoofer";
  if (document.getElementById(APP_ID)) return;

  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const load = (k, d) => {
    try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; }
  };

  const root = document.createElement("div");
  root.id = APP_ID;
  root.style.cssText = `
    position: fixed;
    top: 40px; left: 40px;
    z-index: 2147483647; 
    width: 320px;
    background: rgba(20,20,25,.9);
    border: 1px solid rgba(255,255,255,.15);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,.4);
    font-family: ui-sans-serif, system-ui, Segoe UI, Roboto, Inter, sans-serif;
    color: #eee; user-select: none; overflow: hidden;
  `;

  const header = document.createElement("div");
  header.textContent = "Hack Menu (test only)";
  header.style.cssText = `
    padding: 8px 12px;
    background: rgba(30,30,40,.95);
    font-weight: bold;
    cursor: move;
    font-size: 14px;
  `;
  root.appendChild(header);

  const body = document.createElement("div");
  body.style.cssText = "padding: 10px; display: grid; gap: 8px;";
  root.appendChild(body);

  const mkToggle = (name, key, cb) => {
    const wrap = document.createElement("label");
    wrap.style.cssText = "display:flex;justify-content:space-between;align-items:center;padding:6px 4px;";
    const span = document.createElement("span");
    span.textContent = name;
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = load("hack_"+key, false);
    input.onchange = () => {
      save("hack_"+key, input.checked);
      cb?.(input.checked);
    };
    wrap.append(span, input);
    body.appendChild(wrap);
  };

  const mkSlider = (name, key, min, max, def, cb) => {
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;flex-direction:column;gap:4px;";
    const label = document.createElement("div");
    label.textContent = name;
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = min; slider.max = max;
    slider.value = load("hack_"+key, def);
    slider.oninput = () => {
      save("hack_"+key, slider.value);
      cb?.(+slider.value);
    };
    wrap.append(label, slider);
    body.appendChild(wrap);
  };

  mkToggle("Godmode", "god", (on) => console.log("Godmode", on));
  mkToggle("Zoom Hack", "zoom", (on) => console.log("Zoom", on));
  mkSlider("Speed Multiplier", "speed", 1, 5, 1, (val) => console.log("Speed", val));

  document.body.appendChild(root);

  // restore position
  const savedPos = load("hack_ui_pos", {x:40,y:40});
  root.style.left = savedPos.x+"px";
  root.style.top = savedPos.y+"px";

  // dragging
  let drag = false, offX=0, offY=0;
  header.addEventListener("mousedown", e=>{
    drag=true;
    offX=e.clientX-root.offsetLeft;
    offY=e.clientY-root.offsetTop;
    e.preventDefault();
  });
  window.addEventListener("mousemove", e=>{
    if(!drag) return;
    let x=e.clientX-offX, y=e.clientY-offY;
    x=Math.max(0,Math.min(window.innerWidth-root.offsetWidth,x));
    y=Math.max(0,Math.min(window.innerHeight-root.offsetHeight,y));
    root.style.left=x+"px"; root.style.top=y+"px";
  });
  window.addEventListener("mouseup", ()=>{
    if(drag){
      drag=false;
      save("hack_ui_pos",{x:parseInt(root.style.left),y:parseInt(root.style.top)});
    }
  });
})();
