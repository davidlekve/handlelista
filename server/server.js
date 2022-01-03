const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()

const items=[
    {id: 1,name:'gulrot', category: 'gronnsak', unit:'kg'},
    {id: 2,name:'potet', category: 'gronnsak', unit: 'kg'},
    {id:3,name:'kjottdeig', category: 'kjott', unit: '400g pakker'},
    {id:4,name:'ost', category: 'meieri', unit:'g'},
]

const ItemType= new GraphQLObjectType({
    name: 'Item',
    description: 'This repressants an item that wil be in the handleliste',
    fields: ()=>({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        category: {type: new GraphQLNonNull(GraphQLString)},
        unit: {type: new GraphQLNonNull(GraphQLString)},
    })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    items: {
      type: new GraphQLList(ItemType),
      description: 'List of All Items',
      resolve: () => items
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  //mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))