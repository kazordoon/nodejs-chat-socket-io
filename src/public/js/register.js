(function() {
  const [form] = document.forms;
  const divContainer = document.querySelector('div.register');

  form.addEventListener('submit', (event) => {
    const username = document.querySelector('#inputUsername').value;
    const password1 = document.querySelector('#inputPassword1').value;
    const password2 = document.querySelector('#inputPassword2').value;

    if (!username || !password1 || !password2) {
      event.preventDefault();
      const errorEl = window.generateError('Fill in all fields!');
      divContainer.prepend(errorEl);
      return;
    }

    const usernameRegexp = /^[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/;
    const invalidUsername = !usernameRegexp.test(username) || username.length < 3;

    if (invalidUsername) {
      event.preventDefault();
      // The username
      /* must have
      *   at least 3 characters
      */

      /* can have
      *   letters
      *   numbers
      *   underscores
      */

      /* can not have
      *   two underscores in a row
      *   a underscore at the start or the end
      */
      const textError = `Invalid username.\n
      The username
        \t- must have at least 3 characters
        \t- can have letters, numbers or underscores
        \t- can not have two underscores in a row or a underscore at the start or the end
      `;
      const errorEl = window.generateError(textError);
      divContainer.prepend(errorEl);
      return;
    }

    const invalidPasswordLength = password1.length < 8 || password2.length < 8;
    const differentPasswords = password1 !== password2;

    if (invalidPasswordLength) {
      event.preventDefault();
      const errorEl = window.generateError('The password must have at least 8 characters.');
      divContainer.prepend(errorEl);
      return;
    }

    if (differentPasswords) {
      event.preventDefault();
      const errorEl = window.generateError("The passwords don't match.");
      divContainer.prepend(errorEl);
      return;
    }
  });
})();
