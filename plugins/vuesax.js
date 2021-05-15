import Vue from "vue";
import Vuesax from "vuesax";
import "boxicons/css/boxicons.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
import TrendChart from "vue-trend-chart";

Vue.use(TrendChart);
Vue.use(PerfectScrollbar);
Vue.use(Vuesax);

UIkit.use(Icons);
