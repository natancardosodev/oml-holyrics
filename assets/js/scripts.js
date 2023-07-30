var inputTextarea = document.getElementById("myTextarea");
var outputTextarea = document.getElementById("outputTextarea");
var titleMusic = document.getElementById("titleMusic");
var cantor = document.getElementById("cantor");
var msg = document.getElementById("feedback-copy");

inputTextarea.addEventListener("input", function () {
  splitText();
});

function splitText() {
  const text = inputTextarea.value;
  const paragraphs = text.split(/\n{1,}/);
  const outputText = paragraphs.join("\n\n");

  outputTextarea.value = outputText;
}

function copyResult() {
  outputTextarea.select();
  outputTextarea.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(outputTextarea.value);
  showMsgCopy();
}

function showMsgCopy() {
  msg.style.display = "flex";
  setTimeout(() => {
    msg.style.display = "none";
  }, 1200);
}

async function pasteMusic() {
  await navigator.clipboard
    .readText()
    .then(
      cliptext =>
        (inputTextarea.innerHTML = cliptext),
      err => console.log(err)
    );
  splitText();
  copyResult();
}

async function searchMusic() {
  const key = 'xx';
  inputTextarea.innerHTML = null;

  await fetch('https://api.vagalume.com.br/search.php?art=' + cantor.value + '&mus=' + titleMusic.value + '&extra=relmus&apikey=' + key)
    .then((response) => response.json())
    .then((res) => {
      if (res.mus.length) {
        inputTextarea.innerHTML = res.mus[0].text;
      }
    })
    .catch(() => {
      inputTextarea.innerHTML = 'Música não encontrada.'
    })
    .finally(() => {
      splitText();
    });
};
