import { useEffect, useRef, useState } from 'react';
import {
  createApplication,
  deleteApplication,
  getApplications,
  getDashboardStats,
  updateApplication
} from '../api/applicationApi';
import Header from '../components/Header';
import DashboardCards from '../components/DashboardCards';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationTable from '../components/ApplicationTable';
import DeadlineList from '../components/DeadlineList';
import SearchFilterBar from '../components/SearchFilterBar';

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [editingApplication, setEditingApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const formRef = useRef(null);

  async function loadData(nextStatus = statusFilter, nextSearch = search) {
    try {
      setLoading(true);
      const [applicationsData, statsData] = await Promise.all([
        getApplications(nextStatus, nextSearch),
        getDashboardStats()
      ]);

      setApplications(applicationsData);
      setStats(statsData);
    } catch (error) {
      setNotice({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData('', '');
  }, []);

  async function handleSearchSubmit(event) {
    event.preventDefault();
    await loadData();
  }

  async function handleStatusChange(status) {
    setStatusFilter(status);
    await loadData(status, search);
  }

  async function handleReset() {
    setSearch('');
    setStatusFilter('');
    await loadData('', '');
  }

  async function handleSubmit(formData) {
    try {
      setSaving(true);

      if (editingApplication) {
        await updateApplication(editingApplication.id, formData);
        setNotice({ type: 'success', text: 'Application updated successfully.' });
      } else {
        await createApplication(formData);
        setNotice({ type: 'success', text: 'Application added successfully.' });
      }

      setEditingApplication(null);
      await loadData();
      return true;
    } catch (error) {
      setNotice({ type: 'error', text: error.message });
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this application?');

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteApplication(id);
      if (editingApplication?.id === id) {
        setEditingApplication(null);
      }
      setNotice({ type: 'success', text: 'Application deleted successfully.' });
      await loadData();
    } catch (error) {
      setNotice({ type: 'error', text: error.message });
    }
  }

  function handleEdit(application) {
    setEditingApplication(application);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleCancelEdit() {
    setEditingApplication(null);
  }

  return (
    <main className="app">
      <Header />

      {notice && (
        <div
          className={`toast ${notice.type}`}
          role="alert"
          onClick={() => setNotice(null)}
        >
          {notice.text}
        </div>
      )}

      <DashboardCards stats={stats} />

      <section className="layout">
        <div ref={formRef}>
          <ApplicationForm
            onSubmit={handleSubmit}
            editingApplication={editingApplication}
            onCancelEdit={handleCancelEdit}
            saving={saving}
          />
        </div>

        <section className="panel wide-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Application List</p>
              <h2>Track Your Placement Progress</h2>
            </div>
          </div>

          <SearchFilterBar
            search={search}
            statusFilter={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={handleStatusChange}
            onSubmit={handleSearchSubmit}
            onReset={handleReset}
          />

          {loading ? (
            <div className="loading">Loading applications...</div>
          ) : (
            <ApplicationTable
              applications={applications}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </section>

      <section className="panel deadline-panel">
        <div className="section-title">
          <div>
            <p className="eyebrow">Upcoming Deadlines</p>
            <h2>Do Not Miss These</h2>
          </div>
        </div>

        <DeadlineList deadlines={stats?.upcomingDeadlines || []} />
      </section>
    </main>
  );
}

export default Dashboard;
