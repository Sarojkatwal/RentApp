import faker from 'faker';

export class Stuff {
    constructor() {
        this.key = faker.random.uuid();
        this.name = faker.commerce.productName();
        this.price = faker.commerce.price(10, 300);
        this.image = `https://picsum.photos/id/${Math.floor((Math.random() * 1000) + 1)}/720/500.jpg`;
        this.description = faker.lorem.paragraphs(20, '\n\n');
    }
}
