window.generateError = (errorMessage) => {
  let divError = document.querySelector('div.alert-danger');

  if (!divError) {
    divError = document.createElement('div');

    divError.classList.add('alert');
    divError.classList.add('alert-danger');
  }
  divError.textContent = '';

  const hasBreakLines = errorMessage.split('\n').length > 1;
  if (hasBreakLines) {
    errorMessage = errorMessage.replace(/\n/g, '<br />');
    errorMessage = errorMessage.replace(/\t/g, '&emsp;');
    divError.innerHTML = errorMessage;
  } else {
    const textError = document.createTextNode(errorMessage);
    divError.appendChild(textError);
  }

  return divError;
}
