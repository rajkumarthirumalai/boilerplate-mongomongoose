require('dotenv').config();
const mongoose = require('mongoose');

// Update this to your correct MongoDB connection string
const mongoURI = "mongodb+srv://rajkumar:rajkumar12102001@cluster0.plwoirb.mongodb.net/fcc-mongodb-and-mongoose?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

// console.log("Hiii", Person)
const createAndSavePerson = (done) => {
  const userObj = Person({ name: "rajkumar", age: 22, favoriteFoods: ["idily", "dosa"] })
  userObj.save((err,data)=>{
  if (err) return console.error(err);
  done(null,data)
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.markModified('favoriteFoods');
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },          // Search criteria
    { age: ageToSet },             // Update operation
    { new: true },                 // Options: return the updated document
    (err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })  // Find people who like the specified food
    .sort({ name: 1 })                          // Sort by name (ascending order)
    .limit(2)                                   // Limit the results to 2 documents
    .select('-age')                             // Exclude the age field from the result
    .exec((err, data) => {                      // Execute the query
      if (err) return done(err);
      done(null, data);
    });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
