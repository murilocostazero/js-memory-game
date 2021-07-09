class MemoryGame {
    constructor({ screen, util }){
        this.screen = screen,
        this.util = util,
        this.initialHeroes = [
            { img: './files/batman.png', name: 'batman' },
            { img: './files/wonderwoman.png', name: 'wonderwoman' },
            { img: './files/deadpool.png', name: 'deadpool' },
            { img: './files/spiderman.png', name: 'spiderman' }
        ]
        this.defaultIcon = './files/avatar.png'
        this.hiddenHeroes = []
        this.selectedHeroes = []
    }

    initialize(){
        this.screen.refreshImages(this.initialHeroes)
        this.screen.configureStartGameButton(this.startGame.bind(this))
        this.screen.configureCheckSelectionButton(this.checkSelection.bind(this))
        this.screen.configureShowAllButton(this.showHiddenHeroes.bind(this))
    }

    async shuffle(){
        const copies = this.initialHeroes
        .concat(this.initialHeroes)
        .map(item => {
            return Object.assign({}, item, {id: Math.random() / 0.5})
        })
        .sort(() => Math.random() - 0.5)

        this.screen.refreshImages(copies)
        this.screen.showLoading()

        const intervalId = this.screen.startCounter()

        await this.util.timeout(3000)
        this.screen.cleanCounter(intervalId)
        this.hideHeroes(copies)
        this.screen.showLoading(false)
    }

    hideHeroes(heroes){
        const hiddenHeroes = heroes.map(( { name, id } ) => ({
            id,
            name,
            img: this.defaultIcon
        }))

        this.screen.refreshImages(hiddenHeroes)
        this.hiddenHeroes = hiddenHeroes
    }

    showHeroes(heroName){
        const { img } = this.initialHeroes.find(({ name }) => heroName === name)
        this.screen.showHeroes(heroName, img)
    }

    checkSelection(id, name){
        const item = { id, name }
        const selectedHeroes = this.selectedHeroes.length 

        switch(selectedHeroes){
            case 0: 
                this.selectedHeroes.push(item)
                break
            case 1:
                const [ firstOption ] = this.selectedHeroes
                this.selectedHeroes = []

                if(firstOption.name === item.name && firstOption.id !== item.id){
                    this.showHeroes(item.name)
                    this.screen.showMessage()
                    return
                }

                this.screen.showMessage(false)
                break
        }
    }

    showHiddenHeroes(){
        const hiddenHeroes = this.hiddenHeroes
        for(const hero of hiddenHeroes){
            const { img } = this.initialHeroes.find(item => item.name === hero.name)
            hero.img = img
        }

        this.screen.refreshImages(hiddenHeroes)
    }

    startGame(){
        this.shuffle()
    }
}