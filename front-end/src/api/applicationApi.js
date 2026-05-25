const API_BASE_URL = 'http://localhost:3000';

async function readJsonResponse(response, fallbackMessage) {
  let data = null;

  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const apiMessage = Array.isArray(data?.message)
      ? data.message.join(', ')
      : data?.message;

    throw new Error(apiMessage || fallbackMessage);
  }

  return data;
}

export async function getApplications(status = '', search = '') {
  const params = new URLSearchParams();

  if (status) {
    params.append('status', status);
  }

  if (search) {
    params.append('search', search);
  }

  const query = params.toString();
  const response = await fetch(
    `${API_BASE_URL}/applications${query ? `?${query}` : ''}`
  );

  return readJsonResponse(response, 'Failed to fetch applications');
}

export async function createApplication(applicationData) {
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(applicationData)
  });

  return readJsonResponse(response, 'Failed to create application');
}

export async function updateApplication(id, applicationData) {
  const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(applicationData)
  });

  return readJsonResponse(response, 'Failed to update application');
}

export async function deleteApplication(id) {
  const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: 'DELETE'
  });

  return readJsonResponse(response, 'Failed to delete application');
}

export async function getDashboardStats() {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`);

  return readJsonResponse(response, 'Failed to fetch dashboard stats');
}
