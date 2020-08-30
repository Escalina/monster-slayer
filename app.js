new Vue({
    el: '#app',
    data: {
        gameIsRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        playerDmg: 0
    },
    methods: {
        startGame() {
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
        },

        attack() {
            this.monsterHealth -= this.calculateDamage(3, 10)

            if (this.checkWin()) {
                return
            }

            this.monsterAttacks()
        },

        specialAttack() {
            this.monsterHealth -= this.calculateDamage(10, 20)
            
            this.monsterAttacks()
        },

        heal() {
            if (this.playerHealth <= 90){
                this.playerHealth += 10
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttacks()
        },

        giveUp() {
            this.gameIsRunning = false
            this.playerHealth = 100
            this.monsterHealth = 100
        },
        monsterAttacks() {
            this.playerHealth -= this.calculateDamage(5, 12)
            this.checkWin()
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

    },
    watch: {
        playerHealth(){
           if(this.playerHealth  < 0) {
               this.playerHealth = 0
           } 
        },
        monsterHealth(){
            if(this.monsterHealth < 0) {
                this.monsterHealth =  0
            }
        }
    }
})