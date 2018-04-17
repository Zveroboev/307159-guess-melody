export default (stringTemplate) => {
  const wrapper = document.createElement(`div`);

  wrapper.innerHTML = stringTemplate;

  if (wrapper.children.length > 1) {
    const arrayOfNodes = [...wrapper.children];
    const fragment = document.createDocumentFragment();

    arrayOfNodes.forEach((node) => fragment.appendChild(node));
    return fragment;
  }

  return wrapper.firstElementChild;
};
