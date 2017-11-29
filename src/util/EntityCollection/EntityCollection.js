import { Record, Map, OrderedMap } from 'immutable';

function _entityMatches(entity, predicate) {
  if (typeof predicate === 'function') {
    return predicate(entity);
  }
  // Assume predicate is a match object
  let match = Object.keys(predicate).find(
    (field) => entity[field] !== predicate[field]
  );
  return match === undefined;
}

function _getId(entity, collection) {
  // Normalize ID type as string for ease of use.
  return entity[collection._idField] && `${entity[collection._idField]}`;
}

const EntityCollection = Record({
  _meta: Map(),
  _all: OrderedMap(),
  _idField: 'id',
  nullEntity: {}
});

Object.assign(
  EntityCollection.prototype,
  {
    setMeta(key, value) {
      let merge = typeof key === 'string' ? { [key]: value } : key;
      return this.mergeIn(['_meta'], merge);
    },

    getMeta(key, defaultValue = null) {
      return this._meta.get(key, defaultValue);
    },

    all() {
      return this._all.toArray();
    },

    find(id, defaultValue = this.nullEntity) {
      // Cast ID as string.
      return this._all.get(`${id}`, defaultValue);
    },

    findAll(ids = []) {
      return ids.map(id => this.find(id));
    },

    findWhere(fieldValues) {
      return this._all.filter(entity => _entityMatches(entity, fieldValues)).toArray();
    },

    findOneWhere(fieldValues, defaultValue = this.nullEntity) {
      return this.findWhere(fieldValues)[0] || defaultValue;
    },

    save(entity) {
      return this.setIn(['_all', _getId(entity, this)], entity);
    },

    saveAll(entities) {
      return entities
        ? this.set('_all', entities.reduce(
          (all, entity) => all.set(_getId(entity, this), entity),
          this._all
        ))
        : this;
    },

    delete(entityOrId) {
      // Cast ID as string.
      return this.deleteIn(['_all', _getId(entityOrId, this) || `${entityOrId}`]);
    },

    deleteAll(entities) {
      return entities.reduce(
        (entityStore, entity) => entityStore.delete(entity),
        this
      );
    },

    deleteWhere(fieldValues) {
      return this.deleteAll(this.findWhere(fieldValues));
    },

    clear() {
      return this.set('_all', OrderedMap());
    }
  }
);

export default EntityCollection;
