for (let i = 0; i < 5; i++) { // Здесь 5 - это количество элементов
    let newCanvas = document.createElement("canvas");
    newCanvas.id = `canvas-${i}`; // Присваиваем уникальный id каждому элементу
    document.body.appendChild(newCanvas); // Добавляем созданный элемент на страницу
  }
  