import { todos as initialTodos } from './data.js';

// 상수 정의
const TODO_STORAGE_KEY = 'todos';
const FILTER_TYPES = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete'
};

// 로컬 스토리지 관련 유틸 함수
function getTodos() {
  return JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];
}

function saveTodos(todos) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

// 현재 필터 상태를 저장하는 변수들
let currentFilter = FILTER_TYPES.ALL; // 기본 필터: 전체
let currentPriority = null; // 기본 중요도 필터: 없음

// 필터링된 할 일 목록 반환 함수
function getFilteredTodos() {
  const todos = getTodos();
  
  return todos.filter(todo => {
    // 완료/미완료 필터 적용
    if (currentFilter === FILTER_TYPES.COMPLETED && !todo.completed) return false;
    if (currentFilter === FILTER_TYPES.INCOMPLETE && todo.completed) return false;
    
    // 중요도 필터 적용
    if (currentPriority !== null && todo.priority !== currentPriority) return false;
    
    return true;
  });
}

// 투두 테이블 렌더링 기능
function renderTodoTable(todos = getTodos()) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  
  // DOM 업데이트 최적화를 위해 DocumentFragment 생성
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

// 드롭다운 관리 함수
function toggleDropdown(dropdown) {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function hideAllDropdowns() {
  // 중요도 필터 드롭다운 숨기기
  const filterDropdown = document.querySelector('.todo-filter__dropdown');
  if (filterDropdown) {
    filterDropdown.style.display = 'none';
  }
  
  // 중요도 선택 드롭다운 숨기기
  const priorityDropdown = document.getElementById('priority-dropdown');
  if (priorityDropdown) {
    priorityDropdown.style.display = 'none';
  }
}

// 필터 버튼 이벤트 설정 함수
function setupFilterButtons() {
  // 모든 필터 버튼 선택
  const filterButtons = document.querySelectorAll('.todo-filter__btn');
  
  // 이벤트 위임 대신 개별 버튼에 이벤트 리스너 등록
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterType = button.dataset.filter;
      
      // 중요도 버튼은 드롭다운 토글 기능만 수행
      if (filterType === 'priority') {
        const dropdown = document.querySelector('.todo-filter__dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        return;
      }
      
      // 버튼 활성화 상태 업데이트
      filterButtons.forEach(btn => {
        btn.classList.remove('todo-filter__btn--active');
      });
      button.classList.add('todo-filter__btn--active');
      
      // 필터 상태 업데이트
      currentFilter = filterType;
      // 전체 버튼 클릭 시 중요도 필터 초기화
      currentPriority = null;

      // 필터링된 목록으로 테이블 다시 렌더링
      renderTodoTable(getFilteredTodos());
    });
  });

  // 중요도 드롭다운 아이템에 이벤트 리스너 등록
  const priorityItems = document.querySelectorAll('.todo-filter__dropdown-item');
  priorityItems.forEach(item => {
    item.addEventListener('click', () => {
      const priority = parseInt(item.dataset.priority);
      
      // 중요도 필터 설정
      currentPriority = priority;
      currentFilter = FILTER_TYPES.ALL;

      // 버튼 활성화 상태 업데이트 - 전체 버튼을 활성화
      const filterButtons = document.querySelectorAll('.todo-filter__btn');
      filterButtons.forEach(btn => {
        btn.classList.remove('todo-filter__btn--active');
      });
      document.querySelector('.todo-filter__btn[data-filter="all"]').classList.add('todo-filter__btn--active');

      // 드롭다운 닫기
      document.querySelector('.todo-filter__dropdown').style.display = 'none';

      // 필터링된 목록으로 테이블 다시 렌더링
      renderTodoTable(getFilteredTodos());
    });
  });
}

// 할 일 추가 기능 설정 함수
function setupAddTodoForm() {
  // 필요한 DOM 요소 선택
  const todoInput = document.getElementById('todo-input');
  const priorityButton = document.getElementById('priority-button');
  const priorityDropdown = document.getElementById('priority-dropdown');
  const selectedPriorityText = document.getElementById('selected-priority');
  const addButton = document.getElementById('add-btn');
  
  // 사용자가 선택한 중요도 값 저장 변수
  let selectedPriority = null;
  
  // 중요도 선택 버튼 클릭 시 드롭다운 표시/숨김
  priorityButton.addEventListener('click', () => {
    priorityDropdown.style.display = priorityDropdown.style.display === 'block' ? 'none' : 'block';
  });
  
  // 중요도 드롭다운 아이템 선택 이벤트
  const priorityItems = document.querySelectorAll('.todo-input__priority-item');
  priorityItems.forEach(item => {
    item.addEventListener('click', () => {
      const priority = parseInt(item.dataset.value);
      
      // 선택된 중요도 업데이트
      selectedPriority = priority;
      selectedPriorityText.textContent = `중요도 ${selectedPriority}`;
      
      // 드롭다운 닫기
      priorityDropdown.style.display = 'none';
    });
  });
  
  // 추가 버튼 클릭 이벤트
  addButton.addEventListener('click', () => {
    const title = todoInput.value.trim();
    
    // 유효성 검사: 할 일 제목과 중요도 모두 입력되어야 함
    if (!title || !selectedPriority) {
      alert('할 일과 중요도를 모두 입력해주세요 !');
      return;
    }
    
    // 기존 할 일 목록 가져오기
    const todos = getTodos();
    
    // 새 할 일 객체 생성 (ID는 현재 최대 ID + 1)
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title,
      completed: false,
      priority: selectedPriority
    };
    
    // 할 일 목록에 추가 및 저장
    todos.push(newTodo);
    saveTodos(todos);
    
    // 입력 필드 초기화
    todoInput.value = '';
    selectedPriorityText.textContent = '중요도 선택';
    selectedPriority = null;
    
    // 테이블 다시 렌더링 (현재 필터 유지)
    renderTodoTable(getFilteredTodos());
  });
}

// 페이지 로드 완료 시 실행될 초기화 함수
document.addEventListener('DOMContentLoaded', () => {
  // 드롭다운 초기화
  hideAllDropdowns();

  // localStorage에 데이터가 없을 때만 초기화
  // 이미 데이터가 있으면 사용자가 수정한 데이터를 유지하기 위함 !!
  if (!localStorage.getItem(TODO_STORAGE_KEY)) {
    saveTodos(initialTodos);
  }

  // 필터 버튼 이벤트 등록
  setupFilterButtons();
  
  // 할 일 추가 폼 이벤트 등록
  setupAddTodoForm();
  
  // 초기 테이블 렌더링
  renderTodoTable();
});