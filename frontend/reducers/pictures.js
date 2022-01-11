export default function (picturesCollection = [], action) {
  if (action.type === "add-picture") {
    picturesCollection.push({
      url: action.picture,
      age: action.age,
      gender: action.gender,
    });
    return [...picturesCollection];
  } else {
    return picturesCollection;
  }
}
