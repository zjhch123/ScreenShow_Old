export default function (func, timer) {
  let count = 0;
  let timeoutId = 0;
  let args, context;
  return function () {
    args = arguments;
    context = this;
    count += 1;
    clearTimeout(timeoutId);
    if (count == 2) {
      count = 0;
      func.apply(context, args);
      return;
    }
    timeoutId = setTimeout(function () {
      count = 0;
    }, timer);
  }
}