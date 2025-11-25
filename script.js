const ajoutBtn = document.querySelector(".ajoutBtn");
const formContainerAjout = document.querySelector("#formContainerAjout");
const form = document.querySelector("#cvForm");
const annulBtnForm = document.querySelector("#annulBtnForm");
const addExperienceBtn = document.querySelector("#addExperienceBtn");
const experienceTemplate = document.querySelector("#experienceTemplate");
let experiencesList = document.querySelector("#experiencesList");
const employesContainer = document.querySelector(".employesContainer");
const imagePreview = document.querySelector('#imagePreview');
const urle = document.querySelector('input[name="url"]');
let employes = [];
let employelist = [];
let id = 0;
const details = document.getElementById("details");
const addtoroom = document.querySelectorAll('.addtoroom');
const ListAddWorkSpace = document.querySelector('#ListAddWorkSpace');
// ------afficher the pecture in url -------------
urle.addEventListener("input", () => {
    imagePreview.innerHTML = `
        <img src="${urle.value}">
    `
}) 

// ---------for hide and affiche form -----------
function hideAfficheForm() {
    formContainerAjout.classList.toggle("hidden");
    imagePreview.innerHTML = `<span class="text-gray-400 text-sm">No image</span>`;
}
// -------for exit the form with click out of the form ------------
formContainerAjout.addEventListener('click', (e) => {
    if (e.target.classList.contains('formContainer')) {
        hideAfficheForm();
    }
})
// --------------afficher form clicked btn ajoute -----------
ajoutBtn.addEventListener("click", () => {
    hideAfficheForm();
});
// ------------------hide form clicked btn annuler ------------
annulBtnForm.addEventListener("click", () => {
    hideAfficheForm();
});
// ------------for add experienceTemplate to the form -----------
function addExperience(data = {}) {
    let clone = experienceTemplate.content.cloneNode(true);
    let container = clone.querySelector("div");
    container.querySelector(".removeExpBtn").addEventListener("click", () => {
        container.remove();
    });
    experiencesList.append(container);
}
addExperience();
// ------------- for ajt new container of experience ------------
addExperienceBtn.addEventListener("click", () => {
    addExperience();
});
// ---------------- form validation and traitment of data -----------------
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let nom = form.nom.value.trim();
    let role = document.querySelector("select").value;
    let telephone = form.telephone.value.trim();
    let email = form.email.value.trim();
    let url = form.url.value.trim();

    const nomRegex = /^[A-Za-z ]{3,10}$/;
    const telRegex = /^(\+212|0)(6|7)[0-9]{8}$/;
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

    if (!nomRegex.test(nom)) {
        showToast("Le nom est invalide (3 à 30 lettres uniquement).", "warning");
        return;
    }
    if (!telRegex.test(telephone)) {
        showToast("Téléphone invalide. Exemple: +212612345678 ou 0612345678" , "warning");
        return;
    }
    if (!emailRegex.test(email)) {      
        showToast("Email invalide. Exemple: exemple@domaine.com" , "warning");
        return;
    }
    const experiences = document.querySelectorAll(".experiencedata");
    experiences.forEach(exp => {
        const debut = exp.querySelector('input[name="debut"]').value;
        const fin = exp.querySelector('input[name="fin"]').value;
        const startDate = new Date(debut);
        const endDate = new Date(fin);

        if (startDate > endDate) {
            showToast("La date début ne peut pas être après la date fin !" , "warning");
            throw errordate; 
        }
    });
    let experience = [];
    experiences.forEach(exp => {
        let poste = exp.querySelector('input[name="poste"]').value.trim();
        let entreprise = exp.querySelector('input[name="entreprise"]').value.trim();
        let debut = exp.querySelector("#debut").value;
        let fin = exp.querySelector("#fin").value;
        let description = exp.querySelector("textarea").value.trim();
        experience.push({
            poste: poste,
            entreprise: entreprise,
            debut: debut,
            fin: fin,
            description: description,
        });
    });
    id++;
    let employe = {
        id: id,
        nom: nom,
        role: role,
        url: url,
        email: email,
        telephone: telephone,
        location: "unsinged",
        experience: experience,
    };
    employes.push(employe);
    employelist.push(employe);
    hideAfficheForm();
    form.reset();
    affichersidebar();
    afficherdetails();
    showToast("L’employé a été ajouté avec succès", "success")
});
// --------------afficher worker in side bar -----------
function affichersidebar() {
    employesContainer.innerHTML = "";
    employes.forEach(emp => {
        const div = document.createElement("div");
        div.setAttribute("data-id", `${emp.id}`);
        div.className =
            "employe  flex rounded-2xl p-[5px] border-black  border-2 cursor-pointer gap-2 justify-between items-center ";
        div.innerHTML = `
            <div class="imageContainerProfil overflow-hidden flex justify-center items-center rounded-xl h-full w-9">
                    <img class="w-full h-full"
                        src="${emp.url}"
                        alt="employe"/>
                </div>
                <div class="overflow-hidden ">
                        <h5 class="font-extrabold text-zinc-500 truncate sm:hidden lg:flex" style="font-size : 12px;">${emp.nom}</h5>
                        <p class="roleEmploye font-bold text-zinc-500 truncate sm:hidden lg:flex" style="font-size : 12px;">${emp.role}</p>
                    </div>
                <span style="color : green ;">${emp.location}</span>
            `;
        employesContainer.appendChild(div);
    })
}
// ----------------affiche detail for any worker ---------------
function afficherdetails() {
    const allemp = document.querySelectorAll('.employe');
    allemp.forEach(emp => {
        const eml = employes.find(f => f.id == emp.dataset.id);
        emp.addEventListener('click', (e) => {
            const divdet = document.createElement('div');
            divdet.className = 'employeDetails flex flex-col gap-3  w-full p-4 overflow-y-scroll h-full '
            divdet.style.scrollbarWidth = 'none';
            divdet.innerHTML = `
            <p class="CloseDetails place-self-end pr-2 h-[30px] flex justify-end p-[10px]" style="font-size: 20px ">X</p>
            <img src="${eml.url}" alt="" class="rounded-full w-40 h-40 place-self-center">
            <div class="flex justify-around flex-col items-center gap-2">
            <h1 style="font-size: 30px; ">${eml.nom}</h1>
            <p>${eml.nom}</p>
            <p>${eml.email}</p>
            <p>${eml.telephone}</p>
            <p>${eml.role}</p>
            <p class = "text-[20px] " style="color:green">${eml.location}</p>
            </div>
            `;
            details.innerHTML = "";
            details.appendChild(divdet);
            const CloseDetails = document.querySelector('.CloseDetails');
            CloseDetails.addEventListener('click', () => {
                details.classList.toggle('hidden');
            })
            if(!e.target.classList.contains('deletefromroom')){
                details.classList.toggle('hidden');
            }
            eml.experience.forEach(exp => {
                const employeDetails = document.querySelector(".employeDetails");
                const divExp = document.createElement("div");
                divExp.className = "epx flex flex-col gap-1 bg-[#2d3748] p-3 rounded-2xl";
                divExp.innerHTML = `
                    <p>${exp.poste}</p>
                    <p>${exp.entreprise}</p>
                    <p>${exp.debut}</p>
                    <p>${exp.fin}</p>
                    `;
                employeDetails.append(divExp);
            });
        })
    })
}
// -----------for add worker to room -----------
addtoroom.forEach(addbtn => {
    const roomcontainer = addbtn.parentNode;
    addbtn.addEventListener('click', () => {
        let lengthemp = employelist.length;
        if (lengthemp > 0) {
            room = addbtn.dataset.room
            if (room == "conference" || "personnel") {
                afficher(employelist, roomcontainer, room);
            }
            if (room == "reception") {
                const role = ["Manager", "Réceptionnistes", "Nettoyage"]
                const list = employelist.filter(emp => role.includes(emp.role));
                afficher(list, roomcontainer, room);
            }
            if (room == "serveurs") {
                const role = ["Manager", "Techniciens IT", "Nettoyage"]
                const list = employelist.filter(emp => role.includes(emp.role));
                afficher(list, roomcontainer, room);
            }
            if (room == "securite") {
                const role = ["Manager", "Agents de sécurité", "Nettoyage"]
                const list = employelist.filter(emp => role.includes(emp.role));
                afficher(list, roomcontainer, room);
            }
            if (room == "archives") {
                const role = ["Manager"]
                const list = employelist.filter(emp => role.includes(emp.role));
                afficher(list, roomcontainer, room);
            }
        }
        else {
            showToast("Il n’y a aucun employé","error")
        }
    })
})
function afficher(arrayroom, roomcontainer, room) {
    ListAddWorkSpace.innerHTML = "";
    ListAddWorkSpace.innerHTML = `<p class="listclose flex justify-end p-3">X</p>`;
    if (arrayroom.length == 0) {
        showToast("aucan employer <unsigned> peus acceder a cette chember", "warning")
        ListAddWorkSpace.classList.add('hidden')
    } else {
        arrayroom.forEach(emp => {
            const div = document.createElement("div");
            div.className =
                "employe bg-white  p-[5px] border-black  border-2 cursor-pointer gap-2 flex justify-between items-center rounded-lg";
            div.setAttribute("data-id", `${emp.id}`);
            div.innerHTML = `
                <div class=" overflow-hidden flex justify-center items-center rounded-xl h-full w-9">
                        <img class="h-full w-full" src="${emp.url}" alt="employe" />
                    </div>
                    <div class="overflow-hidden ">
                        <h5 class="font-extrabold text-zinc-500 truncate sm:hidden lg:flex" style="font-size : 12px;">${emp.nom}</h5>
                        <p class="roleEmploye font-bold text-zinc-500 truncate sm:hidden lg:flex" style="font-size : 12px;">${emp.role}</p>
                    </div>
                    <span data-id="${emp.id}" class="deletefromroom">X</span>
            `;
            ListAddWorkSpace.appendChild(div);
            ListAddWorkSpace.classList.remove('hidden')
            ListAddWorkSpace.classList.add('flex')
            div.addEventListener('click', (e) => {
                const length = roomcontainer.children.length;
                if (length < 7) {
                    roomcontainer.classList.remove('bg-red-600/30');
                    roomcontainer.appendChild(div);
                    const emplocation = employes.find(f => f.id == emp.id);
                    employelist = employelist.filter(f => f.id != emp.id);
                    emplocation.location = room;
                    affichersidebar();
                }
                if (e.target.classList.contains('deletefromroom')) {
                    const employedlt = e.target.closest('.employe');
                    const remvemp = employes.find(f => f.id == emp.id);
                    remvemp.location = "unsinged";
                    employedlt.remove();
                    showToast("vous avez retirer l'employe avec succes", "info")
                    affichersidebar();
                    afficherdetails();
                    if (roomcontainer.children.length == 1) {
                        if (!roomcontainer.classList.contains('no-bg')) {
                            roomcontainer.classList.add('bg-red-600/30');
                        }
                    }
                    employelist.push(remvemp);
                }
            })
        })
    }
    const listclose = document.querySelector('.listclose');
    listclose.addEventListener('click', () => {
        afficherdetails();
        ListAddWorkSpace.classList.add('hidden')
        ListAddWorkSpace.classList.remove('flex')
    })
}
// -----------------this for toast Notification -------------
function showToast(message, type) {
    const container = document.getElementById("toast-container")
    const colors = {
        info: "bg-indigo-600",
        success: "bg-emerald-600",
        warning: "bg-amber-600",
        error: "bg-red-600"
    };
    const toast = document.createElement("div")
    toast.className = `toast text-white px-4 py-3 rounded-lg shadow-2xl ${colors[type]} border border-white/20`
    toast.textContent = message
    container.appendChild(toast)
    setTimeout(() => {
        toast.remove();
    }, 1500);
}