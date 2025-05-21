import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AddPersonView from "../views/AddPersonView.vue"
import ViewPerson from "../components/ViewPerson.vue" 
import EditPerson from "../components/EditPerson.vue"
import StatsView from "../views/StatsView.vue" // <-- Import StatsView

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/add",
    name: "addPerson",
    component: AddPersonView
  },
  {
    path: "/person/:id", 
    name: "viewPerson",
    component: ViewPerson,
    props: true 
  },
  {
    path: "/edit/:id", 
    name: "editPerson",
    component: EditPerson,
    props: true 
  },
  {
    path: "/stats", // <-- Add route for StatsView
    name: "statistics",
    component: StatsView
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
