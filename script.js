// Get the viewer
const viewer = document.querySelector('#brainModel');

// Store initial camera target/orbit
let initialCameraTarget;
let initialCameraOrbit;

viewer.addEventListener("load", () => {
  // Save starting camera state
  initialCameraTarget = viewer.getCameraTarget();
  initialCameraOrbit = viewer.getCameraOrbit();
});

// Highlight part
function highlightPart(el, part) {
  // Hide all hotspots
  document.querySelectorAll('.hotspot').forEach(b => {
    b.classList.remove('active');
  });
  
  // Show the clicked one
  el.classList.add('active');

  // Move camera
  moveToPart(part);
}

// Highlight via button
function highlightViaButton(part) {
  const hotspot = document.querySelector(`[slot="hotspot-${part}"]`);
  if (hotspot) highlightPart(hotspot, part);
}

// Move camera
function moveToPart(part) {
  switch (part) {
    case 'frontal':
      viewer.cameraTarget = '0 1 0';
      viewer.cameraOrbit = '160deg 40deg 2.3m';
      break;
    case 'parietal':
      viewer.cameraTarget = '0 0.1 0';
      viewer.cameraOrbit = '0deg 60deg 2.3m';
      break;
    case 'temporal':
      viewer.cameraTarget = '0.1 -0.05 0';
      viewer.cameraOrbit = '-70deg 90deg 2.3m';
      break;
    case 'occipital':
      viewer.cameraTarget = '-0.1 0.05 -0.1';
      viewer.cameraOrbit = '180deg 95deg 2.3m';
      break;
    case 'cerebellum':
      viewer.cameraTarget = '0 -0.15 -0.15';
      viewer.cameraOrbit = '-180deg 120deg 2.3m';
      break;
    case 'stem':
      viewer.cameraTarget = '0 -0.15 -0.15';
      viewer.cameraOrbit = '0deg 190deg 2.3m';
      break;
  }
}

// Button handlers
const buttons = document.querySelectorAll('.lobe-button');
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    buttons.forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');

    const lobe = e.currentTarget.getAttribute('data-lobe');
    highlightViaButton(lobe);
  });
});

// Reset camera
const resetBtn = document.getElementById('resetCameraBtn');
resetBtn.addEventListener('click', async () => {
  viewer.cameraTarget = initialCameraTarget.toString();
  viewer.cameraOrbit = initialCameraOrbit.toString();
  await viewer.jumpCameraToGoal();

  // Clear active state
  buttons.forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.hotspot').forEach(b => {
    b.classList.remove('active');
  });
});
const brainInfo = {
  frontal: "The Frontal Lobe is responsible for reasoning, planning, and controlling voluntary movements. It governs emotions, problem-solving, and speech production. It also plays a vital role in shaping our personality and making complex decisions.",
  parietal: "The Parietal Lobe processes sensory information such as touch, pressure, and pain. It assists with spatial orientation, navigation, and understanding language. Its role is crucial for integrating sensory inputs into a coherent picture.",
  temporal: "The Temporal Lobe is vital for processing auditory information and understanding language. It's deeply involved in forming memories and interpreting emotions, making it central for both learning and communication.",
  occipital: "The Occipital Lobe is primarily responsible for visual processing, interpreting shapes, colors, and motion. It connects with other brain areas to help us recognize objects and understand the world we see.",
  cerebellum: "The Cerebellum coordinates voluntary movements, maintains balance, and refines motor skills. It plays a role in motor learning, making movements smooth and precise. Without it, basic activities like walking or writing would be challenging.",
  stem: "The Brain Stem controls vital life-sustaining functions such as breathing, heart rate, and blood pressure. It acts as a relay center, connecting the brain to the spinal cord, and governs essential reflexes like swallowing, coughing, and sleeping. Its role is crucial for survival and maintaining consciousness."
};
// innerText.innerHTML = brainInfo.frontal;



const displayDiv = document.querySelector('.innerText');
let typingTimeouts = [];

