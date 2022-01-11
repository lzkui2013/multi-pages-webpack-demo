import axios from 'axios';
import getAjaxData from 'src/public/utils/getAjaxData';

function baseAxiosRequest(dataObj = {}) {
  dataObj.baseURL = url;

  return axios(dataObj);
}

// 全站未来统一请求
export default function (dataObj = {}) {
  // 如果没有数据，执行getAjaxData会报错
  let ajaxData = dataObj.data;
  if (ajaxData) {
    // 需要剔除 FromData 数据的类型
    if (!(ajaxData instanceof FormData)) {
      if (
        Object.prototype.toString.call(ajaxData) !== '[object FormData]' &&
        dataObj.dataType !== 'json'
      ) {
        dataObj.data = getAjaxData(ajaxData);
      }
    }
  }

  return new Promise((resolve, reject) => {
    baseAxiosRequest(dataObj).then((data) => {
      data = typeof data === 'string' ? JSON.parse(data) : data;
      let ajaxData = data.data;
      let code = ajaxData.code;

      // 如果code为纯数字的
      if (/^\d+$/.test(code)) {
        code = +code;
        ajaxData.code = code;
      }

      resolve(ajaxData);
    });
  });
}
