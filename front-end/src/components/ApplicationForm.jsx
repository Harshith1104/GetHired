import { useEffect, useState } from 'react';

const initialForm = {
  companyName: '',
  jobRole: '',
  status: 'Applied',
  appliedDate: '',
  deadlineDate: '',
  resumeVersion: '',
  location: '',
  packageOffered: '',
  notes: '',
  isDreamCompany: false
};

function ApplicationForm({
  onSubmit,
  editingApplication,
  onCancelEdit,
  saving
}) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingApplication) {
      setFormData({
        companyName: editingApplication.companyName || '',
        jobRole: editingApplication.jobRole || '',
        status: editingApplication.status || 'Applied',
        appliedDate: editingApplication.appliedDate || '',
        deadlineDate: editingApplication.deadlineDate || '',
        resumeVersion: editingApplication.resumeVersion || '',
        location: editingApplication.location || '',
        packageOffered: editingApplication.packageOffered || '',
        notes: editingApplication.notes || '',
        isDreamCompany: editingApplication.isDreamCompany || false
      });
    } else {
      setFormData(initialForm);
    }
  }, [editingApplication]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.companyName.trim()) {
      setError('Company name is required');
      return;
    }

    if (!formData.jobRole.trim()) {
      setError('Job role is required');
      return;
    }

    const cleanedData = {
      ...formData,
      appliedDate: formData.appliedDate || null,
      deadlineDate: formData.deadlineDate || null
    };

    setError('');
    const saved = await onSubmit(cleanedData);

    if (saved) {
      setFormData(initialForm);
    }
  }

  return (
    <section className="panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">Application Form</p>
          <h2>{editingApplication ? 'Edit Application' : 'Add New Application'}</h2>
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="companyName">Company Name *</label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              required
              placeholder="Example: Google"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobRole">Job Role *</label>
            <input
              id="jobRole"
              type="text"
              name="jobRole"
              required
              placeholder="Example: Software Engineer Intern"
              value={formData.jobRole}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label>Resume Version</label>
            <input
              type="text"
              name="resumeVersion"
              placeholder="Example: Resume_v2_FullStack.pdf"
              value={formData.resumeVersion}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Applied Date</label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Deadline Date</label>
            <input
              type="date"
              name="deadlineDate"
              value={formData.deadlineDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Example: Bangalore / Remote"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Package / Stipend</label>
            <input
              type="text"
              name="packageOffered"
              placeholder="Example: 12 LPA / 30K per month"
              value={formData.packageOffered}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            placeholder="Add preparation notes, interview rounds, referral details, or follow-up tasks..."
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <label className="checkbox-line">
          <input
            type="checkbox"
            name="isDreamCompany"
            checked={formData.isDreamCompany}
            onChange={handleChange}
          />
          Mark as dream company
        </label>

        <div className="form-actions">
          <button className="primary-btn" type="submit" disabled={saving}>
            {saving
              ? 'Saving...'
              : editingApplication
                ? 'Update Application'
                : 'Add Application'}
          </button>

          {editingApplication && (
            <button
              className="secondary-btn"
              type="button"
              onClick={onCancelEdit}
              disabled={saving}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ApplicationForm;
