import {Matrix} from 'mathjs';
import * as math from 'mathjs';

/**
 * @type {string}
 * */
const goal = "Choose the best apartment for employees to live during business trips to Kyiv";

/**
 * @type {Criteria}
 * */
const criteria = Object.freeze({
    PRICE: {
        name: "PRICE",
        displayName: "Price",
        ordinal: 0,
    },
    AVERAGE_ROOM_SIZE: {
        name: "AVERAGE_ROOM_SIZE",
        displayName: "Average room size",
        ordinal: 1,
    },
    AMOUNT_OF_ROOMS: {
        name: "AMOUNT_OF_ROOMS",
        displayName: "Amount of rooms",
        ordinal: 2,
    },
    PROXIMITY_TO_SUBWAY: {
        name: "PROXIMITY_TO_SUBWAY",
        displayName: "Proximity to the subway and bus stops",
        ordinal: 3,
    },
    INFRASTRUCTURE: {
        name: "INFRASTRUCTURE",
        displayName: "Are there any hospitals, parks, stores nearby?",
        ordinal: 4,
    },
});

/**
 * @type {Alternatives}
 * */
const alternatives = Object.freeze({
    APARTMENT_ON_KLOVSKA: {
        name: 'APARTMENT_ON_KLOVSKA',
        displayName: "Apartment on Klovska",
        ordinal: 0,
    },
    APARTMENT_ON_OBOLON: {
        name: 'APARTMENT_ON_OBOLON',
        displayName: "Apartment on Obolon",
        ordinal: 1,
    },
    APARTMENT_ON_KHRESHCHATYK: {
        name: 'APARTMENT_ON_KHRESHCHATYK',
        displayName: "Apartment on Khreshchatyk",
        ordinal: 2,
    },
});

/**
 * @type {Matrix}
 * */
const pairwiseComparisonOfCriteriaImportanceMatrix = math.matrix([
    [1, 3, 1, 1/2, 5],
    [1/3, 1, 1/4, 1/7, 2],
    [1, 4, 1, 1, 6],
    [2, 7, 1, 1, 8],
    [1/5, 1/2, 1/6, 1/8, 1],
]);

/**
 * @type {PairwiseComparisonOfAlternativesByCriteria}
 * */
const pairwiseComparisonOfAlternativesByCriteria = Object.freeze({
    [criteria.PRICE.name]: math.matrix([
        [1, 4, 1 / 2],
        [1 / 4, 1, 1 / 5],
        [2, 5, 1]
    ]),
    [criteria.AVERAGE_ROOM_SIZE.name]: math.matrix([
        [1, 1 / 2, 3],
        [2, 1, 4],
        [1 / 3, 1 / 4, 1],
    ]),
    [criteria.AMOUNT_OF_ROOMS.name]: math.matrix([
        [1, 1, 2],
        [1, 1, 3],
        [1 / 2, 1 / 3, 1],
    ]),
    [criteria.PROXIMITY_TO_SUBWAY.name]: math.matrix([
        [1, 1 / 3, 4],
        [3, 1, 5],
        [1 / 4, 1 / 5, 1],
    ]),
    [criteria.INFRASTRUCTURE.name]: math.matrix([
        [1, 2, 1 / 5],
        [1 / 2, 1, 1 / 6],
        [5, 6, 1]
    ]),
})

/**
 * @type {MAIConfig}
 * */
export const configuration = {
    goal,
    criteria,
    alternatives,
    pairwiseComparisonOfCriteriaImportanceMatrix,
    pairwiseComparisonOfAlternativesByCriteria,
}

