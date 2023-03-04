
import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/project_list");
  }

  get(id) {
    return http.get(`/project_list/${id}`);
  }

  create(data) {
    return http.post("/project_list", data);
  }

  update(id, data) {
    return http.put(`/project_list/${id}`, data);
  }

  delete(id) {
    return http.delete(`/project_list/${id}`);
  }

  deleteAll() {
    return http.delete(`/project_list`);
  }

  findByTitle(title) {
    return http.get(`/project_list?title=${title}`);
  }
}

export default new TutorialDataService();