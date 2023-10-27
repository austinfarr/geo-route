const matchDriversWithKids = (drivers, kids) => {
  const matches = [];

  Object.values(kids).forEach((kid) => {
    if (!kid.location) return;

    let closestDriver = null;
    let shortestDistance = Infinity;

    Object.values(drivers).forEach((driver) => {
      if (!driver.location) return;

      const distance = getDistance(kid.location, driver.location);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestDriver = driver;
      }
    });

    if (closestDriver) {
      matches.push({ kid, driver: closestDriver });
    }
  });

  return matches;
};

const getDistance = (location1, location2) => {
  // This function should return the distance between two locations
  // Here is a basic Euclidean distance calculation
  const dx = location2.longitude - location1.longitude;
  const dy = location2.latitude - location1.latitude;
  return Math.sqrt(dx * dx + dy * dy);
};

export { matchDriversWithKids, getDistance };
