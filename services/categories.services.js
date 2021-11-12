const faker = require('faker');
const boom = require('@hapi/boom')

class CategoriesServices{

  constructor(){
    this.categories = [];
    this.generate();
  }
  generate() {
    const limit = 10;
    for(let i = 0; i < limit; i++){
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.music.genre(),
        isBlock: faker.datatype.boolean()
      })
    }
  }
  //Post
  async create (data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  //Get
  async find (){
    return this.categories;
  }

  //Get with ID
  async findOne (id) {
    const category = this.categories.find(item => item.id === id);
    if(!category){
      throw boom.notFound('Categoria no encontrada');
    }
    if(category.isBlock){
      throw boom.conflict('Categoria bloqueada');
    }
    return category;
  }

  //Update
  async update (id, changes){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Categoria no encontrada');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index]
  }

  //Delete
  async delete (id) {
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Category not found')
    }
    this.categories.splice(index, 1);
    return {
      message: true,
      id
    }
  }
}
module.exports = CategoriesServices;
