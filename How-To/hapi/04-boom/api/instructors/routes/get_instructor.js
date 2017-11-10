'use strict';

const Boom = require('boom');
const query = require('./../queries/instructors');
const instructorsData = require('../../../data/instructors');

module.exports = {
  method: 'GET',
  path: '/api/instructors/{slug}',
  config: {
    pre: [{ method: query.getGithubImage, assign: 'image' }],
    handler: (request, reply) => {
      let instructor = instructorsData.find(
        instructor => instructor.slug === request.params.slug
      );

      if (!instructor) {
        return reply(Boom.notFound('Instructor not found!')); // Boom
      }

      instructor.avatar = request.pre.image;

      reply(instructor);
    }
  }
};