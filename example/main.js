// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import {Button, Row, Col, Dropdown, DropdownMenu, DropdownItem, Icon} from 'iview';
import 'iview/dist/styles/iview.css';
import Example from './Example';
import TreeTable from '../src';

Vue.config.productionTip = false;

// Vue.component(ZkTable.name, ZkTable);

Vue.component('Button', Button);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Icon', Icon);
Vue.use(TreeTable);

/* eslint-disable no-new */
new Vue({
  el: '#example',
  template: '<Example/>',
  components: { Example },
});
