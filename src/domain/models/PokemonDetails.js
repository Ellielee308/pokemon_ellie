export class PokemonDetails {
  constructor({ id, name, images, height, weight, types, abilities, stats }) {
    this.id = id;
    this.name = name;
    this.images = images;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.abilities = abilities;
    this.stats = stats;
  }
}
