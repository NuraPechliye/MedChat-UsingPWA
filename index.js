window.addEventListener('load', () =>{
    registerSW()

})

async function registerSW() {
    if ('serviceWorker' in navigator){
        try{
            await navigator.serviceWorker.register('./sw.js')
        } catch(e) {
            console.log ('Deu erro no Service Worker!')
        }
    }
}


//SITE 

class MobileNavbar {
    constructor(mobileMenuSelector, navListSelector, navLinksSelector) {
        this.mobileMenu = document.querySelector(mobileMenuSelector);
        this.navList = document.querySelector(navListSelector);
        this.navLinks = document.querySelectorAll(navLinksSelector);
        this.activateClass = "active";

        this.handleClick = this.handleClick.bind(this);
    } //CHAMANDO MENU BOTAO, LISTA DE LINKS, E LINK SELECIONADO

    handleClick() {
        this.navList.classList.toggle(this.activateClass);
        this.animateLinks();
    } // ANIMACAO CLICAR

    animateLinks() {
        this.navLinks.forEach((link) => {

            link.style.animation
            ? (link.style.animation = "")
            : (link.style.animation = 'navLinkFade 0.5s ease forwards 0.3s');

        }); //demorinha para aparecer os links, um depois do outro
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick); //escutar o clique no botao responsivo
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}
    
const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li"
);

mobileNavbar.init();




//COMECA O CHAT

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");
  const button = document.querySelector("button");

  function addMessage(message, sender) {
    const msg = document.createElement("div");
    msg.classList.add("msg", sender);
    msg.innerText = message;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  }

  function botResponse(userInput) {
    const lower = userInput.toLowerCase(); // o lower funciona para tornar tudo minusculo => evitando erros de leitura

    if (lower.includes("febre")) {
      return "Febre pode ser sinal de infecção. Hidrate-se e, se persistir, procure um médico.";
    } else if (lower.includes("dor de cabeça")) {
      return "Dor de cabeça pode ter várias causas. Tente descansar e evitar luz forte.";
    } else if (lower.includes("tosse")) {
      return "Tosse pode ser sintoma de resfriado, alergia ou outra condição respiratória.";
    } else if (lower.includes("ar") || lower.includes("peito")) {
      return "CHAME O SAMU IMEDIATAMENTE.";
    } else if (lower.includes("diarreia")) {
      return "Mantenha-se hidratado. Se a diarreia persistir por mais de 2 dias, consulte um médico.";
    } else if (lower.includes("covid")) {
      return "Se você suspeita de COVID-19, faça o teste e siga as recomendações de isolamento.";
    } else if (lower.includes("oi") || lower.includes("olá")) {
      return "Olá! Me diga seus sintomas para que eu possa te ajudar.";
    } else if (lower.includes("cansaço")) {
      return "Sinto muito que você esteja se sentindo sobrecarregado. Procure aliviar a cabeça com algo ";
    } else if (lower.includes("coração") || lower.includes("coracao")) {
      return "CHAME O SAMU IMEDIATAMENTE.";
    } else if (lower.includes("obrigada") || lower.includes("obrigado") || lower.includes("obg") || lower.includes("obgda") || lower.includes("obgdo"))  {
      return "Por nada! Fique atento aos sintomas e cuide-se.";
    } else {
      return "Desculpe, não entendi. Tente descrever seus sintomas de forma diferente.";
    }
  }

  function handleSendMessage() {
    const userText = input.value.trim();
    if (userText !== "") {
      addMessage(userText, "user");
      const response = botResponse(userText);
      setTimeout(() => addMessage(response, "bot"), 500); // Delay para simular "pensando"
      input.value = "";
    }
  }

  // escutar botao de enviar
  button.addEventListener("click", handleSendMessage);

  // envio com Enter
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSendMessage(); //funcao das mensagens e de tudo é chamada (primordial)
    }
  });
});

