function DashboardCards({ stats }) {
  const cards = [
    {
      label: 'Total Applications',
      value: stats?.total || 0,
      info: 'All tracked companies'
    },
    {
      label: 'Applied',
      value: stats?.applied || 0,
      info: 'Waiting for response'
    },
    {
      label: 'Shortlisted',
      value: stats?.shortlisted || 0,
      info: 'Moved to next stage'
    },
    {
      label: 'Interviews',
      value: stats?.interview || 0,
      info: 'Interview process'
    },
    {
      label: 'Offers',
      value: stats?.offer || 0,
      info: 'Selected applications'
    },
    {
      label: 'Rejected',
      value: stats?.rejected || 0,
      info: 'Closed applications'
    },
    {
      label: 'Dream Companies',
      value: stats?.dreamCompanies || 0,
      info: 'Priority companies'
    }
  ];

  return (
    <section className="cards-grid">
      {cards.map((card) => (
        <div className="stat-card" key={card.label}>
          <p>{card.label}</p>
          <h2>{card.value}</h2>
          <span>{card.info}</span>
        </div>
      ))}
    </section>
  );
}

export default DashboardCards;