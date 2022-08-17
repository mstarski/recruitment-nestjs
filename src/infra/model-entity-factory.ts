export interface ModelEntityFactory<Entity, Model> {
  toEntity: (model: Model) => Entity;
  toModel: (entity: Entity) => Model;
}
