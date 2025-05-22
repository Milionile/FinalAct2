function toggleSidebar(forceClose = false) {
  const sidebar = document.getElementById('sidebarMenu');
  const backdrop = document.querySelector('.sidebar-backdrop');
  if (forceClose) {
    sidebar.classList.remove('show');
    backdrop.style.display = 'none';
    return;
  }
  const isOpen = sidebar.classList.toggle('show');
  backdrop.style.display = isOpen ? 'block' : 'none';
}

function showSection(section) {
      const sections = [
        'dashboard', 'books', 'acquisition', 'transaction', 'reports', 'members', 'settings'
      ];
      sections.forEach(s => {
        const el = document.getElementById(s + 'Section');
        if (el) el.style.display = (s === section) ? '' : 'none';
      });
      document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === section);
      });
      if (section === 'dashboard') updateDashboard();
      if (section === 'books') populateBooksTable();
      if (section === 'acquisition') populateAcquisitionTable();
      if (section === 'transaction') populateTransactionsTable();
      if (section === 'members') populateMembersTable();
    }

const books = [
  {
    isbn: "978-0140449136",
    title: "The Odyssey",
    author: "Homer",
    category: "Fiction",
    status: "Available",
    location: "Shelf A1",
    addedDate: "2024-05-01"
  },
  {
    isbn: "978-0061120084",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    status: "Borrowed",
    location: "Shelf B2",
    addedDate: "2024-04-15"
  },
  {
    isbn: "978-0307277671",
    title: "The Road",
    author: "Cormac McCarthy",
    category: "Fiction",
    status: "Reserved",
    location: "Shelf C3",
    addedDate: "2024-03-20"
  },
  {
    isbn: "978-0131103627",
    title: "The C Programming Language",
    author: "Kernighan & Ritchie",
    category: "Science",
    status: "Available",
    location: "Shelf D4",
    addedDate: "2024-02-10"
  }
];

const acquisitions = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    publisher: "Prentice Hall",
    requestedBy: "Alice",
    date: "2025-05-20",
    status: "Pending"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    publisher: "Penguin",
    requestedBy: "Bob",
    date: "2025-05-18",
    status: "Approved"
  }
];

const transactions = [
  {
    id: 1,
    member: "Alice",
    book: "The Odyssey",
    type: "Borrow",
    date: "2025-05-20",
    dueDate: "2025-06-03",
    status: "Active"
  },
  {
    id: 2,
    member: "Bob",
    book: "To Kill a Mockingbird",
    type: "Return",
    date: "2025-05-18",
    dueDate: "2025-06-01",
    status: "Completed"
  }
];

const members = [];

