(function() {
  const [form] = document.forms;
  const divContainer = document.querySelector('div.login');

  form.addEventListener('submit', (event) => {
    const username = document.querySelector('#inputUsername').value;
    const password = document.querySelector('#inputPassword').value;

    if (!username || !password) {
      event.preventDefault();
      const errorEl = window.generateError('Fill in all fields!');
      divContainer.prepend(errorEl);
    }
  });
})();
