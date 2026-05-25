function DeadlineList({ deadlines }) {
  if (!deadlines.length) {
    return <p className="muted-text">No upcoming deadlines.</p>;
  }

  return (
    <div className="deadline-list">
      {deadlines.map((application) => (
        <div className="deadline-item" key={application.id}>
          <div>
            <strong>{application.companyName}</strong>
            <p>{application.jobRole}</p>
          </div>
          <span>{application.deadlineDate}</span>
        </div>
      ))}
    </div>
  );
}

export default DeadlineList;
