export default (text = 'hello world') => {
  const element = document.createElement('div');
  element.innerHTML = text;
  element.className = 'rounded bg-red-100 border max-w-md m-4 p-4';
  return element;
};
