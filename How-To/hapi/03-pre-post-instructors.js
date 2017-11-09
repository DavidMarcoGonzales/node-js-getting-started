'use strict';

const instructorsData = require('./02-instructors');

const verifyUniqueInstructor = (request, reply) => {
  const name = request.payload.name;
  const existingInstructor = instructorsData.find(
    instructor => instructor.name === name
  );
  if (existingInstructor) {
    return reply(Boom.badRequest('Instructor exists'));
  }
  return reply();
};

const createInstructorSlug = (request, reply) => {
  const name = request.payload.name;
  const slug = name.split(' ').join('-');
  reply(slug.toLowerCase());
};



module.exports = {
  verifyUniqueInstructor,
  createInstructorSlug
};