function populateBooksTable() {
  const tbody = document.getElementById('booksTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  books.forEach(book => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${book.isbn}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>${book.status}</td>
      <td>${book.location}</td>
      <td>${book.addedDate}</td>
      <td>
        <button class="btn btn-sm btn-info me-1">View</button>
        <button class="btn btn-sm btn-warning me-1">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function populateAcquisitionTable() {
  const tbody = document.getElementById('acquisitionTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  acquisitions.forEach(acq => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${acq.id}</td>
      <td>${acq.title}</td>
      <td>${acq.author}</td>
      <td>${acq.publisher}</td>
      <td>${acq.requestedBy}</td>
      <td>${acq.date}</td>
      <td>${acq.status}</td>
      <td>
        <button class="btn btn-sm btn-info me-1">View</button>
        <button class="btn btn-sm btn-warning me-1">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function populateTransactionsTable() {
  const tbody = document.getElementById('transactionsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  transactions.forEach(tx => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${tx.id}</td>
      <td>${tx.member}</td>
      <td>${tx.book}</td>
      <td>${tx.type}</td>
      <td>${tx.date}</td>
      <td>${tx.dueDate}</td>
      <td>${tx.status}</td>
      <td>
        <button class="btn btn-sm btn-info me-1">View</button>
        <button class="btn btn-sm btn-warning me-1">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function populateMembersTable() {
  const tbody = document.getElementById('membersTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  members.forEach((member, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${member.name}</td>
      <td>${member.email}</td>
      <td>${member.phone}</td>
      <td>${member.status}</td>
      <td>
        <button class="btn btn-sm btn-info me-1">View</button>
        <button class="btn btn-sm btn-warning me-1">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateDashboardStats() {
  document.getElementById('totalBooks').textContent = books.length;
  document.getElementById('newAcquisitions').textContent = acquisitions.length;
  document.getElementById('activeLoans').textContent = transactions.filter(tx => tx.status === "Active").length;
  document.getElementById('overdueBooks').textContent = transactions.filter(tx => tx.status === "Overdue").length;
}

function updateRecentTransactionsTable() {
  const tbody = document.getElementById('transactionTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const recent = [...transactions].reverse().slice(0, 5);
  recent.forEach(tx => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${tx.id}</td>
      <td>${tx.member}</td>
      <td>${tx.book}</td>
      <td>${tx.type}</td>
      <td>${tx.date}</td>
      <td>${tx.dueDate}</td>
      <td>${tx.status}</td>
      <td>
        <button class="btn btn-sm btn-info me-1">View</button>
        <button class="btn btn-sm btn-warning me-1">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateDashboard() {
  updateDashboardStats();
  updateRecentTransactionsTable();
}

window.addEventListener('DOMContentLoaded', () => {
  showSection('dashboard');
  renderCalendar(window.currentDate);
  updateDashboard();
});

function logout() {
  alert('Logging out...');
}
function exportReport() {
  alert('Exporting report...');
}
function exportBooks() {
  alert('Exporting books...');
}
function exportAcquisitions() {
  alert('Exporting acquisitions...');
}
function exportTransactions() {
  alert('Exporting transactions...');
}
function clearNotifications() {
  document.getElementById('notificationCount').innerText = '0';
  document.getElementById('notificationDropdown').innerHTML = '<li><h6 class="dropdown-header">No new notifications</h6></li>';
}

const calendarMonth = document.getElementById('calendarMonth');
const calendarGrid = document.getElementById('calendarGrid');

let currentDate = new Date();

const exampleTransactions = [
  { id: 1, title: "Return: The Great Gatsby", dueDate: "2025-05-25" },
  { id: 2, title: "Return: 1984", dueDate: "2025-05-28" }
];

function renderCalendar(date = new Date()) {
  const calendarMonth = document.getElementById('calendarMonth');
  const calendarGrid = document.getElementById('calendarGrid');
  if (!calendarMonth || !calendarGrid) return;

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  calendarMonth.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarGrid.innerHTML = '';

  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
    const header = document.createElement('div');
    header.className = 'calendar-day header';
    header.textContent = day;
    calendarGrid.appendChild(header);
  });

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    blank.className = 'calendar-day';
    blank.style.background = 'transparent';
    blank.style.cursor = 'default';
    calendarGrid.appendChild(blank);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    const thisDate = new Date(year, month, d);
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add('today');
    }

    const events = transactions.filter(t => t.dueDate === dateStr);
    if (events.length > 0) {
      dayDiv.classList.add('has-events');
      dayDiv.title = events.map(e => `${e.book} (by ${e.member})`).join('\n');
      dayDiv.style.background = "#ffe0e0";
      dayDiv.style.cursor = "pointer";
      dayDiv.onclick = function() {
        alert('Due on this day:\n' + events.map(e => `${e.book} (by ${e.member})`).join('\n'));
      };
    }

    dayDiv.textContent = d;
    calendarGrid.appendChild(dayDiv);
  }
}

function previousMonth() {
  window.currentDate.setMonth(window.currentDate.getMonth() - 1);
  renderCalendar(window.currentDate);
}
function nextMonth() {
  window.currentDate.setMonth(window.currentDate.getMonth() + 1);
  renderCalendar(window.currentDate);
}

window.currentDate = new Date();
window.addEventListener('DOMContentLoaded', () => {
  renderCalendar(window.currentDate);
});

document.addEventListener('DOMContentLoaded', function() {
  const addBookForm = document.getElementById('addBookForm');
  if (addBookForm) {
    addBookForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const isbn = document.getElementById('bookISBN').value.trim();
      const title = document.getElementById('bookTitle').value.trim();
      const author = document.getElementById('bookAuthor').value.trim();
      const category = document.getElementById('bookCategory').value.trim();
      const status = document.getElementById('bookStatus').value.trim();
      const location = document.getElementById('bookLocation').value.trim();
      const addedDate = document.getElementById('bookAddedDate').value;
      if (!isbn || !title || !author || !category || !status || !location || !addedDate) {
        alert('Please fill in all fields.');
        return;
      }
      const newBook = { isbn, title, author, category, status, location, addedDate };
      books.push(newBook);
      populateBooksTable();
      updateDashboard();
      addBookForm.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('addBookModal'));
      if (modal) modal.hide();
    });
  }

  const addAcquisitionForm = document.getElementById('addAcquisitionForm');
  if (addAcquisitionForm) {
    addAcquisitionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const title = document.getElementById('acqBookTitle').value.trim();
      const author = document.getElementById('acqAuthor').value.trim();
      const publisher = document.getElementById('acqPublisher').value.trim();
      const requestedBy = document.getElementById('acqRequestedBy').value.trim();
      const date = document.getElementById('acqDate').value;
      const status = document.getElementById('acqStatus').value.trim();
      if (!title || !author || !publisher || !requestedBy || !date || !status) {
        alert('Please fill in all fields.');
        return;
      }
      const newAcquisition = { id: acquisitions.length + 1, title, author, publisher, requestedBy, date, status };
      acquisitions.push(newAcquisition);
      populateAcquisitionTable();
      updateDashboard();
      addAcquisitionForm.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('newAcquisitionModal'));
      if (modal) modal.hide();
    });
  }

  const addTransactionForm = document.getElementById('addTransactionForm');
  if (addTransactionForm) {
    addTransactionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const member = document.getElementById('transactionMember').value.trim();
      const book = document.getElementById('transactionBook').value.trim();
      const type = document.getElementById('transactionType').value.trim();
      const date = document.getElementById('transactionDate').value;
      const dueDate = document.getElementById('transactionDueDate').value;
      const status = document.getElementById('transactionStatus').value.trim();
      if (!member || !book || !type || !date || !dueDate || !status) {
        alert('Please fill in all fields.');
        return;
      }
      const newTransaction = { id: transactions.length + 1, member, book, type, date, dueDate, status };
      transactions.push(newTransaction);
      populateTransactionsTable();
      updateDashboard();
      addTransactionForm.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('addTransactionModal'));
      if (modal) modal.hide();
    });
  }

  const addMemberForm = document.getElementById('addMemberForm');
  if (addMemberForm) {
    addMemberForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('memberName').value.trim();
      const email = document.getElementById('memberEmail').value.trim();
      const phone = document.getElementById('memberPhone').value.trim();
      const status = document.getElementById('memberStatus').value.trim();
      if (!name || !email || !phone || !status) {
        alert('Please fill in all fields.');
        return;
      }
      members.push({ name, email, phone, status });
      populateMembersTable();
      addMemberForm.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('addMemberModal'));
      if (modal) modal.hide();
    });
  }
});

