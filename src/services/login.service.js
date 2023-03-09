import http from "../http-common";

class LoginDataService {
  getAll() {
    return http.get("/admin_details");
  }

  get(id) {
    return http.get(`/admin_details/${id}`);
  }

  create(data) {
    return http.post("/admin_details", data);
  }

  update(id, data) {
    return http.put(`/admin_details/${id}`, data);
  }

  delete(id) {
    return http.delete(`/admin_details/${id}`);
  }

  deleteAll() {
    return http.delete(`/admin_details`);
  }

  findByTitle(title) {
    return http.get(`/admin_details?title=${title}`);
  }
}

export default new LoginDataService();