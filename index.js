const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let originalImage = null;
const sliders = ['brightness','contrast','saturation','blur','grayscale','sepia'];
const presets = {
  none:     {brightness:100,contrast:100,saturation:100,blur:0,grayscale:0,sepia:0},
  vintage:  {brightness:110,contrast:85, saturation:75, blur:0,grayscale:0,sepia:40},
  cool:     {brightness:100,contrast:110,saturation:120,blur:0,grayscale:0,sepia:0},
  warm:     {brightness:110,contrast:105,saturation:130,blur:0,grayscale:0,sepia:20},
  fade:     {brightness:130,contrast:80, saturation:70, blur:0,grayscale:10,sepia:10},
  dramatic: {brightness:90, contrast:160,saturation:80, blur:0,grayscale:0,sepia:0}
};

function loadImage(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
      canvas.width = img.width;
      canvas.height = img.height;
      document.getElementById('upload-zone').style.display = 'none';
      document.getElementById('editor').classList.add('visible');
      applyFilters();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function applyFilters() {
  if (!originalImage) return;
  const b  = document.getElementById('brightness').value;
  const c  = document.getElementById('contrast').value;
  const s  = document.getElementById('saturation').value;
  const bl = document.getElementById('blur').value;
  const g  = document.getElementById('grayscale').value;
  const se = document.getElementById('sepia').value;
  ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%) blur(${bl}px) grayscale(${g}%) sepia(${se}%)`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(originalImage, 0, 0);
}

sliders.forEach(id => {
  const input = document.getElementById(id);
  const label = document.getElementById('val-' + id);
  input.addEventListener('input', () => {
    label.textContent = input.value;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-filter="none"]').classList.add('active');
    applyFilters();
  });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const values = presets[btn.dataset.filter];
    if (!values) return;
    sliders.forEach(id => {
      document.getElementById(id).value = values[id];
      document.getElementById('val-' + id).textContent = values[id];
    });
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
});

function resetAll() {
  const d = {brightness:100,contrast:100,saturation:100,blur:0,grayscale:0,sepia:0};
  sliders.forEach(id => {
    document.getElementById(id).value = d[id];
    document.getElementById('val-' + id).textContent = d[id];
  });
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-filter="none"]').classList.add('active');
  applyFilters();
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'onigi-edit.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function changeImage() {
  cancelCrop();
  document.getElementById('editor').classList.remove('visible');
  document.getElementById('upload-zone').style.display = 'block';
  originalImage = null;
  resetAll();
}

document.getElementById('file-input').addEventListener('change', e => {
  if (e.target.files[0]) loadImage(e.target.files[0]);
});

const zone = document.getElementById('upload-zone');
zone.addEventListener('dragover', e => { e.preventDefault(); });
zone.addEventListener('drop', e => {
  e.preventDefault();
  if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]);
});

const overlay  = document.getElementById('crop-overlay');
const cropRect = document.getElementById('crop-rect');
let cropping = false;
let drag = { active: false, startX: 0, startY: 0, x: 0, y: 0, w: 0, h: 0 };

function toggleCrop() {
  if (cropping) { cancelCrop(); return; }
  cropping = true;
  overlay.classList.add('active');
  document.getElementById('btn-crop').classList.add('cropping');
  document.getElementById('btn-crop').textContent = 'cancel crop';
}

function cancelCrop() {
  cropping = false;
  drag = { active: false, startX: 0, startY: 0, x: 0, y: 0, w: 0, h: 0 };
  overlay.classList.remove('active');
  cropRect.style.display = 'none';
  document.getElementById('crop-actions').style.display = 'none';
  document.getElementById('btn-crop').classList.remove('cropping');
  document.getElementById('btn-crop').textContent = 'crop';
}

overlay.addEventListener('mousedown', e => {
  const r = overlay.getBoundingClientRect();
  drag.startX = e.clientX - r.left;
  drag.startY = e.clientY - r.top;
  drag.active = true;
  cropRect.style.display = 'block';
  document.getElementById('crop-actions').style.display = 'none';
  updateRect(drag.startX, drag.startY, 0, 0);
});

overlay.addEventListener('mousemove', e => {
  if (!drag.active) return;
  const r = overlay.getBoundingClientRect();
  const cx = e.clientX - r.left;
  const cy = e.clientY - r.top;
  const x = Math.min(cx, drag.startX);
  const y = Math.min(cy, drag.startY);
  const w = Math.abs(cx - drag.startX);
  const h = Math.abs(cy - drag.startY);
  drag.x = x; drag.y = y; drag.w = w; drag.h = h;
  updateRect(x, y, w, h);
});

overlay.addEventListener('mouseup', () => {
  if (!drag.active) return;
  drag.active = false;
  if (drag.w > 5 && drag.h > 5) {
    document.getElementById('crop-actions').style.display = 'block';
  }
});

function updateRect(x, y, w, h) {
  cropRect.style.left   = x + 'px';
  cropRect.style.top    = y + 'px';
  cropRect.style.width  = w + 'px';
  cropRect.style.height = h + 'px';
}

function confirmCrop() {
  const displayW = canvas.offsetWidth;
  const displayH = canvas.offsetHeight;
  const scaleX = canvas.width  / displayW;
  const scaleY = canvas.height / displayH;

  const sx = Math.round(drag.x * scaleX);
  const sy = Math.round(drag.y * scaleY);
  const sw = Math.round(drag.w * scaleX);
  const sh = Math.round(drag.h * scaleY);

  const tmp = document.createElement('canvas');
  tmp.width  = sw;
  tmp.height = sh;
  const tctx = tmp.getContext('2d');
  tctx.drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);

  const cropped = new Image();
  cropped.onload = () => {
    originalImage = cropped;
    canvas.width  = sw;
    canvas.height = sh;
    applyFilters();
    cancelCrop();
  };
  cropped.src = tmp.toDataURL();
}