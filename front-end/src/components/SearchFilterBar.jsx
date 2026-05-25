const statuses = ['Applied', 'Shortlisted', 'Interview', 'Offer', 'Rejected'];

function SearchFilterBar({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onSubmit,
  onReset
}) {
  return (
    <form className="toolbar" onSubmit={onSubmit}>
      <input
        type="search"
        aria-label="Search applications"
        placeholder="Search company, role, or location..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        aria-label="Filter applications by status"
        value={statusFilter}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button className="primary-btn" type="submit">
        Search
      </button>
      <button className="secondary-btn" type="button" onClick={onReset}>
        Reset
      </button>
    </form>
  );
}

export default SearchFilterBar;
