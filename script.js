// viewer.autoRotate = false;

  const viewer = document.querySelector('#brainModel');
  let rotationActive = true;

  function highlightPart(el, part) {
    // Remove highlights
    document.querySelectorAll('.label').forEach(label => label.classList.remove('active'));

    el.querySelector('.label')?.classList.add('active');

    rotationActive = false;
    moveToPart(part);
  }

  function highlightViaButton(part) {
    const hotspot = document.querySelector(`[slot="hotspot-${part}"]`);
    if (hotspot) highlightPart(hotspot, part);
  }

  function moveToPart(part) {
    switch (part) {
      case 'frontal':
        viewer.cameraTarget = '0 1 0';
viewer.cameraOrbit = '160deg 40deg 1.8m';
        break;
      case 'parietal':
        viewer.cameraTarget = '0 0.1 0';
        viewer.cameraOrbit = '0deg 60deg 1.8m';
        break;
      case 'temporal':
        viewer.cameraTarget = '0.1 -0.05 0';
        viewer.cameraOrbit = '-70deg 90deg 1.8m';
        break;
      case 'occipital':
        viewer.cameraTarget = '-0.1 0.05 -0.1';
        viewer.cameraOrbit = '180deg 95deg 1.8m';
        break;
      case 'cerebellum':
        viewer.cameraTarget = '0 -0.15 -0.15';
        viewer.cameraOrbit = '-180deg 120deg 1.8m';
        break;
        case 'stem':
        viewer.cameraTarget = '0 -0.15 -0.15';
        viewer.cameraOrbit = ' 0deg 190deg 1m';
        break;
    }
  }
