var inputTextarea = document.getElementById("myTextarea");
var outputTextarea = document.getElementById("outputTextarea");
var titleMusic = document.getElementById("titleMusic");
var cantor = document.getElementById("cantor");

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
  var copyText = document.getElementById("outputTextarea");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value);
}

async function searchMusic() {
  dataPesquisa = [];
  const key = 'xx';
  const typesError = ['song_notfound', 'notfound']

  await fetch('https://api.vagalume.com.br/search.php?art='+cantor.value+'&mus='+titleMusic.value+'&extra=relmus&apikey='+key)
    .then((response) => response.json())
    .then((res) => {
      if (typesError.includes(res.type)) {
        inputTextarea.innerHTML = 'Música não encontrada.'
      }
      if (res.mus.length) { 
        inputTextarea.innerHTML = res.mus[0].text;
        splitText();
      }
    })
    .catch(() => {
      inputTextarea.innerHTML = 'Ocorreu um erro na requisição.'
    });
};
