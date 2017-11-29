import EntityCollection from '../EntityCollection';

function makeEntity(id, name, otherFields = {}) {
  return {
    id,
    name,
    ...otherFields
  };
}

describe('EntityCollection', () => {
  let entities;
  let collection;
  beforeEach(() => {
    entities = [
      makeEntity(1, 'foo'),
      makeEntity(2, 'bar'),
      makeEntity(3, 'baz'),
      makeEntity(4, 'bing')
    ];
    collection = EntityCollection().saveAll(entities);
  });

  describe('find', () => {
    it('retrieves an entity by its id', () => {
      expect(collection.find(entities[1].id)).toBe(entities[1]);
    });

    it('returns null by default if nothing is found', () => {
      expect(collection.find('blah')).toBe(null);
    });

    it('returns the value of nullEntity by default if nothing is found', () => {
      let nullEntity = makeEntity(null, 'null');
      collection = collection.set('nullEntity', nullEntity)
      expect(collection.find('blah')).toBe(nullEntity);
    });

    it('returns the provided value if nothing is found', () => {
      expect(collection.find('blah', 'boo')).toBe('boo');
    });
  });

  describe('findWhere', () => {
    beforeEach(() => {
      entities = [
        makeEntity(1, 'foo', { baz: 0, bing: 50 }),
        makeEntity(2, 'bar', { baz: 29, bing: 50 }),
        makeEntity(3, 'baz', { baz: 0, bing: 50 }),
        makeEntity(4, 'bing', { baz: 15, bing: 22 })
      ];
      collection = collection.saveAll(entities);
    });

    it('retrieves an entity by an arbitrary set of fields', () => {
      let a = collection.findWhere({ baz: 0, bing: 50 });
      expect(a).toEqual(expect.arrayContaining([entities[0], entities[2]]))
      expect(a.length).toBe(2);

      let b = collection.findWhere({ bing: 50 });
      expect(b).toEqual(expect.arrayContaining([entities[0], entities[1], entities[2]]))
      expect(b.length).toBe(3);

      let c = collection.findWhere({ bing: 2000 });
      expect(c.length).toBe(0);
    });
  });

  describe('save', () => {
    it('adds an entity to the list', () => {
      let entity = makeEntity(4, 'foobar');
      collection = collection.save(entity);
      expect(collection.find(entity.id)).toBe(entity);
    });

    it('overides any existing entity with the same id', () => {
      let entity = makeEntity(4, 'foobar');
      let entityToo = makeEntity(4, 'bazbing');
      collection = collection.save(entity).save(entityToo);
      expect(collection.find(entity.id)).toBe(entityToo);
    });
  });

  describe('saveAll', () => {
    it('adds a list of entities to the list', () => {
      expect(collection.all()).toEqual(expect.arrayContaining(entities));
    });

    it('overides any existing entity with the same id', () => {
      collection = collection.save(makeEntity(2, 'bing'));
      collection = collection.saveAll(entities);
      expect(collection.all()).toEqual(expect.arrayContaining(entities));
    });
  });

  describe('setMeta, getMeta', () => {
    it('sets and retrieves an arbitrary property on the store, respectively', () => {
      expect(collection.setMeta('foo', 'bar').getMeta('foo')).toBe('bar');
    });
  });

  describe('delete', () => {
    it('removes an entity by an id', () => {
      expect(collection.delete(entities[1].id).all()).not.toContain(entities[1]);
    });
  });

  describe('deleteAll', () => {
    it('removes a list of entities by their ids', () => {
      let remaining = collection.deleteAll([
        entities[1].id,
        entities[2].id
      ]).all();
      expect(remaining).not.toContain(entities[1]);
      expect(remaining).not.toContain(entities[2]);
    });
  });

  describe('clear', () => {
    it('empties the list', () => {
      expect(collection.clear().all()).toEqual([]);
    });
  });
});
