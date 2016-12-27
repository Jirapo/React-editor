


export default (capture) => {
  let capturingConsole = Object.create(console);
  let buffer = [];

  function capture() {
    if (this !== capturingConsole) { return; }

    let logs = _.map(arguments, log => JSON.stringify(log));

    buffer.push(logs.join(' '));
  }


  capturingConsole.clear = function() {
    buffer = [];
    console.clear();
  };

  ['error', 'log', 'info', 'debug'].forEach(function(key) {
    capturingConsole[key] = function() {
      Function.prototype.apply.call(console[key], console, arguments);
      capture.apply(this, arguments);
    };
  });

  capturingConsole.getBuffer = () => buffer.join('\n')

  return capturingConsole;
}
