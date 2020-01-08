
import jsonToFormData from './jsonToFormData';

function getAjaxData (obj) {
    let params = jsonToFormData(obj);

    return params;
}

export default getAjaxData;
