new Vue({
    el: '#app',
    data: {
        gameIsRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        turns: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turns = []
        },

        attack() {
            let damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage

            this.turnsLog(damage, true, 'attack')
            
            if (this.checkWin()) {
                return
            }

            this.monsterAttacks()
        },

        specialAttack() {
            let damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage
            
            this.turnsLog(damage, true, 'specAttack')

            if(this.checkWin()) {
                return
            }
            this.monsterAttacks()
        },

        heal() {
            if (this.playerHealth <= 90){
                this.playerHealth += 10
            } else {
                this.playerHealth = 100;
            }
            
            this.turnsLog('', true, 'heal')

            this.monsterAttacks()
        },

        giveUp() {
            this.gameIsRunning = false
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turns = []
        },

        turnsLog(dmg, isPlayer, actionType) {
            if (isPlayer) {
                if (actionType == 'attack') {
                    this.turns.unshift({
                        isPlayer,
                        text: 'Player hits Monster for ' + dmg
                    }) 
                } else if (actionType ==  'heal') {
                    this.turns.unshift({
                        isPlayer,
                        text: 'Player heals for 10'
                    })
                }  else if (actionType == 'specAttack') {
                    this.turns.unshift({
                        isPlayer,
                        text: 'Player hits Monster hard for ' + dmg
                    })
                }
            } else {
                this.turns.unshift({
                    isPlayer,
                    text: 'Monster hits Player for ' + dmg
                })
            }
        },
        monsterAttacks() {
            let damage = this.calculateDamage(5, 12)
            this.playerHealth -= this.calculateDamage(5, 12)
            this.checkWin()
            this.turnsLog(damage, false)
        },
        calculateDamage(min,  max) {
            return Math.max(Math.floor(Math.random() * max ) + 1, min)
        },

        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm('You lost! New Game?')) {
                    this.startGame()
                }  else {
                    this.gameIsRunning = false
                }
                return true
            }
            return false
        }
    }
})