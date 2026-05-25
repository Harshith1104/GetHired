import StatusBadge from './StatusBadge';

function ApplicationTable({ applications, onEdit, onDelete }) {
  if (!applications.length) {
    return (
      <div className="empty-state">
        <h3>No applications found</h3>
        <p>Add your first job application or change your filter/search.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Resume</th>
            <th>Location</th>
            <th>Package</th>
            <th>Dream</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>
                <strong>{application.companyName}</strong>
                {application.notes && <small>{application.notes}</small>}
              </td>

              <td>{application.jobRole}</td>

              <td>
                <StatusBadge status={application.status} />
              </td>

              <td>{application.deadlineDate || 'Not set'}</td>

              <td>{application.resumeVersion || 'Not added'}</td>

              <td>{application.location || 'Not added'}</td>

              <td>{application.packageOffered || 'Not added'}</td>

              <td>{application.isDreamCompany ? 'Yes' : 'No'}</td>

              <td>
                <div className="action-buttons">
                  <button
                    className="edit-btn"
                    type="button"
                    onClick={() => onEdit(application)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => onDelete(application.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;
