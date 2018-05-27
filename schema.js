const graphql = require('graphql');
const todos = [
  {
    "id": 1,
    "title": "Read emails",
    "completed": false
  },
  {
    "id": 2,
    "title": "Buy orange",
    "completed": true
  }
];

const TodoType = new graphql.GraphQLObjectType({
  name: 'todo',
  fieleds: function () {
    return {
      id: {
        type: graphql.GraphQLID
      },
      title: {
        type: graphql.GraphQLString
      },
      completed: {
        type: graphql.GraphQLBoolean
      }
    }
  }
});

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      todos: {
        type: new graphql.GraphQLList(TodoType),
        resolve: function () {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              resolve(todos)
            }, 4000)
          });
        }
      }
    }
  }
});

module.exports = new graphql.GraphQLSchema({
  query: queryType
});
