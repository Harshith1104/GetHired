function Header() {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">Placement Management Dashboard</p>
        <h1>GetHired</h1>
        <p className="subtitle">
          Placement &amp; Job Application Tracker
        </p>
      </div>

      <div className="header-card">
        <span className="header-card-label">Active Role</span>
        <strong>Student</strong>
        <small>Track every opportunity in one place</small>
      </div>
    </header>
  );
}

export default Header;
