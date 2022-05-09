const body = document.querySelector('body');
const keysLink = 'keys.json';

const requestKeys = (keys, onComplete, onError) => {
  fetch(keys)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);
};

const createTextarea = () => {
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  body.append(textarea);
};

const createKeyboard = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  body.append(keyboard);
  const row1 = document.createElement('div');
  row1.classList.add('row1');
  row1.classList.add('row');
  const row2 = document.createElement('div');
  row2.classList.add('row2');
  row2.classList.add('row');
  const row3 = document.createElement('div');
  row3.classList.add('row3');
  row3.classList.add('row');
  const row4 = document.createElement('div');
  row4.classList.add('row4');
  row4.classList.add('row');
  const row5 = document.createElement('div');
  row5.classList.add('row5');
  row5.classList.add('row');
  keyboard.append(row1);
  keyboard.append(row2);
  keyboard.append(row3);
  keyboard.append(row4);
  keyboard.append(row5);
};

const createEnKeys = (keys) => {
  const row1 = document.querySelector('.row1');
  const row2 = document.querySelector('.row2');
  const row3 = document.querySelector('.row3');
  const row4 = document.querySelector('.row4');
  const row5 = document.querySelector('.row5');
  for (let i = 0; i < 14; i += 1) {
    const key = document.createElement('button');
    key.classList.add('key');
    key.classList.add(`${keys[i].name}`);
    key.innerHTML = `${keys[i].keyEn}`;
    row1.append(key);
  }
  for (let i = 14; i < 29; i += 1) {
    const key = document.createElement('button');
    key.classList.add('key');
    key.classList.add(`${keys[i].name}`);
    key.innerHTML = `${keys[i].keyEn}`;
    row2.append(key);
  }
  for (let i = 29; i < 42; i += 1) {
    const key = document.createElement('button');
    key.classList.add('key');
    key.classList.add(`${keys[i].name}`);
    key.innerHTML = `${keys[i].keyEn}`;
    row3.append(key);
  }
  for (let i = 42; i < 55; i += 1) {
    const key = document.createElement('button');
    key.classList.add('key');
    key.classList.add(`${keys[i].name}`);
    key.innerHTML = `${keys[i].keyEn}`;
    row4.append(key);
  }

  for (let i = 55; i < keys.length; i += 1) {
    const key = document.createElement('button');
    key.classList.add('key');
    key.classList.add(`${keys[i].name}`);
    key.innerHTML = `${keys[i].keyEn}`;
    row5.append(key);
  }
};

const checkActiveKey = (keys) => {
  keys.forEach((key) => {
    if (key.classList.contains('active') && !key.classList.contains('capsLk')) {
      key.classList.remove('active');
    }
  });
};

const capsPush = (keys, key) => {
  if (key.classList.contains('capsLk') && !key.classList.contains('active')) {
    key.classList.add('active');
    keys.forEach((letter) => {
      if (letter.classList.contains('letter')) {
        // eslint-disable-next-line no-param-reassign
        letter.innerHTML = letter.innerHTML.toUpperCase();
      }
    });
  } else if (key.classList.contains('capsLk') && key.classList.contains('active')) {
    key.classList.remove('active');
    keys.forEach((letter) => {
      if (letter.classList.contains('letter')) {
        // eslint-disable-next-line no-param-reassign
        letter.innerHTML = letter.innerHTML.toLowerCase();
      }
    });
  }
};

const selectText = (textarea) => {
  textarea.focus();
  textarea.setSelectionRange(textarea.selectionStart, textarea.selectionEnd);
};

let textareaValue = '';
const pushVirtualKey = (key) => {
  const textarea = document.querySelector('.textarea');
  if (!key.classList.contains('capsLk')) {
    key.classList.add('active');
  }
  if (key.classList.contains('tab')) {
    textareaValue += '\t';
  } else if (key.classList.contains('backspace')) {
    textareaValue = textareaValue.replace(textareaValue.charAt(textarea.selectionStart - 1), '');
    selectText(textarea);
  } else if (key.classList.contains('del')) {
    textareaValue += '';
    textareaValue = textareaValue.replace(textareaValue.charAt(textarea.selectionEnd), '');
    selectText(textarea);
  } else if (key.classList.contains('enter')) {
    textareaValue += '\n';
  } else if (key.classList.contains('shift')) {
    textareaValue += '';
  } else if (key.classList.contains('ctrl') || key.classList.contains('alt') || key.classList.contains('win')) {
    textareaValue += '';
  } else if (key.classList.contains('capsLk')) {
    textareaValue += '';
  } else {
    textareaValue += key.innerHTML;
    textarea.focus();
  }
  textarea.value = textareaValue;
};

const pushKeys = (keys) => {
  // eslint-disable-next-line no-param-reassign
  keys = document.querySelectorAll('.key');
  keys.forEach((key) => {
    key.addEventListener('click', () => {
      checkActiveKey(keys);
      capsPush(keys, key);
      pushVirtualKey(key);
    });
  });
};

const addKeys = (keys) => {
  createTextarea();
  createKeyboard();
  createEnKeys(keys);
  pushKeys(keys);
};

const handleError = (error) => {
  throw new Error(error);
};

const showKeys = () => {
  requestKeys(keysLink, addKeys, handleError);
};

showKeys();
