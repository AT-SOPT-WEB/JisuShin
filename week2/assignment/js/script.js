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

// 선택된 할 일들의 ID를 반환하는 함수
function getSelectedTodoIds() {
  const selectedCheckboxes = document.querySelectorAll('.todo-table__checkbox:checked');
  return Array.from(selectedCheckboxes).map(checkbox => {
    return parseInt(checkbox.closest('tr').dataset.id);
  });
}

// 투두 테이블 렌더링 기능
function renderTodoTable(todos = getFilteredTodos()) {
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
  
  // 체크박스 이벤트 리스너 등록
  setupCheckboxListeners();
}

// 체크박스 이벤트 리스너 설정
function setupCheckboxListeners() {
  const checkboxes = document.querySelectorAll('.todo-table__checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      // 삭제/완료 버튼 활성화 여부 업데이트
      updateActionButtonsState();
    });
  });
}

// 삭제/완료 버튼 상태 업데이트
function updateActionButtonsState() {
  const selectedIds = getSelectedTodoIds();
  const deleteBtn = document.getElementById('delete-btn');
  const completeBtn = document.getElementById('complete-btn');
  
  // 선택된 항목이 있을 때만 버튼 활성화
  if (selectedIds.length > 0) {
    deleteBtn.disabled = false;
    completeBtn.disabled = false;
    deleteBtn.classList.add('todo-actions__btn--active');
    completeBtn.classList.add('todo-actions__btn--active');
  } else {
    deleteBtn.disabled = true;
    completeBtn.disabled = true;
    deleteBtn.classList.remove('todo-actions__btn--active');
    completeBtn.classList.remove('todo-actions__btn--active');
  }
}

// 모달 관련 함수
function showModal() {
  const modal = document.getElementById('already-completed-modal');
  modal.style.display = 'flex';
}

function hideModal() {
  const modal = document.getElementById('already-completed-modal');
  modal.style.display = 'none';
  
  // 모달창 닫을 때 모든 체크박스 해제
  uncheckAllTodos();
}

// 모든 체크박스 해제 함수
function uncheckAllTodos() {
  const checkboxes = document.querySelectorAll('.todo-table__checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // 삭제/완료 버튼 상태 업데이트
  updateActionButtonsState();
}

// 중요도 선택 드롭다운 숨기기 함수
function hideAllDropdowns() {
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
  const priorityFilter = document.getElementById('priority-filter');
  
  // 이벤트 위임 대신 개별 버튼에 이벤트 리스너 등록
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterType = button.dataset.filter;
      
      // 버튼 활성화 상태 업데이트
      filterButtons.forEach(btn => {
        btn.classList.remove('todo-filter__btn--active');
      });
      button.classList.add('todo-filter__btn--active');
      
      // 필터 상태 업데이트
      currentFilter = filterType;
      // 필터 버튼 클릭 시 중요도 필터 초기화
      currentPriority = null;
      
      // 모든 필터 버튼 클릭 시 중요도 select 초기화
      priorityFilter.selectedIndex = 0; // 첫 번째 옵션(중요도)으로 초기화

      // 필터링된 목록으로 테이블 다시 렌더링
      renderTodoTable(getFilteredTodos());
    });
  });

  // 중요도 select 엘리먼트에 이벤트 리스너 등록
  priorityFilter.addEventListener('change', () => {
    const priority = priorityFilter.value ? parseInt(priorityFilter.value) : null;
    
    // 중요도 필터 설정
    currentPriority = priority;
    currentFilter = FILTER_TYPES.ALL;

    // 버튼 활성화 상태 업데이트 - 전체 버튼을 활성화
    const filterButtons = document.querySelectorAll('.todo-filter__btn');
    filterButtons.forEach(btn => {
      btn.classList.remove('todo-filter__btn--active');
    });
    document.querySelector('.todo-filter__btn[data-filter="all"]').classList.add('todo-filter__btn--active');

    // 필터링된 목록으로 테이블 다시 렌더링
    renderTodoTable(getFilteredTodos());
  });
}

