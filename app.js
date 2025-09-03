const products = [
  { id: 1, name: 'Camisa', price: 50.00 },
  { id: 2, name: 'Calça',  price: 120.00 },
  { id: 3, name: 'Tênis',  price: 199.90 },
];
const cart = [];

const $products = document.getElementById('products');
const $search   = document.getElementById('search');
const $count    = document.getElementById('cart-count');
const $total    = document.getElementById('cart-total');

function formatBRL(n) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function renderProducts(list) {
  $products.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product';
    card.dataset.name = p.name.toLowerCase();
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${formatBRL(p.price)}</p>
      <button data-id="${p.id}">Adicionar</button>
    `;
    $products.appendChild(card);
  });
}
function updateCart() {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  $count.textContent = count;
  $total.textContent = formatBRL(total);
}
function addToCart(id) {
  const p = products.find(x => x.id === id);
  const item = cart.find(x => x.id === id);
  if (item) item.qty += 1; else cart.push({ id: p.id, price: p.price, qty: 1 });
  updateCart();
}
function filterProducts(term) {
  const t = term.trim().toLowerCase();
  [...$products.children].forEach(card => {
    const show = card.dataset.name.includes(t);
    card.classList.toggle('hide', !show);
  });
}

$products.addEventListener('click', (e) => {
  const id = e.target?.dataset?.id;
  if (id) addToCart(Number(id));
});
$search.addEventListener('input', e => filterProducts(e.target.value));

renderProducts(products);
updateCart();