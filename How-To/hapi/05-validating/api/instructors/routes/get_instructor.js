'use strict';

const Boom = require('boom');
const query = require('./../queries/instructors');
const instructorsData = require('../../../data/instructors');
const paramsValidator = require('./../validation/get_instructor').paramsValidator;

module.exports = {
  method: 'GET',
  path: '/api/instructors/{slug}',
  config: {
    validate: {
      params: paramsValidator
    },
    pre: [{ method: query.getGithubImage, assign: 'image' }],
    handler: (request, reply) => {
      let instructor = instructorsData.find(
        instructor => instructor.slug === request.params.slug
      );

      if (!instructor) {
        return reply(Boom.notFound('Instructor not found!'));
      }

      instructor.avatar = request.pre.image;

      reply(instructor);
    }
  }
};