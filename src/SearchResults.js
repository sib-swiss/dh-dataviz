const groupBy = (arr, key) =>
  arr.reduce((grouped, obj) => {
    (grouped[obj[key]] = grouped[obj[key]] || []).push(obj);
    return grouped;
  }, {});
  
export default class SearchResults {

  constructor(nodes) {
    // Total result item count
    this.total = nodes.length;

    // Result items
    this.items = nodes;

    // Experimental (and a bit hacked...)
    this.facets = [ 'dataset', 'has image', 'type'];
    this._facetValues = {};
  }

  // Experimental
  getFacetValues = facet => {
    if (facet === 'dataset') {
      return groupBy(this.items, 'dataset');
    } else if (facet === 'has image') {
      const has = this.items.filter(i => i.depictions?.length > 0);
      const hasnt = this.items.filter(i => !i.depictions?.length > 0);

      return {
        'With image': has,
        'Without image': hasnt
      }
    } else if (facet === 'type') {
      return this.items.reduce((grouped, item) => {
        // This is a multi-value facet!
        const labels = item.types?.map(t => t.label) || [];
        
        for (const label of labels) {
          (grouped[label] = grouped[label] || []).push(item);
        }

        if (labels.length === 0)
          (grouped.untyped = grouped.untyped || []).push(item);

        return grouped;
      }, {});
    }
  }

}