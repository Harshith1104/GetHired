function StatusBadge({ status }) {
  const className = `status-badge ${status?.toLowerCase() || 'applied'}`;

  return <span className={className}>{status}</span>;
}

export default StatusBadge;