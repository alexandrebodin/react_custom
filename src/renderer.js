const eventNames = ['onClick'];
function isEventProp(name) {
  if (eventNames.indexOf(name) >= 0) return true;
  else return false;
}

function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}
function removeProp($target, name, value) {
  if (name === 'className') {
    $target.removeAttribute('class');
  } else if (typeof value === 'boolean') {
    removeBooleanProp($target, name);
  } else {
    $target.removeAttribute(name);
  }
}

function setBooleanProp($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function setProp($target, name, value) {
  if (isEventProp(name)) {
    $target.addEventListener(extractEventName(name), value);
  } else if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

function setProps($target, props) {
  const propKeys = Object.keys(props);

  for (var i = 0, l = propKeys.length; i < l; i++) {
    const name = propKeys[i];
    setProp($target, name, props[name]);
  }
}

function updateProp($target, name, newVal, oldVal) {
  if (!newVal) {
    removeProp($target, name, oldVal);
  } else if (!oldVal) {
    setProp($target, name, newVal);
  } else if (newVal !== oldVal) {
    if (isEventProp(name)) {
      $target.removeEventListener(extractEventName(name), oldVal);
    }
    setProp($target, name, newVal);
  }
}

function updateProps($target, newProps, oldProps = {}) {
  const props = Object.assign({}, newProps, oldProps);
  const propKeys = Object.keys(props);

  for (var i = 0, l = propKeys.length; i < l; i++) {
    const name = propKeys[i];
    updateProp($target, name, newProps[name], oldProps[name]);
  }
}

function extractEventName(name) {
  return name.slice(2).toLowerCase();
}

function createElement(node) {
  if (typeof node === 'boolean') return;
  if (typeof node === 'string') {
    return document.createTextNode(node);
  } else if (typeof node.type === 'object') {
    const el = node.type;
    return createElement(
      el.render({
        ...node.props,
        children: node.children,
      })
    );
  } else if (typeof node.type === 'function') {
    return createElement(
      node.type({
        ...node.props,
        children: node.children,
      })
    );
  }

  const $el = document.createElement(node.type);
  setProps($el, node.props);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (newNode.type && newNode.type === oldNode.type) {
    updateProps($parent.childNodes[index], newNode.props, oldNode.props);
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  } else {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  }
}

function h(type, props, ...children) {
  return {
    type,
    props: props || {},
    // remove booleans
    children: children.filter(
      children =>
        typeof children === 'object' ||
        typeof children === 'string' ||
        typeof children == 'function'
    ),
  };
}

let rootInstance = null;
function render(el, id) {
  updateElement(document.getElementById(id), el, rootInstance);
  rootInstance = el;
}

export { render, h };
