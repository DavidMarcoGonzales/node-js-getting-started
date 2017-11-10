'use strict';

const query = require('./../queries/instructors');
let instructorsData = require('./../../../data/instructors');

module.exports = {
  method: 'POST',
  path: '/api/instructors',
  config: {
    pre: [
      { method: query.verifyUniqueInstructor },
      { method: query.createInstructorSlug, assign: 'slug' }
    ],
    handler: (request, reply) => {
      let submittedData = request.payload;
      submittedData.id = instructorsData.length + 1;
      submittedData.slug = request.pre.slug;
      instructorsData.push(submittedData);

      reply(instructorsData.find(item => item.slug == request.pre.slug));
    }
  }
};