export function initErrorsTracker(url) {
  window.onerror = function (message, source, lineno, colno, error) {
    // Собираем информацию об ошибке
    const errorData = {
      message: message,                    // Текст сообщения об ошибке
      source: source,                      // Файл, в котором произошла ошибка
      lineno: lineno,                      // Номер строки, в которой произошла ошибка
      colno: colno,                        // Номер столбца, в котором произошла ошибка
      timestamp: new Date().toISOString(), // Текущая дата и время ошибки
      stack: error ? error.stack : null,   // стек вызовов, если есть
      name: error ? error.name : null,     // имя ошибки, если есть
    };
    const body = JSON.stringify(errorData);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body,
    });
  }
}
