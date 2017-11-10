'use strict';

const Boom = require('boom');
const instructorsData = require('../../../data/instructors');
const queryValidator = require('./../validation/get_instructors').queryValidator;
const sortBy = require('lodash').sortBy;

module.exports = {
  method: 'GET',
  path: '/api/instructors',
  config: {
    validate: {
      query: queryValidator
    },
    handler: (request, reply) => {

      if (!instructorsData.length) {
        reply(Boom.notFound('No instrucors found!'));
      }

      const trimmedData = instructorsData.map(instructor => {
        return {
          id: instructor.id,
          name: instructor.name,
          slug: instructor.slug
        };
      });

      const sortDirection = request.query.sortDirection;
      const sortKey = request.query.sortKey;

      const sortData = (data, direction, key) => {
        if (direction === 'asc') {
          return sortBy(data, key);
        } else if (direction === 'desc') {
          return sortBy(data, key).reverse();
        } else {
          return data;
        }
      };

      reply(sortData(trimmedData, sortDirection, sortKey));
    }

  }
};