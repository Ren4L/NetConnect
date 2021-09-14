function Coding(arg, log){
    let length = arg.length;
    let logChap = log[2].charCodeAt();
    for (let i = 0; i < arg.length; i++) {
      arg[i] = arg[i].charCodeAt() + length + logChap;
      arg[i] = String.fromCharCode(arg[i]);
    }
    return arg.join('')
  }

  function deCoding(arg, log){
    let length = arg.length;
    let logChap = log[2].charCodeAt();
    for (let i = 0; i < arg.length; i++) {
      arg[i] = arg[i].charCodeAt() - length - logChap;
      arg[i] = String.fromCharCode(arg[i]);
    }
    return arg.join('')
  }

  module.exports.Coding = Coding;
  module.exports.deCoding = deCoding;