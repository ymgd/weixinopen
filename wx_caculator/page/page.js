const initNumber = '0'
const initFontSize = 4.7
Page({
    currentNumber: initNumber,
    baseNumber: null,
    byNumber: null,
    operator: null,
    prevOperator: null,
    data: {
        fontSize: initFontSize,
        currentNumber: initNumber,
    },
    tapHandler(event) {
        if (!event.target.dataset.button) return
        switch (event.target.dataset.button) {
            case 'AC':
                return this.clearButtonHandler()
            case '+/-':
                return this.symbolButtonHandler()
            case '%':
                return this.percentButtonHandler()
            case '+':
            case '-':
            case '×':
            case '÷':
                return this.operationHandler(event.target.dataset.button)
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                return this.numberButtonHandler(parseInt(event.target.dataset.button))
            case '.':
                return this.decimalPointButtonHandler()
            case '=':
                return this.operate()
        }
    },

    clearButtonHandler() {
        this.currentNumber = initNumber
        this.baseNumber = null
        this.byNumber = null
        this.operator = null
        this.prevOperator = null
        this.showNumber(this.currentNumber)
    },
    symbolButtonHandler() {
        if(/^-/.test(this.currentNumber)){
            this.currentNumber = this.currentNumber.replace(/^\-/, '')
        }else{
            this.currentNumber = '-' + this.currentNumber
        }
        this.showNumber(this.currentNumber)
    },
    percentButtonHandler() {
        let number = Number(this.data.currentNumber)
        number = number / 100
        this.currentNumber = number.toString()
        this.showNumber(this.currentNumber)
    },
    operationHandler(operator) {

        if(!this.prevOperator){

            if(!this.baseNumber){
                this.baseNumber = Number(this.currentNumber)
                this.currentNumber = '0'
            }
            this.prevOperator = this.operator = operator
            return
        }


        this.operate()
        this.prevOperator = this.operator = operator
    },
    numberButtonHandler(number) {
        if(this.currentNumber === '0'){
            this.currentNumber = ''
        }else if(this.currentNumber === '-0'){
            this.currentNumber = '-'
        }
        this.currentNumber += number.toString()
        this.showNumber(this.currentNumber)
    },
    decimalPointButtonHandler(){
        if(this.currentNumber.indexOf('.') > 0) {return}
        this.currentNumber += '.'
        this.showNumber(this.currentNumber)
    },

    operate(){
        if(!this.operator) return
        const currentNumber = Number(this.currentNumber)

        if(!this.byNumber){
            this.byNumber = currentNumber || this.baseNumber
        }else if(currentNumber && !this.prevOperator){
            this.baseNumber = currentNumber
        }else if(currentNumber && this.prevOperator){
            this.byNumber = currentNumber
        }

        switch(this.operator){
            case '+':
                this.baseNumber += this.byNumber
                break
            case '-':
                this.baseNumber -= this.byNumber
                break
            case '×':
                this.baseNumber *= this.byNumber
                break
            case '÷':
                this.baseNumber /= this.byNumber
                break
        }

        this.currentNumber = '0'
        this.prevOperator = null
        this.showNumber(this.baseNumber.toString())
    },

    showNumber(number) {

        let fontSize

        if(number.length <= 7){
            fontSize = initFontSize
        }else if(number.length <= 9){
            fontSize = 3.7
        }else if(number.length <= 12){
            fontSize = 2.7
        }else {
            fontSize = 1.5
        }

        this.setData({
            fontSize,
            currentNumber: number
        })
    }

})
