import request from "../utils/request";

export async function fetchDraft({ query }) {
  return request(`http://localhost:3000/api/draft/get`, {
    query
  });
}