// 할 일 추가 기능 설정 함수
function setupAddTodoForm() {
  // 필요한 DOM 요소 선택
  const todoInput = document.getElementById('todo-input');
  const prioritySelect = document.getElementById('priority-select');
  const addButton = document.getElementById('add-btn');
  
  // 추가 버튼 클릭 이벤트
  addButton.addEventListener('click', () => {
    const title = todoInput.value.trim();
    const selectedPriority = prioritySelect.value ? parseInt(prioritySelect.value) : null;
    
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
    prioritySelect.selectedIndex = 0;
    
    // 테이블 다시 렌더링 (현재 필터 유지)
    renderTodoTable(getFilteredTodos());
  });
}

// 할 일 삭제 함수
function deleteTodos(ids) {
  // 현재 할 일 목록 가져오기
  let todos = getTodos();
  
  // 선택된 ID를 가진 할 일들 제외하고 새 배열 생성
  todos = todos.filter(todo => !ids.includes(todo.id));
  
  // 변경된 목록 저장
  saveTodos(todos);
  
  // 테이블 다시 렌더링
  renderTodoTable(getFilteredTodos());
  
  // 삭제/완료 버튼 상태 업데이트
  updateActionButtonsState();
}

// 할 일 완료 함수
function completeTodos(ids) {
  // 현재 할 일 목록 가져오기
  let todos = getTodos();
  
  // 이미 완료된 할 일이 있는지 확인
  const hasCompletedTodo = todos
    .filter(todo => ids.includes(todo.id))
    .some(todo => todo.completed);
  
  // 완료된 할 일이 있으면 모달창 표시
  if (hasCompletedTodo) {
    showModal();
    return;
  }
  
  // 선택된 할 일들을 완료 상태로 변경
  todos = todos.map(todo => {
    if (ids.includes(todo.id)) {
      return { ...todo, completed: true };
    }
    return todo;
  });
  
  // 변경된 목록 저장
  saveTodos(todos);
  
  // 테이블 다시 렌더링
  renderTodoTable(getFilteredTodos());
  
  // 삭제/완료 버튼 상태 업데이트
  updateActionButtonsState();
}

// 삭제/완료 버튼 이벤트 설정 함수
function setupActionButtons() {
  const deleteBtn = document.getElementById('delete-btn');
  const completeBtn = document.getElementById('complete-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  
  // 삭제 버튼 클릭 이벤트
  deleteBtn.addEventListener('click', () => {
    const selectedIds = getSelectedTodoIds();
    if (selectedIds.length > 0) {
      deleteTodos(selectedIds);
    }
  });
  
  // 완료 버튼 클릭 이벤트
  completeBtn.addEventListener('click', () => {
    const selectedIds = getSelectedTodoIds();
    if (selectedIds.length > 0) {
      completeTodos(selectedIds);
    }
  });
  
  // 모달 닫기 버튼 클릭 이벤트
  closeModalBtn.addEventListener('click', () => {
    hideModal();
  });
  
  // 초기 상태 설정
  deleteBtn.disabled = true;
  completeBtn.disabled = true;
}

// 페이지 로드 완료 시 실행될 초기화 함수
document.addEventListener('DOMContentLoaded', () => {
  // localStorage에 데이터가 없을 때만 초기화
  // 이미 데이터가 있으면 사용자가 수정한 데이터를 유지하기 위함 !!
  if (!localStorage.getItem(TODO_STORAGE_KEY)) {
    saveTodos(initialTodos);
  }

  // 필터 버튼 이벤트 등록
  setupFilterButtons();
  
  // 할 일 추가 폼 이벤트 등록
  setupAddTodoForm();
  
  // 삭제/완료 버튼 이벤트 등록
  setupActionButtons();
  
  // 초기 테이블 렌더링
  renderTodoTable();
});