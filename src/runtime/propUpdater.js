export function propUpdater(
  oldProps,
  dependencies,
  propDependency,
  shallowEqual = true
) {
  const propDependencyMap = new Map(propDependency);
  return newProps => {
    const dependenciesToExecute = new Set();

    for (const prop in newProps) {
      if (
        propDependencyMap.has(prop) &&
        (!shallowEqual || oldProps[prop] !== newProps[prop])
      ) {
        oldProps[prop] = newProps[prop];

        for (const dependency of propDependencyMap.get(prop)) {
          dependenciesToExecute.add(dependency);
        }
      }
    }

    const statementsToExecuteSorted = Array.from(dependenciesToExecute)
      .sort()
      .forEach(id => dependencies[id]());
  };
}