import request from '../utils/request';

export function fetch({ page}) {
  return request(`/api/users?_page=${page}&_limit=2`);
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}
