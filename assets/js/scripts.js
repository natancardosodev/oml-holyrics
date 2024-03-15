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
  
  // Divide o texto em parágrafos
  const paragraphs = text.split(/\n{1,}/);

  // Agrupa os parágrafos de dois em dois e adiciona uma linha em branco entre eles
  const groupedParagraphs = [];
  for (let i = 0; i < paragraphs.length; i += 2) {
    const pair = paragraphs.slice(i, i + 2).join("\n");
    groupedParagraphs.push(pair);
  }

  // Junta os parágrafos agrupados
  const outputText = groupedParagraphs.join("\n\n");

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

 function salvarTxt() {
    var conteudo = document.getElementById('outputTextarea').value;

    // Criar um blob de texto com o conteúdo da div
    var blob = new Blob([conteudo], { type: 'text/plain' });

    // Criar um objeto URL a partir do blob
    var url = window.URL.createObjectURL(blob);

    // Criar um link para o objeto URL
    var link = document.createElement('a');
    link.href = url;
    link.download = document.getElementById('outputTextarea').value.split('\n')[0] + '.txt'; // Nome do arquivo
    link.click();

    // Liberar o objeto URL
    window.URL.revokeObjectURL(url);
};
