import { createStore } from 'vuex';

const store = createStore({
  state: {
    // Define your state properties here
    projects: [],
    skills: [],
    contactInfo: {
      email: '',
      github: '',
      linkedin: ''
    }
  },
  mutations: {
    // Define your mutations to modify the state
    setProjects(state, projects) {
      state.projects = projects;
    },
    setSkills(state, skills) {
      state.skills = skills;
    },
    setContactInfo(state, contactInfo) {
      state.contactInfo = contactInfo;
    }
  },
  actions: {
    // Define your actions to commit mutations
    fetchProjects({ commit }) {
      // Fetch projects from an API or other source
      // commit('setProjects', fetchedProjects);
    },
    fetchSkills({ commit }) {
      // Fetch skills from an API or other source
      // commit('setSkills', fetchedSkills);
    },
    fetchContactInfo({ commit }) {
      // Fetch contact info from an API or other source
      // commit('setContactInfo', fetchedContactInfo);
    }
  },
  getters: {
    // Define your getters to access state properties
    getProjects: (state) => state.projects,
    getSkills: (state) => state.skills,
    getContactInfo: (state) => state.contactInfo
  }
});

export default store;