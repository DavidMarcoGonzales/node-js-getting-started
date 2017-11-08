'use strict';

const instructorsData = require('./02-instructors');

module.exports = {
  method: 'GET',
  path: '/api/instructors/{slug}',
  config: {

    handler: (request, reply) => {
      const instructor = instructorsData.find(
        instructor => instructor.slug === request.params.slug
      );
      reply(instructor);
    }
  }
};