const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  const tabs = card.querySelectorAll('.tab');
  const contents = card.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      card.querySelector(`#${tabId}`).classList.add('active');
    });
  });
});

function fazerContato(event){
  event.preventDefault()
  let nome = document.getElementById("nome").value
  let email = document.getElementById("email").value
  let mensagem = document.getElementById("mensagem").value
  let feedbackContato = document.getElementById("feedbackContato")

  fetch("/contato", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nome, email, mensagem })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Resposta do servidor", data)

    feedbackContato.textContent = data.mensagem

    if(data.mensagem === "Email enviado com sucesso"){
      feedbackContato.style.color = "green"
    }
    else{
      feedbackContato.style.color = "red"
    }
  })
  .catch(error => {
    console.error("Erro:", error);
    feedbackContato.textContent = "Erro ao enviar mensagem.";
    feedbackContato.style.color = "red";
  });
}
