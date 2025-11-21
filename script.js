const ajoutBtn = document.querySelector(".ajoutBtn");
const formContainerAjout = document.querySelector("#formContainerAjout");
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
urle.addEventListener("input", () => {
    imagePreview.innerHTML = `
        <img src="${urle.value}">
    `
})
function hideAfficheForm() {
    formContainerAjout.classList.toggle("hidden");
    imagePreview.innerHTML = `<span class="text-gray-400 text-sm">No image</span>`;
}
// formContainerAjout.addEventListener('click' , () =>{

// })
ajoutBtn.addEventListener("click", () => {
    hideAfficheForm();
});
annulBtnForm.addEventListener("click", () => {
    hideAfficheForm();
});
function addExperience(data = {}) {
    let clone = experienceTemplate.content.cloneNode(true);
    let container = clone.querySelector("div");
    container.querySelector(".removeExpBtn").addEventListener("click", () => {
        container.remove();
    });
    experiencesList.append(container);
}
addExperience();
addExperienceBtn.addEventListener("click", () => {
    addExperience();
});
const form = document.querySelector("#cvForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let nom = form.nom.value.trim();
    let role = document.querySelector("select").value;
    let telephone = form.telephone.value.trim();
    let email = form.email.value.trim();
    let url = form.url.value.trim();

    const nomRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,10}$/;
    const telRegex = /^(\+212|0)(6|7)[0-9]{8}$/;
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

    if (!nomRegex.test(nom)) {
        alert("Le nom est invalide (3 à 30 lettres uniquement).");
        return;
    }
    // if (!telRegex.test(telephone)) {
    //     alert("Téléphone invalide. Exemple: +212612345678 ou 0612345678");
    //     return;
    // }
    if (!emailRegex.test(email)) {
        alert("Email invalide. Exemple: exemple@domaine.com");
        return;
    }
    const experiences = document.querySelectorAll(".experiencedata");
    experiences.forEach(exp => {
        const debut = exp.querySelector('input[name="debut"]')?.value;
        const fin = exp.querySelector('input[name="fin"]')?.value;
        const startDate = new Date(debut);
        const endDate = new Date(fin);

        // if (startDate > endDate) {
        //     alert("La date début ne peut pas être après la date fin !");
        //     throw "date error";
        // }
    });
    let experience = [];
    experiences.forEach((exp) => {
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
    hideAfficheForm();
    form.reset();
    affichersidebar();
    afficherdetails()
    employelist = [...employes];
});
function affichersidebar() {
    employesContainer.innerHTML = "";
    employes.forEach(emp => {
        const div = document.createElement("div");
        div.setAttribute("data-id", `${emp.id}`);
        div.className =
            "employe  flex rounded-2xl p-[5px] border-black  border-2 cursor-pointer gap-2 justify-between items-center w-";
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
                <span>${emp.location}</span>
            `;
        employesContainer.appendChild(div);
    })
}
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
            <p class = "text-[20px] " style="color:green">${eml.location}</p>
            </div>
            `;


            details.innerHTML = "";
            details.appendChild(divdet);
            const CloseDetails = document.querySelector('.CloseDetails');
            CloseDetails.addEventListener('click', () => {
                details.classList.toggle('hidden');
            })
            if (!e.target.classList.contains('deletefromroom')) {
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

const addtoroom = document.querySelectorAll('.addtoroom');
const ListAddWorkSpace = document.querySelector('#ListAddWorkSpace');
addtoroom.forEach(addbtn => {
    const roomcontainer = addbtn.parentNode;
    addbtn.addEventListener('click', () => {
        let lengthemp = employelist.length
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
    })
})
function afficher(arrayroom, roomcontainer, room) {
    ListAddWorkSpace.innerHTML = "";
    ListAddWorkSpace.innerHTML = `<p class="listclose flex justify-end p-3">X</p>`;
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
        ListAddWorkSpace.appendChild(div)
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
    const listclose = document.querySelector('.listclose');
    listclose.addEventListener('click', () => {
        afficherdetails();
        ListAddWorkSpace.classList.add('hidden')
        ListAddWorkSpace.classList.remove('flex')
    })
}
