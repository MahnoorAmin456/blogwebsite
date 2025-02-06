import { type SchemaTypeDefinition } from 'sanity'
import author from './author'
import post from './post'
import comments from './comments'
import  blockContent  from './blockContent'
import category from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    comments,
    blockContent,
    
  ],
}
