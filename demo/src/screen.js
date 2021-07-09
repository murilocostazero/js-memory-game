const util = Util
const CONTENT_ID = "content"
const START_GAME_BTN_ID = "startGame"
const SHOWALL_BTN_ID = "showAll"
const MESSAGE_ID = "message"
const LOADING_ID = "loading"
const COUNTER_ID = "counter"
const INVISIBLE_CLASS = "invisible"
const MESSAGES = {
    success: {
        text: 'Combinação correta',
        class: 'alert-success'
    },
    error: {
        text: 'Combinação incorreta',
        class: 'alert-danger'
    }
}
class Screen {
    static getHtmlCode(item) {
        return `
        <div class="col-md-3">
            <div class="card" style="width: 50%;" onclick="window.checkSelection('${item.id}', '${item.name}')">
                <img src="${item.img}" name="${item.name}" class="card-img-top" alt="...">
            </div>
            <br />
        </div>
        `
    }

    static configureCheckSelectionButton(onClickFunction){
        window.checkSelection = onClickFunction
    }

    static changeHtmlContent(htmlCode){
        const content = document.getElementById(CONTENT_ID)
        content.innerHTML = htmlCode
    }

    static generateHtmlStringByImage(items){
        return items.map(Screen.getHtmlCode).join('')
    }

    static refreshImages(items){
        const htmlCode = Screen.generateHtmlStringByImage(items)
        Screen.changeHtmlContent(htmlCode)
    }

    static configureStartGameButton(onClickFunction){
        const startGameBtn = document.getElementById(START_GAME_BTN_ID)
        startGameBtn.onclick = onClickFunction
    }

    static showHeroes(heroName, img){
        const htmlElements = document.getElementsByName(heroName)
        htmlElements.forEach(item => (item.src = img))
    }
    
    static async showMessage(success = true){
        const element = document.getElementById(MESSAGE_ID)
        if(success){
            element.classList.remove(MESSAGES.error.class)
            element.classList.add(MESSAGES.success.class)
            element.innerText = MESSAGES.success.text
        } else {
            element.classList.remove(MESSAGES.success.class)
            element.classList.add(MESSAGES.error.class)
            element.innerText = MESSAGES.error.text
        }
        element.classList.remove(INVISIBLE_CLASS)
        await util.timeout(1000)
        element.classList.add(INVISIBLE_CLASS)
    }

    static showLoading(show = true){
        const loading = document.getElementById(LOADING_ID)
        if(show){
            loading.classList.remove(INVISIBLE_CLASS)
            return
        }

        loading.classList.add(INVISIBLE_CLASS)
    }

    static startCounter(){
        let countTo = 3
        const counterElement = document.getElementById(COUNTER_ID)
        const inTextIdentifier = "$$counter"
        const defaultText = `Começando em ${inTextIdentifier} segundos...`

        const refreshText = () => (counterElement.innerHTML = defaultText.replace(inTextIdentifier, countTo--))

        refreshText()
        const intervalId = setInterval(refreshText, 1000)
        return intervalId
    }

    static cleanCounter(intervalId){
        clearInterval(intervalId)
        document.getElementById(CONTENT_ID).innerHTML = ""
    }

    static configureShowAllButton(onClickFunction){
        const showAllBtn = document.getElementById(SHOWALL_BTN_ID)
        showAllBtn.onclick = onClickFunction
    }
}