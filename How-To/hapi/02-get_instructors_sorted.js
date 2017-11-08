'use strict';

const instructorsData = require('./02-instructors');
const sortBy = require('lodash').sortBy;
// http://localhost:3001/api/instructors_sorted?sortKey=name&sortDirection=desc
module.exports = {
    method: 'GET',
    path: '/api/instructors_sorted',
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
            //   reply(trimmedData);
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