import { todos as initialTodos } from './data.js';

const TODO_STORAGE_KEY = 'todos';

function getTodos() {
  return JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];
}

function saveTodos(todos) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

// 투두 테이블 렌더링 기능
function renderTodoTable(todos = getTodos()) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  
  // DOM 업데이트 최적화를 위해 DocumentFragment 생성
  // 여러 요소를 한 번에 추가하여 리렌더링 횟수를 줄임
  const fragment = document.createDocumentFragment();
  
  todos.forEach(todo => {
    const row = document.createElement('tr');
    row.dataset.id = todo.id;
    
    row.innerHTML = `
      <td>
        <input type="checkbox" class="todo-table__checkbox">
      </td>
      <td>${'⭐'.repeat(todo.priority)}</td>
      <td>${todo.completed ? '✅' : '❌'}</td>
      <td class="${todo.completed ? 'todo-table__completed' : ''}">${todo.title}</td>
    `;
    
    fragment.appendChild(row);
  });
  
  todoList.appendChild(fragment);
}

// 페이지 로드 완료 시 실행될 초기화 함수
document.addEventListener('DOMContentLoaded', () => {
  // localStorage에 데이터가 없을 때만 초기화
  // 이미 데이터가 있으면 사용자가 수정한 데이터를 유지하기 위함 !!
  if (!localStorage.getItem(TODO_STORAGE_KEY)) {
    saveTodos(initialTodos);
  }
  renderTodoTable();
});