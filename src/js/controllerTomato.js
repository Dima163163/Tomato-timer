export class ControllerTomato {
  // Получение задач из localStorage
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  // Запись задачи в localStorage
  setLocalStorage(item) {
    this.data = this.getLocalStorage();
    this.data.push(item);
    localStorage.setItem('tasks', JSON.stringify(this.data));
  }

  // Отчистка localStorage
  removeLocalStorage(id) {
    this.data = this.getLocalStorage();
    const newData = this.data.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(newData));
  }

  // Исправление задачи в localStorage
  editLocalStorage = (id, title) => {
    this.data = this.getLocalStorage();
    const newData = this.data.map(task => (task.id === id ? {...task, title} : task));
    localStorage.setItem('tasks', JSON.stringify(newData));
  }
}