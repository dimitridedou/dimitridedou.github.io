let translations;

document.addEventListener("DOMContentLoaded", () => {
  fetch("../json/translations.json")
    .then(response => response.json())
    .then(data => {
      translations = data;

      // Διαβάζουμε το lang από το URL, π.χ. ?lang=el ή ?lang=en
      const urlParams = new URLSearchParams(window.location.search);
      let langFromUrl = urlParams.get('lang');

      // Αν δεν υπάρχει στο URL, παίρνουμε το αποθηκευμένο ή το default (el)
      const savedLang = langFromUrl || localStorage.getItem("lang") || "el";

      // Αποθηκεύουμε στο localStorage την επιλεγμένη γλώσσα
      localStorage.setItem("lang", savedLang);

      // Ρυθμίζουμε το select (αν υπάρχει)
      const languageSelect = document.getElementById("language");
      if (languageSelect) {
        languageSelect.value = savedLang;
        languageSelect.addEventListener("change", (e) => {
          const selectedLang = e.target.value;
          localStorage.setItem("lang", selectedLang);
          applyLanguage(selectedLang);
          // Ενημέρωση URL χωρίς ανανέωση σε περίπτωση που θέλεις
          history.replaceState(null, '', `?lang=${selectedLang}`);
        });
      }

      // Εφαρμόζουμε τη γλώσσα
      applyLanguage(savedLang);
    });
});

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  document.getElementById("info").innerHTML  = t.info;
  document.getElementById("mygender").innerHTML  = t.mygender;
  document.getElementById("myusername").innerHTML = t.myusername;
  document.getElementById("aboutme").innerHTML  = t.aboutme;
  document.getElementById("txtaboutme").innerHTML  = t.txtaboutme;
  document.getElementById("ChangeLanguage").innerHTML  = t.ChangeLanguage;
  document.getElementById("os").innerHTML  = t.os;
  document.getElementById("osTxt").innerHTML  = t.osTxt;
  document.getElementById("Platforms").innerHTML  = t.Platforms;
  document.getElementById("PlatformsTxt").innerHTML  = t.PlatformsTxt;
  document.getElementById("programmingLang").innerHTML  = t.programmingLang;
  document.getElementById("programmingLanguagesTxt").innerHTML  = t.programmingLanguagesTxt;
  document.getElementById("skillsTitle").innerHTML  = t.skillsTitle;


  document.getElementById("educationTitle").innerHTML  = t.educationTitle;
  const eduList = document.getElementById("educationList");
  eduList.innerHTML = "";
  t.education.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${item.degree}</strong><br>${item.school}<br><em>${item.years}</em><br><br>`;
    eduList.appendChild(div);
  });
  console.log("Education Title:", t.educationTitle);
console.log("Education Array:", t.education);
}
