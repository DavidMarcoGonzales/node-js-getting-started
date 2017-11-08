'use strict';

const instructorsData = require('./02-instructors');
const sortBy = require('lodash').sortBy;

module.exports = {
  method: 'GET',
  path: '/api/instructors',
  config: {
    handler: (request, reply) => {

      // a request for all instructors
      const trimmedData = instructorsData.map(instructor => {
        return {
          id: instructor.id,
          name: instructor.name,
          slug: instructor.slug
        };
      });
      reply(trimmedData);
    }
  }
};