let activityChart;

function getActivityData(period = 'month') {
  const now = new Date();
  let labels = [];
  let borrows = [];
  let returns = [];

  if (period === 'today') {
    labels = Array.from({length: 24}, (_, i) => `${i}:00`);
    borrows = Array(24).fill(0);
    returns = Array(24).fill(0);
    transactions.forEach(t => {
      const date = new Date(t.date);
      if (date.toDateString() === now.toDateString()) {
        const hour = date.getHours();
        if (t.type === 'Borrow') borrows[hour]++;
        if (t.type === 'Return') returns[hour]++;
      }
    });
  } else if (period === 'week') {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    labels = [];
    borrows = Array(7).fill(0);
    returns = Array(7).fill(0);
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      labels.push(days[d.getDay()]);
    }
    transactions.forEach(t => {
      const date = new Date(t.date);
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        if (date.toDateString() === d.toDateString()) {
          const idx = 6 - i;
          if (t.type === 'Borrow') borrows[idx]++;
          if (t.type === 'Return') returns[idx]++;
        }
      }
    });
  } else if (period === 'lastMonth' || period === 'month') {
    const d = new Date(now);
    let month = d.getMonth();
    let year = d.getFullYear();
    if (period === 'lastMonth') {
      month = month === 0 ? 11 : month - 1;
      if (month === 11) year--;
    }
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    labels = Array.from({length: daysInMonth}, (_, i) => `${i+1}`);
    borrows = Array(daysInMonth).fill(0);
    returns = Array(daysInMonth).fill(0);
    transactions.forEach(t => {
      const date = new Date(t.date);
      if (date.getMonth() === month && date.getFullYear() === year) {
        const day = date.getDate() - 1;
        if (t.type === 'Borrow') borrows[day]++;
        if (t.type === 'Return') returns[day]++;
      }
    });
  }
  return { labels, borrows, returns };
}

function renderActivityChart(period = 'month') {
  const ctx = document.getElementById('activityChart').getContext('2d');
  const { labels, borrows, returns } = getActivityData(period);

  if (activityChart) activityChart.destroy();

  activityChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Borrows',
          data: borrows,
          borderColor: '#0d6efd',
          backgroundColor: 'rgba(13,110,253,0.1)',
          tension: 0.3,
          fill: true,
        },
        {
          label: 'Returns',
          data: returns,
          borderColor: '#198754',
          backgroundColor: 'rgba(25,135,84,0.1)',
          tension: 0.3,
          fill: true,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Call this on page load
document.addEventListener('DOMContentLoaded', function() {
  renderActivityChart('month');
});

// Update chart when dropdown is used
window.updateChart = function(period, label) {
  renderActivityChart(period);
  if (label) {
    document.getElementById('activityPeriodBtn').textContent = label;
  }
};
