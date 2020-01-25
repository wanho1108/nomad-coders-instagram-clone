import AplloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

export default new AplloClient({
  uri: 'http://localhost:4000',
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});