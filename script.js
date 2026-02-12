document.addEventListener("DOMContentLoaded", function () {

    const usernameInput = document.getElementById('user-input')
    const searchBtn = document.getElementById('search-btn')
    const statsContainer = document.querySelector('.stats-container')
    const easyProgressCircle = document.querySelector('.easy-progress')
    const mediumProgressCircle = document.querySelector('.medium-progress')
    const hardProgressCircle = document.querySelector('.hard-progress')
    const easyLabel = document.getElementById('easy-label')
    const mediumLabel = document.getElementById('medium-label')
    const hardLabel = document.getElementById('hard-label')
    const statsCard = document.querySelector('.stats-card')


    function validUsername(username) {
        if (username.trim == "") {
            alert("Username should not be empty")
            return false
        }
        const regx = /^[a-zA-z0-9_-]{1,15}$/
        const isMatching = regx.test(username)
        if (!isMatching) {
            alert("Invalid Username")
        }
        return isMatching
    }

    async function fetchDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`

        try {
            searchBtn.textContent = "Searching..."
            searchBtn.disabled = true

            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Unable to fetch User details")
            }
            const data = await response.json()


            console.log("Logging Data : ", data)

            displayUserData(data)
        }
        catch (error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`
        }
        finally {
            searchBtn.textContent = "Search"
            searchBtn.disabled = false
        }
    }

    function updateProgress(total, solved, label, circle) {
        const progress = (solved / total) * 100
        circle.style.setProperty("--progress-degree", `${progress}%`)
        label.textContent = `${solved}/${total}`
    }

    function displayUserData(userData) {

        statsContainer.classList.remove("hidden")
        statsCard.classList.remove("hidden")
        const totalQues = userData.totalQuestions
        const easyQues = userData.totalEasy
        const mediumQues = userData.totalMedium
        const hardques = userData.totalHard
        const easySolved = userData.easySolved
        const mediumSolved = userData.mediumSolved
        const hardSolved = userData.hardSolved
        const totalSolved = userData.totalSolved
        const acceptRate = userData.acceptanceRate

        updateProgress(easyQues, easySolved, easyLabel, easyProgressCircle)

        updateProgress(mediumQues, mediumSolved, mediumLabel, mediumProgressCircle)

        updateProgress(hardques, hardSolved, hardLabel, hardProgressCircle)

        statsCard.innerHTML = `<div class="card-item">
                                <span>Total Question : </span>
                                <strong>${totalQues}</strong>
                            </div>
                            <div class="card-item">
                                <span>Total Solved : </span>
                                <strong>${totalSolved}</strong>
                            </div>
                            <div class="card-item">
                                <span>Acceptance Rate : </span>
                                <strong>${acceptRate}%</strong>
                            </div>`

    }

    searchBtn.addEventListener("click", () => {
        const username = usernameInput.value
    
        console.log(username)
        if (validUsername(username)) {
            fetchDetails(username)
        }
    })
    
    usernameInput.addEventListener("keydown" , (event) =>{
            if(event.key == "Enter")
                searchBtn.click()
        })
})