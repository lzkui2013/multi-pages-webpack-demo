import TestCom from 'components/VueComponent2';
import request from 'src/public/methods/request';
export default {
  data() {
    return {
      title: 'some',
    };
  },
  components: {
    TestCom,
  },
  methods: {
    onClick() {
      console.log('click');
    },
  },
};
