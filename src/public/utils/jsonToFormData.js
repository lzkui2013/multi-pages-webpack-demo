function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

const isBlob = (value) => value instanceof Blob;
const isFile = (value) => value instanceof File;
const isBoolean = (value) => typeof value === 'boolean';
const isNull = (value) => value === null;
const isUndefined = (value) => value === undefined;

const processData = (value, options, formData, parent) => {
  const processedKey = parent ? parent : '';

  if (isNull(value) || isUndefined(value)) {
    if (!options.excludeNull) {
      formData.append(processedKey, '');
    }
    return;
  }

  if (isFile(value)) {
    formData.append(processedKey, value);
    return;
  }

  if (isBlob(value)) {
    formData.append(processedKey, value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const computedKey = `${processedKey}[${options.arrayIndexes ? index : ''}]`;
      processData(item, options, formData, computedKey);
    });
    return;
  }

  if (isObject(value)) {
    Object.entries(value).forEach(([key, data]) => {
      const computedKey = parent ? `${parent}[${key}]` : key;
      processData(data, options, formData, computedKey);
    });
    return;
  }

  if (isBoolean(value)) {
    formData.append(processedKey, value ? 'true' : 'false');
    return;
  }

  formData.append(processedKey, value);
};

const defaultOptions = {
  arrayIndexes: true,
  excludeNull: true,
};

const objectToFormData = (payload, options = {}, formData = new FormData()) => {
  if (!payload) return formData;

  options = Object.assign(defaultOptions, options);

  processData(payload, options, formData);

  return formData;
};

export default objectToFormData;
