function showContent(section) {
    // Ocultar todos los paneles
    const panels = document.querySelectorAll('.content-panel');
    panels.forEach(panel => panel.classList.add('hidden'));
  
    // Mostrar el panel seleccionado
    const selectedPanel = document.getElementById(section);
    selectedPanel.classList.remove('hidden');
  
    // Quitar clase activa de todos los botones
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
  
    // Agregar clase activa al botón seleccionado
    const activeButton = document.querySelector(`.tab-button[onclick="showContent('${section}')"]`);
    activeButton.classList.add('active');
  }
  