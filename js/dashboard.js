function toggleSidebar() {
      document.getElementById('sidebarMenu').classList.toggle('show');
    }
    function showSection(section) {
      const sections = [
        'dashboard', 'books', 'acquisition', 'transaction', 'reports', 'members', 'settings'
      ];
      sections.forEach(s => {
        const el = document.getElementById(s + 'Section');
        if (el) el.style.display = (s === section) ? '' : 'none';
      });
      // Update sidebar active state
      document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === section);
      });
      // Populate books table when books section is shown
      if (section === 'dashboard') updateDashboard();
      if (section === 'books') populateBooksTable();
      if (section === 'acquisition') populateAcquisitionTable();
      if (section === 'transaction') populateTransactionsTable();
      if (section === 'members') populateMembersTable();
    }

    // Sample book data
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

// Sample acquisition requests
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

// Sample transactions
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

// Function to populate books table
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

// Populate acquisition table
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

// Populate transactions table
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

// Update dashboard stats
function updateDashboardStats() {
  // Total Books
  document.getElementById('totalBooks').textContent = books.length;
  // New Acquisitions (for demo: count all acquisitions)
  document.getElementById('newAcquisitions').textContent = acquisitions.length;
  // Active Loans (for demo: count transactions with status "Active")
  document.getElementById('activeLoans').textContent = transactions.filter(tx => tx.status === "Active").length;
  // Overdue Books (for demo: count transactions with status "Overdue")
  document.getElementById('overdueBooks').textContent = transactions.filter(tx => tx.status === "Overdue").length;
}

// Update recent transactions table on dashboard
function updateRecentTransactionsTable() {
  const tbody = document.getElementById('transactionTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  // Show the 5 most recent transactions
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

// Call this to update dashboard content
function updateDashboard() {
  updateDashboardStats();
  updateRecentTransactionsTable();
}

// Show dashboard by default
window.addEventListener('DOMContentLoaded', () => {
  showSection('dashboard');
  renderCalendar(window.currentDate);
  updateDashboard();
});

    function logout() {
      alert('Logging out...');
      // Redirect or perform logout logic here
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
    // Add more JS as needed for calendar, tables, etc.

    // Simple calendar rendering logic

const calendarMonth = document.getElementById('calendarMonth');
const calendarGrid = document.getElementById('calendarGrid');

let currentDate = new Date();

// Example transactions with due dates (YYYY-MM-DD)
const exampleTransactions = [
  { id: 1, title: "Return: The Great Gatsby", dueDate: "2025-05-25" },
  { id: 2, title: "Return: 1984", dueDate: "2025-05-28" },
  // Add more as needed
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

  // Day headers
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
    const header = document.createElement('div');
    header.className = 'calendar-day header';
    header.textContent = day;
    calendarGrid.appendChild(header);
  });

  // Blanks before 1st
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    blank.className = 'calendar-day';
    blank.style.background = 'transparent';
    blank.style.cursor = 'default';
    calendarGrid.appendChild(blank);
  }

  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    const thisDate = new Date(year, month, d);
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

    // Highlight today
    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add('today');
    }

    // Events
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

// Calendar navigation
function previousMonth() {
  window.currentDate.setMonth(window.currentDate.getMonth() - 1);
  renderCalendar(window.currentDate);
}
function nextMonth() {
  window.currentDate.setMonth(window.currentDate.getMonth() + 1);
  renderCalendar(window.currentDate);
}

// Initialize calendar
window.currentDate = new Date();
window.addEventListener('DOMContentLoaded', () => {
  renderCalendar(window.currentDate);
});

// Listen for Add Book form submission
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

  // Listen for Add Acquisition form submission
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

  // Listen for Add Transaction form submission
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

  // Listen for Add Member form submission
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
