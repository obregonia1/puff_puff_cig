#!/usr/bin/env node

const merits =
  [
    'タバコのために費やす時間を有効活用できます。',
    '筋トレや運動の効率を高めることができます。',
    '洋服や部屋に臭いが着くことがなくなります。',
    '異性の好感度が上がります。',
    '学習能力や睡眠効率が高まります。',
    '肌の状態や歯の色がよくなります'
  ]

async function main() {
  const {Confirm} = require('enquirer');

  const prompt = new Confirm({
    name: 'question',
    message: 'あなたはタバコを吸いますか？'
  });

  await prompt
    .run()
    .then(answer => {
      if (answer) {
        smokerPattern()
      } else {
        console.log('素晴らしい！是非喫煙者の知人に試してみて下さい。')
      }

    })
    .catch(console.error);
}

async function smokerPattern() {
  const {Form} = require('enquirer');

  const listArray = [
    {name: 'smokePerDay', message: '1日に吸う本数', initial: '本'},
    {name: 'pricePerPack', message: '1箱の値段', initial: '円'},
    {name: 'age', message: '年齢', initial: '歳'},
    {name: 'smokingTerm', message: '喫煙期間', initial: '年'}
  ]
  const prompt = new Form({
    name: 'detail',
    message: '以下の項目を入力して下さい。',
    choices: listArray
  });

  await prompt
    .run()
    .then(() => {
      const smokePerDay = listArray[0].value
      const pricePerPack = listArray[1].value
      const age = listArray[2].value
      const smokingTerm = listArray[3].value
      let lifeSpan = 80
      const paymentPerYear = Math.round(smokePerDay * pricePerPack / 10 * 365)
      const inputs = Object.values(prompt.value)
      if (inputs.every(input => !isNaN(input)) && age > smokingTerm) {
        console.log(`あなたが今までタバコに費やした金額は${(paymentPerYear * smokingTerm).toLocaleString()}円です。`)
        const consumeFuture = (lifeSpan, age, paymentPerYear) => {
          return `${lifeSpan}歳までタバコを吸い続けるとしたらさらに${((paymentPerYear) * (lifeSpan - age)).toLocaleString()}円費やすことになります。`
        }
        if (age < 80) {
          console.log(consumeFuture(lifeSpan, age, paymentPerYear))
        } else if (age >= 80) {
          console.log(consumeFuture(lifeSpan += 20, age, paymentPerYear))
        }
        const randomIndex = (Math.floor(Math.random() * merits.length))
        console.log(`タバコを辞めるとタバコ代の節約だけでなく${merits[randomIndex]}`)
        if (age < 20) {
          console.log('そんなことより未成年は吸ったらダメじゃあないか！')
        }
      } else {
        console.log('入力が正しくありません。')
        smokerPattern()
      }
    })
    .catch(console.error);

}

main()
