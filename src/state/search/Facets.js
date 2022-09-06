export class Facet {

  constructor(name, definition, condition, dynamicCondition) {
    this.name = name;
    this.definition = definition;
    this.condition = condition;
    this.dynamicCondition = dynamicCondition;
  } 

}

const toSortedArray = counts => {
  const entries = Object.entries(counts);
  entries.sort((a, b) => a[0].localeCompare(b[0]));
  return entries;
}

const computeFacet = (items, facetName, fn, postFilter) => {
  
  
  const counts = {};

  const facetedItems = items.map(item => {
    const value = fn(item);

    if (value) {
      const values = Array.isArray(value) ? value : [ value ];

      values.forEach(v =>
        counts[v] = counts[v] ? counts[v] + 1 : 1);

      return {
        ...item,
        _facet: {
          name: facetName,
          values
        }
      };
    } else {
      return item;
    }
  });

  return {
    facet: facetName,
    counts: toSortedArray(counts),
  
    // If there is a post-filter, remove all items that don't satisfy 
    // the filter condition (counts should remain unchanged though!)
    items: postFilter ? facetedItems.filter(postFilter) : facetedItems
  };
}

const computeSimpleFieldFacet = (items, facet, postFilter) =>
  computeFacet(items, facet.name, item => item[facet.definition], postFilter);

const computeCustomFnFacet = (items, facet, postFilter) => 
  computeFacet(items, facet.name, facet.definition, postFilter);

const computeNestedFieldFacet = (items, facet, postFilter, dynamicConditionPath, dynamicConditionValues) => {

  const getValueRecursive = (obj, path, condition, dynamicConditionPath, dynamicConditionValues) => {
    const [ nextSegment, ...pathRest ] = path;

    const meetsCondition = obj => {
      if (!condition)
        return true;
      
      const [ key, val ] = condition;

      // If obj doesn't have the condition key -> admit
      if (!obj[key])
        return true;

      // If obj has the key, and the value matches -> admit
      if (obj[key] === val)
        return true;

      return false;
    }

    const value = obj[nextSegment];

    if (pathRest.length === 0 || !value) {

      //if there are values for the dynamic condition, and the manuscript matches one of the values
      if (dynamicConditionValues.length > 0 && dynamicConditionValues.includes(obj[dynamicConditionPath])){
        //then add the manuscript to the list to be counted
        return value;
      }
      else if (!dynamicConditionValues || dynamicConditionValues.length == 0){
        return value;
      }
      
    } else {
      return Array.isArray(value) ?

        value.filter(meetsCondition)
          .map(obj => getValueRecursive(obj, pathRest, condition, dynamicConditionPath, dynamicConditionValues))
          .filter(value => value) // Remove undefined

        :
        
        meetsCondition(value) ?
          getValueRecursive(value, pathRest, condition, dynamicConditionPath, dynamicConditionValues) : [];       
    }
  };

  return computeFacet(items, facet.name, item => getValueRecursive(item, facet.definition, facet.condition, dynamicConditionPath, dynamicConditionValues), postFilter);
}

export const computeFacetDistribution = (items, facet, postFilter, queryFilters) => {
  const { definition } = facet;

  //if facet.dynamicCondition is in filters, get the filters.values
  let dynamicConditionValues = [];

  if(Array.isArray(queryFilters) && facet.dynamicCondition){
    let dynamicCondition = queryFilters.find(f => f.facet === facet.dynamicCondition.name);
    if(dynamicCondition){
      dynamicConditionValues = dynamicCondition.values;
    }
  }

  let dynamicConditionPath = facet.dynamicCondition ? facet.dynamicCondition.path : ""; 

  if (Array.isArray(definition))
    //adding the dynamic condition to NestedFieldFacet only
    return computeNestedFieldFacet(items, facet, postFilter, dynamicConditionPath, dynamicConditionValues);
  else if (definition instanceof Function)
    return computeCustomFnFacet(items, facet, postFilter);
  else 
    return computeSimpleFieldFacet(items, facet, postFilter);
}