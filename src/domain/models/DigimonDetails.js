export class DigimonDetails {
  constructor({ id, name, images, levels, types, skills, descriptions }) {
    this.id = id;
    this.name = name;
    this.images = images[0].href;
    this.levels = levels;
    this.types = types;
    this.skills = skills;
    this.descriptions = descriptions;
  }
}
