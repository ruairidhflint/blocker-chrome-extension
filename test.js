const rootElem = document.getElementById('root');

const testData = [
  'https://rory.codes',
  'https://www.dailymail.co.uk',
  'https://www.reddit.com',
  'https://www.google.com',
];

class ItemList {
  constructor(list) {
    this.blockedList = list;
    this.app = this.getElement('#root');
    this.title = this.createElement('h1', 'title');
    this.title.textContent = 'Blocked list';

    this.list = this.createElement('ul', 'list');

    this.app.append(this.title);
    this.app.append(this.list);

    this.displayList(this.blockedList);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  displayList(blockedList) {
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }

    if (blockedList.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing here yet!';
      this.list.append(p);
    } else {
      blockedList.forEach((todo) => {
        const li = this.createElement('li', 'list-item');
        li.textContent = todo;
        this.list.append(li);
      });
    }
  }
}

const app = new ItemList(['1', '2']);
