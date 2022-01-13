<template>
  <div>一个简单的测试<img :src="imgUrl" /></div>
</template>
<script>
const imgUrl = require('src/public/images/cat.jpg');
export default {
  data() {
    return {
      imgUrl,
    };
  },
};
</script>
