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
    })
};

const displayCards = (cards) => {
  const issueContainer = document.getElementById("issue-cards-section");
  issueContainer.innerHTML = "";

  cards.forEach((card) => {
    const div = document.createElement("div");
    div.classList.add("h-full");

    div.innerHTML = `
    <div class="card bg-base-100 w-full h-full shadow-sm border-t-5  flex flex-col ${card.status === 'open' ? 'border-t-[#00A96E]' : 'border-t-[#A855F7]'}">
        
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
                <div class="badge badge-soft text-xs">
                    ${label}
                </div>`).join("")}
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

const manageSpinner = (status) => {
    if(status == true){
        
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issue-cards-section").classList.add("hidden");
    }
    else{
        
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("issue-cards-section").classList.remove("hidden");
    }
}

getIssueCard();


