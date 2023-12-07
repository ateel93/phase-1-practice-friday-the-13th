let currentFugitive

fetch("http://localhost:3000/fugitives")
.then(response => response.json())
.then(fugitives => {
    fugitives.forEach(fugitive => {
        let wantedList = document.querySelector("#wanted-list")
        const criminal = document.createElement("img")
        criminal.src = fugitive.image;
        let currentFugitive = fugitive
        criminal.addEventListener('click', () => {
            document.querySelector("#detail-image").src = fugitive.poster
            document.querySelector("#name").textContent = fugitive.name
            document.querySelector("#height").textContent = `Height reported at ${fugitive.height}`
            document.querySelector("#crime").textContent = `Charges: ${fugitive.crime}`
            document.querySelector("#reward").textContent = `The FBI will be offering a ${fugitive.reward} reward, for information leading to an arrest.`
            document.querySelector("#armed").textContent = fugitive.armed_and_dangerous? "Armed; dangerous" : "Unarmed; Use Caution"
            mouseOnField(); 
            textColor();       
        })
        wantedList.append(criminal)

    })

    textColor();

    function textColor(fugitives) {
        if (document.querySelector("#armed").textContent === 'Armed; dangerous') {
            document.querySelector("#armed").style.color = 'red';
        }
        else if (document.querySelector("#armed").textContent === 'Unarmed; Use Caution') {
            document.querySelector("#armed").style.color = 'yellow';
        }
    }

    const checkbox = document.getElementById("checkbox")
    checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark")})


    pageLoad(fugitives);

    function pageLoad(fugitives) {
        document.querySelector("#detail-image").src = fugitives[0].poster
        document.querySelector("#name").textContent = fugitives[0].name
        document.querySelector("#crime").textContent = `Charges: ${fugitives[0].crime}`
        document.querySelector("#height").textContent = `Height reported at ${fugitives[0].height}`
        document.querySelector("#reward").textContent = `The FBI will be offering a ${fugitives[0].reward} reward, for information leading to an arrest.`
        document.querySelector("#armed").textContent = fugitives[0].armed_and_dangerous? "Armed; dangerous" : "Unarmed; Use Caution"
        
        textColor();
        mouseOnField(fugitives[0]);

    }    

    mouseOnField();

    function mouseOnField(fugitive) {
            document.querySelector("#Contact").addEventListener('mouseover', () => {
                document.querySelector("#contact-number").textContent = `Contact: ${fugitive.field_contact}`
            })
    }

    newRecord(fugitives)

    function newRecord(fugitives) {
        let newFormSubmission = document.querySelector("#formNewRecord")
        newFormSubmission.addEventListener('submit', (event) => {
            event.preventDefault()
            let image = document.querySelector("#detail-image")
            let name = document.querySelector("#name")
            let height = document.querySelector("#height")
            let crime = document.querySelector("#crime")
            let reward = document.querySelector("#reward")

            let newImage = document.querySelector("#imageField").value
            let newName = document.querySelector("#nameField").value
            let newHeight = document.querySelector("#heightField").value
            let newCrime = document.querySelector("#crimeField").value
            let newReward = document.querySelector("#rewardField").value

            image.src = newImage
            name.textContent = newName
            height.textContent = `Height reported at ${newHeight}`
            reward.textContent = `The FBI will be offering a $${newReward} reward, for information leading to an arrest.`
            crime.textContent = `Charges: ${newCrime}`

            let navImage = document.createElement("img")
            navImage.src = newImage
            document.querySelector("#wanted-list").append(navImage)

            navImage.addEventListener('click', () => {
                image.src = newImage
                name.textContent = newName
                height.textContent = `Height reported at ${newHeight}`
                reward.textContent = `The FBI will be offering a $${newReward} reward, for information leading to an arrest.`
                crime.textContent = `Charges: ${newCrime}`

            })
        })
    }

    updateRecords();

    function updateRecords(fugitive) {
        currentFugitive = fugitive;
        document.querySelector("#record-update").addEventListener('submit', (event) => {
            event.preventDefault()
            let crime = document.querySelector("#crime")
            let reward = document.querySelector("#reward")

            let updatedReward = document.querySelector("#rewardUpdateField").value
            let updatedCrime = document.querySelector("#crimeUpdateField").value
            reward.textContent = `The FBI will be offering a $${updatedReward} reward, for information leading to an arrest.`
            crime.textContent = `Charges: ${updatedCrime}`
        })
    }

    tipForm();

    function tipForm(fugitive) {
        currentFugitive = fugitive; 
        document.querySelector("#tips-form").addEventListener('submit', (event) => {
            event.preventDefault()
            let anonTip = document.querySelector("#tips").value
            let newAnonTip = document.createElement("li")
            newAnonTip.textContent = anonTip
            document.querySelector("#comment").append(newAnonTip)
        }
    )} 

})
