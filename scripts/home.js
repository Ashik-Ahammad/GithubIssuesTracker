const getIssueCard = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  manageSpinner(true);

  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      const countElement = document.getElementById("issue-count");
      if (countElement) {
        countElement.innerText = result.data.length;
      }
      displayCards(result.data);
    });
};

const displayCards = (cards) => {
  const issueContainer = document.getElementById("issue-cards-section");
  issueContainer.innerHTML = "";

  cards.forEach((card) => {
    const div = document.createElement("div");
    div.classList.add("h-full");
    div.addEventListener("click", () => {
      openModal(card);
    });

    div.innerHTML = `
    <div class="card cursor-pointer bg-base-100 w-full h-full shadow-sm border-t-5  flex flex-col ${card.status === "open" ? "border-t-[#00A96E]" : "border-t-[#A855F7]"}">
        
        <div class="flex justify-between items-center mx-5 mt-4">
          <div><img src="assets/Open-Status.png" alt="status" class="w-7" /></div>
          <div class="badge bg-gray-100 text-white text-[10px] font-bold px-3 py-2" 
                 style="color: ${
                   card.priority.toLowerCase() === "high"
                     ? "#EF4444"
                     : card.priority.toLowerCase() === "medium"
                       ? "#F59E0B"
                       : "#9CA3AF"
                 };">
              ${card.priority.toUpperCase()}
           </div>
        </div>

        <div class="card-body border-b border-gray-100 grow">
          <h2 class="card-title text-lg">${card.title}</h2>
          <p class="text-sm text-gray-600">${card.description}</p>
          
          <div class="card-actions justify-start mt-2">
            ${card.labels.map((label) => `
            <div class="badge badge-outline gap-1 py-3 px-3 border-none" 
                style="color: ${label.toLowerCase() === "bug" ? "#EF4444" : "#F59E0B"}; 
                background-color: ${label.toLowerCase() === "bug" ? "#FEF2F2" : "#FFFBEB"}">
                <span class="text-[10px] font-bold">${label.toUpperCase()}</span>
            </div>
            `,
         )
            .join("")}
            </div>
        </div>

        <div class="px-5 py-3 text-xs text-gray-500">
          <p>#${card.id} by <span class="font-semibold text-gray-700">${card.author}</span></p>
          <p>Date: ${new Date(card.createdAt).toLocaleDateString()}</p>
        </div>
    </div>
    `;

    issueContainer.appendChild(div);
  });
  manageSpinner(false);
};

// Spinner
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issue-cards-section").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("issue-cards-section").classList.remove("hidden");
  }
};

// Modal data
const openModal = (card) => {
  const modal = document.getElementById("issue_modal");
  const modalBox = modal.querySelector(".modal-box");

  modalBox.innerHTML = `
        <div class="space-y-4 text-left">
            <h1 class="text-2xl font-bold text-gray-800">${card.title}</h1>
            
            <div class="flex items-center gap-2 text-sm text-gray-500">
                <div class="badge text-white border-none py-3" 
                     style="background-color: ${card.status === "open" ? "#00A96E" : "#A855F7"}">
                    ${card.status === "open" ? "Opened" : "Closed"}
                </div>
                <span>• Opened by <span class="font-medium">${card.author}</span> • ${new Date(card.createdAt).toLocaleDateString()}</span>
            </div>

            <div class="flex gap-2">
            ${card.labels
              .map(
                (label) => `
                <div class="badge badge-outline gap-1 py-3 px-3 border-none" 
                    style="color: ${label.toLowerCase() === "bug" ? "#EF4444" : "#F59E0B"}; 
                    background-color: ${label.toLowerCase() === "bug" ? "#FEF2F2" : "#FFFBEB"}">
                    <span class="text-[10px] font-bold">${label.toUpperCase()}</span>
                </div>
                    `,
              )
              .join("")}
            </div>

            <p class="text-gray-500 leading-relaxed pt-4">
                ${card.description}
            </p>

            <div class="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl mt-6">
                <div>
                    <p class="text-gray-400 text-sm mb-1">Assignee:</p>
                    <p class="font-bold text-gray-800">${card.assignee || "Unassigned"}</p>
                </div>
                <div>
                    <p class="text-gray-400 text-sm mb-1">Priority:</p>
                    <div class="badge text-white border-none font-bold px-4" 
                         style="background-color: ${card.priority.toLowerCase() === "high" ? "#EF4444" : card.priority.toLowerCase() === "medium" ? "#F59E0B" : "#9CA3AF"}">
                        ${card.priority.toUpperCase()}
                    </div>
                </div>
            </div>

            <div class="modal-action">
                <form method="dialog">
                    <button class="btn bg-[#6419E6] hover:bg-[#4d12b1] text-white border-none px-8">Close</button>
                </form>
            </div>
        </div>
    `;

  modal.showModal();
};

getIssueCard();
