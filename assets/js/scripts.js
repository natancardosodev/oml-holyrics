var inputTextarea = document.getElementById("myTextarea");
var outputTextarea = document.getElementById("outputTextarea");

inputTextarea.addEventListener("input", function () {
  const text = inputTextarea.value;
  const paragraphs = text.split(/\n{1,}/);
  const outputText = paragraphs.join("\n\n");

  outputTextarea.value = outputText;
});

function copyResult() {
  var copyText = document.getElementById("outputTextarea");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value);
}