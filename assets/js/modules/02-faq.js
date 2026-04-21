/* Module: faq */
  const initFaqModule = () => {
    const section = qs("#faq");
    if (!section) return;

    const chatWindow = qs("#faqChatWindow", section);
    const form = qs("#faqChatForm", section);
    const input = qs("#faqChatInput", section);
    const suggestions = qsa(".faq-suggestion", section);

    if (!chatWindow || !form || !input) return;

    const cannedAnswers = [
      {
        match: ["website", "faqe", "kushton", "cmim", "çmim"],
        tag: "Website",
        answer: "Për website standard, ndërtimi nis nga €300. Nëse do edhe kujdes mujor, mirëmbajtja fillon nga €100 në muaj me update, siguri dhe suport."
      },
      {
        match: ["kohe", "kohë", "zgjas", "afat"],
        tag: "Afat",
        answer: "Website standard zakonisht mbyllet brenda 37 ditësh, ndërsa projektet më të plota planifikohen sipas strukturës, materialeve dhe feedback-ut."
      },
      {
        match: ["seo", "google", "ads"],
        tag: "SEO",
        answer: "Po, përfshijmë SEO bazë dhe ofrojmë plane të avancuara për rritje afatgjatë."
      },
      {
        match: ["e-commerce", "dyqan", "shop", "checkout", "pagesa"],
        tag: "E-commerce",
        answer: "Po ndërtojmë dyqane online me katalog, kategori, checkout dhe integrime pagesash. !mimi zakonisht lëviz nga €900 deri në €1500 sipas kompleksitetit."
      },
      {
        match: ["foto", "fotografi", "produkte", "product"],
        tag: "Fotografi",
        answer: "Po. Realizojmë fotografi premium për produkte, social dhe katalog, me editim profesional dhe delivery gati për web."
      },
      {
        match: ["mirembajt", "mirëmbajt", "support", "backup", "update"],
        tag: "Mirëmbajtje",
        answer: "Mirëmbajtja përfshin update, backup, monitorim performance, rregullime të vogla dhe suport të vazhdueshëm që faqja të mbetet stabile dhe e sigurt."
      },
      {
        match: ["zotëron", "zoteron", "pronësi", "pronesi", "kod", "dizajn", "copyright"],
        tag: "Kontratë",
        answer: "Pas pagesës dhe dorëzimit të projektit sipas ofertës, ju zotëroni punën e paguar (kod/dizajn/përmbajtje që keni paguar). Për komponentë me licencë palë të tretë zbatohen kushtet e tyre. Detajet fiksohen në kontratë para fillimit."
      },
      {
        match: ["pagesë", "pagese", "avans", "fatur", "invoice", "pagesa"],
        tag: "Pagesë",
        answer: "Zakonisht avans për nisje dhe pjesa tjetër në dorëzim ose sipas fazave në ofertë. Nuk fillon punë intensive pa miratim me shkrim të scope-it dhe kushteve."
      },
      {
        match: ["hosting", "domen", "domain", "server"],
        tag: "Hosting",
        answer: "Hosting dhe domeni janë shpesh kosto e veçantë në emrin tuaj. Ne ju ndihmojmë me konfigurim dhe zgjedhje; çmimet varen nga ofruesi. Nuk i fshehim këto kosto në ofertë."
      },
      {
        match: ["pas lansim", "pas dorëzim", "pas dorezim", "mbështetje pas", "mbeshtetje pas"],
        tag: "Pas lansimit",
        answer: "Pas lansimit ju merrni akses dhe udhëzim bazë. Ofrojmë paketa mirëmbajtjeje me përditësime, backup dhe suport  të ndara nga ndërtimi fillestar, përveç nëse është rënë dakord ndryshe."
      }
    ];

    const scrollToBottom = () => {
      requestAnimationFrame(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      });
    };

    const revealMessage = (el) => {
      requestAnimationFrame(() => el.classList.add("is-visible"));
      scrollToBottom();
    };

    const createMessage = ({ type = "ai", text = "", tag = "", typing = false }) => {
      const wrap = document.createElement("div");
      wrap.className = `faq-msg faq-msg--${type}`;

      if (type === "ai") {
        const avatar = document.createElement("div");
        avatar.className = "faq-msg-avatar";
        avatar.setAttribute("aria-hidden", "true");
        avatar.innerHTML = "<i class=\"bi bi-stars\" aria-hidden=\"true\"></i>";

        const bubble = document.createElement("div");
        bubble.className = "faq-msg-bubble";

        const label = document.createElement("span");
        label.className = "faq-msg-label";
        label.textContent = "Asistenti Illyrian";
        bubble.appendChild(label);

        if (tag) {
          const tagEl = document.createElement("span");
          tagEl.className = "faq-msg-tag";
          tagEl.textContent = tag;
          bubble.appendChild(tagEl);
        }

        if (typing) {
          const typingDiv = document.createElement("div");
          typingDiv.className = "faq-typing";
          typingDiv.setAttribute("aria-label", "Duke shkruar");
          for (let i = 0; i < 3; i += 1) typingDiv.appendChild(document.createElement("span"));
          bubble.appendChild(typingDiv);
        } else {
          const p = document.createElement("p");
          p.textContent = text;
          bubble.appendChild(p);
        }

        wrap.appendChild(avatar);
        wrap.appendChild(bubble);
      } else {
        const bubble = document.createElement("div");
        bubble.className = "faq-msg-bubble";
        const p = document.createElement("p");
        p.textContent = text;
        bubble.appendChild(p);
        wrap.appendChild(bubble);
      }

      chatWindow.appendChild(wrap);
      revealMessage(wrap);
      return wrap;
    };

    const findAnswer = (question) => {
      const normalized = String(question || "").toLowerCase();
      const hit = cannedAnswers.find((item) => item.match.some((token) => normalized.includes(token)));
      return hit || {
        tag: "Kontakt",
        answer: "Për këtë pyetje ia vlen të flasim shkurt për projektin tënd. Më shkruaj te kontakti dhe të kthejmë përgjigje të qartë me drejtim dhe buxhet orientues."
      };
    };

    const sendQuestion = (question, preset = null) => {
      const cleanQuestion = String(question || "").trim();
      if (!cleanQuestion) return;

      createMessage({ type: "user", text: cleanQuestion });

      const typingEl = createMessage({ type: "ai", typing: true });
      const reply = preset || findAnswer(cleanQuestion);

      window.setTimeout(() => {
        typingEl.remove();
        createMessage({ type: "ai", text: reply.answer, tag: reply.tag || "" });
        scrollToBottom();
      }, 900);
    };

    suggestions.forEach((button) => {
      button.addEventListener("click", () => {
        const question = button.dataset.faqQuestion || button.textContent || "";
        const answer = button.dataset.faqAnswer || "";
        const tag = button.dataset.faqTag || "";

        sendQuestion(question, answer ? { answer, tag } : null);
        input.focus();
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const question = input.value.trim();
      if (!question) return;

      sendQuestion(question);
      input.value = "";
    });

    scrollToBottom();
  };
  initFaqModule();

