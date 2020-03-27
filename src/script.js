
let currencyScale = [];
const monthArr = ["Янв","Февр","Март","Апр","Май","Июнь","Июль","Авг","Сент","Окт","Нояб","Дек"];

const currency = new Vue({
  el: '#currency',
  data: {
    selected: '',
    options: currencyScale,
  }
})

//https://www.npmjs.com/package/vuejs-datepicker
const datePicker = new Vue({
  el: '#datePicker',
  data() {
    return {
      ru: vdp_translation_ru.js,
      disabledDates: {
        to: new Date(796435200000),
        from: new Date(Date.now())
      },
    }
  },
  components: {
    vuejsDatepicker
  },
  methods:{
    takeDate: datepickerClosedFunction,
  }
})

const currencyText = new Vue({
  el:'.currency-text',
  data:{
    text:currency.selected
  }
})

function getManyRate(date){
  if(!date){
    return
  }
    fetch(`https://www.nbrb.by/API/ExRates/Rates?onDate=${date}&Periodicity=0`)
      .then((response) => {
        return response.json();
      })
      .then((curs) => {
        curs.map(function(e){
            let answer = `Официальный курс  ${e.Cur_Scale} ${e.Cur_Name} (${e.Cur_Abbreviation}) на ${e.Date} равен ${e.Cur_OfficialRate} бел. руб.`;
            currencyScale.push({
                text: e.Cur_Abbreviation,
                value: answer,
            })
        })
      });
}

function datepickerClosedFunction(){
  currencyScale.splice(0,currencyScale.length - 1)
  let date = document.querySelector('input').value.split(' ').reverse().map(e => monthArr.includes(e) ? e = monthArr.indexOf(e) + 1 + '':e).join('-');
  getManyRate(date)
}

document.querySelector('button').addEventListener('click', function(){
  currencyText.text = currency.selected
})
  
  
