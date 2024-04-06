import {Matrix} from 'mathjs';

/**
 * @typedef {"PRICE" | "AVERAGE_ROOM_SIZE" | "AMOUNT_OF_ROOMS" | "PROXIMITY_TO_SUBWAY" | "INFRASTRUCTURE"} CriteriaName
 * */

/**
 * @typedef {{
 *         name: CriteriaName,
 *         displayName: string,
 *         ordinal: number,
 *     }} SingleCriteria
 * */

/**
 * @typedef {{
 *     [name: CriteriaName]: SingleCriteria
 * }} Criteria
 * */

/**
 * @typedef {"APARTMENT_ON_KLOVSKA" | "APARTMENT_ON_OBOLON" | "APARTMENT_ON_KHRESHCHATYK"} AlternativeName
 * */

/**
 * @typedef {{
 *     name: AlternativeName,
 *     displayName: string,
 *     ordinal: number,
 * }} SingleAlternative
 * */

/**
 * @typedef {{
 *     [name: AlternativeName]: SingleAlternative
 * }} Alternatives
 * */

/**
 * @typedef {{
 *     [criteriaName: CriteriaName]: Matrix
 * }} PairwiseComparisonOfAlternativesByCriteria
 * */

/**
 * @typedef {{
 *     goal: string,
 *     criteria: Criteria,
 *     alternatives: Alternatives,
 *     pairwiseComparisonOfCriteriaImportanceMatrix: Matrix,
 *     pairwiseComparisonOfAlternativesByCriteria: PairwiseComparisonOfAlternativesByCriteria,
 * }} MAIConfig
 * */

/**
 * @typedef {{
 *     weight: number,
 *     rowName: string,
 * }} WeightEntry
 * */

/**
 * @typedef {Array<WeightEntry>} WeightVector
 * */

/**
 * @typedef {{
 *     [criteriaName: CriteriaName]: Array<WeightEntry>,
 * }} CriteriaNamesToWeights
 * */
