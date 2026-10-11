const ingredients = [
  {name:'야끼소바면 또는 우동면', unit:'봉', quantity:1},
  {name:'돼지고기 또는 베이컨', unit:'줌', quantity:1},
  {name:'양배추', unit:'장', quantity:2},
  {name:'양파', unit:'개', quantity:0.25},
  {name:'식용유', fixed:'조금'},
];
const sauces = [
  {name:'돈가스소스', unit:'큰술', quantity:1},
  {name:'굴소스', unit:'큰술', quantity:0.5},
  {name:'간장', unit:'큰술', quantity:0.5},
  {name:'설탕', unit:'작은술', quantity:0.5},
];
const alternativeSauces = [
  {name:'케첩', unit:'큰술', quantity:1},
  {name:'굴소스', unit:'큰술', quantity:0.5},
  {name:'간장', unit:'큰술', quantity:0.5},
  {name:'설탕', unit:'작은술', quantity:0.5},
  {name:'식초 (선택)', unit:'작은술', quantity:0.5},
];
let servings = 1;
const checked = new Set();
function amount(item) {
  if (item.fixed) return item.fixed;
  const value = item.quantity * servings;
  const whole = Math.floor(value);
  const fraction = {0.25:'¼',0.5:'½',0.75:'¾'}[value - whole] || '';
  return `${whole || (fraction ? '' : '0')}${fraction}${item.unit}`;
}
function render() {
  document.querySelector('#servings').textContent = `${servings}인분`;
  document.querySelector('#minus').disabled = servings === 1;
  document.querySelector('#plus').disabled = servings === 8;
  document.querySelector('#ingredient-items').innerHTML = ingredients.map((item, index) => `<label class="ingredient"><input type="checkbox" data-index="${index}" ${checked.has(index) ? 'checked' : ''}><span class="ingredient-name">${item.name}</span><span class="amount">${amount(item)}</span></label>`).join('');
  document.querySelector('#sauce-items').innerHTML = sauces.map(item => `<div><dt>${item.name}</dt><dd>${amount(item)}</dd></div>`).join('');
  document.querySelector('#alternative-sauce-items').innerHTML = alternativeSauces.map(item => `<div><dt>${item.name}</dt><dd>${amount(item)}</dd></div>`).join('');
}
document.querySelector('#minus').addEventListener('click', () => { if (servings > 1) { servings--; render(); } });
document.querySelector('#plus').addEventListener('click', () => { if (servings < 8) { servings++; render(); } });
document.querySelector('#ingredient-items').addEventListener('change', event => {
  const index = Number(event.target.dataset.index);
  if (event.target.checked) checked.add(index); else checked.delete(index);
});
document.querySelector('#print').addEventListener('click', () => window.print());
document.querySelector('#year').textContent = new Date().getFullYear();
render();
