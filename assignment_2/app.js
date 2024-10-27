const cnt = document.getElementById("cnt");
const players = document.getElementById("players");
const search = document.querySelector(".form-control");
const searchBtn = document.getElementById("button-search");
const listOfPlayers = document.getElementById("listOfPlayers");

searchBtn.addEventListener("click", () => {
  fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${search.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      players.innerHTML = "";
      data.player.forEach((player) => {
        const playerCard = document.createElement("div");
        playerCard.classList.add("mb-4", "card");

        const {
          strSport,
          strDescriptionEN,
          strTeam,
          strNationality,
          strThumb,
          strTwitter,
          strFacebook,
          strGender,
          strPlayer,
          strWage,
        } = player;

        const desc10word = strDescriptionEN
          ? strDescriptionEN.split(" ").slice(0, 10).join(" ")
          : "No description available";

        playerCard.innerHTML = `
        <div style="width: 18rem;">
            <div class='w-100 bg-black'>
            <img src="${
              strThumb || "def.png"
            }" class="card-img-top" alt="Player Image">
            </div>
            <div class="card-body">
                <h5 class="card-title">${strPlayer}</h5>
                <p class="card-text">Sport: ${strSport}</p>
                <p class="card-text">Team: ${strTeam || "No team available"}</p>
                <p class="card-text">Nationality: ${strNationality}</p>
                <p class="card-text">Description: ${desc10word}</p>
                <p class="card-text">Gender: ${strGender}</p>
                <p class="card-text">Salary: ${strWage || 0}</p>
                <div class="d-flex gap-2">
                   <a href="https://twitter.com/${strTwitter}" target="_blank" class="btn btn-primary">
                    <i class="fa-brands fa-facebook-f"></i>
                   </a>
                   <a href="https://facebook.com/${strFacebook}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-twitter"></i></a>
                </div>
                <div class="mt-2">
                    <button class="btn btn-primary" onclick="addToList('${strPlayer}')">Add to list</button>
                    <button type="button" onclick="showAllDetails(${
                      player.idPlayer
                    })" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">
                     Details
                    </button>
                </div>

            </div>
        </div>
    `;

        players.appendChild(playerCard);
      });
    });
});

fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=me")
  .then((response) => response.json())
  .then((data) => {
    data.player.forEach((player) => {
      const playerCard = document.createElement("div");
      playerCard.classList.add("mb-4", "card");

      const {
        strSport,
        strDescriptionEN,
        strTeam,
        strNationality,
        strThumb,
        strTwitter,
        strFacebook,
        strGender,
        strPlayer,
        strWage,
      } = player;

      const desc10word = strDescriptionEN
        ? strDescriptionEN.split(" ").slice(0, 10).join(" ")
        : "No description available";

      playerCard.innerHTML = `
        <div style="width: 18rem;">
            <div class='w-100 bg-black'>
            <img src="${
              strThumb || "def.png"
            }" class="card-img-top" alt="Player Image">
            </div>
            <div class="card-body">
                <h5 class="card-title">${strPlayer}</h5>
                <p class="card-text">Sport: ${strSport}</p>
                <p class="card-text">Team: ${strTeam || "No team available"}</p>
                <p class="card-text">Nationality: ${strNationality}</p>
                <p class="card-text">Description: ${desc10word}</p>
                <p class="card-text">Gender: ${strGender}</p>
                <p class="card-text">Salary: ${strWage || 0}</p>
                <div class="d-flex gap-2">
                   <a href="https://twitter.com/${strTwitter}" target="_blank" class="btn btn-primary">
                    <i class="fa-brands fa-facebook-f"></i>
                   </a>
                   <a href="https://facebook.com/${strFacebook}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-twitter"></i></a>
                </div>
                <div class="mt-2">
                    <button class="btn btn-primary" onclick="addToList('${strPlayer}')">Add to list</button>
                    <button type="button" onclick="showAllDetails(${
                      player.idPlayer
                    })" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">
                     Details
                    </button>
                </div>

            </div>
        </div>
    `;

      players.appendChild(playerCard);
    });
  });

const addToList = (playerName) => {
  console.log(listOfPlayers.children.length);

  if (listOfPlayers.children.length > 10) {
    alert("You can't add more than 11 players");
    return;
  }
  cnt.innerText = listOfPlayers.children.length + 1;
  const player = document.createElement("li");
  player.classList.add("list-group-item");
  player.innerText = playerName;
  listOfPlayers.appendChild(player);
};

const showAllDetails = (playerId) => {
  fetch(
    `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`
  )
    .then((response) => response.json())
    .then((data) => {
      const player = data.players[0];
      const {
        strSport,
        strDescriptionEN,
        strTeam,
        strNationality,
        strThumb,
        strGender,
        strPlayer,
        strWage,
      } = player;

      const modal = document.getElementById("detailsModal");
      modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="detailsModalLabel">
                                ${strPlayer}
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <img src="${
                              strThumb || "def.png"
                            }" class="img-fluid mb-3" alt="Player Image">
                            <p><strong>Sport:</strong> ${strSport}</p>
                            <p><strong>Team:</strong> ${
                              strTeam || "No team available"
                            }</p>
                            <p><strong>Nationality:</strong> ${strNationality}</p>
                            <p><strong>Description:</strong> ${
                              strDescriptionEN || "No description available"
                            }</p>
                            <p><strong>Gender:</strong> ${strGender}</p>
                            <p><strong>Salary:</strong> ${
                              strWage || "Not disclosed"
                            }</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            `;
    });
};
