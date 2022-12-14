const allProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const payload = 1;

const correctId = {
  insertId: 4
}

const nameProduct = {
  "name": "ProdutoX"
}

const nameUpdate = {
  "name": "Martelo do Batman"
}

const expectedUpdate = {
  "id": 1,
  "name": "Martelo do Batman"
}

module.exports = {
  allProducts,
  payload,
  correctId,
  nameProduct,
  expectedUpdate,
  nameUpdate,
}