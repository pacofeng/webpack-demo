export default (text = HELLO) => {
  const element = document.createElement('div');
  const worker = new Worker(new URL('./worker.js', import.meta.url));
  const state = { text };

  worker.addEventListener('message', ({ data: { text } }) => {
    state.text = text;
    element.innerHTML = text;
  });
  element.innerHTML = state.text;
  element.className = 'rounded bg-red-100 border max-w-md m-4 p-4';
  element.onclick = () => {
    import('./lazy')
      .then((lazy) => {
        element.textContent = lazy.default;
      })
      .catch((err) => console.log(err));
  };
  element.onmouseenter = () => worker.postMessage({ text: state.text });
  return element;
};