// Main click listener
document.querySelectorAll('.lobe-button').forEach(button => {
  button.addEventListener('click', e => {
    const part = e.currentTarget.getAttribute('data-lobe');
    if (brainInfo[part]) {
      cancelTyping();
      typeWriter(brainInfo[part]);
    }
  });
});

// Cancel any ongoing typing
function cancelTyping() {
  typingTimeouts.forEach(timeout => clearTimeout(timeout));
  typingTimeouts = [];
}

// Typing animation
function typeWriter(text) {
  displayDiv.innerHTML = ""; 
  let index = 0;

  function addCharacter() {
    if (index < text.length) {
      displayDiv.innerHTML += text[index];
      index++;
      typingTimeouts.push(setTimeout(addCharacter, 20));
    }
  }
  addCharacter();
}
// const heartModel = document.querySelector('#heart-model');

const heartModel = document.querySelector('#heart-model');

// Camera angles/distances for every heart part
const heartPartPositions = {
  "right-atrium": "250deg 70deg 2.2m",
  "left-atrium": "-30deg 60deg 1.5m",
  "right-ventricle": "30deg 55deg 1.5m",
  "left-ventricle": "-30deg 55deg 1.5m",
  "tricuspid-valve": "25deg 65deg 1.5m",
  "pulmonary-valve": "15deg 55deg 1.5m",
  "mitral-valve": "-25deg 65deg 1.5m",
  "aortic-valve": "-15deg 55deg 1.5m",
  "aorta": "0deg 30deg 2m",
  "pulmonary-artery": "0deg 40deg 1.5m",
  "pulmonary-veins": "0deg 60deg 1.5m",
  "septum": "0deg 90deg 1.5m",
  "sa-node": "45deg 80deg 1.5m",
  "av-node": "30deg 80deg 1.5m"
};

function highlightHeartPart(button, part) {
  // Move camera
  heartModel.setAttribute('camera-orbit', heartPartPositions[part]);

  // Reset any active labels
  document.querySelectorAll('#heart-model .heart-label')
    .forEach(label => label.classList.remove('active'));

  // Highlight only if it's an internal hotspot
  if (button && button.querySelector('.heart-label')) {
    button.querySelector('.heart-label').classList.add('active');
  }
}

// Handle clicks from external buttons
document.querySelectorAll('#heart-buttons button').forEach(button => {
  button.addEventListener('click', e => {
    const part = e.currentTarget.getAttribute('data-part');
    if (heartPartPositions[part]) {
      highlightHeartPart(null, part);
    }
  });
});
// ==================== HEART MODEL CAMERA HANDLERS =====================

// Get the model viewer element

function highlightHeartPartForHeart(button, part) {
  // Save the camera position if this is the first click
  if (!heartInitialOrbit) {
    heartInitialOrbit = heartModelViewer.getAttribute('camera-orbit');
  }

  // Move the camera
  heartModelViewer.setAttribute('camera-orbit', heartPartPositions[part]);

  // Highlight label
  if (button && button.querySelector('.heart-label')) {
    document.querySelectorAll('#heart-model .heart-label')
      .forEach(label => label.classList.remove('active'));
    button.querySelector('.heart-label')?.classList.add('active');
  }
}


const heartModelViewer = document.querySelector('#heart-model');
const initialHeartOrbit = heartModelViewer.getAttribute('camera-orbit');
const heartResetButton = document.querySelector('#reset-camera');
heartResetButton.addEventListener('click', () => {
  heartModelViewer.setAttribute('camera-orbit', initialHeartOrbit);
});
// External Buttons Click
const externalButtons = document.querySelectorAll('#heart-buttons button');
externalButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const part = e.currentTarget.getAttribute('data-part');

    // Hide all hotspots first
    document.querySelectorAll('.heart-hotspot')
      .forEach(hotspot => hotspot.classList.remove('visible'));

    // Find and show the specific hotspot
    const targetHotspot = document.querySelector(`.heart-hotspot[data-part="${part}"]`);
    if (targetHotspot) {
      targetHotspot.classList.add('visible');
    }
  });
});
// Get all hotspot

// All your hotspots now have their position set properly.


